/**
 * ============================================================================
 * Component   : ExplorePage
 * Layer       : Feature Page
 *
 * Description:
 * Halaman pencarian dan eksplorasi barang lengkap dengan sidebar desktop,
 * navigasi bawah mobile, pencarian kata kunci, filter status, filter kategori,
 * indikator jumlah postingan, serta grid responsif.
 * ============================================================================
 */

import { Link } from "react-router-dom";
import {
    House,
    Search,
    PlusSquare,
    User,
    Bell,
    MessageSquare,
    Plus,
} from "lucide-react";
import { useExplore } from "./hooks/useExplore";
import { ExploreSearchBar } from "./components/ExploreSearchBar";
import { ExploreCategoryChips } from "./components/ExploreCategoryChips";
import { ExploreCard } from "./components/ExploreCard";
import { Sidebar } from "../../components/Sidebar";

/**
 * Komponen utama halaman Cari Barang.
 *
 * @returns {JSX.Element} Halaman Cari Barang responsif.
 */
export function ExplorePage() {
    const {
        filteredPosts,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
    } = useExplore();

    return (
        <div className="min-h-screen bg-white md:bg-gray-100 flex flex-col md:flex-row text-gray-900">
            {/* ================= SIDEBAR DESKTOP (>= 768px) ================= */}
            <Sidebar activeItem="cari" />

            {/* ================= KONTEN UTAMA ================= */}
            <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-8 pb-24 md:pb-12 bg-white md:bg-white md:my-6 md:rounded-3xl md:shadow-xs md:border md:border-gray-200">
                {/* Judul Halaman */}
                <h1 className="font-heading font-extrabold text-2xl md:text-3xl tracking-tight text-gray-900 mb-4 md:mb-6">
                    Cari barang
                </h1>

                {/* Bilah Pencarian & Segmented Control */}
                <div className="mb-3">
                    <ExploreSearchBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                    />
                </div>

                {/* Filter Chip Kategori */}
                <div className="mb-4">
                    <ExploreCategoryChips
                        activeCategory={categoryFilter}
                        onSelectCategory={setCategoryFilter}
                    />
                </div>

                {/* Baris Status Jumlah Postingan & Legenda */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3 pt-1 border-t border-gray-100 md:border-none">
                    <span className="font-medium">
                        {filteredPosts.length} postingan
                    </span>

                    <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-orange-700" />
                            Hilang
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-blue-700" />
                            Ditemukan
                        </span>
                    </div>
                </div>

                {/* Grid Kartu Barang Responsif */}
                {filteredPosts.length === 0 ? (
                    <div className="py-20 text-center text-gray-500">
                        <p className="font-medium text-sm">Tidak ada barang yang cocok dengan pencarian.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                        {filteredPosts.map((post) => (
                            <ExploreCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </main>

            {/* ================= BOTTOM BAR NAVIGASI MOBILE (< 768px) ================= */}
            <footer className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-40 px-2">
                <Link
                    to="/cari"
                    className="flex flex-col items-center justify-center gap-1 min-w-[56px] text-gray-500 hover:text-gray-900"
                >
                    <House className="size-5" />
                    <span className="text-[11px] font-medium">Beranda</span>
                </Link>

                <Link
                    to="/cari"
                    className="flex flex-col items-center justify-center gap-1 min-w-[56px] text-gray-900"
                >
                    <Search className="size-5 stroke-[2.5]" />
                    <span className="text-[11px] font-bold">Cari</span>
                </Link>

                <button
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 min-w-[56px] text-gray-500 hover:text-gray-900"
                >
                    <PlusSquare className="size-5" />
                    <span className="text-[11px] font-medium">Posting</span>
                </button>

                <Link
                    to="/profil"
                    className="flex flex-col items-center justify-center gap-1 min-w-[56px] text-gray-500 hover:text-gray-900"
                >
                    <User className="size-5" />
                    <span className="text-[11px] font-medium">Profil</span>
                </Link>
            </footer>
        </div>
    );
}