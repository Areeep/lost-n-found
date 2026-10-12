/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Mengatur rute aplikasi menggunakan react-router-dom untuk halaman Cari Barang
 * (/cari), rute detail postingan dinamis (/post/:id), halaman autentikasi,
 * profil, dan pembuatan postingan (/buat).
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
import { CreatePostPage } from "./features/posts/pages/CreatePostPage";

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
 * Wrapper rute buat postingan untuk menghubungkan navigasi balik & selesai.
 *
 * @returns {JSX.Element} Komponen Buat Postingan.
 */
function CreatePostRouteWrapper() {
  const navigate = useNavigate();

  return (
    <CreatePostPage
      onCancel={() => navigate(-1)}
      onCreated={(post) => navigate(`/post/${post.id}`)}
    />
  );
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

        {/* Halaman Buat Postingan */}
        <Route path="/buat" element={<CreatePostRouteWrapper />} />
        <Route path="/posting" element={<Navigate to="/buat" replace />} />

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
