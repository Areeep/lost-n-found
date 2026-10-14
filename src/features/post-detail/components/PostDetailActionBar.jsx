/**
 * ============================================================================
 * Component   : PostDetailActionBar
 * Layer       : Feature Component
 *
 * Description:
 * Menyediakan tombol aksi utama lebar penuh (CTA chat WA) tanpa tombol simpan.
 * Mengikuti spesifikasi tombol utama design.md (h-12, rounded-xl, bg-gray-900).
 * ============================================================================
 */

import { MessageSquare } from "lucide-react";

/**
 * Komponen bilah aksi kontak pemilik postingan.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.status Status barang ("hilang" | "ditemukan").
 * @param {string} props.ownerUsername Username pemilik barang.
 * @param {Function} props.onContact Handler buka chat WhatsApp.
 * @returns {JSX.Element} Elemen bilah aksi.
 */
export function PostDetailActionBar({
    status,
    ownerUsername,
    onContact,
}) {
    const isLost = status === "hilang";
    const ctaLabel = isLost
        ? `Aku menemukannya — chat ${ownerUsername}`
        : `Ini punyaku — chat ${ownerUsername}`;

    return (
        <div className="w-full pt-3">
            {/* * Tombol CTA Utama lebar penuh menggantikan tata letak lama */}
            <button
                type="button"
                onClick={onContact}
                className="h-12 w-full rounded-xl bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-blue-700 transition-colors cursor-pointer px-4"
            >
                <MessageSquare size={18} />
                <span className="truncate">{ctaLabel}</span>
            </button>
        </div>
    );
}
