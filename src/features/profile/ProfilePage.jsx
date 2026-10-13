/**
 * ============================================================================
 * Component   : ProfilePage
 * Layer       : Feature Page
 *
 * Description:
 * Komposisi utama halaman profil pengguna, mengintegrasikan sidebar desktop,
 * bottom navigation mobile, header profil, tab postingan, grid foto,
 * serta modal formulir pengubah profil pengguna.
 * ============================================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { House, Search, SquarePlus, User } from "lucide-react";
import { useProfile } from "./hooks/useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileTabs } from "./components/ProfileTabs";
import { ProfilePostGrid } from "./components/ProfilePostGrid";
import { EditProfileModal } from "./components/EditProfileModal";
import { Sidebar } from "../../components/Sidebar";

/**
 * Halaman Profil Utama aplikasi temuin.
 *
 * @param {object} props Properti komponen.
 * @param {Function} [props.onNavigateHome] Callback navigasi ke Beranda.
 * @param {Function} [props.onNavigateSearch] Callback navigasi ke Cari.
 * @param {Function} [props.onNavigateCreate] Callback navigasi ke Buat Postingan.
 * @param {Function} [props.onNavigatePostDetail] Callback navigasi ke Detail Postingan.
 * @param {Function} [props.onLogout] Callback keluar akun.
 * @returns {JSX.Element} Tampilan lengkap halaman profil.
 */
export function ProfilePage({
  onNavigateHome,
  onNavigateSearch,
  onNavigateCreate,
  onNavigatePostDetail,
  onLogout,
}) {
  const navigate = useNavigate();
  const { user, updateProfile, stats, posts } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // * Handler klik item postingan untuk buka halaman detail
  const handleSelectPost = (postId) => {
    if (onNavigatePostDetail) {
      onNavigatePostDetail(postId);
    } else {
      navigate(`/post/${postId}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 font-sans text-gray-900 md:flex-row">
      {/* Sidebar Desktop */}
      <Sidebar activeItem="profil" />

      {/* Konten Utama Profil */}
      <main className="flex min-w-0 flex-1 flex-col pb-20 md:pb-8">
        <div className="mx-auto w-full max-w-[935px] p-4 md:p-8">
          {/* Header Profil */}
          <ProfileHeader
            user={user}
            stats={stats}
            onLogout={onLogout}
            onEditProfile={() => setIsEditModalOpen(true)}
          />

          {/* Tab Postingan */}
          <ProfileTabs />

          {/* Grid Foto Postingan */}
          <ProfilePostGrid posts={posts} onSelectPost={handleSelectPost} />
        </div>
      </main>

      {/* Modal Dialog Edit Profil */}
      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          updateProfile(data);
          setIsEditModalOpen(false);
        }}
      />

      {/* Mobile Bottom Nav */}
      <nav className="fixed right-0 bottom-0 left-0 z-30 grid h-14 grid-cols-4 items-center border-t border-gray-200 bg-white md:hidden">
        <Link
          to="/"
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-gray-900"
        >
          <House size={20} />
          <span className="text-[11px]">Beranda</span>
        </Link>
        <Link
          to="/cari"
          onClick={onNavigateSearch}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-gray-900"
        >
          <Search size={20} />
          <span className="text-[11px]">Cari</span>
        </Link>
        <Link
          to="/create"
          onClick={onNavigateCreate}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-gray-900"
        >
          <SquarePlus size={20} />
          <span className="text-[11px]">Posting</span>
        </Link>
        <Link
          to="/profil"
          className="flex flex-col items-center justify-center gap-0.5 font-bold text-gray-900"
        >
          <User size={20} fill="currentColor" />
          <span className="text-[11px]">Profil</span>
        </Link>
      </nav>
    </div>
  );
}
