/**
 * ============================================================================
 * Hook        : useFeed
 * Layer       : Feature Hook
 *
 * Description:
 * Mengelola state postingan beranda, filter status dan kategori, serta
 * aksi interaktif seperti like dan simpan postingan ke localStorage.
 * ============================================================================
 */

import { useState, useMemo, useCallback } from "react";
import {
    getPosts,
    getCurrentUser,
    toggleLikePost,
    toggleSavePost,
    isPostSaved,
} from "../../../lib/storage";

// * Data fallback pengguna bila sesi login belum terdaftar
const DEFAULT_USER = {
    id: "u1",
    username: "rina.ay",
    name: "Rina Ayuningtyas",
    avatarInitials: "RA",
    avatarColor: "bg-violet-600",
};

/**
 * Hook kustom untuk orkestrasi data dan interaksi halaman Beranda (Feed).
 *
 * @returns {object} State dan handler aksi beranda.
 */
export function useFeed() {
    // * Inisialisasi state secara lazy dari localStorage untuk mencegah cascading render
    const [posts, setPosts] = useState(() => getPosts());
    const [currentUser] = useState(() => {
        const session = getCurrentUser();
        if (!session) return DEFAULT_USER;
        return {
            id: session.id || DEFAULT_USER.id,
            username: session.username || DEFAULT_USER.username,
            name: session.name || DEFAULT_USER.name,
            avatarInitials: session.avatarInitials || DEFAULT_USER.avatarInitials,
            avatarColor: session.avatarColor || DEFAULT_USER.avatarColor,
        };
    });
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [categoryFilter, setCategoryFilter] = useState("Semua");
    const [savedPostIds, setSavedPostIds] = useState(() => {
        const loadedPosts = getPosts();
        const initialSaved = new Set();
        loadedPosts.forEach((post) => {
            if (isPostSaved(post.id)) {
                initialSaved.add(post.id);
            }
        });
        return initialSaved;
    });

    // ? Filter postingan berdasarkan status (Hilang/Ditemukan) dan kategori pilihan
    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            // Filter status
            if (statusFilter !== "Semua") {
                const normalizedPostStatus = (post.status || "").toLowerCase();
                const normalizedFilter = statusFilter.toLowerCase();
                if (normalizedPostStatus !== normalizedFilter) {
                    return false;
                }
            }

            // Filter kategori
            if (categoryFilter !== "Semua") {
                const postCategory = (post.category || "").toLowerCase();
                const filterCategory = categoryFilter.toLowerCase();
                if (!postCategory.includes(filterCategory)) {
                    return false;
                }
            }

            return true;
        });
    }, [posts, statusFilter, categoryFilter]);

    // * Handler toggle status suka (like) postingan
    const handleToggleLike = useCallback(
        (postId) => {
            const userId = currentUser?.id || DEFAULT_USER.id;
            const updatedPost = toggleLikePost(postId, userId);
            if (updatedPost) {
                setPosts((prevPosts) =>
                    prevPosts.map((item) =>
                        item.id === postId ? { ...updatedPost } : item
                    )
                );
            }
        },
        [currentUser]
    );

    // * Handler toggle bookmark/simpan postingan
    const handleToggleSave = useCallback((postId) => {
        const isNowSaved = toggleSavePost(postId);
        setSavedPostIds((prevSet) => {
            const nextSet = new Set(prevSet);
            if (isNowSaved) {
                nextSet.add(postId);
            } else {
                nextSet.delete(postId);
            }
            return nextSet;
        });
    }, []);

    return {
        posts: filteredPosts,
        currentUser,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
        handleToggleLike,
        handleToggleSave,
        savedPostIds,
    };
}
