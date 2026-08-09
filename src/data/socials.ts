import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import type { IconType } from 'react-icons';

export type Social = {
    name: string;
    href: string;
    icon: IconType;
    label: string;
};

export const socials: Social[] = [
    {
        name: 'GitHub',
        href: 'https://github.com/sivakumar232',
        icon: FaGithub,
        label: 'GitHub',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/sivakumarvemuri',
        icon: FaLinkedin,
        label: 'LinkedIn',
    },
    {
        name: 'Twitter',
        href: 'https://x.com/sivakumarr3105',
        icon: FaXTwitter,
        label: 'Twitter / X',
    },
    {
        name: 'LeetCode',
        href: 'https://leetcode.com/u/sivakumarrrrrr2005/',
        icon: SiLeetcode,
        label: 'LeetCode',
    },
    {
        name: 'Resume',
        href: 'https://drive.google.com/file/d/1uha-bhj3xjK6XHaWR1kJW1l_vqMePLuw/view?usp=sharing',
        icon: HiOutlineDocumentText,
        label: 'Resume',
    },
];
