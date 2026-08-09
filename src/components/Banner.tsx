import React from 'react';
import Image from 'next/image';
import darkBannerImage from '../assets/forest_banner.jpg';
import lightBannerImage from '../assets/light_banner.jpg';

/** Cover image only — full width, no margins, no rounding. Hero.tsx owns avatar/bio below it. */
export function Banner() {
    return (
        <div className="h-28 sm:h-40 w-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
            <div className="hidden dark:block w-full h-full relative">
                <Image
                    src={darkBannerImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                    sizes="680px"
                />
            </div>
            <div className="block dark:hidden w-full h-full relative">
                <Image
                    src={lightBannerImage}
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                    sizes="680px"
                />
            </div>
        </div>
    );
}

export default Banner;
