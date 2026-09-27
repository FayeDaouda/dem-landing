import React from 'react';

/**
 * SectionHeading - Atom de titre artistique et configurable
 * 
 * @param {Object} props
 * @param {React.ReactNode} [props.title] - Texte ou élément du titre principal
 * @param {React.ReactNode} [props.highlight] - Texte mis en valeur (ex: en doré)
 * @param {React.ReactNode} [props.subtitle] - Texte script/décoratif (ex: "Nos Collections")
 * @param {'left' | 'center' | 'right'} [props.align='center'] - Alignement ('left', 'center', 'right')
 * @param {boolean} [props.reverse=true] - Si true, place le sous-titre au-dessus du titre (flex-col-reverse)
 * @param {string|number|boolean} [props.rotate='-2deg'] - Rotation du texte décoratif (ex: '-2deg', '2deg', false)
 * @param {string} [props.titleTag='h2'] - Balise HTML du titre ('h1', 'h2', 'h3', etc.)
 * @param {string} [props.titleColor='text-black'] - Couleur ou classe du titre principal
 * @param {string} [props.highlightColor='var(--color-gold, #c5a059)'] - Couleur CSS du texte mis en valeur
 * @param {string} [props.highlightClassName=''] - Classes supplémentaires pour le texte mis en valeur
 * @param {string} [props.scriptColor='text-gold'] - Couleur ou classe du texte décoratif
 * @param {string} [props.titleSize='text-4xl lg:text-8xl'] - Tailles Tailwind du titre
 * @param {string} [props.subtitleSize='text-4xl lg:text-6xl'] - Tailles Tailwind du texte décoratif
 * @param {string} [props.fontScript='font-serif font-quickbrush'] - Police du texte décoratif
 * @param {string} [props.className=''] - Classes additionnelles pour le conteneur
 * @param {string} [props.titleClassName=''] - Classes additionnelles pour le titre
 * @param {string} [props.subtitleClassName=''] - Classes additionnelles pour le sous-titre
 * @param {React.ReactNode} [props.children] - Contenu alternatif / personnalisé
 */
export default function SectionHeading({
    title,
    highlight,
    subtitle,
    align = 'center',
    reverse = true,
    rotate = '-2deg',
    titleTag: TitleTag = 'h2',
    titleColor = 'text-white',
    highlightColor = 'var(--cyan, #00D2FF)',
    highlightClassName = '',
    scriptColor = 'text-[#00D2FF]',
    titleSize = 'text-3xl md:text-5xl lg:text-6xl',
    subtitleSize = 'text-xl md:text-2xl lg:text-3xl',
    fontScript = 'font-serif italic font-light',
    className = '',
    titleClassName = '',
    subtitleClassName = '',
    children,
    ...rest
}) {
    // Gestion de l'alignement
    const alignStyles = {
        left: {
            container: 'items-start text-left',
            subtitle: 'text-left origin-left',
            title: 'text-left',
        },
        center: {
            container: 'items-center text-center',
            subtitle: 'text-center origin-center',
            title: 'text-center',
        },
        right: {
            container: 'items-end text-right',
            subtitle: 'text-right origin-right',
            title: 'text-right',
        },
    };

    const currentAlign = alignStyles[align] || alignStyles.center;

    // Calcul de la rotation
    const rotationStyle = rotate === false ? {} : {
        transform: `rotate(${typeof rotate === 'number' ? `${rotate}deg` : rotate})`,
    };

    return (
        <div
            className={`relative flex w-full ${reverse ? 'flex-col-reverse' : 'flex-col'} ${currentAlign.container} ${className}`}
            {...rest}
        >
            {/* Titre Principal */}
            {(title || highlight || children) && (
                <TitleTag
                    className={`uppercase font-bold text-balance block ${titleSize} ${titleColor} ${currentAlign.title} ${titleClassName}`}
                >
                    {title}
                    {highlight && (
                        <>
                            {' '}
                            <em
                                style={{ color: highlightColor }}
                                className={`not-italic ${highlightClassName}`}
                            >
                                {highlight}
                            </em>
                        </>
                    )}
                    {children}
                </TitleTag>
            )}

            {/* Texte Script Décoratif (Sous-titre / Surtitre) */}
            {subtitle && (
                <span
                    style={rotationStyle}
                    className={`w-full inline-block ${fontScript} ${scriptColor} ${subtitleSize} ${currentAlign.subtitle} ${reverse ? '-mb-2 xl:-mb-4' : '-mt-2 xl:-mt-4'} ${subtitleClassName}`}
                >
                    {subtitle}
                </span>
            )}
        </div>
    );
}
