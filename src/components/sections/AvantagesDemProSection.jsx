import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';
import { Clock, Wallet, ShoppingBag, FileCheck, ShieldCheck, TrendingUp, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AvantagesDemProSection() {
  const sectionRef = useRef(null);

  const scrollToPricing = () => {
    const el = document.getElementById('tarifs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const avantages = [
    {
      num: '/1',
      domain: "VUE D'ENSEMBLE",
      badge: 'Contrôle Total',
      icon: TrendingUp,
      title: "Vous voyez tout, clairement",
      desc: "Vos ventes, vos livraisons, vos encaissements et décaissements, vos produits, vos stocks et vos meilleurs clients : tout au même endroit. Chaque jour, vos données de performance sont prêtes à être exploitées pour affiner encore et toujours votre stratégie.",
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Vous gardez le contrôle'
    },
    {
      num: '/2',
      domain: 'IMAGE',
      badge: 'Représentation',
      icon: ShieldCheck,
      title: 'Des coursiers qui vous représentent bien',
      desc: "Le coursier est le dernier contact avec votre client. Chez DEM, il est formé au service client : ponctuel, présentable et courtois.",
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Vos clients reviennent'
    },
    {
      num: '/3',
      domain: 'VENTE EN LIGNE',
      badge: 'E-commerce',
      icon: ShoppingBag,
      title: 'Votre boutique dans un lien',
      desc: "Pas besoin de site. Créez votre catalogue, partagez votre lien sur WhatsApp, Instagram ou TikTok, et vos clients commandent tout seuls, même pendant que vous dormez.",
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Vous vendez 24h/24'
    },
    {
      num: '/4',
      domain: 'PRIX CLAIRS',
      badge: 'Transparence',
      icon: Wallet,
      title: 'Des prix justes, sans tracas',
      desc: "Chaque livraison a un prix fixé par zone, connu avant d'envoyer. Vous l'annoncez à votre client dès la commande, et plus personne n'a de mauvaise surprise à l'arrivée. Des prix justes, pour vous comme pour vos clients.",
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Vous maîtrisez vos coûts'
    },
    {
      num: '/5',
      domain: 'FINANCES',
      badge: 'Simplicité',
      icon: FileCheck,
      title: 'Votre comptabilité, enfin simple',
      desc: "Plus d'argent éparpillé entre le cash et vos comptes mobile money : tout est regroupé, visible et exportable sur Excel ou PDF en un clic. Factures à votre logo et facture unique pour toutes vos livraisons. C'est tellement simple que vous pouvez faire votre comptabilité vous-même.",
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Des finances claires, tout le temps'
    },
    {
      num: '/6',
      domain: 'ASSISTANCE',
      badge: 'Prioritaire',
      icon: Clock,
      title: 'Une assistance prioritaire',
      desc: "En tant que pro, vous bénéficiez d'une assistance prioritaire. Un interlocuteur humain, qui connaît votre activité, vous répond et vous accompagne avant, pendant et après chaque vente et chaque livraison.",
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Jamais seul face à un problème'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header : label + titre split curtain ──
      const heading = sectionRef.current.querySelector('[data-av="heading"]');
      if (heading) {
        const walk = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let n;
        while ((n = walk.nextNode())) textNodes.push(n);

        textNodes.forEach(node => {
          const text = node.nodeValue;
          if (!text.trim()) return;
          const words = text.split(/(\s+)/);
          const fragment = document.createDocumentFragment();
          words.forEach(w => {
            if (!w.trim()) {
              fragment.appendChild(document.createTextNode(w));
            } else {
              const outer = document.createElement('span');
              outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
              const inner = document.createElement('span');
              inner.style.cssText = 'display:inline-block;';
              inner.className = 'av-word';
              inner.textContent = w;
              outer.appendChild(inner);
              fragment.appendChild(outer);
            }
          });
          node.parentNode.replaceChild(fragment, node);
        });

        gsap.fromTo(heading.querySelectorAll('.av-word'),
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045,
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true }
          }
        );
      }

      // ── Sous-titre glisse ──
      gsap.fromTo('[data-av="sub"]',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-av="sub"]', start: 'top 90%', once: true }
        }
      );

      // ── Cartes avantages : curtain clip + stagger ──
      const cards = sectionRef.current.querySelectorAll('[data-av="card"]');
      gsap.fromTo(cards,
        { y: 70, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
          duration: 0.9, ease: 'expo.out',
          stagger: { amount: 0.7, from: 'start' },
          scrollTrigger: {
            trigger: '[data-av="grid"]',
            start: 'top 80%',
            once: true,
          }
        }
      );

      // ── Bénéfice value : compteur ──
      cards.forEach((card) => {
        const benefitEl = card.querySelector('[data-av="benefit"]');
        if (!benefitEl) return;
        gsap.fromTo(benefitEl,
          { xPercent: 30, opacity: 0 },
          {
            xPercent: 0, opacity: 1, duration: 0.7, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 82%', once: true }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white font-['DM_Sans',sans-serif]" id="avantages-pro">
      <div className="max-w-[1400px] mx-auto">
        
        {/* En-tête */}
        <div className="mb-16">
          <MiniTitleWithBar content="CE QUE VOUS GAGNEZ AVEC DEM PRO" />

          {/* Titre animé split */}
          <div className="mt-4 overflow-hidden">
            <h2
              data-av="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-dark leading-[1.05] tracking-tight"
            >
              <span className='text-[#0086C8]'>DEM Pro,</span> c'est quoi?
            </h2>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif] m-0">
              Passer à un compte <strong>DEM Pro</strong>, c'est libérer votre business des contraintes de livraison, sécuriser vos encaissements et offrir à vos clients une expérience d'achat moderne et digne des plus grandes marques.
            </p>
            <button
              type="button"
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#0086C8] hover:text-dark transition-colors self-start shrink-0 pb-1 border-b-2 border-cyan cursor-pointer"
            >
              <span>Voir les formules tarifaires</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>

        {/* Grille des 6 Avantages */}
        <div
          data-av="grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/10 divide-y md:divide-y-0 divide-black/10 bg-white shadow-sm"
        >
          {avantages.map((item, idx) => {
            const Icon = item.icon;
            const borderClasses = `
              ${idx % 2 === 0 ? 'md:border-r' : ''} 
              ${idx % 3 !== 2 ? 'lg:border-r' : ''} 
              ${idx < 4 ? 'md:border-b' : ''} 
              ${idx < 3 ? 'lg:border-b' : 'lg:border-b-0'} 
              border-black/10
            `;

            return (
              <div
                key={idx}
                data-av="card"
                className={`p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group ${borderClasses}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                        {item.num}
                      </span>
                      <span className="text-xs uppercase font-semibold text-slate-400 font-['DM_Sans',sans-serif]">
                        · {item.domain}
                      </span>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-none bg-slate-100 flex items-center justify-center text-dark mb-5 group-hover:bg-cyan group-hover:text-dark transition-colors">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                    {item.benefitLabel}
                  </span>
                  <span data-av="benefit" className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                    {item.benefitValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
