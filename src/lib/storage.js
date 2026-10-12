/**
 * ============================================================================
 * Module      : storage
 * Layer       : Lib / Data Layer
 *
 * Description:
 * Helper terpusat untuk operasi data mock dan persistensi localStorage.
 * Mengelola pembacaan postingan, komentar, dan status simpanan (saved).
 * ============================================================================
 */

import { INITIAL_EXPLORE_POSTS } from "../features/explore/data/mockPosts";

// * Kunci localStorage sesuai spesifikasi PRD §6
export const STORAGE_KEYS = {
    POSTS: "temuin_posts",
    SAVED: "temuin_saved",
    CURRENT_USER: "temuin_currentUser",
};

// * Mock user terdaftar awal untuk kemudahan login / demo
export const MOCK_USERS = [
    {
        id: "u1",
        username: "rina.ay",
        name: "Rina Ayuningtyas",
        email: "rina.ay@kampus.ac.id",
        password: "password123",
        avatarInitials: "RA",
        avatarColor: "bg-violet-600",
    },
    {
        id: "u2",
        username: "bima_k",
        name: "Bima Kusuma",
        email: "bima_k@kampus.ac.id",
        password: "password123",
        avatarInitials: "BK",
        avatarColor: "bg-teal-700",
    },
];

/**
 * Mengambil sesi pengguna aktif dari localStorage.
 *
 * @returns {object|null} Objek data pengguna atau null bila belum login.
 */
export function getCurrentUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

/**
 * Menyimpan sesi pengguna aktif ke localStorage.
 *
 * @param {object} user Objek data pengguna yang berhasil login.
 */
export function setCurrentUser(user) {
    try {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (error) {
        console.error("Gagal menyimpan currentUser:", error);
    }
}

/**
 * Menghapus sesi pengguna aktif dari localStorage (logout).
 */
export function removeCurrentUser() {
    try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch (error) {
        console.error("Gagal menghapus currentUser:", error);
    }
}


// * Mock data awal bila localStorage belum terisi
const INITIAL_POSTS = [
    {
        id: "p1",
        userId: "u1",
        status: "hilang",
        isReturned: false,
        name: "Dompet kulit coklat",
        category: "Dompet & Kartu",
        location: "Kantin Gedung B, meja dekat jendela",
        date: "Sab, 10 Okt · ±12.00",
        description:
            "Isinya KTM dan kartu ATM. Uangnya nggak penting, yang penting kartunya balik. Makasih banyak!",
        features: 'Lipat dua, ada inisial "R" di pojok',
        contact: "081234567890",
        photos: ["", "", ""], // 3 slot foto placeholder
        likes: ["u2"],
        comments: [
            {
                id: "c1",
                userId: "u2",
                username: "bima_k",
                avatarInitials: "BK",
                avatarColor: "bg-teal-700",
                text: "Coba tanya ibu kantin, biasanya barang ketinggalan dititip di kasir.",
                createdAt: "1 jam lalu",
            },
            {
                id: "c2",
                userId: "u1",
                username: "rina.ay",
                avatarInitials: "RA",
                avatarColor: "bg-violet-600",
                text: "Udah ditanya tapi belum ada, makasih ya!",
                createdAt: "45 menit lalu",
            },
        ],
        user: {
            id: "u1",
            username: "rina.ay",
            name: "Rina Ayuningtyas",
            avatarInitials: "RA",
            avatarColor: "bg-violet-600",
        },
        createdAt: "2026-10-10T05:00:00Z",
        postedTimeAgo: "Diposting 2 jam lalu",
    },
];

/**
 * Menginisialisasi dan mengambil seluruh postingan dari localStorage.
 *
 * @returns {Array<object>} Daftar postingan.
 */
export function getPosts() {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.POSTS);
        if (!raw) {
            localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_EXPLORE_POSTS));
            return INITIAL_EXPLORE_POSTS;
        }
        const parsed = JSON.parse(raw);
        // * Sinkronkan jika data di localStorage belum memakai foto terbaru (misal: contohKtm)
        const needsResync = parsed.length <= 1 || !parsed.some((p) => p.id === "p5" && p.photos?.[0] === "/contohKtm.jpg");
        if (needsResync) {
            localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_EXPLORE_POSTS));
            return INITIAL_EXPLORE_POSTS;
        }
        return parsed;
    } catch {
        return INITIAL_EXPLORE_POSTS;
    }
}

/**
 * Mengambil detail postingan berdasarkan ID unik.
 *
 * @param {string} id ID postingan.
 * @returns {object|null} Objek postingan atau null jika tidak ditemukan.
 */
export function getPostById(id) {
    const posts = getPosts();
    const found = posts.find((item) => item.id === id);
    if (found) return found;

    // Fallback cadangan langsung ke array mockPosts
    return INITIAL_EXPLORE_POSTS.find((item) => item.id === id) || null;
}

/**
 * Menambahkan komentar baru ke dalam postingan tertentu.
 *
 * @param {string} postId ID postingan target.
 * @param {object} newComment Data komentar baru.
 * @returns {object|null} Objek postingan yang diperbarui.
 */
export function addCommentToPost(postId, newComment) {
    const posts = getPosts();
    const index = posts.findIndex((item) => item.id === postId);
    if (index === -1) return null;

    posts[index].comments.push(newComment);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return posts[index];
}

/**
 * Memeriksa apakah postingan telah disimpan oleh pengguna saat ini.
 *
 * @param {string} postId ID postingan.
 * @returns {boolean} Status tersimpan.
 */
export function isPostSaved(postId) {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.SAVED);
        const savedList = raw ? JSON.parse(raw) : [];
        return savedList.includes(postId);
    } catch {
        return false;
    }
}

/**
 * Menukar status simpanan (bookmark) sebuah postingan.
 *
 * @param {string} postId ID postingan.
 * @returns {boolean} Status tersimpan terbaru.
 */
export function toggleSavePost(postId) {
    try {
        const raw = localStorage.getItem(STORAGE_KEYS.SAVED);
        let savedList = raw ? JSON.parse(raw) : [];

        if (savedList.includes(postId)) {
            savedList = savedList.filter((id) => id !== postId);
            localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedList));
            return false;
        } else {
            savedList.push(postId);
            localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedList));
            return true;
        }
    } catch {
        return false;
    }
}
