/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Router konfigurasi utama orbit. Menetapkan rute publik (/login)
 * serta rute terproteksi (/post/:id, /explore, /create, /profile)
 * di bawah ProtectedRoute guard. Rute root (/) menampilkan katalog barang.
 * ============================================================================
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./features/auth/LoginPage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { PostDetailPage } from "./features/post-detail/PostDetailPage";
import { FeedPage } from "./features/feed/FeedPage";
import { ExplorePage } from "./features/explore/ExplorePage";
import { CreatePostPage } from "./features/posts/pages/CreatePostPage";
import { ProfilePage } from "./features/profile/ProfilePage";
import { getCurrentUser, removeCurrentUser } from "./lib/storage";

/**
 * Komponen root aplikasi orbit.
 *
 * @returns {JSX.Element} Pohon konfigurasi rute aplikasi.
 */
function App() {
  // * Handler logout terpusat: bersihkan storage lalu redirect ke /login
  const handleLogout = () => {
    removeCurrentUser();
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik: Login */}
        <Route
          path="/login"
          element={
            getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLoginSuccess={() => (window.location.href = "/")} />
            )
          }
        />

        {/* ! Rute Terproteksi: Semua halaman wajib autentikasi */}
        <Route element={<ProtectedRoute />}>
          {/* Beranda: Menampilkan feed postingan barang */}
          <Route path="/" element={<FeedPage />} />
          <Route path="/beranda" element={<FeedPage />} />

          {/* Detail Postingan: Navigasi dinamis berdasarkan id URL */}
          <Route path="/post/:id" element={<PostDetailPage />} />

          {/* Eksplorasi & Pencarian Barang */}
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/cari" element={<ExplorePage />} />

          {/* Buat Postingan Barang */}
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/buat" element={<CreatePostPage />} />

          {/* Profil Pengguna */}
          <Route
            path="/profile"
            element={<ProfilePage onLogout={handleLogout} />}
          />
          <Route
            path="/profil"
            element={<ProfilePage onLogout={handleLogout} />}
          />
          <Route
            path="/profile/:username"
            element={<ProfilePage onLogout={handleLogout} />}
          />
        </Route>

        {/* ? Fallback rute tidak dikenal diarahkan kembali ke root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
