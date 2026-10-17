/**
 * ============================================================================
 * Component   : ExploreCard
 * Layer       : Feature Component
 *
 * Description:
 * Kartu barang responsif yang menampilkan foto asli barang (dengan fallback
 * warna), indikator status (HILANG / DITEMUKAN), nama barang, dan lokasi,
 * serta navigasi ke halaman detail postingan menggunakan react-router-dom.
 * ============================================================================
 */

import { Link } from "react-router-dom";

/**
 * Komponen kartu item pada grid pencarian.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.post Data postingan barang.
 * @returns {JSX.Element} Elemen Link mengarah ke detail postingan.
 */
export function ExploreCard({ post }) {
    const isHilang = post.status.toLowerCase() === "hilang";
    const photoUrl = post.photos?.[0];

    return (
        <Link
            to={`/post/${post.id}`}
            className="group block text-left focus:outline-none animate-card-enter"
        >
            {/* ================= TAMPILAN MOBILE (< 768px) ================= */}
            <div className="md:hidden flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-2xs transition-colors group-active:bg-gray-50">
                {/* Foto Barang */}
                <div className="relative size-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt={post.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w-full h-full ${post.bgTint}`} />
                    )}
                </div>

                {/* Info Teks */}
                <div className="flex flex-col min-w-0 flex-1 gap-1">
                    <span
                        className={`self-start px-2 py-0.5 rounded-md text-[10px] font-bold capitalize text-white ${isHilang ? "bg-orange-700" : "bg-emerald-700"}`}
                    >
                        {isHilang ? "Hilang" : "Ditemukan"}
                    </span>
                    <p className="font-bold text-sm text-gray-900 truncate">{post.name}</p>
                    <p className="text-xs text-gray-500 truncate">{post.location}</p>
                </div>
            </div>

            {/* ================= TAMPILAN DESKTOP (>= 768px) ================= */}
            <div className="hidden md:flex flex-col">
                {/* Kontainer Gambar */}
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200/60 bg-gray-100 transition-transform duration-200 group-hover:scale-[1.02] shadow-2xs">
                    {photoUrl ? (
                        <img
                            src={photoUrl}
                            alt={post.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w-full h-full ${post.bgTint}`} />
                    )}

                    {/* Badge Status Kiri Atas */}
                    <span
                        className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-heading font-bold capitalize text-white shadow-xs ${isHilang ? "bg-orange-700" : "bg-emerald-700"
                            }`}
                    >
                        {isHilang ? "Hilang" : "Ditemukan"}
                    </span>
                </div>

                {/* Informasi Teks di Bawah Kartu */}
                <div className="pt-2.5 px-0.5">
                    <p className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-700 transition-colors">
                        {post.name}
                    </p>
                    <p className="text-xs text-gray-600 truncate mt-0.5">
                        {post.location}
                    </p>
                </div>
            </div>
        </Link>
    );
}