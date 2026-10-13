/**
 * ============================================================================
 * Component   : ProtectedRoute
 * Layer       : Feature (Auth)
 *
 * Description:
 * Route guard untuk membatasi akses halaman privat.
 * Memeriksa status login melalui storage helper. Jika belum masuk,
 * pengguna dialihkan ke halaman login dengan menyimpan lokasi asal.
 * ============================================================================
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../../lib/storage";

/**
 * Komponen pelindung rute aplikasi temuin.
 *
 * @param {object} props Properti komponen.
 * @param {React.ReactNode} [props.children] Elemen anak alternatif jika tanpa Outlet.
 * @returns {JSX.Element} Outlet/children bila terautentikasi, atau Navigate ke /login.
 */
export function ProtectedRoute({ children }) {
    const location = useLocation();

    // * Ambil sesi pengguna saat ini dari localStorage terpusat
    const currentUser = getCurrentUser();

    // ! Pengguna tanpa sesi diarahkan paksa ke halaman login
    if (!currentUser) {
        // ? state.from disimpan agar bisa redirect kembali setelah berhasil login
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // * Render rute privat turunan
    return children ? children : <Outlet />;
}
