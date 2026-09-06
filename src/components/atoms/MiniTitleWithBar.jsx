export default function MiniTitleWithBar({ content, color = 'cyan' }) {
  if (!content) return null;

  const colorClass =
    color === 'white'
      ? 'before:bg-white text-white'
      : color === 'dark'
      ? 'before:bg-dark text-dark'
      : 'before:bg-cyan-2 text-dark';

  return (
    <div
      className={`relative pl-[30px] mb-2 flex items-center before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[20px] before:h-[2px] before:-translate-y-1/2 ${colorClass}`}
    >
      <span className="uppercase font-bold tracking-wider text-xs sm:text-sm font-['Raleway',sans-serif]">
        {content}
      </span>
    </div>
  );
}
