/**
 * ============================================================================
 * Component   : PostDetailInfo
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan informasi pemilik postingan, judul barang,
 * ringkasan spesifikasi (kategori, lokasi, waktu, ciri-ciri), dan deskripsi.
 * ============================================================================
 */

import { Ellipsis } from "lucide-react";

/**
 * Komponen rincian teks barang dan informasi pengguna.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.post Data postingan.
 * @returns {JSX.Element} Bagian informasi detail postingan.
 */
export function PostDetailInfo({ post }) {
    if (!post) return null;

    return (
        <div className="space-y-4">
            {/* Header Pemilik & Menu */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={`size-10 rounded-full text-white font-bold text-sm flex items-center justify-center ${post.user.avatarColor || "bg-violet-600"
                            }`}
                    >
                        {post.user.avatarInitials}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 leading-tight">
                            {post.user.username}
                        </h3>
                        <p className="text-xs text-gray-600">{post.postedTimeAgo}</p>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label="Opsi postingan"
                    className="size-10 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <Ellipsis size={20} />
                </button>
            </div>

            {/* Judul Barang */}
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">
                {post.name}
            </h1>

            {/* Box Spesifikasi Rinci */}
            <div className="bg-gray-100 rounded-2xl p-4 space-y-2 text-sm">
                <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                    <span className="text-gray-600">Kategori</span>
                    <span className="text-gray-900 font-medium">{post.category}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                    <span className="text-gray-600">Lokasi</span>
                    <span className="text-gray-900 font-medium">{post.location}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                    <span className="text-gray-600">Waktu</span>
                    <span className="text-gray-900 font-medium">{post.date}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                    <span className="text-gray-600">Ciri-ciri</span>
                    <span className="text-gray-900 font-medium">{post.features}</span>
                </div>
            </div>

            {/* Deskripsi Barang */}
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">
                {post.description}
            </p>

            {/* Garis Pemisah */}
            <hr className="border-gray-200" />
        </div>
    );
}
