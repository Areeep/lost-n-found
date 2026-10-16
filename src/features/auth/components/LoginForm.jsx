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

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthBrandLogo } from "./AuthBrandLogo";

/**
 * Komponen form login interaktif.
 *
 * @param {object} props Properti komponen.
 * @param {string} [props.username] Nilai input username.
 * @param {Function} [props.setUsername] Setter state username.
 * @param {string} [props.email] Alias fallback untuk input username.
 * @param {Function} [props.setEmail] Alias fallback setter state username.
 * @param {string} props.password Nilai input kata sandi.
 * @param {Function} props.setPassword Setter state kata sandi.
 * @param {string} props.errorMessage Pesan kesalahan validasi.
 * @param {boolean} props.isSubmitting Status loading submit.
 * @param {Function} props.onSubmit Handler submit form.
 * @param {Function} [props.onForgotPassword] Handler klik lupa kata sandi.
 * @param {Function} [props.onRegisterClick] Handler klik daftar akun baru.
 * @returns {JSX.Element} Formulir login.
 */
export function LoginForm({
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    isSubmitting,
    onSubmit,
    onForgotPassword,
    onRegisterClick,
}) {
    // Sinkronisasi input: prioritaskan username, gunakan email sebagai fallback
    const inputValue = username !== undefined ? username : (email || "");
    const handleInputChange = setUsername || setEmail;
    const [showPassword, setShowPassword] = useState(false);

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
                    Pakai username atau email kampus untuk mengakses orbit.
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
                        htmlFor="username-input"
                        className="block text-sm font-bold text-gray-900 mb-1.5"
                    >
                        Username atau Email
                    </label>
                    <input
                        id="username-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange && handleInputChange(e.target.value)}
                        placeholder="misal: rina.ay atau nama@kampus.ac.id"
                        autoComplete="username"
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
                    <div className="relative">
                        <input
                            id="password-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                            className="w-full h-12 pl-3.5 pr-11 rounded-lg border border-gray-300 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOff className="size-5" />
                            ) : (
                                <Eye className="size-5" />
                            )}
                        </button>
                    </div>
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

