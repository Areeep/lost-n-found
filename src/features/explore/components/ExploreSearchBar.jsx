/**
 * ============================================================================
 * Component   : ExploreSearchBar
 * Layer       : Feature Component
 *
 * Description:
 * Kotak pencarian teks dan tombol kontrol segmentasi status barang (Semua,
 * Hilang, Ditemukan) dengan tata letak responsif desktop & mobile.
 * ============================================================================
 */

import { Search } from "lucide-react";
import { STATUS_TABS } from "../data/mockPosts";

/**
 * Komponen bilah pencarian dan tombol tab status.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.searchQuery Nilai input pencarian saat ini.
 * @param {Function} props.onSearchChange Handler perubahan teks pencarian.
 * @param {string} props.statusFilter Tab status yang sedang aktif.
 * @param {Function} props.onStatusChange Handler pergantian tab status.
 * @returns {JSX.Element} Elemen search bar & segmented control.
 */
export function ExploreSearchBar({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusChange,
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
            {/* Input Pencarian */}
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Search className="size-5" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Dompet, kunci, laptop, lokasi..."
                    className="w-full h-12 pl-11 pr-4 bg-gray-100 hover:bg-gray-200/70 focus:bg-white text-gray-900 placeholder:text-gray-400 text-sm rounded-xl border border-transparent focus:border-gray-300 focus:outline-none transition-colors"
                />
            </div>

            {/* Segmented Control Status Tabs */}
            <div className="bg-gray-100 p-1 rounded-xl flex items-center shrink-0 self-stretch md:self-auto h-12 border border-gray-200/60">
                {STATUS_TABS.map((tab) => {
                    const isActive = statusFilter === tab;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => onStatusChange(tab)}
                            className={`flex-1 md:flex-initial px-4 md:px-5 h-10 rounded-lg text-sm transition-all duration-150 ${isActive
                                    ? "bg-white text-gray-900 font-bold shadow-xs"
                                    : "text-gray-600 hover:text-gray-900 font-medium"
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}