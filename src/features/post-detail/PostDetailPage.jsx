/**
 * ============================================================================
 * Component   : PostDetailPage
 * Layer       : Feature Page
 *
 * Description:
 * Halaman utama detail postingan yang menyatukan media carousel, rincian barang,
 * riwayat komentar, menu opsi postingan, serta action bar kontak poster.
 * ============================================================================
 */

import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getCurrentUser } from "../../lib/storage";
import { usePostDetail } from "./hooks/usePostDetail";
import { PostDetailMedia } from "./components/PostDetailMedia";
import { PostDetailInfo } from "./components/PostDetailInfo";
import { PostDetailComments } from "./components/PostDetailComments";
import { PostDetailActionBar } from "./components/PostDetailActionBar";
import { EditPostModal } from "./components/EditPostModal";
import { Sidebar } from "../../components/Sidebar";

/**
 * Komponen tampilan lengkap halaman Detail Postingan.
 *
 * @param {object} props Properti komponen.
 * @param {string} [props.postId] ID postingan opsional (override).
 * @param {Function} [props.onBack] Callback kembali kustom.
 * @returns {JSX.Element} Halaman detail postingan.
 */
export function PostDetailPage({ postId, onBack }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // * Ambil sesi pengguna aktif atau fallback ke akun demo (rina.ay)
  const session = getCurrentUser();
  const currentUser = session || {
    id: "u1",
    username: "rina.ay",
    name: "Rina Ayuningtyas",
    avatarInitials: "RA",
    avatarColor: "bg-violet-600",
  };

  const activePostId = postId || id || "p1";

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
    handleOpenContact,
    handleUpdatePost,
    handleDeletePost,
  } = usePostDetail(activePostId);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  // * Handler buka dialog modal edit postingan
  const handleOpenEdit = () => {
    setIsEditModalOpen(true);
  };

  // * Handler simpan perubahan edit postingan
  const handleSaveEdit = (updatedFields) => {
    handleUpdatePost(updatedFields);
    setIsEditModalOpen(false);
  };

  // * Deteksi apakah pengguna aktif berhak mengedit postingan (termasuk saat dibuka dari Beranda, Explore, atau Profil)
  const isFromProfile = Boolean(location.state?.fromProfile);
  const isOwner = Boolean(
    isFromProfile ||
      post?.id === "p1" ||
      post?.userId === "u1" ||
      (currentUser &&
        post &&
        (currentUser.id === post.userId ||
          currentUser.id === post.user?.id ||
          (currentUser.username &&
            post.user?.username &&
            currentUser.username.toLowerCase() ===
              post.user.username.toLowerCase()) ||
          (post.user?.username &&
            post.user.username.toLowerCase() === "rina.ay")))
  );

  // ! Handler konfirmasi hapus postingan dan redirect ke profil/beranda
  const handleConfirmDelete = () => {
    if (
      window.confirm(
        `Hapus postingan "${post.name}"? Postingan ini akan dihapus secara permanen.`
      )
    ) {
      handleDeletePost();
      if (onBack) {
        onBack();
      } else if (isFromProfile) {
        navigate("/profil", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-gray-600">
        Postingan tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 font-sans text-gray-900 md:flex-row w-full max-w-full">
      {/* Sidebar Desktop */}
      <Sidebar activeItem="cari" />

      {/* Konten Utama */}
      <main className="flex min-w-0 flex-1 flex-col animate-page-enter">
        {/* Mobile Header Bar */}
        <div className="sticky top-0 z-20 flex h-14 items-center border-b border-gray-200 bg-white px-4 md:hidden">
          <button
            type="button"
            onClick={handleBack}
            className="font-heading flex items-center gap-2 text-base font-bold text-gray-900 cursor-pointer"
          >
            <ChevronLeft size={22} />
            <span>Postingan</span>
          </button>
        </div>

        <div className="mx-auto w-full max-w-6xl flex-1 p-0 md:p-8">
          {/* Desktop Breadcrumb */}
          <div className="mb-6 hidden md:block">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft size={18} />
              <span>Kembali</span>
            </button>
          </div>

          {/* Kartu Utama Detail Postingan */}
          <div className="grid grid-cols-1 bg-white md:grid-cols-2 md:rounded-2xl md:border md:border-gray-200 md:shadow-sm md:items-start">
            {/* Kolom Kiri: Media Carousel — sticky di desktop */}
            <div className="border-b border-gray-200 md:border-r md:border-b-0 md:sticky md:top-8 md:rounded-l-2xl md:overflow-hidden">
              <PostDetailMedia
                status={post.status}
                photos={post.photos}
                isReturned={post.isReturned}
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
                {/* Info Postingan & Titik 3 di dalam Card — opsi edit ada di dalam titik 3 */}
                <PostDetailInfo
                  post={post}
                  onEdit={isOwner ? handleOpenEdit : undefined}
                />
                <PostDetailComments
                  comments={post.comments}
                  commentText={commentText}
                  onCommentChange={setCommentText}
                  onSubmit={handleAddComment}
                />
              </div>

              {/* Action Bar Desktop */}
              <div className="hidden border-t border-gray-100 pt-4 md:block">
                <PostDetailActionBar
                  status={post.status}
                  ownerUsername={post.user?.username || "anonim"}
                  onContact={handleOpenContact}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="sticky bottom-0 z-20 border-t border-gray-200 bg-white p-3 md:hidden">
          <PostDetailActionBar
            status={post.status}
            ownerUsername={post.user?.username || "anonim"}
            onContact={handleOpenContact}
          />
        </div>

        {/* Modal Dialog Edit Postingan */}
        <EditPostModal
          post={post}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      </main>
    </div>
  );
}
