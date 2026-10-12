/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Mengatur rute aplikasi menggunakan react-router-dom untuk halaman Cari Barang
 * (/cari), rute detail postingan dinamis (/post/:id), dan halaman autentikasi.
 * ============================================================================
 */

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { ExplorePage } from "./features/explore/ExplorePage";
import { PostDetailPage } from "./features/post-detail/PostDetailPage";
import { LoginPage } from "./features/auth/LoginPage";
import { ProfilePage } from "./features/profile/ProfilePage";

/**
 * Wrapper rute detail postingan untuk mengambil parameter id dari URL.
 *
 * @returns {JSX.Element} Komponen detail postingan.
 */
function PostDetailRouteWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  return <PostDetailPage postId={id || "p1"} onBack={() => navigate(-1)} />;
}

/**
 * Komponen utama aplikasi dengan penyedia BrowserRouter.
 *
 * @returns {JSX.Element} Pohon rute aplikasi temuin.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Default Mengarah ke Halaman Cari */}
        <Route path="/" element={<Navigate to="/cari" replace />} />

        {/* Halaman Cari Barang */}
        <Route path="/cari" element={<ExplorePage />} />

        {/* Halaman Detail Postingan dengan Parameter ID Dinamis */}
        <Route path="/post/:id" element={<PostDetailRouteWrapper />} />

        {/* Halaman Autentikasi & Profil */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profil" element={<ProfilePage />} />

        {/* Fallback ke /cari */}
        <Route path="*" element={<Navigate to="/cari" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;