export default function SolutionPoint({
  number,
  category,
  title,
  description,
  image,
  imageAlt,
  imagePosition = "object-center",
  isReversed = false,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      {/* Colonne Texte */}
      <div className={`lg:col-span-6 ${isReversed ? 'order-1 lg:order-2' : 'order-1'}`}>
        {(number || category) && (
          <span className="font-serif italic text-xl sm:text-2xl text-[#0086C8] block mb-2 font-normal">
            {number} {category && `· ${category}`}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#021520] tracking-tight leading-tight mb-4">
          {title}
        </h3>
        <p className="text-base sm:text-lg text-slate-600 font-['Poppins',sans-serif] leading-relaxed m-0">
          {description}
        </p>
      </div>

      {/* Colonne Image */}
      <div className={`lg:col-span-6 ${isReversed ? 'order-2 lg:order-1' : 'order-2'}`}>
        <div className="border border-black/10 bg-slate-100 overflow-hidden shadow-sm aspect-[16/10] w-full">
          <img
            src={image}
            alt={imageAlt || title}
            className={`w-full h-full object-cover ${imagePosition} hover:scale-105 transition-transform duration-500`}
          />
        </div>
      </div>
    </div>
  );
}
