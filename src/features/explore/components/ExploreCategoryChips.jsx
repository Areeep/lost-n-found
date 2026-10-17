/**
 * ============================================================================
 * Component   : ExploreCategoryChips
 * Layer       : Feature Component
 *
 * Description:
 * Bilah chip filter kategori barang yang dapat digulir horizontal pada layar
 * kecil dan membungkus rapi pada layar desktop.
 * ============================================================================
 */

import { CATEGORIES } from "../data/mockPosts";

/**
 * Komponen chip kategori barang.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.activeCategory Kategori terpilih saat ini.
 * @param {Function} props.onSelectCategory Handler pemilihan kategori.
 * @returns {JSX.Element} Deretan tombol chip kategori.
 */
export function ExploreCategoryChips({ activeCategory, onSelectCategory }) {
    return (
        <div className="flex w-full max-w-full min-w-0 items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onSelectCategory(category)}
                        className={`h-9 px-4 rounded-full text-xs md:text-sm whitespace-nowrap transition-colors border shrink-0 cursor-pointer ${isSelected
                                ? "bg-primary text-white font-bold border-primary"
                                : "bg-white hover:bg-gray-50 text-gray-700 font-medium border-gray-300"
                            }`}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}