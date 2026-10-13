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
import { House, Search, Bell, User, Plus } from "lucide-react";

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
      : location.pathname.startsWith("/cari") ||
          location.pathname.startsWith("/post")
        ? "cari"
        : "beranda");

  return (
    <aside className="sticky top-0 z-20 hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-6 md:flex">
      {/* Logo temuin. */}
      <Link to="/cari" className="mb-8 inline-block">
        <span className="font-heading text-2xl font-extrabold tracking-tight text-gray-900">
          temuin<span className="text-orange-700">.</span>
        </span>
      </Link>

      {/* Navigasi Menu Desktop */}
      <nav className="flex-1 space-y-1.5">
        {/* Beranda */}
        <Link
          to="/cari"
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

        {/* Notifikasi */}
        <button
          type="button"
          onClick={() => alert("Fitur notifikasi sedang disiapkan.")}
          className="flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <Bell className="size-5" />
          <span>Notifikasi</span>
        </button>

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

      {/* Tombol Posting Barang */}
      <Link
        to="/buat"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-bold text-white shadow-xs transition-colors hover:bg-black"
      >
        <Plus className="size-4 stroke-[3]" />
        <span>Posting barang</span>
      </Link>
    </aside>
  );
}
