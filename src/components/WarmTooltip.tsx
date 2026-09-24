'use client';

import React, {
  cloneElement,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
  ReactElement
} from 'react';
import { createPortal } from 'react-dom';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react';
import { useTheme } from 'next-themes';

type Side = 'top' | 'bottom' | 'left' | 'right';
type SizeKey = 'sm' | 'md' | 'lg';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const LEAN_SPRING = { stiffness: 260, damping: 22, mass: 0.4 };
const FULL_LEAN_SPEED = 1200;
const SIGN: Record<Side, number> = { top: 1, bottom: -1, left: -1, right: 1 };
const ORIGIN: Record<Side, string> = {
  top: 'center bottom',
  bottom: 'center top',
  left: 'right center',
  right: 'left center'
};
const SIZES: Record<SizeKey, { font: number; px: number; py: number }> = {
  sm: { font: 11.5, px: 8, py: 5 },
  md: { font: 12.5, px: 10, py: 6 },
  lg: { font: 13.5, px: 12, py: 7 }
};
const MARGIN = 8;
const HOLD_SLOP = 10;
const SWAP = 0.14;
const SWAP_SHIFT = 10;
const RISE = 4;
const GRACE = 80;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());
const horizontal = (side: Side) => side === 'top' || side === 'bottom';

const anchorOf = (rect: DOMRect, side: Side, gap: number): [number, number] => {
  if (side === 'top') return [rect.left + rect.width / 2, rect.top - gap];
  if (side === 'bottom') return [rect.left + rect.width / 2, rect.bottom + gap];
  if (side === 'left') return [rect.left - gap, rect.top + rect.height / 2];
  return [rect.right + gap, rect.top + rect.height / 2];
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const layoutOf = (x: number, y: number, width: number, height: number, side: Side) => {
  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  if (horizontal(side)) {
    const X = clamp(x - width / 2, MARGIN, Math.max(MARGIN, winWidth - MARGIN - width));
    return { X, Y: side === 'top' ? y - height : y };
  }
  const Y = clamp(y - height / 2, MARGIN, Math.max(MARGIN, winHeight - MARGIN - height));
  return { X: side === 'left' ? x - width : x, Y };
};

interface TooltipPayload {
  id: string;
  trigger: HTMLElement;
  content: ReactNode;
  shortcut?: string;
  side: Side;
  gap: number;
  arrow: boolean;
  surfaceColor: string;
  inkColor: string;
  radius: number;
  font: number;
  px: number;
  py: number;
  popDuration: number;
  popScale: number;
  popBlur: number;
  warmWindow: number;
}

interface SwapInfo {
  dir: number;
  across: boolean;
}

const LAYER = {
  enter: ({ dir, across }: SwapInfo) => ({
    opacity: dir === 0 ? 1 : 0,
    x: across ? 0 : SWAP_SHIFT * dir,
    y: across ? SWAP_SHIFT * dir : 0,
    filter: dir === 0 ? 'blur(0px)' : 'blur(3px)'
  }),
  show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
  exit: ({ dir, across }: SwapInfo) => ({
    opacity: 0,
    x: across ? 0 : -SWAP_SHIFT * dir,
    y: across ? -SWAP_SHIFT * dir : 0,
    filter: 'blur(3px)'
  })
};

interface GroupContextValue {
  id: string;
  delay: number;
  warmWindow: number;
  activeId: string | null;
  isWarm: () => boolean;
  show: (payload: TooltipPayload, mode: 'cold' | 'warm' | 'instant') => void;
  hide: (tooltipId: string, instant?: boolean) => void;
  reset: () => void;
}

const GroupContext = createContext<GroupContextValue | null>(null);

export interface WarmTooltipGroupProps {
  delay?: number;
  warmWindow?: number;
  travel?: number;
  lean?: number;
  onWarmChange?: (warm: boolean) => void;
  children: ReactNode;
}

export interface WarmTooltipGroupHandle {
  reset: () => void;
}

export const WarmTooltipGroup = forwardRef<WarmTooltipGroupHandle, WarmTooltipGroupProps>(
  function WarmTooltipGroup(
    { delay = 400, warmWindow = 300, travel = 320, lean = 0, onWarmChange, children },
    ref
  ) {
    const reduce = useReducedMotion();
    const id = useId();
    const [current, setCurrent] = useState<TooltipPayload | null>(null);
    const [state, setState] = useState<'closed' | 'open' | 'closing'>('closed');
    const st = useRef<{
      state: 'closed' | 'open' | 'closing';
      current: TooltipPayload | null;
      mode: 'cold' | 'warm' | 'instant' | 'move';
      instant: boolean;
      warmUntil: number;
      warm: boolean;
      swap: SwapInfo;
      closeTimer?: ReturnType<typeof setTimeout>;
      leaveTimer?: ReturnType<typeof setTimeout>;
      warmTimer?: ReturnType<typeof setTimeout>;
    }>({
      state: 'closed',
      current: null,
      mode: 'cold',
      instant: false,
      warmUntil: -Infinity,
      warm: false,
      swap: { dir: 0, across: false },
      closeTimer: undefined,
      leaveTimer: undefined,
      warmTimer: undefined
    });
    const textRef = useRef<HTMLSpanElement | null>(null);
    const api = useRef<{
      show: (payload: TooltipPayload, mode: 'cold' | 'warm' | 'instant') => void;
      hide: (tooltipId: string, instant?: boolean) => void;
    }>({ show: () => {}, hide: () => {} });

    const ax = useMotionValue(0);
    const ay = useMotionValue(0);
    const w = useMotionValue(0);
    const h = useMotionValue(0);
    const presence = useMotionValue(0);
    const vx = useVelocity(ax);
    const vy = useVelocity(ay);
    const speed = useTransform([vx, vy], (latest) => {
      const [a, b] = latest as unknown as [number, number];
      return st.current.current && !horizontal(st.current.current.side) ? b : a;
    });
    const leanUnit = useSpring(
      useTransform(speed, [-FULL_LEAN_SPEED, 0, FULL_LEAN_SPEED], [1, 0, -1], { clamp: true }),
      LEAN_SPRING
    );
    const leanDeg = reduce ? 0 : lean;

    const place = useTransform([ax, ay, w, h], (latest) => {
      const [x, y, width, height] = latest as unknown as [number, number, number, number];
      const side = st.current.current ? st.current.current.side : 'top';
      const { X, Y } = layoutOf(x, y, width, height, side);
      return `translate(${X}px, ${Y}px)`;
    });
    const arrowAt = useTransform([ax, ay, w, h], (latest) => {
      const [x, y, width, height] = latest as unknown as [number, number, number, number];
      const side = st.current.current ? st.current.current.side : 'top';
      const { X, Y } = layoutOf(x, y, width, height, side);
      return horizontal(side) ? clamp(x - X, 10, width - 10) : clamp(y - Y, 10, height - 10);
    });
    const pop = useTransform([presence, leanUnit], (latest) => {
      const [p, l] = latest as unknown as [number, number];
      const c = st.current.current;
      const side = c ? c.side : 'top';
      if (reduce || !c) return 'none';
      const scale = c.popScale + (1 - c.popScale) * p;
      const rise = (1 - p) * RISE * SIGN[side] * (side === 'left' ? -1 : 1);
      const rotate = l * leanDeg * SIGN[side];
      const tx = horizontal(side) ? 0 : rise;
      const ty = horizontal(side) ? rise : 0;
      return `translate(${tx}px, ${ty}px) scale(${scale}) rotate(${rotate}deg)`;
    });
    const blur = useTransform(presence, (p) => {
      const c = st.current.current;
      return reduce || !c ? 'none' : `blur(${c.popBlur * (1 - (p as number))}px)`;
    });

    const isWarm = () => st.current.state !== 'closed' || now() < st.current.warmUntil;
    const notify = () => {
      const next = isWarm();
      if (next === st.current.warm) return;
      st.current.warm = next;
      onWarmChange?.(next);
    };

    const finishClose = () => {
      st.current.state = 'closed';
      st.current.current = null;
      setState('closed');
      setCurrent(null);
      notify();
    };

    api.current.show = (payload, mode) => {
      clearTimeout(st.current.closeTimer);
      clearTimeout(st.current.leaveTimer);
      const prev = st.current.current;
      const fresh = st.current.state === 'closed';
      if (prev && prev.id !== payload.id) {
        const [px, py] = anchorOf(prev.trigger.getBoundingClientRect(), prev.side, prev.gap);
        const [nx, ny] = anchorOf(payload.trigger.getBoundingClientRect(), payload.side, payload.gap);
        const across = !horizontal(payload.side);
        st.current.swap = { dir: Math.sign(across ? ny - py : nx - px) || 1, across };
      } else {
        st.current.swap = { dir: 0, across: !horizontal(payload.side) };
      }
      st.current.mode = fresh ? mode : mode === 'instant' ? 'instant' : 'move';
      st.current.instant = mode === 'instant';
      st.current.current = payload;
      st.current.state = 'open';
      setCurrent(payload);
      setState('open');
      notify();
    };

    const beginClose = (instant: boolean) => {
      const c = st.current.current;
      if (!c || st.current.state !== 'open') return;
      st.current.state = 'closing';
      setState('closing');
      st.current.warmUntil = now() + c.warmWindow;
      clearTimeout(st.current.warmTimer);
      st.current.warmTimer = setTimeout(notify, c.warmWindow + 1);
      if (instant) {
        presence.jump(0);
        finishClose();
        return;
      }
      const closeMs = Math.round(c.popDuration * 0.8);
      animate(presence, 0, { duration: closeMs / 1000, ease: EASE_OUT });
      st.current.closeTimer = setTimeout(finishClose, closeMs);
    };

    api.current.hide = (tooltipId, instant = false) => {
      const c = st.current.current;
      if (!c || c.id !== tooltipId || st.current.state !== 'open') return;
      clearTimeout(st.current.leaveTimer);
      if (instant || st.current.instant) {
        beginClose(true);
        return;
      }
      st.current.leaveTimer = setTimeout(() => beginClose(false), GRACE);
    };

    const group = useMemo<GroupContextValue>(
      () => ({
        id,
        delay,
        warmWindow,
        activeId: current ? current.id : null,
        isWarm,
        show: (payload, mode) => api.current.show(payload, mode),
        hide: (tooltipId, instant) => api.current.hide(tooltipId, instant),
        reset: () => {
          if (st.current.current) api.current.hide(st.current.current.id, true);
          st.current.warmUntil = -Infinity;
          clearTimeout(st.current.warmTimer);
          notify();
        }
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [id, delay, warmWindow, current]
    );
    useImperativeHandle(ref, () => ({ reset: group.reset }), [group]);

    useIsomorphicLayoutEffect(() => {
      const c = st.current.current;
      const text = textRef.current;
      if (!c || !text || state !== 'open') return;
      const [tx, ty] = anchorOf(c.trigger.getBoundingClientRect(), c.side, c.gap);
      const tw = text.offsetWidth + c.px * 2;
      const th = text.offsetHeight + c.py * 2;
      const mode = st.current.mode;
      if (mode === 'move' && !reduce && travel > 0) {
        const spring = { type: 'spring' as const, duration: travel / 1000, bounce: 0.1 };
        animate(ax, tx, spring);
        animate(ay, ty, spring);
        animate(w, tw, spring);
        animate(h, th, spring);
        animate(presence, 1, { duration: 0.12, ease: EASE_OUT });
        return;
      }
      ax.jump(tx);
      ay.jump(ty);
      w.jump(tw);
      h.jump(th);
      if (mode === 'cold') {
        presence.jump(0);
        animate(presence, 1, { duration: c.popDuration / 1000, ease: EASE_OUT });
      } else {
        presence.jump(1);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, state]);

    useEffect(() => {
      if (state === 'closed') return undefined;
      let raf = 0;
      const follow = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const c = st.current.current;
          if (!c) return;
          const [tx, ty] = anchorOf(c.trigger.getBoundingClientRect(), c.side, c.gap);
          ax.jump(tx);
          ay.jump(ty);
        });
      };
      const onHidden = () => {
        if (document.visibilityState === 'hidden' && st.current.current) api.current.hide(st.current.current.id, true);
      };
      window.addEventListener('scroll', follow, { capture: true, passive: true });
      window.addEventListener('resize', follow);
      document.addEventListener('visibilitychange', onHidden);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', follow, { capture: true });
        window.removeEventListener('resize', follow);
        document.removeEventListener('visibilitychange', onHidden);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    useEffect(
      () => () => {
        clearTimeout(st.current.closeTimer);
        clearTimeout(st.current.leaveTimer);
        clearTimeout(st.current.warmTimer);
      },
      []
    );

    const canPortal = typeof document !== 'undefined';
    const side = current ? current.side : 'top';
    const arrowStyle = horizontal(side) ? { left: arrowAt } : { top: arrowAt };

    return (
      <GroupContext.Provider value={group}>
        {children}
        {state !== 'closed' && current && canPortal
          ? createPortal(
              <motion.span
                id={id}
                role="tooltip"
                className="pointer-events-none fixed top-0 left-0 z-[9999] block [font-family:inherit]"
                data-side={side}
                style={{
                  transform: place,
                  width: w,
                  height: h,
                  // CSS variables
                  ['--wt-surface' as string]: current.surfaceColor,
                  ['--wt-ink' as string]: current.inkColor,
                  ['--wt-radius' as string]: `${current.radius}px`,
                  ['--wt-font' as string]: `${current.font}px`,
                  ['--wt-origin' as string]: ORIGIN[side]
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-[var(--wt-radius)] border border-neutral-800/60 dark:border-neutral-200/60 [background:var(--wt-surface)] [color:var(--wt-ink)] [box-shadow:0_4px_16px_-2px_rgba(0,0,0,0.25),0_2px_4px_-1px_rgba(0,0,0,0.1)] dark:[box-shadow:0_8px_24px_-4px_rgba(255,255,255,0.15),0_2px_6px_rgba(0,0,0,0.5)] [transform-origin:var(--wt-origin)]"
                  style={{ transform: pop, opacity: presence, filter: blur }}
                >
                  <AnimatePresence initial={false} custom={st.current.swap}>
                    <motion.span
                      key={current.id}
                      className="absolute inset-0 flex items-center justify-center"
                      custom={st.current.swap}
                      variants={LAYER}
                      initial="enter"
                      animate="show"
                      exit="exit"
                      transition={{ duration: reduce ? 0 : SWAP, ease: EASE_OUT }}
                    >
                      <span
                        ref={el => {
                          if (el) textRef.current = el;
                        }}
                        className="inline-flex items-center gap-[7px] whitespace-nowrap font-medium leading-[1.2] tracking-[-0.01em] [font-size:var(--wt-font)]"
                      >
                        {current.content}
                        {current.shortcut ? (
                          <kbd className="inline-flex h-[1.55em] items-center rounded-[0.4em] px-[0.45em] text-[0.86em] font-medium tracking-[0.02em] tabular-nums [font-family:inherit] [background:color-mix(in_srgb,var(--wt-ink)_9%,transparent)] [box-shadow:inset_0_-1px_0_color-mix(in_srgb,var(--wt-ink)_12%,transparent)] [color:color-mix(in_srgb,var(--wt-ink)_72%,transparent)]">
                            {current.shortcut}
                          </kbd>
                        ) : null}
                      </span>
                    </motion.span>
                  </AnimatePresence>
                  {current.arrow ? (
                    <motion.span
                      className="absolute -m-1 h-2 w-2 rounded-[2px] [background:var(--wt-surface)] [transform:rotate(45deg)] data-[side=top]:bottom-[1px] data-[side=bottom]:top-[1px] data-[side=left]:right-[1px] data-[side=right]:left-[1px]"
                      data-side={side}
                      style={arrowStyle}
                      aria-hidden="true"
                    />
                  ) : null}
                </motion.span>
              </motion.span>,
              document.body
            )
          : null}
      </GroupContext.Provider>
    );
  }
);

interface TriggerProps {
  content: ReactNode;
  shortcut?: string;
  children: ReactElement;
  side: Side;
  delay?: number;
  warmWindow?: number;
  surfaceColor: string;
  inkColor: string;
  size: SizeKey;
  radius: number;
  gap: number;
  arrow: boolean;
  popDuration: number;
  popScale: number;
  popBlur: number;
  showFuse: boolean;
  longPress: number;
  disabled: boolean;
  className?: string;
}

function Trigger({
  content,
  shortcut,
  children,
  side,
  delay,
  warmWindow,
  surfaceColor,
  inkColor,
  size,
  radius,
  gap,
  arrow,
  popDuration,
  popScale,
  popBlur,
  showFuse,
  longPress,
  disabled,
  className
}: TriggerProps) {
  const group = useContext(GroupContext);
  const id = useId();
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const [fuse, setFuse] = useState<'idle' | 'arming'>('idle');
  const [pressing, setPressing] = useState(false);
  const t = useRef<{
    open?: ReturnType<typeof setTimeout>;
    press?: ReturnType<typeof setTimeout>;
    press0: { x: number; y: number; id: number } | null;
    suppressClick: boolean;
  }>({ open: undefined, press: undefined, press0: null, suppressClick: false });
  const preset = SIZES[size] || SIZES.md;
  const coldDelay = delay ?? group?.delay ?? 400;
  const active = group?.activeId === id;

  const payload = (): TooltipPayload => ({
    id,
    trigger: triggerRef.current as HTMLElement,
    content,
    shortcut,
    side,
    gap,
    arrow,
    surfaceColor,
    inkColor,
    radius,
    font: preset.font,
    px: preset.px,
    py: preset.py,
    popDuration,
    popScale,
    popBlur,
    warmWindow: warmWindow ?? group?.warmWindow ?? 300
  });

  const hide = (instant = false) => {
    clearTimeout(t.current.open);
    setFuse('idle');
    group?.hide(id, instant);
  };

  const arm = () => {
    if (group?.isWarm()) {
      group.show(payload(), 'warm');
      return;
    }
    setFuse('arming');
    t.current.open = setTimeout(() => {
      setFuse('idle');
      group?.show(payload(), 'cold');
    }, coldDelay);
  };

  const cancelPress = () => {
    clearTimeout(t.current.press);
    if (!t.current.press0) return;
    t.current.press0 = null;
    setPressing(false);
    setFuse('idle');
  };

  useEffect(() => {
    if (disabled) {
      cancelPress();
      hide(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  useEffect(() => {
    if (!active) return undefined;
    const onOutside = (e: PointerEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) hide(false);
    };
    document.addEventListener('pointerdown', onOutside, true);
    return () => document.removeEventListener('pointerdown', onOutside, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(
    () => () => {
      clearTimeout(t.current.open);
      clearTimeout(t.current.press);
    },
    []
  );

  const handlers = disabled
    ? {}
    : {
        onPointerEnter: (e: React.PointerEvent) => {
          if (e.pointerType !== 'touch' && e.buttons === 0) arm();
        },
        onPointerLeave: (e: React.PointerEvent) => {
          if (e.pointerType !== 'touch') hide(false);
        },
        onPointerDown: (e: React.PointerEvent<HTMLSpanElement>) => {
          if (e.pointerType === 'mouse') {
            hide(false);
            return;
          }
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
          t.current.press0 = { x: e.clientX, y: e.clientY, id: e.pointerId };
          setPressing(true);
          setFuse('arming');
          t.current.press = setTimeout(() => {
            t.current.suppressClick = true;
            t.current.press0 = null;
            setPressing(false);
            setFuse('idle');
            group?.show(payload(), 'cold');
          }, longPress);
        },
        onPointerMove: (e: React.PointerEvent) => {
          const p = t.current.press0;
          if (p && p.id === e.pointerId && Math.hypot(e.clientX - p.x, e.clientY - p.y) > HOLD_SLOP) cancelPress();
        },
        onPointerUp: cancelPress,
        onPointerCancel: cancelPress,
        onContextMenu: (e: React.MouseEvent) => {
          if (t.current.press0) e.preventDefault();
        },
        onClickCapture: (e: React.MouseEvent) => {
          if (!t.current.suppressClick) return;
          t.current.suppressClick = false;
          e.preventDefault();
          e.stopPropagation();
        },
        onFocus: (e: React.FocusEvent) => {
          if ((e.target as HTMLElement).matches?.(':focus-visible')) group?.show(payload(), 'instant');
        },
        onBlur: () => hide(true),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Escape') hide(true);
        }
      };

  const childProps = children.props as Record<string, unknown> | undefined;
  const described = childProps?.['aria-describedby'] as string | undefined;

  return (
    <span
      ref={triggerRef}
      className={`relative inline-flex align-middle touch-manipulation [-webkit-touch-callout:none] [-webkit-tap-highlight-color:transparent] data-[pressing]:select-none${className ? ` ${className}` : ''}`}
      data-pressing={pressing ? '' : undefined}
      style={{
        ['--wt-surface' as string]: surfaceColor,
        ['--wt-fuse-ms' as string]: `${t.current.press0 ? longPress : coldDelay}ms`,
        ['--wt-ease-out' as string]: 'cubic-bezier(0.23, 1, 0.32, 1)'
      }}
      {...handlers}
    >
      {cloneElement(children, {
        'aria-describedby': active ? group?.id : described
      } as React.HTMLAttributes<HTMLElement>)}
      {showFuse ? (
        <span
          className="pointer-events-none absolute inset-x-1 h-[2px] rounded-[1px] origin-left opacity-0 [transform:scaleX(0)] [background:var(--wt-surface)] [transition:transform_125ms_var(--wt-ease-out),opacity_125ms_var(--wt-ease-out)] data-[side=top]:-top-1 data-[side=bottom]:-bottom-1 data-[side=left]:inset-y-1 data-[side=left]:inset-x-auto data-[side=left]:h-auto data-[side=left]:w-[2px] data-[side=left]:origin-top data-[side=left]:[transform:scaleY(0)] data-[side=left]:-left-1 data-[side=right]:inset-y-1 data-[side=right]:inset-x-auto data-[side=right]:h-auto data-[side=right]:w-[2px] data-[side=right]:origin-top data-[side=right]:[transform:scaleY(0)] data-[side=right]:-right-1 data-[fuse=arming]:opacity-100 data-[fuse=arming]:[transform:scaleX(1)] data-[fuse=arming]:[transition:transform_var(--wt-fuse-ms)_linear,opacity_80ms_var(--wt-ease-out)] data-[side=left]:data-[fuse=arming]:[transform:scaleY(1)] data-[side=right]:data-[fuse=arming]:[transform:scaleY(1)]"
          data-side={side}
          data-fuse={fuse}
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}

export interface WarmTooltipProps {
  content: ReactNode;
  shortcut?: string;
  children: ReactElement;
  side?: Side;
  delay?: number;
  warmWindow?: number;
  surfaceColor?: string;
  inkColor?: string;
  size?: SizeKey;
  radius?: number;
  gap?: number;
  arrow?: boolean;
  popDuration?: number;
  popScale?: number;
  popBlur?: number;
  showFuse?: boolean;
  longPress?: number;
  disabled?: boolean;
  className?: string;
}

export default function WarmTooltip({
  content,
  shortcut,
  children,
  side = 'top',
  delay,
  warmWindow,
  surfaceColor,
  inkColor,
  size = 'md',
  radius = 8,
  gap = 8,
  arrow = true,
  popDuration = 160,
  popScale = 0.94,
  popBlur = 4,
  showFuse = false,
  longPress = 500,
  disabled = false,
  className = ''
}: WarmTooltipProps) {
  const context = useContext(GroupContext);

  const resolvedSurface = surfaceColor || 'var(--wt-default-surface)';
  const resolvedInk = inkColor || 'var(--wt-default-ink)';

  const props: TriggerProps = {
    content,
    shortcut,
    children,
    side,
    delay,
    warmWindow,
    surfaceColor: resolvedSurface,
    inkColor: resolvedInk,
    size,
    radius,
    gap,
    arrow,
    popDuration,
    popScale,
    popBlur,
    showFuse,
    longPress,
    disabled,
    className
  };

  if (context) return <Trigger {...props} />;
  return (
    <WarmTooltipGroup delay={delay} warmWindow={warmWindow}>
      <Trigger {...props} />
    </WarmTooltipGroup>
  );
}
