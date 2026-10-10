/**
 * ============================================================================
 * Hook        : useLoginForm
 * Layer       : Feature Hook
 *
 * Description:
 * Mengelola state form masuk, validasi input email & password,
 * serta simulasi login dan persistensi session ke localStorage.
 * ============================================================================
 */

import { useState, useCallback } from "react";

/**
 * Hook pengelola state dan logika form login.
 *
 * @param {object} options Opsi konfigurasi hook.
 * @param {Function} [options.onSuccess] Callback saat login berhasil.
 * @param {Function} [options.onGuestAccess] Callback saat masuk sebagai tamu.
 * @returns {object} State form, error, dan handler aksi.
 */
export function useLoginForm({ onSuccess, onGuestAccess } = {}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // * Validasi sederhana dan autentikasi tersimulasi
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            setErrorMessage("");

            const cleanEmail = email.trim();
            if (!cleanEmail) {
                setErrorMessage("Email kampus wajib diisi.");
                return;
            }

            if (!cleanEmail.includes("@")) {
                setErrorMessage("Format email tidak valid.");
                return;
            }

            if (password.length < 8) {
                setErrorMessage("Kata sandi minimal 8 karakter.");
                return;
            }

            setIsSubmitting(true);

            // ? Simulasi login & simpan ke localStorage sesuai PRD §5.1 & §6
            const mockUser = {
                id: "u_logged_in",
                username: cleanEmail.split("@")[0].toLowerCase(),
                name: cleanEmail.split("@")[0],
                email: cleanEmail,
                avatarColor: "bg-violet-600",
            };

            try {
                localStorage.setItem("temuin_currentUser", JSON.stringify(mockUser));
                if (onSuccess) {
                    onSuccess(mockUser);
                }
            } catch {
                // ! Penanganan bila localStorage penuh atau dinonaktifkan
                setErrorMessage("Gagal menyimpan sesi login.");
            } finally {
                setIsSubmitting(false);
            }
        },
        [email, password, onSuccess]
    );

    // * Handler untuk akses mode tamu tanpa akun
    const handleGuestLogin = useCallback(() => {
        try {
            localStorage.removeItem("temuin_currentUser");
        } catch {
            // ! Abaikan kegagalan pembersihan storage
        }
        if (onGuestAccess) {
            onGuestAccess();
        }
    }, [onGuestAccess]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        errorMessage,
        isSubmitting,
        handleSubmit,
        handleGuestLogin,
    };
}
