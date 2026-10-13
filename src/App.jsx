/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Router konfigurasi utama temuin. Menetapkan rute publik (/login)
 * dan rute terlindungi di bawah ProtectedRoute guard.
 * ============================================================================
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./features/auth/LoginPage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { PostDetailPage } from "./features/post-detail/PostDetailPage";
import { LoginPage } from "./features/auth/LoginPage";
import { ProfilePage } from "./features/profile/ProfilePage";
import { CreatePostPage } from "./features/posts/pages/CreatePostPage";

/**
 * Komponen root aplikasi temuin.
 *
 * @returns {JSX.Element} Pohon rute aplikasi.
 */
function App() {
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

        {/* Rute Terproteksi: Semua halaman wajib login */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<PostDetailPage postId="p1" onBack={handleLogout} />}
          />
          <Route
            path="/post/:id"
            element={<PostDetailPage onBack={handleLogout} />}
          />
          {/* Rute fitur lain (explore, create, profile) dimasukkan di dalam blok ini */}
        </Route>

        {/* Fallback route tidak dikenal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
