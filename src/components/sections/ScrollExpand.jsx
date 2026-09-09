import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollExpand - Pinned Scroll Expansion Component
 * 
 * Sits in the center of the screen upon scroll arrival (pinned),
 * expands smoothly from a centered compact card to 100% fullscreen width/height,
 * reveals detailed text and heading, then unlocks scroll.
 */
export default function ScrollExpand({
    src = '',
    mediaType = 'image',
    poster = '',
    alt = '',
    title = '',
    scrollHint = 'Faites défiler pour explorer',
    startWidth = 48,
    startHeight = 58,
    mediaZoom = 1.25,
    overlayScrim = 0.85,
    children,
    className = '',
    style,
    ...rest
}) {
    const containerRef = useRef(null);
    const stageRef = useRef(null);
    const frameRef = useRef(null);
    const mediaRef = useRef(null);
    const titleRef = useRef(null);
    const overlayRef = useRef(null);
    const scrimRef = useRef(null);
    const hintRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const frame = frameRef.current;
        const media = mediaRef.current;
        if (!container || !frame || !media) return;

        const isMobile = window.innerWidth < 768;
        const initialW = isMobile ? '88%' : `${startWidth}%`;
        const initialH = isMobile ? '65%' : `${startHeight}%`;

        const ctx = gsap.context(() => {
            // Initial positioning & states
            gsap.set(frame, {
                width: initialW,
                height: initialH,
            });
            gsap.set(media, {
                scale: mediaZoom,
            });
            if (scrimRef.current) {
                gsap.set(scrimRef.current, { opacity: 0.35 });
            }
            if (overlayRef.current) {
                gsap.set(overlayRef.current, { opacity: 0, y: 30, pointerEvents: 'none' });
            }
            if (titleRef.current) {
                gsap.set(titleRef.current, { opacity: 1, y: 0 });
            }
            if (hintRef.current) {
                gsap.set(hintRef.current, { opacity: 1, y: 0 });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * 1.5}`,
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        if (overlayRef.current) {
                            overlayRef.current.style.pointerEvents = self.progress > 0.75 ? 'auto' : 'none';
                        }
                    }
                }
            });

            // 1. Expand frame smoothly from centered box to 100% fullscreen
            tl.fromTo(frame,
                { width: initialW, height: initialH },
                { width: '100%', height: '100%', ease: 'power2.inOut', duration: 1.0 },
                0
            );

            // 2. Parallax zoom out media
            tl.fromTo(media,
                { scale: mediaZoom },
                { scale: 1.0, ease: 'none', duration: 1.0 },
                0
            );

            // 3. Fade out initial centered title
            if (titleRef.current) {
                tl.to(titleRef.current, {
                    opacity: 0,
                    y: -30,
                    duration: 0.35,
                    ease: 'power1.out',
                }, 0);
            }

            // 4. Fade out scroll hint
            if (hintRef.current) {
                tl.to(hintRef.current, {
                    opacity: 0,
                    y: 15,
                    duration: 0.25,
                    ease: 'power1.out',
                }, 0);
            }

            // 5. Deepen the dark overlay scrim
            if (scrimRef.current) {
                tl.to(scrimRef.current, {
                    opacity: overlayScrim,
                    duration: 0.8,
                    ease: 'power1.inOut',
                }, 0.2);
            }

            // 6. Reveal detailed child content
            if (overlayRef.current) {
                tl.to(overlayRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    ease: 'power2.out',
                }, 0.55);
            }
        }, container);

        return () => ctx.revert();
    }, [startWidth, startHeight, mediaZoom, overlayScrim]);

    const mediaElement = mediaType === 'video' ? (
        <video
            ref={mediaRef}
            className="absolute inset-0 w-full h-full object-cover origin-center select-none will-change-transform"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
        />
    ) : (
        <img
            ref={mediaRef}
            className="absolute inset-0 w-full h-full object-cover origin-center select-none will-change-transform"
            src={src}
            alt={alt}
            draggable={false}
        />
    );

    return (
        <div
            ref={containerRef}
            className={`w-full relative overflow-hidden bg-[#021520] ${className}`.trim()}
            style={style}
            {...rest}
        >
            <div
                ref={stageRef}
                className="w-full h-screen relative overflow-hidden flex items-center justify-center p-0 m-0"
            >
                {/* Centered Expandable Frame (Width & Height based) */}
                <div
                    ref={frameRef}
                    className="relative overflow-hidden flex items-center justify-center border border-white/15 will-change-[width,height] shadow-2xl"
                >
                    {mediaElement}

                    {/* Dark Solid Scrim */}
                    <div
                        ref={scrimRef}
                        className="absolute inset-0 bg-[#021520] pointer-events-none"
                    />

                    {/* Detailed Content revealed on full expansion */}
                    {children && (
                        <div
                            ref={overlayRef}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 z-10 opacity-0 will-change-[opacity,transform]"
                        >
                            {children}
                        </div>
                    )}

                    {/* Initial Centered Title (inside frame to stay centered with the card) */}
                    {title && (
                        <div
                            ref={titleRef}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
                        >
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white font-['DM_Sans',sans-serif] tracking-tight max-w-xl leading-tight">
                                {title}
                            </h2>
                        </div>
                    )}

                    {/* Bottom Scroll Hint */}
                    {scrollHint && (
                        <div
                            ref={hintRef}
                            className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-2 text-center text-xs  font-bold uppercase tracking-widest text-white/70 pointer-events-none z-20"
                        >
                            <span>{scrollHint}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
