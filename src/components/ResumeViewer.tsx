'use client';

import React, { useEffect, useState } from 'react';

export function ResumeViewer() {
    const [src, setSrc] = useState('/res_portfolio.pdf#view=FitH');

    useEffect(() => {
        // Unique timestamp on each load/refresh forces browser PDF plugins to bypass memory cache
        setSrc(`/res_portfolio.pdf?t=${Date.now()}#view=FitH`);
    }, []);

    return (
        <iframe
            src={src}
            title="Siva Kumar Vemuri Resume"
            className="w-full h-[75vh] sm:h-[80vh] border-0 bg-white dark:bg-zinc-950 block"
        />
    );
}

export default ResumeViewer;
