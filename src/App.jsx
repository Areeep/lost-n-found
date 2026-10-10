/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Komponen utama aplikasi untuk merender PostDetailPage.
 * ============================================================================
 */

import { PostDetailPage } from "./features/post-detail/PostDetailPage";

/**
 * Komponen utama aplikasi.
 *
 * @returns {JSX.Element} Halaman aplikasi.
 */
function App() {
  return (
    <PostDetailPage
      postId="p1"
      onBack={() => alert("Kembali ke beranda diklik")}
    />
  );
}

export default App;
