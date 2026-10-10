/**
 * ============================================================================
 * Component   : PostDetailPage
 * Layer       : Feature Page
 *
 * Description:
 * Halaman utama detail postingan yang menyatukan media carousel, rincian barang,
 * riwayat komentar, serta bottom sticky bar pada mobile dan sidebar pada desktop.
 * ============================================================================
 */

import {
    House,
    Search,
    Bell,
    MessageSquare,
    User,
    Plus,
    ChevronLeft,
    Ellipsis,
} from "lucide-react";
import { usePostDetail } from "./hooks/usePostDetail";
import { PostDetailMedia } from "./components/PostDetailMedia";
import { PostDetailInfo } from "./components/PostDetailInfo";
import { PostDetailComments } from "./components/PostDetailComments";
import { PostDetailActionBar } from "./components/PostDetailActionBar";

/**
 * Komponen tampilan lengkap halaman Detail Postingan.
 *
 * @param {object} props Properti komponen.
 * @param {string} [props.postId="p1"] ID postingan yang ditampilkan.
 * @param {Function} [props.onBack] Callback kembali ke beranda.
 * @returns {JSX.Element} Halaman detail postingan.
 */
export function PostDetailPage({ postId = "p1", onBack }) {
    const {
        post,
        activePhotoIndex,
        totalPhotos,
        nextPhoto,
        prevPhoto,
        goToPhoto,
        commentText,
        setCommentText,
        handleAddComment,
        saved,
        handleToggleSave,
        handleOpenContact,
    } = usePostDetail(postId);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-gray-600">
                Postingan tidak ditemukan.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans text-gray-900">
            {/* =========================================================
          DESKTOP SIDEBAR (Sesuai design.md §5 & screenshot)
          ========================================================= */}
            <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 p-6 shrink-0 justify-between">
                <div className="space-y-6">
                    {/* Logo temuin. */}
                    <div className="font-heading font-extrabold text-[28px] tracking-tight text-gray-900">
                        temuin<span className="text-orange-700">.</span>
                    </div>

                    {/* Navigasi Utama */}
                    <nav className="space-y-1">
                        <button
                            type="button"
                            onClick={onBack}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <House size={20} />
                            <span>Beranda</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <Search size={20} />
                            <span>Cari</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <Bell size={20} />
                            <span>Notifikasi</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <MessageSquare size={20} />
                            <span>Pesan</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <User size={20} />
                            <span>Profil</span>
                        </button>
                    </nav>

                    {/* Tombol Posting Barang */}
                    <button
                        type="button"
                        className="w-full h-12 rounded-xl bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Posting barang</span>
                    </button>
                </div>
            </aside>

            {/* =========================================================
          KONTEN UTAMA (RESPONSIF MOBILE & DESKTOP)
          ========================================================= */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header Bar */}
                <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 font-heading font-bold text-base text-gray-900"
                    >
                        <ChevronLeft size={22} />
                        <span>Postingan</span>
                    </button>
                    <button
                        type="button"
                        aria-label="Opsi postingan"
                        className="size-10 flex items-center justify-center text-gray-600"
                    >
                        <Ellipsis size={22} />
                    </button>
                </div>

                <div className="flex-1 p-0 md:p-8 max-w-6xl mx-auto w-full">
                    {/* Desktop Breadcrumb: "< Kembali ke beranda" */}
                    <div className="hidden md:block mb-6">
                        <button
                            type="button"
                            onClick={onBack}
                            className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900 cursor-pointer"
                        >
                            <ChevronLeft size={18} />
                            <span>Kembali ke beranda</span>
                        </button>
                    </div>

                    {/* Kartu Utama Detail Postingan */}
                    <div className="bg-white md:border md:border-gray-200 md:rounded-2xl md:shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
                        {/* Kolom Kiri: Media */}
                        <div className="border-b md:border-b-0 md:border-r border-gray-200">
                            <PostDetailMedia
                                status={post.status}
                                photos={post.photos}
                                activeIndex={activePhotoIndex}
                                totalPhotos={totalPhotos}
                                onNext={nextPhoto}
                                onPrev={prevPhoto}
                                onSelectPhoto={goToPhoto}
                            />
                        </div>

                        {/* Kolom Kanan: Rincian & Komentar */}
                        <div className="p-4 md:p-6 flex flex-col justify-between">
                            <div className="space-y-4">
                                <PostDetailInfo post={post} />
                                <PostDetailComments
                                    comments={post.comments}
                                    commentText={commentText}
                                    onCommentChange={setCommentText}
                                    onSubmit={handleAddComment}
                                />
                            </div>

                            {/* Action Bar (Desktop berada di bawah kolom kanan) */}
                            <div className="hidden md:block pt-4 border-t border-gray-100">
                                <PostDetailActionBar
                                    saved={saved}
                                    status={post.status}
                                    ownerUsername={post.user.username}
                                    onToggleSave={handleToggleSave}
                                    onContact={handleOpenContact}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Action Bar di Bawah */}
                <div className="md:hidden sticky bottom-0 z-20 bg-white border-t border-gray-200 p-3">
                    <PostDetailActionBar
                        saved={saved}
                        status={post.status}
                        ownerUsername={post.user.username}
                        onToggleSave={handleToggleSave}
                        onContact={handleOpenContact}
                    />
                </div>
            </main>
        </div>
    );
}
