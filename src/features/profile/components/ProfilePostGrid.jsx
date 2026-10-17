/**
 * ============================================================================
 * Component   : ProfilePostGrid
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan grid 3 kolom postingan foto dari storage, status overlay
 * "SUDAH KEMBALI", dan badge nama barang di sudut kiri bawah.
 * ============================================================================
 */

import { Check, Image } from "lucide-react";

/**
 * Grid item postingan profil.
 *
 * @param {object} props Properti komponen.
 * @param {Array<object>} props.posts Daftar item postingan.
 * @param {Function} [props.onSelectPost] Callback ketika item ditekan.
 * @returns {JSX.Element} Elemen grid postingan.
 */
export function ProfilePostGrid({ posts, onSelectPost }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-gray-500">
        Belum ada postingan untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5 md:gap-1.5">
      {posts.map((item) => {
        // * Ambil URL foto pertama dari data storage
        const photoUrl =
          Array.isArray(item.photos) && item.photos.length > 0 && item.photos[0]
            ? item.photos[0]
            : item.photo || null;

        const bgClass = item.bgColor || "bg-gray-200";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectPost?.(item.id)}
            className={`group relative aspect-square cursor-pointer overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-blue-700 animate-card-enter ${bgClass}`}
          >
            {/* Foto Postingan dari Storage */}
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <Image size={28} />
              </div>
            )}

            {/* Overlay SUDAH KEMBALI jika status barang telah kembali */}
            {item.isReturned && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/50 p-2 text-white">
                <Check
                  size={26}
                  strokeWidth={2.5}
                  className="mb-1 text-white"
                />
                <span className="font-heading text-center text-[11px] font-extrabold tracking-wider uppercase md:text-xs">
                  SUDAH KEMBALI
                </span>
              </div>
            )}

            {/* Label Nama Barang di Kiri Bawah */}
            <div className="absolute bottom-2 left-2 z-10 max-w-[85%]">
              <span
                className={`inline-block truncate rounded px-2 py-0.5 text-[11px] shadow-sm md:text-xs ${
                  item.isReturned
                    ? "bg-black/60 font-medium text-white backdrop-blur-xs"
                    : "bg-white/95 font-semibold text-gray-900"
                }`}
              >
                {item.name}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
