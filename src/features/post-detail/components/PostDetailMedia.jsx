/**
 * ============================================================================
 * Component   : PostDetailMedia
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan container media foto barang, badge status HILANG / DITEMUKAN,
 * kontrol carousel panah (desktop), serta indikator dot (mobile).
 * ============================================================================
 */

import { ChevronLeft, ChevronRight, Check, Image as ImageIcon } from "lucide-react";

/**
 * Komponen carousel foto dan badge status postingan.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.status Status barang ("hilang" | "ditemukan").
 * @param {Array<string>} props.photos Daftar URL gambar.
 * @param {boolean} [props.isReturned=false] Status apakah barang sudah kembali.
 * @param {number} props.activeIndex Indeks foto aktif.
 * @param {number} props.totalPhotos Total foto tersedia.
 * @param {Function} props.onNext Navigasi ke foto berikutnya.
 * @param {Function} props.onPrev Navigasi ke foto sebelumnya.
 * @param {Function} props.onSelectPhoto Memilih dot foto spesifik.
 * @returns {JSX.Element} Elemen media box.
 */
export function PostDetailMedia({
    status,
    photos = [],
    isReturned = false,
    activeIndex,
    totalPhotos,
    onNext,
    onPrev,
    onSelectPhoto,
}) {
    const isLost = status === "hilang";
    const currentPhotoUrl = photos[activeIndex];

    return (
        <div className="relative flex flex-col items-center">
            {/* Container Foto */}
            <div
                className={`relative w-full aspect-square flex items-center justify-center overflow-hidden select-none ${isLost ? "bg-orange-100" : "bg-emerald-100"
                    }`}
            >
                {/* Badge Status Top-Left */}
                <div className="absolute top-4 left-4 z-10">
                    <span
                        className={`font-heading font-bold text-xs capitalize px-3 py-1.5 rounded-md text-white shadow-sm ${isLost ? "bg-orange-700" : "bg-emerald-700"
                            }`}
                    >
                        {isLost ? "Hilang" : "Ditemukan"}
                    </span>
                </div>

                {/* Badge Sudah Kembali Top-Right */}
                {isReturned && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="font-heading font-bold text-xs px-3 py-1.5 rounded-md bg-gray-900/85 backdrop-blur-xs text-white shadow-sm flex items-center gap-1.5">
                            <Check size={14} strokeWidth={2.5} />
                            <span>Sudah kembali</span>
                        </span>
                    </div>
                )}

                {/* Gambar Nyata atau Placeholder */}
                {currentPhotoUrl ? (
                    <img
                        src={currentPhotoUrl}
                        alt="Foto barang"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-700 gap-2">
                        <ImageIcon size={48} strokeWidth={1.5} />
                        <span className="text-sm font-medium">
                            [Foto barang {activeIndex + 1}/{totalPhotos}]
                        </span>
                    </div>
                )}

                {/* Tombol Panah Carousel (Tampil jika foto > 1) */}
                {totalPhotos > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={onPrev}
                            aria-label="Foto sebelumnya"
                            className="absolute left-3 top-1/2 -translate-y-1/2 size-9 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={onNext}
                            aria-label="Foto berikutnya"
                            className="absolute right-3 top-1/2 -translate-y-1/2 size-9 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* Indikator Titik (Dot Carousel) */}
            {totalPhotos > 1 && (
                <div className="flex justify-center items-center gap-1.5 py-3">
                    {Array.from({ length: totalPhotos }).map((_, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectPhoto(idx)}
                            aria-label={`Pilih foto ${idx + 1}`}
                            className={`rounded-full transition-all cursor-pointer ${activeIndex === idx
                                    ? "size-2 bg-gray-900"
                                    : "size-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
