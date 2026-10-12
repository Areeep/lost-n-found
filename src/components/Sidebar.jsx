/**
 * ============================================================================
 * Component   : Sidebar
 * Layer       : Shared UI Component
 *
 * Description:
 * Sidebar navigasi desktop terpusat (>= 768px). Mendukung navigasi rute
 * React Router, deteksi menu aktif otomatis (atau via prop), dan tombol aksi.
 * ============================================================================
 */

import { Link, useLocation } from "react-router-dom";
import {
    House,
    Search,
    Bell,
    User,
    Plus,
} from "lucide-react";

/**
 * Komponen Sidebar desktop aplikasi temuin.
 *
 * @param {object} props Properti komponen.
 * @param {string} [props.activeItem] Nama menu aktif eksplisit ("beranda" | "cari" | "profil").
 * @returns {JSX.Element} Elemen sidebar desktop.
 */
export function Sidebar({ activeItem }) {
    const location = useLocation();

    // * Tentukan item aktif: gunakan prop jika ada, fallback cek URL pathname
    const currentActive =
        activeItem ||
        (location.pathname.startsWith("/profil")
            ? "profil"
            : location.pathname.startsWith("/cari") || location.pathname.startsWith("/post")
                ? "cari"
                : "beranda");

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 p-6 z-20 shrink-0">
            {/* Logo temuin. */}
            <Link to="/cari" className="inline-block mb-8">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-gray-900">
                    temuin<span className="text-orange-700">.</span>
                </span>
            </Link>

            {/* Navigasi Menu Desktop */}
            <nav className="flex-1 space-y-1.5">
                {/* Beranda */}
                <Link
                    to="/cari"
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm transition-colors ${currentActive === "beranda"
                        ? "font-bold bg-gray-100 text-gray-900"
                        : "font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                >
                    <House className="size-5" />
                    <span>Beranda</span>
                </Link>

                {/* Cari */}
                <Link
                    to="/cari"
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm transition-colors ${currentActive === "cari"
                        ? "font-bold bg-gray-100 text-gray-900"
                        : "font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                >
                    <Search className={`size-5 ${currentActive === "cari" ? "stroke-[2.5]" : ""}`} />
                    <span>Cari</span>
                </Link>

                {/* Notifikasi */}
                <button
                    type="button"
                    onClick={() => alert("Fitur notifikasi sedang disiapkan.")}
                    className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                    <Bell className="size-5" />
                    <span>Notifikasi</span>
                </button>

                {/* Profil */}
                <Link
                    to="/profil"
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm transition-colors ${currentActive === "profil"
                        ? "font-bold bg-gray-100 text-gray-900"
                        : "font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                >
                    <User className={`size-5 ${currentActive === "profil" ? "stroke-[2.5]" : ""}`} />
                    <span>Profil</span>
                </Link>
            </nav>

            {/* Tombol Posting Barang */}
            <button
                type="button"
                onClick={() => alert("Fitur posting barang baru sedang disiapkan.")}
                className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
                <Plus className="size-4 stroke-[3]" />
                <span>Posting barang</span>
            </button>
        </aside>
    );
}