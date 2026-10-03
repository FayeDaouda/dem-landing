import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#021520] flex flex-col items-center justify-center text-center p-8 font-['DM_Sans',sans-serif]">
      <div className="text-cyan font-black text-[150px] leading-none mb-4 tracking-tighter">
        404
      </div>
      <h1 className="text-white text-3xl md:text-5xl font-bold mb-6">
        Oups, cette page s'est perdue en route.
      </h1>
      <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto mb-10 font-['Poppins',sans-serif]">
        Il semblerait que la page que vous cherchez n'existe pas ou a été déplacée. Pas d'inquiétude, nos coursiers connaissent le chemin du retour.
      </p>
      
      <Link 
        to="/"
        className="inline-flex items-center justify-center bg-cyan text-dark font-bold uppercase tracking-widest text-sm px-8 py-4 transition-colors hover:bg-white"
      >
        Retourner à l'accueil →
      </Link>
    </div>
  );
}
