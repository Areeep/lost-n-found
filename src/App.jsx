/**
 * ============================================================================
 * Component   : App
 * Layer       : Root Application
 *
 * Description:
 * Komponen root untuk merender halaman LoginPage saat preview/pengembangan.
 * ============================================================================
 */

import { LoginPage } from "./features/auth/LoginPage";

/**
 * Komponen utama aplikasi.
 *
 * @returns {JSX.Element} Halaman aktif.
 */
function App() {
  return (
    <LoginPage
      onLoginSuccess={(user) => alert(`Berhasil masuk: ${user.name}`)}
      onGuestAccess={() => alert("Masuk sebagai tamu")}
      onNavigateRegister={() => alert("Navigasi ke Daftar")}
      onNavigateForgotPassword={() => alert("Navigasi ke Lupa Sandi")}
    />
  );
}

export default App;
