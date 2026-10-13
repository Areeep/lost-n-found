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
import { Sidebar } from "../../components/Sidebar";

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
      <div className="flex min-h-screen items-center justify-center p-6 text-gray-600">
        Postingan tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 font-sans text-gray-900 md:flex-row">
      {/* =========================================================
          DESKTOP SIDEBAR (Sesuai design.md §5 & screenshot)
          ========================================================= */}
      <Sidebar activeItem="cari" />

      {/* =========================================================
          KONTEN UTAMA (RESPONSIF MOBILE & DESKTOP)
          ========================================================= */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Mobile Header Bar */}
        <div className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
          <button
            type="button"
            onClick={onBack}
            className="font-heading flex items-center gap-2 text-base font-bold text-gray-900"
          >
            <ChevronLeft size={22} />
            <span>Postingan</span>
          </button>
          <button
            type="button"
            aria-label="Opsi postingan"
            className="flex size-10 items-center justify-center text-gray-600"
          >
            <Ellipsis size={22} />
          </button>
        </div>

        <div className="mx-auto w-full max-w-6xl flex-1 p-0 md:p-8">
          {/* Desktop Breadcrumb: "< Kembali ke beranda" */}
          <div className="mb-6 hidden md:block">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft size={18} />
              <span>Kembali ke beranda</span>
            </button>
          </div>

          {/* Kartu Utama Detail Postingan */}
          <div className="grid grid-cols-1 overflow-hidden bg-white md:grid-cols-2 md:rounded-2xl md:border md:border-gray-200 md:shadow-sm">
            {/* Kolom Kiri: Media */}
            <div className="border-b border-gray-200 md:border-r md:border-b-0">
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
            <div className="flex flex-col justify-between p-4 md:p-6">
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
              <div className="hidden border-t border-gray-100 pt-4 md:block">
                <PostDetailActionBar
                  saved={saved}
                  status={post.status}
                  ownerUsername={post.user?.username || "anonim"}
                  onToggleSave={handleToggleSave}
                  onContact={handleOpenContact}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Action Bar di Bawah */}
        <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white p-3 md:hidden">
          <PostDetailActionBar
            saved={saved}
            status={post.status}
            ownerUsername={post.user?.username || "anonim"}
            onToggleSave={handleToggleSave}
            onContact={handleOpenContact}
          />
        </div>
      </main>
    </div>
  );
}
