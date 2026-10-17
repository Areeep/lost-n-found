/**
 * ============================================================================
 * Component   : PostDetailInfo
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan informasi pemilik postingan, menu opsi titik tiga,
 * judul barang, ringkasan spesifikasi, dan deskripsi rincian barang.
 * ============================================================================
 */

import { PostOptionsMenu } from "./PostOptionsMenu";

/**
 * Komponen rincian teks barang dan informasi pengguna.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.post Data postingan.
 * @param {Function} [props.onEdit] Callback saat opsi Edit dipilih.
 * @returns {JSX.Element} Bagian informasi detail postingan.
 */
export function PostDetailInfo({ post, onEdit }) {
  if (!post) return null;

  return (
    <div className="space-y-4">
      {/* Header Pemilik & Menu Titik Tiga di Dalam Card */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 items-center justify-center rounded-full text-sm font-bold text-white ${post.user?.avatarColor || "bg-violet-600"
              }`}
          >
            {post.user?.avatarInitials || "U"}
          </div>
          <div>
            <h3 className="text-sm leading-tight font-bold text-gray-900">
              {post.user?.username || "anonim"}
            </h3>
            <p className="text-xs text-gray-600">
              {post.postedTimeAgo || "Baru saja"}
            </p>
          </div>
        </div>

        {/* * Menu titik tiga di dalam card */}
        <PostOptionsMenu
          postName={post.name}
          iconSize={20}
          onEdit={onEdit}
        />
      </div>

      {/* Judul Barang */}
      <h1 className="font-heading text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
        {post.name}
      </h1>

      {/* Box Spesifikasi Rinci */}
      <div className="space-y-2 rounded-2xl bg-gray-100 p-4 text-sm">
        <div className="grid grid-cols-[100px_1fr] items-start gap-2">
          <span className="text-gray-600">Kategori</span>
          <span className="font-medium text-gray-900">{post.category}</span>
        </div>
        <div className="grid grid-cols-[100px_1fr] items-start gap-2">
          <span className="text-gray-600">Lokasi</span>
          <span className="font-medium text-gray-900">{post.location}</span>
        </div>
        <div className="grid grid-cols-[100px_1fr] items-start gap-2">
          <span className="text-gray-600">Waktu</span>
          <span className="font-medium text-gray-900">{post.date}</span>
        </div>
        <div className="grid grid-cols-[100px_1fr] items-start gap-2">
          <span className="text-gray-600">Ciri-ciri</span>
          <span className="font-medium text-gray-900">{post.features}</span>
        </div>
      </div>

      {/* Deskripsi Barang */}
      <p className="text-sm leading-relaxed whitespace-pre-line text-gray-900">
        {post.description}
      </p>

      {/* Garis Pemisah */}
      <hr className="border-gray-200" />
    </div>
  );
}
