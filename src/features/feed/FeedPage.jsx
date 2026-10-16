/**
 * ============================================================================
 * Component   : FeedPage
 * Layer       : Feature Page
 *
 * Description:
 * Halaman Beranda (Feed) temuin. Menampilkan alur postingan barang hilang
 * dan ditemukan bergaya Instagram, bilah filter status/kategori, sidebar desktop,
 * kolom informasi samping kanan, serta navigasi mobile.
 * ============================================================================
 */

import { Link } from "react-router-dom";
import { House, Search, SquarePlus, User } from "lucide-react";
import { useFeed } from "./hooks/useFeed";
import { FeedMobileHeader } from "./components/FeedMobileHeader";
import { FeedFilterChips } from "./components/FeedFilterChips";
import { FeedCard } from "./components/FeedCard";
import { FeedRightColumn } from "./components/FeedRightColumn";
import { Sidebar } from "../../components/Sidebar";

/**
 * Komponen halaman utama Beranda (Feed).
 *
 * @returns {JSX.Element} Elemen halaman beranda lengkap.
 */
export function FeedPage() {
    const {
        posts,
        currentUser,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
        handleToggleLike,
    } = useFeed();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-gray-900">
            {/* ================= SIDEBAR DESKTOP (>= 768px) ================= */}
            <Sidebar activeItem="beranda" />

            {/* ================= HEADER MOBILE (< 768px) ================= */}
            <FeedMobileHeader />

            {/* ================= AREA KONTEN UTAMA ================= */}
            <main className="flex-1 min-w-0 max-w-7xl mx-auto px-0 md:px-8 py-0 md:py-8 pb-20 md:pb-12">
                <div className="flex items-start justify-center gap-8">
                    {/* Kolom Feed Tengah */}
                    <div className="w-full max-w-[600px] shrink-0">
                        {/* Bilah Filter Status & Kategori */}
                        <div className="px-4 md:px-0 py-3 md:py-0 md:mb-5 bg-white md:bg-transparent border-b md:border-b-0 border-gray-200">
                            <FeedFilterChips
                                statusFilter={statusFilter}
                                onStatusChange={setStatusFilter}
                                categoryFilter={categoryFilter}
                                onCategoryChange={setCategoryFilter}
                            />
                        </div>

                        {/* Daftar Postingan Feed */}
                        {posts.length === 0 ? (
                            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 mx-4 md:mx-0">
                                <p className="font-semibold text-base mb-1 text-gray-800">
                                    Belum ada postingan
                                </p>
                                <p className="text-xs text-gray-600 mb-4">
                                    Tidak ada barang yang cocok dengan filter yang dipilih.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStatusFilter("Semua");
                                        setCategoryFilter("Semua");
                                    }}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                                >
                                    Reset filter
                                </button>
                            </div>
                        ) : (
                            <div>
                                {posts.map((post) => (
                                    <FeedCard
                                        key={post.id}
                                        post={post}
                                        currentUser={currentUser}
                                        onToggleLike={handleToggleLike}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Kolom Informasi Kanan Desktop (>= 1024px) */}
                    <FeedRightColumn currentUser={currentUser} />
                </div>
            </main>

            {/* ================= BOTTOM BAR NAVIGASI MOBILE (< 768px) ================= */}
            <footer className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t border-gray-200 grid grid-cols-4 items-center z-40 px-2">
                <Link
                    to="/"
                    className="flex flex-col items-center justify-center gap-1 text-gray-900"
                >
                    <House className="size-5 stroke-[2.5]" />
                    <span className="text-[11px] font-bold">Beranda</span>
                </Link>

                <Link
                    to="/cari"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-900"
                >
                    <Search className="size-5" />
                    <span className="text-[11px] font-medium">Cari</span>
                </Link>

                <Link
                    to="/buat"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-900"
                >
                    <SquarePlus className="size-5" />
                    <span className="text-[11px] font-medium">Posting</span>
                </Link>

                <Link
                    to="/profil"
                    className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-900"
                >
                    <User className="size-5" />
                    <span className="text-[11px] font-medium">Profil</span>
                </Link>
            </footer>
        </div>
    );
}
