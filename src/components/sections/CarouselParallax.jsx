import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

function CarouselParallax({ projects = [] }) {
    const carouselRef = useRef(null);
    const carouselTrackRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Vérification de la disponibilité des projets
    const safeProjects = projects || [];
    const maxIndex = safeProjects.length - 1;

    // Observer pour détecter quand le carousel est visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.3,
                rootMargin: '50px'
            }
        );

        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }

        return () => {
            if (carouselRef.current) {
                observer.unobserve(carouselRef.current);
            }
        };
    }, []);

    // Effet parallax sur les images
    const handleScroll = useCallback(() => {
        if (!isVisible || !carouselTrackRef.current) return;

        const slides = carouselTrackRef.current.querySelectorAll('.carousel-slide');
        slides.forEach((slide) => {
            const image = slide.querySelector('.carousel-image');
            const rect = slide.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calcul de la position relative dans la fenêtre
            const scrollPercent = Math.max(0, Math.min(1,
                (windowHeight - rect.top) / (windowHeight + rect.height)
            ));

            // Effet parallax
            const parallaxOffset = scrollPercent * 40;
            if (image) {
                image.style.transform = `translate3d(0px, -${parallaxOffset}px, 0px)`;
            }
        });
    }, [isVisible]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Navigation
    const goToSlide = (index) => {
        if (safeProjects.length === 0) return;

        const newIndex = Math.max(0, Math.min(index, maxIndex));
        setCurrentIndex(newIndex);

        if (carouselTrackRef.current) {
            const slideElement = carouselTrackRef.current.querySelector('.carousel-slide');
            if (slideElement) {
                const slideWidth = slideElement.offsetWidth;
                const trackWidth = carouselTrackRef.current.offsetWidth;
                const gap = 5; // 5% du viewport
                const gapPixels = (trackWidth * gap) / 100;
                const translateX = newIndex * (slideWidth + gapPixels);
                carouselTrackRef.current.style.transform = `translate3d(-${translateX}px, 0px, 0px)`;
            }
        }
    };

    const nextSlide = () => {
        if (safeProjects.length === 0) return;
        const nextIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        goToSlide(nextIndex);
    };

    const prevSlide = () => {
        if (safeProjects.length === 0) return;
        const prevIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        goToSlide(prevIndex);
    };

    // Si pas de projets, afficher un message
    if (safeProjects.length === 0) {
        return (
            <div className="p-10 text-center text-muted border border-dashed border-muted/30 rounded-lg">
                No projects to display
            </div>
        );
    }

    return (
        <section className="m-0 box-border">
            <div className="relative" ref={carouselRef}>
                <div className="overflow-hidden relative">
                    <div
                        ref={carouselTrackRef}
                        className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] gap-[5%]"
                    >
                        {safeProjects.map((project, index) => (
                            <a
                                key={project.id || index}
                                href={project.link || project.slug || '#'}
                                className="carousel-slide flex-[0_0_auto] relative no-underline text-inherit w-1/3 min-w-[320px] cursor-pointer"
                            >
                                <div className="relative w-full overflow-hidden h-[238px]">
                                    <div
                                        className="carousel-image block overflow-hidden w-full h-[310px] bg-center bg-cover will-change-transform transition-transform duration-200 ease-out"
                                        style={{
                                            backgroundImage: `url(${project.image})`
                                        }}
                                    />
                                </div>
                                <div className="py-2.5 flex justify-between items-center">
                                    <p className="m-0 text-base font-semibold text-dark">{project.title}</p>
                                    <div className="flex gap-2 flex-wrap">
                                        {project.tags && project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-2 py-0.5 rounded text-[0.7rem] font-semibold uppercase tracking-wider bg-cyan/15 text-cyan-dark font-['Raleway',sans-serif]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <Link
                        to="/contact"
                        className="inline-block uppercase tracking-wider text-xs sm:text-sm font-bold px-4 py-2 border border-cyan-2 text-cyan-2 hover:bg-cyan-2 hover:text-white transition-colors duration-250 cursor-pointer rounded-none"
                    >
                        SEE ALL PROJECTS
                    </Link>
                </div>

                <div className="flex justify-center items-center mt-6 gap-5">
                    <div className="flex items-center gap-5">
                        <button
                            className="w-11 h-11 rounded-full border border-cyan-2 text-cyan-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-cyan-2 hover:text-white group"
                            onClick={prevSlide}
                            disabled={safeProjects.length === 0}
                            type="button"
                            aria-label="Previous Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 16" width="9" height="16">
                                <path className="stroke-cyan-2 group-hover:stroke-white transition-colors" strokeLinecap="round" d="M8 1 1.169 7.831 8 14.663" />
                            </svg>
                        </button>

                        <div className="w-24 h-[2px] bg-black/10 relative rounded-sm overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-cyan-2 transition-all duration-300"
                                style={{ width: `${((currentIndex + 1) / safeProjects.length) * 100}%` }}
                            />
                        </div>

                        <button
                            className="w-11 h-11 rounded-full border border-cyan-2 text-cyan-2 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-cyan-2 hover:text-white group"
                            onClick={nextSlide}
                            disabled={safeProjects.length === 0}
                            type="button"
                            aria-label="Next Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 16" width="9" height="16">
                                <path className="stroke-cyan-2 group-hover:stroke-white transition-colors" strokeLinecap="round" d="m1 1 6.831 6.831L1 14.663" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CarouselParallax;
