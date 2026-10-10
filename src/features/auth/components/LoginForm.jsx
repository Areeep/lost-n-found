/**
 * ============================================================================
 * Component   : LoginForm
 * Layer       : Feature Component
 *
 * Description:
 * Form input email kampus, password, tombol submit, tombol guest mode,
 * dan link ke lupa kata sandi & pendaftaran.
 * ============================================================================
 */

import { AuthBrandLogo } from "./AuthBrandLogo";

/**
 * Komponen form login interaktif.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.email Nilai input email.
 * @param {Function} props.setEmail Setter state email.
 * @param {string} props.password Nilai input kata sandi.
 * @param {Function} props.setPassword Setter state kata sandi.
 * @param {string} props.errorMessage Pesan kesalahan validasi.
 * @param {boolean} props.isSubmitting Status loading submit.
 * @param {Function} props.onSubmit Handler submit form.
 * @param {Function} props.onGuestLogin Handler tombol akses tamu.
 * @param {Function} [props.onForgotPassword] Handler klik lupa kata sandi.
 * @param {Function} [props.onRegisterClick] Handler klik daftar akun baru.
 * @returns {JSX.Element} Formulir login.
 */
export function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    isSubmitting,
    onSubmit,
    onGuestLogin,
    onForgotPassword,
    onRegisterClick,
}) {
    return (
        <div className="w-full max-w-[360px] md:max-w-[400px] mx-auto flex flex-col justify-center min-h-screen py-10 px-4 sm:px-6">
            {/* Mobile Header Logo & Tagline */}
            <div className="mb-8 md:hidden text-left">
                <AuthBrandLogo theme="dark" className="mb-4 inline-block" />
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2 font-sans">
                    Barang hilang? Posting di sini.
                    <br />
                    Nemu barang orang? Bantu balikin.
                </p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
                <h1 className="font-heading font-extrabold text-3xl text-gray-900 tracking-tight">
                    Masuk
                </h1>
                <p className="text-sm text-gray-600 mt-1.5 font-sans">
                    Pakai email kampus supaya postinganmu terpercaya.
                </p>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
                <div
                    role="alert"
                    className="mb-5 p-3 rounded-lg bg-orange-50 border border-orange-700 text-orange-700 text-sm font-medium"
                >
                    {errorMessage}
                </div>
            )}

            {/* Form Inputs */}
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div>
                    <label
                        htmlFor="email-input"
                        className="block text-sm font-bold text-gray-900 mb-1.5"
                    >
                        Email kampus
                    </label>
                    <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@kampus.ac.id"
                        autoComplete="email"
                        required
                        className="w-full h-12 px-3.5 rounded-lg border border-gray-300 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password-input"
                        className="block text-sm font-bold text-gray-900 mb-1.5"
                    >
                        Kata sandi
                    </label>
                    <input
                        id="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        className="w-full h-12 px-3.5 rounded-lg border border-gray-300 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                    />
                </div>

                {/* Link Lupa Kata Sandi */}
                <div className="flex justify-end pt-1">
                    <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-sm font-bold text-blue-700 hover:text-blue-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    >
                        Lupa kata sandi?
                    </button>
                </div>

                {/* Tombol Masuk Utama */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-gray-900 hover:bg-gray-800 active:scale-[0.99] text-white font-bold text-sm md:text-[15px] transition disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                    {isSubmitting ? "Memproses..." : "Masuk"}
                </button>
            </form>

            {/* Pembatas "atau" */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs text-gray-600">
                    <span className="bg-white md:bg-white px-3">atau</span>
                </div>
            </div>

            {/* Tombol Masuk Sebagai Tamu */}
            <button
                type="button"
                onClick={onGuestLogin}
                className="w-full h-12 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 active:scale-[0.99] text-gray-900 font-bold text-sm md:text-[15px] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
                Lihat-lihat tanpa akun
            </button>

            {/* Footer Navigasi Daftar */}
            <p className="mt-8 text-center text-sm text-gray-600 font-sans">
                Belum punya akun?{" "}
                <button
                    type="button"
                    onClick={onRegisterClick}
                    className="font-bold text-blue-700 hover:text-blue-900 transition-colors inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                    Daftar
                </button>
            </p>
        </div>
    );
}
