import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Désactive temporairement le smooth scroll
        document.documentElement.style.scrollBehavior = 'auto';
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        // Remet le smooth scroll après un micro délai si besoin
        setTimeout(() => {
            document.documentElement.style.scrollBehavior = '';
        }, 0);
    }, [pathname]);

    return null;
}
