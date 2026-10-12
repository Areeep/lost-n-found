/**
 * ============================================================================
 * Component   : LoginPage
 * Layer       : Feature Page
 *
 * Description:
 * Halaman autentikasi utama yang merender tata letak split-screen responsif:
 * hero showcase branding di sisi kiri (desktop) dan formulir login di sisi kanan.
 * ============================================================================
 */

import { AuthHero } from "./components/AuthHero";
import { LoginForm } from "./components/LoginForm";
import { useLoginForm } from "./hooks/useLoginForms";


/**
 * Komponen halaman penuh Masuk / Login.
 *
 * @param {object} props Properti komponen.
 * @param {Function} [props.onLoginSuccess] Callback saat login berhasil.
 * @param {Function} [props.onGuestAccess] Callback navigasi mode tamu.
 * @param {Function} [props.onNavigateRegister] Callback navigasi ke halaman daftar.
 * @param {Function} [props.onNavigateForgotPassword] Callback navigasi ke lupa sandi.
 * @returns {JSX.Element} Halaman login lengkap.
 */
export function LoginPage({
    onLoginSuccess,
    onGuestAccess,
    onNavigateRegister,
    onNavigateForgotPassword,
}) {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        isSubmitting,
        handleSubmit,
    } = useLoginForm({
        onSuccess: onLoginSuccess,
        onGuestAccess: onGuestAccess,
    });

    return (
        <main className="min-h-screen bg-white grid grid-cols-1 md:grid-cols-2">
            {/* Kolom Kiri: Hero Desktop */}
            <AuthHero />

            {/* Kolom Kanan / Layar Mobile: Form Masuk */}
            <section className="flex items-center justify-center w-full bg-white">
                <LoginForm
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errorMessage={errorMessage}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    onForgotPassword={onNavigateForgotPassword}
                    onRegisterClick={onNavigateRegister}
                />
            </section>
        </main>
    );
}
