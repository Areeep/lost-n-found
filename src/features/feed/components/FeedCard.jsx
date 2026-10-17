/**
 * ============================================================================
 * Component   : FeedCard
 * Layer       : Feature Component
 *
 * Description:
 * Kartu postingan feed bergaya Instagram. Menampilkan informasi poster,
 * foto barang (atau placeholder sesuai desain), aksi like/simpan/bagikan,
 * caption barang, jumlah komentar, dan tombol CTA utama (Mobile & Desktop).
 * ============================================================================
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Heart,
    MessageCircle,
    Send,
    Image as ImageIcon,
} from "lucide-react";
import { PostOptionsMenu } from "../../post-detail/components/PostOptionsMenu";

/**
 * Komponen kartu postingan beranda.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.post Objek data postingan dari storage.
 * @param {object|null} props.currentUser Objek data pengguna saat ini.
 * @param {(postId: string) => void} props.onToggleLike Handler toggle suka.
 * @returns {JSX.Element} Elemen kartu postingan.
 */
export function FeedCard({
    post,
    currentUser,
    onToggleLike,
}) {
    const [imageError, setImageError] = useState(false);
    const [shareToast, setShareToast] = useState(false);

    // ? Turunkan status suka dan jumlah suka secara langsung dari props post (pola pure derived state)
    const currentUserId = currentUser?.id || "u1";
    const isLiked = Array.isArray(post.likes) && post.likes.includes(currentUserId);
    const likesCount = Array.isArray(post.likes) ? post.likes.length : 0;
    const isHilang = (post.status || "").toLowerCase() === "hilang";
    const commentsCount = Array.isArray(post.comments) ? post.comments.length : 0;

    // * Teks tombol aksi: "Aku menemukannya" untuk barang hilang, "Ini punyaku" untuk barang ditemukan
    const ctaText = isHilang ? "Aku menemukannya" : "Ini punyaku";

    // * Handler pembuka kontak WhatsApp pemilik postingan
    const handleContact = () => {
        if (!post.contact) return;
        const cleanNumber = post.contact.replace(/\D/g, "");
        const formattedNumber = cleanNumber.startsWith("0")
            ? `62${cleanNumber.slice(1)}`
            : cleanNumber;

        const defaultMessage = isHilang
            ? `Halo, saya melihat postingan "${post.name}" di orbit. Saya rasa saya menemukan barang tersebut.`
            : `Halo, saya melihat postingan "${post.name}" di orbit. Saya adalah pemilik barang tersebut.`;

        window.open(
            `https://wa.me/${formattedNumber}?text=${encodeURIComponent(defaultMessage)}`,
            "_blank",
            "noopener,noreferrer"
        );
    };

    // * Handler salin tautan postingan ke clipboard
    const handleShare = async () => {
        try {
            const url = `${window.location.origin}/post/${post.id}`;
            await navigator.clipboard.writeText(url);
            setShareToast(true);
            setTimeout(() => setShareToast(false), 2500);
        } catch {
            // Abaikan kesalahan clipboard jika diblokir
        }
    };

    // ? Cek keberadaan foto pertama dari data storage.js
    const photoUrl = post.photos && post.photos.length > 0 ? post.photos[0] : null;

    return (
        <article className="bg-white border border-gray-200 md:rounded-2xl overflow-hidden mb-4 md:mb-6 shadow-xs animate-card-enter">
            {/* Header: Profil Poster & Menu Opsi */}
            <header className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <div
                        className={`size-10 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 ${
                            post.user?.avatarColor || "bg-violet-600"
                        }`}
                    >
                        {post.user?.avatarInitials || "RA"}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <Link
                            to={post.user?.username ? `/profile/${post.user.username}` : "#"}
                            className="font-bold text-sm text-gray-900 hover:underline leading-tight truncate"
                        >
                            {post.user?.username || "rina.ay"}
                        </Link>
                        <span className="text-xs text-gray-600 leading-tight">
                            {post.location || "Lokasi"} · {post.postedTimeAgo ? post.postedTimeAgo.replace("Diposting ", "") : "2 jam lalu"}
                        </span>
                    </div>
                </div>

                <PostOptionsMenu postName={post.name} iconSize={20} />
            </header>

            {/* Container Foto Barang / Placeholder */}
            <div className="relative w-full h-[330px] md:h-[420px] bg-gray-100 overflow-hidden">
                {/* Badge Status (Hilang / Ditemukan) */}
                <div
                    className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md font-heading text-xs font-bold capitalize text-white shadow-xs ${
                        isHilang ? "bg-orange-700" : "bg-emerald-700"
                    }`}
                >
                    {isHilang ? "Hilang" : "Ditemukan"}
                </div>

                {/* Foto Postingan dari storage.js atau Placeholder Visual */}
                {photoUrl && !imageError ? (
                    <img
                        src={photoUrl}
                        alt={`Foto ${post.name}`}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div
                        className={`w-full h-full flex flex-col items-center justify-center transition-colors ${
                            isHilang ? "bg-orange-100/70" : "bg-emerald-100/70"
                        }`}
                    >
                        <ImageIcon className="size-12 stroke-[1.5] text-gray-600 mb-2" />
                        <span className="text-xs font-medium text-gray-600 tracking-tight">
                            [Foto barang]
                        </span>
                    </div>
                )}
            </div>

            {/* Baris Tombol Aksi: Suka, Komentar, Bagikan */}
            <div className="flex items-center px-3 pt-3 pb-1">
                <div className="flex items-center gap-1">
                    {/* Suka */}
                    <button
                        type="button"
                        onClick={() => onToggleLike(post.id)}
                        aria-label={isLiked ? "Batal suka" : "Suka"}
                        className="size-11 grid place-items-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-900"
                    >
                        <Heart
                            size={24}
                            className={isLiked ? "text-orange-700" : "text-gray-900"}
                            fill={isLiked ? "currentColor" : "none"}
                        />
                    </button>

                    {/* Komentar */}
                    <Link
                        to={`/post/${post.id}`}
                        aria-label="Lihat komentar"
                        className="size-11 grid place-items-center rounded-full hover:bg-gray-100 transition-colors text-gray-900"
                    >
                        <MessageCircle size={24} />
                    </Link>

                    {/* Bagikan */}
                    <button
                        type="button"
                        onClick={handleShare}
                        aria-label="Bagikan postingan"
                        className="size-11 grid place-items-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-900"
                    >
                        <Send size={24} />
                    </button>
                </div>
            </div>

            {/* Bagian Teks & Konten Postingan */}
            <div className="px-4 pb-4">
                {/* Jumlah Suka */}
                <p className="text-sm font-bold text-gray-900 mb-1">
                    {likesCount} suka
                </p>

                {/* Judul & Deskripsi */}
                <p className="text-sm text-gray-900 leading-relaxed mb-1">
                    <span className="font-bold">{post.name}</span>
                    {post.description ? ` — ${post.description}` : ""}
                </p>

                {/* Tautan Komentar */}
                <Link
                    to={`/post/${post.id}`}
                    className="block text-xs text-gray-600 hover:text-gray-900 mb-3"
                >
                    Lihat {commentsCount} komentar
                </Link>

                {/* Tombol Aksi Utama (Responsif: 1 tombol di mobile, 2 tombol di desktop) */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleContact}
                        className="flex-1 h-12 bg-primary hover:bg-primary-hover text-white font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center shadow-xs"
                    >
                        {ctaText}
                    </button>

                    {/* Tombol Detail (hanya tampil di desktop sesuai desain) */}
                    <Link
                        to={`/post/${post.id}`}
                        className="hidden md:flex h-12 px-6 items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-bold text-sm rounded-xl transition-colors shadow-xs"
                    >
                        Detail
                    </Link>
                </div>
            </div>

            {/* Feedback Toast Berbagi */}
            {shareToast && (
                <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-xl pointer-events-none">
                    Tautan disalin ke clipboard!
                </div>
            )}
        </article>
    );
}
