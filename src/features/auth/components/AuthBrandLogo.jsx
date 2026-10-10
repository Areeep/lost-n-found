/**
 * ============================================================================
 * Component   : AuthBrandLogo
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan logo resmi "temuin." dengan titik oranye khas status lost.
 * ============================================================================
 */

/**
 * Komponen teks logo temuin.
 *
 * @param {object} props Properti komponen.
 * @param {"light"|"dark"} [props.theme="dark"] Tema teks logo (light = teks putih, dark = teks hitam).
 * @param {string} [props.className=""] Kelas CSS tambahan.
 * @returns {JSX.Element} Elemen logo.
 */
export function AuthBrandLogo({ theme = "dark", className = "" }) {
    const textColor = theme === "light" ? "text-white" : "text-gray-900";
    const dotColor = theme === "light" ? "text-orange-400" : "text-orange-700";

    return (
        <span
            className={`font-heading font-extrabold tracking-tight text-3xl select-none ${textColor} ${className}`}
        >
            temuin<span className={dotColor}>.</span>
        </span>
    );
}
