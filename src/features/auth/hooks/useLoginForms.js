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
import { setCurrentUser, removeCurrentUser, MOCK_USERS } from "../../../lib/storage";

/**
 * Hook pengelola state dan logika form login.
 * Mendukung autentikasi via username maupun email, show/hide password,
 * validasi, dan persistensi sesi login ke localStorage.
 *
 * @param {object} options Opsi konfigurasi hook.
 * @param {Function} [options.onSuccess] Callback saat login berhasil.
 * @param {Function} [options.onGuestAccess] Callback saat masuk sebagai tamu.
 * @returns {object} State form, error, dan handler aksi.
 */
export function useLoginForm({ onSuccess, onGuestAccess } = {}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // * Toggle visibilitas kata sandi
    const toggleShowPassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    // * Pengisian cepat akun demo untuk kebutuhan review / pengujian
    const quickFillDemo = useCallback((demoUsername = "rina.ay") => {
        const found = MOCK_USERS.find((u) => u.username === demoUsername) || MOCK_USERS[0];
        setUsername(found.username);
        setPassword(found.password || "password123");
        setErrorMessage("");
    }, []);

    // * Validasi dan autentikasi tersimulasi
    const handleSubmit = useCallback(
        (e) => {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            setErrorMessage("");

            const cleanIdentifier = username.trim();
            if (!cleanIdentifier) {
                setErrorMessage("Username atau email wajib diisi.");
                return;
            }

            if (cleanIdentifier.length < 3) {
                setErrorMessage("Username minimal 3 karakter.");
                return;
            }

            if (!password) {
                setErrorMessage("Kata sandi wajib diisi.");
                return;
            }

            if (password.length < 6) {
                setErrorMessage("Kata sandi minimal 6 karakter.");
                return;
            }

            setIsSubmitting(true);

            // ? Cek apakah cocok dengan akun mock terdaftar atau generate profil baru
            const matchedMock = MOCK_USERS.find(
                (u) =>
                    u.username.toLowerCase() === cleanIdentifier.toLowerCase() ||
                    u.email.toLowerCase() === cleanIdentifier.toLowerCase()
            );

            const isEmail = cleanIdentifier.includes("@");
            const rawHandle = isEmail
                ? cleanIdentifier.split("@")[0].toLowerCase()
                : cleanIdentifier.toLowerCase();

            const loggedInUser = matchedMock
                ? {
                      id: matchedMock.id,
                      username: matchedMock.username,
                      name: matchedMock.name,
                      email: matchedMock.email,
                      avatarInitials: matchedMock.avatarInitials,
                      avatarColor: matchedMock.avatarColor,
                  }
                : {
                      id: `u_${Date.now()}`,
                      username: rawHandle,
                      name: rawHandle.charAt(0).toUpperCase() + rawHandle.slice(1),
                      email: isEmail ? cleanIdentifier : `${rawHandle}@kampus.ac.id`,
                      avatarInitials: rawHandle.slice(0, 2).toUpperCase(),
                      avatarColor: "bg-violet-600",
                  };

            try {
                // Simpan ke localStorage agar sesi tetap bertahan saat di-refresh
                setCurrentUser(loggedInUser);
                if (onSuccess) {
                    onSuccess(loggedInUser);
                }
            } catch {
                // ! Penanganan bila localStorage penuh atau dinonaktifkan
                setErrorMessage("Gagal menyimpan sesi login.");
            } finally {
                setIsSubmitting(false);
            }
        },
        [username, password, onSuccess]
    );

    // * Handler untuk akses mode tamu tanpa akun
    const handleGuestLogin = useCallback(() => {
        removeCurrentUser();
        if (onGuestAccess) {
            onGuestAccess();
        }
    }, [onGuestAccess]);

    return {
        // State Username & alias Email untuk kompatibilitas penuh
        username,
        setUsername,
        email: username,
        setEmail: setUsername,

        // State Kata Sandi
        password,
        setPassword,
        showPassword,
        setShowPassword,
        toggleShowPassword,

        // Status & Aksi
        errorMessage,
        setErrorMessage,
        isSubmitting,
        handleSubmit,
        handleGuestLogin,
        quickFillDemo,
    };
}

