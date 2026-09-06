import useIsDesktop from '../hooks/useIsDesktop';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import ServiceElement from '../components/sections/ServiceElement.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import { servicesData } from "../data/servicesData.js";
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function Services() {
    const isDesktop = useIsDesktop();
    useScrollReveal(isDesktop);

    return (
        <div className="w-full bg-white text-black min-h-screen">
            <PageHeroSection
                contentMiniBar="SERVICES"
                firstTitle="From vision to immersive execution,"
                secondTitle="I bring projects to life by giving them meaning and impact.."
            />
            <section className="bg-white section-trigger py-3 text-black">
                <div className={isDesktop ? "" : "px-4"}>
                    <div className="mx-6 lg:mx-12 my-10">
                        <div className="mb-8">
                            <h1 className="font-['Poppins',sans-serif] split text-3xl sm:text-5xl font-extrabold uppercase max-w-[600px] text-black">
                                Exploring the next digital frontier
                            </h1>
                        </div>

                        <div className="w-full">
                            <div className="flex flex-col lg:flex-row justify-between items-end relative gap-6">
                                {isDesktop && (
                                    <div className="w-full lg:w-1/2 relative">
                                        <MiniTitleWithBar content="WHAT I DO" />
                                    </div>
                                )}

                                <div className="w-full lg:w-1/2 flex flex-col">
                                    <div className="font-['Raleway',sans-serif]">
                                        <h4
                                            className="font-semibold text-xl mb-3 split text-black"
                                            style={{ maxWidth: isDesktop ? "360px" : "" }}
                                        >
                                            Beyond limits, towards the extraordinary.
                                        </h4>
                                    </div>
                                    <div className="font-['Raleway',sans-serif]">
                                        <p
                                            className="split m-0 text-black/80 leading-relaxed text-base max-w-[600px]"
                                        >
                                            I create and develop digital projects to transform ideas into tangible experiences. For me, design and technology are tools for storytelling and connecting people. Through my creativity and curiosity, I learn to build projects that stand out and can inspire others.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {servicesData.map((service) => (
                    <ServiceElement
                        key={service.id}
                        {...service}
                    />
                ))}

            </section>

            {/* ── Section Info / CTA Personnalisé Services ── */}
            <ContactCTA
                theme="white"
                watermark="SERVICES"
                title="Une formule de livraison adaptée à"
                highlight="votre activité."
                subtitle="Conseil & Déploiement"
                description="Nos experts en logistique urbaine configurent la solution idéale pour votre flux d'envois : courses ponctuelles, tournées e-commerce ou coursiers dédiés."
                primaryBtnText="Ouvrir un compte Pro"
                primaryBtnLink="/entreprises"
                primaryBtnIcon="arrow"
                secondaryBtnText="Contacter l'équipe"
                secondaryBtnLink="/contact"
                bullets={[
                    "Devis personnalisé sans engagement",
                    "Intégration API & Plugins e-commerce",
                    "Couverture intégrale de Dakar & banlieue"
                ]}
            />
        </div>
    );
}
