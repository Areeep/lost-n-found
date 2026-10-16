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
    } catch {
        // Fallback hening jika penyimpanan gagal
    }
}

/**
 * Menghapus sesi pengguna aktif saat logout.
 */
export function removeCurrentUser() {
    try {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } catch {
        // Fallback hening jika penyimpanan gagal
    }
}

// Data awal eksplorasi (cadangan lokal jika mockPosts kosong)
export const mockPosts = [
    {
        id: "p1",
        userId: "u1",
        name: "Dompet coklat",
        status: "hilang",
        isReturned: false,
        category: "Dompet & Kartu",
        location: "Kantin Gedung B",
        date: "Sab, 10 Okt · ±12.00",
        description:
            "Dompet lipat kulit coklat berisi KTM dan kartu ATM. Uangnya tidak masalah, yang penting kartu identitas kembali.",
        features: "Kulit asli, ada inisial 'R' kecil di sudut kanan bawah.",
        contact: "081234567890",
        bgTint: "bg-orange-100",
        photos: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
        ],
        likes: ["u2"],
        comments: [
            {
                id: "c1",
                userId: "u2",
                username: "bima_k",
                avatarInitials: "BK",
                avatarColor: "bg-teal-700",
                text: "Coba tanya petugas kasir kantin lantai 1.",
                createdAt: "1 jam lalu",
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
 * Menambahkan komentar baru ke dalam postingan tertentu dan menyimpannya di localStorage.
 *
 * @param {string} postId ID postingan target.
 * @param {object} newComment Data komentar baru.
 * @returns {object|null} Objek postingan yang diperbarui dengan array komentar baru.
 */
export function addCommentToPost(postId, newComment) {
    const posts = getPosts();
    let index = posts.findIndex((item) => item.id === postId);

    // * Fallback jika postingan belum tersimpan dalam array localStorage aktif
    if (index === -1) {
        const fallback = INITIAL_EXPLORE_POSTS.find((item) => item.id === postId);
        if (fallback) {
            posts.push(fallback);
            index = posts.length - 1;
        } else {
            return null;
        }
    }

    // ! Jamin properti comments selalu berbentuk array
    if (!Array.isArray(posts[index].comments)) {
        posts[index].comments = [];
    }

    // ? Buat referensi array baru secara immutable agar trigger re-render React selalu terpancing
    const updatedPost = {
        ...posts[index],
        comments: [...posts[index].comments, newComment],
    };
    posts[index] = updatedPost;

    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    return updatedPost;
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

/**
 * Menukar status suka (like) postingan oleh pengguna tertentu dan menyimpan ke localStorage.
 *
 * @param {string} postId ID postingan target.
 * @param {string} userId ID pengguna aktif.
 * @returns {object|null} Objek postingan dengan array likes terbarui atau null jika gagal.
 */
export function toggleLikePost(postId, userId) {
    if (!postId || !userId) return null;
    const posts = getPosts();
    const index = posts.findIndex((item) => item.id === postId);
    if (index === -1) return null;

    const currentLikes = Array.isArray(posts[index].likes) ? posts[index].likes : [];
    const isLiked = currentLikes.includes(userId);

    const updatedLikes = isLiked
        ? currentLikes.filter((id) => id !== userId)
        : [...currentLikes, userId];

    const updatedPost = {
        ...posts[index],
        likes: updatedLikes,
    };
    posts[index] = updatedPost;

    try {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch {
        // Fallback jika penyimpanan gagal
    }

    return updatedPost;
}

