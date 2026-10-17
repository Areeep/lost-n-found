/**
 * ============================================================================
 * Component   : ProfileHeader
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan avatar, username, aksi edit profil, ringkasan statistik
 * (postingan dan sudah kembali), serta biodata pengguna.
 * ============================================================================
 */

import { LogOut } from "lucide-react";

/**
 * Komponen header profil pengguna.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.user Data objek pengguna.
 * @param {object} props.stats Statistik postingan pengguna.
 * @param {Function} [props.onLogout] Handler logout pada mobile.
 * @param {Function} [props.onEditProfile] Handler tombol edit profil.
 * @returns {JSX.Element} Bagian header profil.
 */
export function ProfileHeader({ user, stats, onLogout, onEditProfile }) {
  return (
    <header className="mb-6">
      {/* =========================================================
          VERSI DESKTOP (md:flex)
          ========================================================= */}
      <div className="hidden items-start gap-12 md:flex">
        {/* Avatar Desktop Polos Tanpa Border Luar */}
        <div className="shrink-0">
          <div
            className={`size-36 rounded-full ${user.avatarColor} font-heading flex items-center justify-center text-4xl font-extrabold text-white select-none`}
          >
            {user.avatarInitials}
          </div>
        </div>

        {/* Info & Aksi Desktop */}
        <div className="flex-1 space-y-4 pt-2">
          {/* Baris 1: Username & Tombol Edit Profil & Logout */}
          <div className="flex items-center gap-4">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-gray-900">
              {user.username}
            </h1>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onEditProfile}
                className="h-9 cursor-pointer rounded-xl bg-gray-100 px-4 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-200"
              >
                Edit profil
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 text-sm font-bold text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          </div>

          {/* Baris 2: Statistik (Postingan & Sudah Kembali) */}
          <div className="flex items-center gap-8 text-sm text-gray-700">
            <div>
              <strong className="mr-1.5 text-base font-bold text-gray-900">
                {stats.posts}
              </strong>
              <span>postingan</span>
            </div>
            <div>
              <strong className="mr-1.5 text-base font-bold text-gray-900">
                {stats.returned}
              </strong>
              <span>sudah kembali</span>
            </div>
          </div>

          {/* Baris 3: Nama Lengkap & Bio */}
          <div>
            <h2 className="text-sm font-bold text-gray-900">{user.name}</h2>
            <p className="mt-0.5 text-sm text-gray-600">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* =========================================================
          VERSI MOBILE (< md)
          ========================================================= */}
      <div className="md:hidden">
        {/* Top Header: Username & Logout */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-heading text-lg font-bold text-gray-900">
            {user.username}
          </h1>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Keluar dari akun"
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 shadow-2xs transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Keluar</span>
          </button>
        </div>

        {/* Baris Avatar & Statistik */}
        <div className="mb-4 flex items-center gap-6">
          {/* Avatar Mobile Polos Tanpa Border Luar */}
          <div className="shrink-0">
            <div
              className={`size-20 rounded-full ${user.avatarColor} font-heading flex items-center justify-center text-2xl font-extrabold text-white select-none`}
            >
              {user.avatarInitials}
            </div>
          </div>

          {/* Statistik Mobile (2 Kolom) */}
          <div className="grid flex-1 grid-cols-2 text-center">
            <div>
              <span className="block text-base font-bold text-gray-900">
                {stats.posts}
              </span>
              <span className="text-xs text-gray-600">Postingan</span>
            </div>
            <div>
              <span className="block text-base font-bold text-gray-900">
                {stats.returned}
              </span>
              <span className="text-xs leading-tight text-gray-600">
                Sudah kembali
              </span>
            </div>
          </div>
        </div>

        {/* Bio Mobile */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-900">{user.name}</h2>
          <p className="mt-0.5 text-sm text-gray-600">{user.bio}</p>
        </div>

        {/* Tombol Aksi Mobile */}
        <div>
          <button
            type="button"
            onClick={onEditProfile}
            className="h-9 w-full rounded-lg bg-gray-100 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-200"
          >
            Edit profil
          </button>
        </div>
      </div>
    </header>
  );
}
