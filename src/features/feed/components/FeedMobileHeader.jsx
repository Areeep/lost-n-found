/**
 * ============================================================================
 * Component   : FeedMobileHeader
 * Layer       : Feature Component
 *
 * Description:
 * Header bilah atas untuk tampilan layar mobile (< 768px). Menampilkan
 * logo temuin. serta ikon pintasan Notifikasi dan Pesan.
 * ============================================================================
 */

import { Link } from "react-router-dom";
import { Bell, Send } from "lucide-react";

/**
 * Komponen header atas beranda mobile.
 *
 * @returns {JSX.Element} Elemen header atas mobile.
 */
export function FeedMobileHeader() {
    return (
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200">
            {/* Logo temuin. */}
            <Link to="/" className="inline-block">
                <span className="font-heading text-2xl font-extrabold tracking-tight text-gray-900">
                    temuin<span className="text-orange-700">.</span>
                </span>
            </Link>

            {/* Aksi Ikon Kanan: Notifikasi & Pesan */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    aria-label="Notifikasi"
                    className="size-10 grid place-items-center rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                >
                    <Bell size={22} />
                </button>

                <button
                    type="button"
                    aria-label="Pesan"
                    className="size-10 grid place-items-center rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                >
                    <Send size={22} />
                </button>
            </div>
        </header>
    );
}
