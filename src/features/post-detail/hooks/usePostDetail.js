/**
 * ============================================================================
 * Hook        : usePostDetail
 * Layer       : Feature Hook
 *
 * Description:
 * Mengelola state interaktif detail postingan:
 * navigasi karusel foto, tambah komentar, dan kontak WhatsApp ke poster.
 * ============================================================================
 */

import { useState, useCallback } from "react";
import {
    getPostById,
    addCommentToPost,
    isPostSaved,
    toggleSavePost,
    getCurrentUser,
} from "../../../lib/storage";

/**
 * Hook pengelola logika dan state detail postingan.
 *
 * @param {string} postId ID postingan yang ingin ditampilkan.
 * @returns {object} Kumpulan state dan handler interaksi.
 */
export function usePostDetail(postId) {
    const [post, setPost] = useState(() => (postId ? getPostById(postId) : null));
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [saved, setSaved] = useState(() => (postId ? isPostSaved(postId) : false));

    // Sinkronisasi bila postId berubah tanpa efek samping render berantai
    const [prevPostId, setPrevPostId] = useState(postId);
    if (prevPostId !== postId) {
        setPrevPostId(postId);
        setPost(postId ? getPostById(postId) : null);
        setSaved(postId ? isPostSaved(postId) : false);
    }

    const totalPhotos = post?.photos?.length || 1;

    // * Navigasi carousel foto
    const nextPhoto = useCallback(() => {
        setActivePhotoIndex((prev) => (prev + 1) % totalPhotos);
    }, [totalPhotos]);

    const prevPhoto = useCallback(() => {
        setActivePhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
    }, [totalPhotos]);

    const goToPhoto = useCallback((index) => {
        setActivePhotoIndex(index);
    }, []);

    // * Handler penambahan komentar
    const handleAddComment = useCallback(
        (e) => {
            e.preventDefault();
            const trimmed = commentText.trim();
            if (!trimmed || !post) return;

            const currentUser = getCurrentUser();
            const newComment = {
                id: `c_${Date.now()}`,
                userId: currentUser?.id || "u_current",
                username: currentUser?.username || "kamu",
                avatarInitials: currentUser?.avatarInitials || "KM",
                avatarColor: currentUser?.avatarColor || "bg-blue-700",
                text: trimmed,
                createdAt: "Baru saja",
            };

            const updated = addCommentToPost(post.id, newComment);
            if (updated) {
                setPost({ ...updated });
                setCommentText("");
            }
        },
        [commentText, post]
    );

    // * Toggle status bookmark
    const handleToggleSave = useCallback(() => {
        if (!post) return;
        const nextSavedState = toggleSavePost(post.id);
        setSaved(nextSavedState);
    }, [post]);

    // ? Membuka link WhatsApp secara langsung sesuai nomor kontak poster di orbit
    const handleOpenContact = useCallback(() => {
        if (!post?.contact) return;
        const cleanPhone = post.contact.replace(/\D/g, "");
        const formattedPhone = cleanPhone.startsWith("0")
            ? `62${cleanPhone.slice(1)}`
            : cleanPhone;

        const message = encodeURIComponent(
            `Halo ${post.user.name}, saya melihat postingan Anda mengenai "${post.name}" di orbit.`
        );
        window.open(`https://wa.me/${formattedPhone}?text=${message}`, "_blank");
    }, [post]);

    return {
        post,
        activePhotoIndex,
        totalPhotos,
        nextPhoto,
        prevPhoto,
        goToPhoto,
        commentText,
        setCommentText,
        handleAddComment,
        saved,
        handleToggleSave,
        handleOpenContact,
    };
}
