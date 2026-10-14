/**
 * ============================================================================
 * Component   : PostOptionsMenu
 * Layer       : Feature Component
 *
 * Description:
 * Menu dropdown titik tiga (Ellipsis) untuk opsi Share dan Laporkan postingan
 * dilengkapi umpan balik visual notifikasi toast.
 * ============================================================================
 */

import { useState, useRef, useEffect } from "react";
import { Ellipsis, Share2, Flag } from "lucide-react";

/**
 * Komponen menu dropdown opsi postingan.
 *
 * @param {object} props Properti komponen.
 * @param {string} [props.postName] Nama barang yang ditampilkan.
 * @param {number} [props.iconSize=20] Ukuran icon Ellipsis.
 * @returns {JSX.Element} Elemen tombol dan menu dropdown opsi.
 */
export function PostOptionsMenu({ postName = "Barang", iconSize = 20 }) {
    const [isOpen, setIsOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const menuRef = useRef(null);

    // * Tutup menu bila klik di luar area dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // ? Tampilkan toast sementara dan tutup setelah 3 detik
    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage(null);
        }, 3000);
    };

    // * Handler bagikan postingan (salin URL ke clipboard)
    const handleShare = async () => {
        setIsOpen(false);
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(window.location.href);
                showToast("Tautan postingan berhasil disalin ke clipboard!");
            } else {
                showToast("Fitur salin tautan tidak didukung pada browser ini.");
            }
        } catch {
            showToast("Gagal menyalin tautan.");
        }
    };

    // ! Handler laporkan postingan sementara
    const handleReport = () => {
        setIsOpen(false);
        showToast(`Laporan untuk "${postName}" telah dikirim dan akan ditinjau tim.`);
    };

    return (
        <div className="relative inline-block" ref={menuRef}>
            {/* Tombol Titik Tiga */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Opsi postingan"
                className="flex size-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
                <Ellipsis size={iconSize} />
            </button>

            {/* Menu Dropdown */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg z-30">
                    <button
                        type="button"
                        onClick={handleShare}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 cursor-pointer text-left"
                    >
                        <Share2 size={16} className="text-gray-600" />
                        <span>Bagikan</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleReport}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50 cursor-pointer text-left"
                    >
                        <Flag size={16} className="text-orange-700" />
                        <span>Laporkan</span>
                    </button>
                </div>
            )}

            {/* Feedback Toast Notifikasi */}
            {toastMessage && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-full bg-gray-900 px-4 py-2.5 text-xs md:text-sm font-medium text-white shadow-xl pointer-events-none transition-all">
                    {toastMessage}
                </div>
            )}
        </div>
    );
}
