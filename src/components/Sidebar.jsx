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
import { House, Search, User, Plus, LogOut } from "lucide-react";
import { removeCurrentUser } from "../lib/storage";

/**
 * Komponen Sidebar desktop aplikasi orbit.
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
      : location.pathname.startsWith("/cari") ||
        location.pathname.startsWith("/explore")
        ? "cari"
        : "beranda");

  // * Handler logout desktop
  const handleLogout = () => {
    removeCurrentUser();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Spacer untuk maintain lebar di flex layout saat aside fixed */}
      <div className="hidden md:block w-64 shrink-0" />

      <aside className="fixed left-0 top-0 z-20 hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-6 md:flex">
        {/* Logo orbit. */}
        <Link to="/" className="mb-8 inline-block">
          <span className="font-heading text-2xl font-extrabold tracking-tight text-gray-900">
            orbit<span className="text-orange-700">.</span>
          </span>
        </Link>

        {/* Navigasi Menu Desktop */}
        <nav className="flex-1 space-y-1.5">
          {/* Beranda */}
          <Link
            to="/"
            className={`flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm transition-colors ${
              currentActive === "beranda"
                ? "bg-gray-100 font-bold text-gray-900"
                : "font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <House className="size-5" />
            <span>Beranda</span>
          </Link>

          {/* Cari */}
          <Link
            to="/cari"
            className={`flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm transition-colors ${
              currentActive === "cari"
                ? "bg-gray-100 font-bold text-gray-900"
                : "font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Search
              className={`size-5 ${currentActive === "cari" ? "stroke-[2.5]" : ""}`}
            />
            <span>Cari</span>
          </Link>

          {/* Profil */}
          <Link
            to="/profil"
            className={`flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm transition-colors ${
              currentActive === "profil"
                ? "bg-gray-100 font-bold text-gray-900"
                : "font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <User
              className={`size-5 ${currentActive === "profil" ? "stroke-[2.5]" : ""}`}
            />
            <span>Profil</span>
          </Link>
        </nav>

        {/* Tombol Posting Barang (Warna Primary) */}
        <Link
          to="/buat"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-white shadow-xs transition-colors hover:bg-primary-hover"
        >
          <Plus className="size-4 stroke-[3]" />
          <span>Posting barang</span>
        </Link>

        {/* Tombol Keluar Akun Desktop */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-2.5 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-xs font-bold text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-4" />
          <span>Keluar</span>
        </button>
      </aside>
    </>
  );
}
