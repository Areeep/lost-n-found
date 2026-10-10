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

// * Kunci localStorage sesuai spesifikasi PRD §6
const STORAGE_KEYS = {
    POSTS: "temuin_posts",
    SAVED: "temuin_saved",
    CURRENT_USER: "temuin_currentUser",
};

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
            localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
            return INITIAL_POSTS;
        }
        return JSON.parse(raw);
    } catch {
        // ! Fallback jika JSON parsing gagal
        return INITIAL_POSTS;
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
    return posts.find((item) => item.id === id) || null;
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
