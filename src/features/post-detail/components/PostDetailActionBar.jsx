/**
 * ============================================================================
 * Component   : PostDetailActionBar
 * Layer       : Feature Component
 *
 * Description:
 * Menyediakan tombol simpan (bookmark) dan tombol aksi utama (CTA chat WA).
 * ============================================================================
 */

import { Bookmark, MessageSquare } from "lucide-react";

/**
 * Komponen bilah aksi (Simpan dan Hubungi).
 *
 * @param {object} props Properti komponen.
 * @param {boolean} props.saved Status tersimpan (bookmark).
 * @param {string} props.status Status barang ("hilang" | "ditemukan").
 * @param {string} props.ownerUsername Username pemilik barang.
 * @param {Function} props.onToggleSave Handler simpan.
 * @param {Function} props.onContact Handler hubungi poster via WA.
 * @returns {JSX.Element} Elemen action bar.
 */
export function PostDetailActionBar({
    saved,
    status,
    ownerUsername,
    onToggleSave,
    onContact,
}) {
    const isLost = status === "hilang";
    const ctaLabel = isLost
        ? `Aku menemukannya — chat ${ownerUsername}`
        : `Ini punyaku — chat ${ownerUsername}`;

    return (
        <div className="flex items-center gap-3 pt-3">
            {/* Tombol Simpan / Bookmark */}
            <button
                type="button"
                onClick={onToggleSave}
                aria-label={saved ? "Hapus dari simpanan" : "Simpan postingan"}
                className="size-12 shrink-0 rounded-xl border border-gray-300 bg-white text-gray-900 flex items-center justify-center hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors cursor-pointer"
            >
                <Bookmark
                    size={22}
                    className={saved ? "text-gray-900" : "text-gray-900"}
                    fill={saved ? "currentColor" : "none"}
                />
            </button>

            {/* Tombol CTA Utama */}
            <button
                type="button"
                onClick={onContact}
                className="h-12 flex-1 rounded-xl bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors cursor-pointer px-4"
            >
                <MessageSquare size={18} />
                <span className="truncate">{ctaLabel}</span>
            </button>
        </div>
    );
}
