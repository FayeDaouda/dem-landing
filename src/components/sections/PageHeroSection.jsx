export default function PageHeroSection({
    contentMiniBar,
    firstTitle,
    secondTitle,
}) {
    return (
        <section className="bg-white pt-32 min-h-[50vh] text-black">
            <div className="mx-6 lg:mx-12">
                <div className="w-full px-4 sm:px-6 lg:px-8">

                    {/* Label section */}
                    <div className="mt-4 mb-4">
                        <span className="font-['Raleway',sans-serif] uppercase font-bold text-xs tracking-widest text-muted">
                            {contentMiniBar}
                        </span>
                    </div>

                    {/* Titre principal */}
                    <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl mb-12 max-w-[700px] leading-tight font-['Poppins',sans-serif] text-black">
                        {firstTitle}
                    </h1>

                    {/* Sous-titre */}
                    <h2 className="text-2xl md:text-3xl text-black max-w-[700px] font-normal font-['Raleway',sans-serif]">
                        {secondTitle}
                    </h2>

                </div>
            </div>
        </section>
    );
}
