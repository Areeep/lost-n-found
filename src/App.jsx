/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Komponen root aplikasi yang mengelola status autentikasi pengguna.
 * Membaca sesi dari localStorage saat pertama kali dimuat atau di-refresh,
 * mengarahkan ke PostDetailPage jika sudah masuk, dan ke LoginPage jika belum.
 * ============================================================================
 */

import { useState, useCallback } from "react";
import { LogOut, UserCheck } from "lucide-react";
import { LoginPage } from "./features/auth/LoginPage";
import { PostDetailPage } from "./features/post-detail/PostDetailPage";
import { getCurrentUser, removeCurrentUser } from "./lib/storage";

/**
 * Komponen utama aplikasi temuin.
 *
 * @returns {JSX.Element} Halaman aktif berdasarkan status autentikasi.
 */
function App() {
  // * Inisialisasi sesi dari localStorage agar saat di-refresh tetap login
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [isGuest, setIsGuest] = useState(false);

  // * Handler login berhasil
  const handleLoginSuccess = useCallback((user) => {
    setCurrentUser(user);
    setIsGuest(false);
  }, []);

  // * Handler akses mode tamu tanpa akun
  const handleGuestAccess = useCallback(() => {
    setIsGuest(true);
  }, []);

  // * Handler logout
  const handleLogout = useCallback(() => {
    removeCurrentUser();
    setCurrentUser(null);
    setIsGuest(false);
  }, []);

  // * Tampilan jika pengguna telah berhasil masuk atau dalam sesi aktif
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Top Navigation Bar Sesi Pengguna */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-heading font-extrabold text-xl text-gray-900 tracking-tight">
                temuin<span className="text-orange-700">.</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <UserCheck className="size-3.5" />
                Sesi Aktif
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Profil Pengguna Aktif */}
              <div className="flex items-center gap-2">
                <div
                  className={`size-8 rounded-full ${
                    currentUser.avatarColor || "bg-violet-600"
                  } text-white font-bold text-xs flex items-center justify-center flex-shrink-0`}
                >
                  {currentUser.avatarInitials ||
                    currentUser.name?.slice(0, 2).toUpperCase() ||
                    "U"}
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <p className="font-bold text-gray-900 truncate max-w-[120px]">
                    {currentUser.name}
                  </p>
                  <p className="text-gray-500 font-mono truncate max-w-[120px]">
                    @{currentUser.username}
                  </p>
                </div>
              </div>

              {/* Tombol Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-red-700 bg-gray-100 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                title="Keluar dari akun"
              >
                <LogOut className="size-3.5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </header>

        {/* Konten Halaman Aplikasi (PostDetailPage) */}
        <main className="flex-1">
          <PostDetailPage postId="p1" onBack={handleLogout} />
        </main>
      </div>
    );
  }

  // * Tampilan jika pengguna memilih akses tamu
  if (isGuest) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Banner Mode Tamu */}
        <header className="bg-amber-50 border-b border-amber-200 px-4 py-2 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-amber-900 font-medium">
            <span>
              Mode Tamu · Anda sedang melihat postingan tanpa masuk ke akun.
            </span>
            <button
              type="button"
              onClick={() => setIsGuest(false)}
              className="font-bold underline hover:text-amber-950 transition-colors"
            >
              Masuk ke akun
            </button>
          </div>
        </header>

        <main className="flex-1">
          <PostDetailPage postId="p1" onBack={() => setIsGuest(false)} />
        </main>
      </div>
    );
  }

  // * Default: Halaman Login
  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onGuestAccess={handleGuestAccess}
      onNavigateRegister={() =>
        alert("Halaman pendaftaran akun baru sedang disiapkan.")
      }
      onNavigateForgotPassword={() =>
        alert("Fitur lupa kata sandi sedang disiapkan.")
      }
    />
  );
}

export default App;

