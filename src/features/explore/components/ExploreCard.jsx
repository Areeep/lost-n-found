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
            className="group block text-left focus:outline-none"
        >
            {/* ================= TAMPILAN MOBILE (< 768px) ================= */}
            <div className="md:hidden relative aspect-square rounded-xl overflow-hidden shadow-2xs border border-gray-200/50 bg-gray-100">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={post.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-200 group-active:scale-105"
                    />
                ) : (
                    <div className={`w-full h-full ${post.bgTint}`} />
                )}

                {/* Indikator Titik Status di Kiri Atas */}
                <span
                    className={`absolute top-2.5 left-2.5 size-2.5 rounded-full ring-2 ring-white/80 ${isHilang ? "bg-orange-700" : "bg-blue-700"
                        }`}
                />

                {/* Pill Judul Barang di Kiri Bawah */}
                <div className="absolute bottom-2 left-2 right-2 flex">
                    <span className="bg-white/95 backdrop-blur-xs text-gray-900 text-[11px] font-bold px-2 py-0.5 rounded-md truncate max-w-full shadow-xs">
                        {post.name}
                    </span>
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
                        className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-heading font-extrabold tracking-wider uppercase text-white shadow-xs ${isHilang ? "bg-orange-700" : "bg-blue-700"
                            }`}
                    >
                        {isHilang ? "HILANG" : "DITEMUKAN"}
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