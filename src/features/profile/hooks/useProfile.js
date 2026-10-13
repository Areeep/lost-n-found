/**
 * ============================================================================
 * Hook        : useProfile
 * Layer       : Feature Hook
 *
 * Description:
 * Mengelola state profil pengguna, statistik postingan,
 * serta penyaringan data postingan dari mockPosts dan storage.
 * ============================================================================
 */

import { useState, useMemo, useCallback } from "react";
import { getPosts, getCurrentUser, setCurrentUser } from "../../../lib/storage";
import { INITIAL_EXPLORE_POSTS } from "../../explore/data/mockPosts";

// * Data fallback profil bila sesi pengguna tidak ditemukan
const DEFAULT_USER = {
  id: "u1",
  username: "rina.ay",
  name: "Rina Ayuningtyas",
  bio: "Teknik Informatika '24 · suka lupa naruh barang",
  avatarInitials: "RA",
  avatarColor: "bg-violet-600",
};

/**
 * Hook kustom untuk mengelola data dan interaksi halaman profil.
 *
 * @returns {object} Objek data profil, aksi updateProfile, stats, dan postingan.
 */
export function useProfile() {
  // * State data profil pengguna aktif (diinisialisasi dari storage)
  const [user, setUser] = useState(() => {
    const session = getCurrentUser();
    if (!session) return DEFAULT_USER;

    return {
      id: session.id || DEFAULT_USER.id,
      username: session.username || DEFAULT_USER.username,
      name: session.name || session.username || DEFAULT_USER.name,
      bio: session.bio || DEFAULT_USER.bio,
      avatarInitials:
        session.avatarInitials ||
        (session.username
          ? session.username.slice(0, 2).toUpperCase()
          : DEFAULT_USER.avatarInitials),
      avatarColor: session.avatarColor || DEFAULT_USER.avatarColor,
    };
  });

  // ? Memperbarui data profil, menghitung inisial baru, dan persistensi ke storage
  const updateProfile = useCallback((updatedData) => {
    setUser((prevUser) => {
      const cleanName = updatedData.name?.trim() || prevUser.name;
      const nameParts = cleanName.split(" ").filter(Boolean);
      const newInitials =
        nameParts.length > 1
          ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
          : cleanName.slice(0, 2).toUpperCase();

      const nextUser = {
        ...prevUser,
        ...updatedData,
        name: cleanName,
        avatarInitials: newInitials || prevUser.avatarInitials,
      };

      // * Simpan ke localStorage agar bertahan saat refresh
      setCurrentUser(nextUser);
      return nextUser;
    });
  }, []);

  // * Ambil seluruh postingan: prioritas storage, fallback INITIAL_EXPLORE_POSTS
  const allPosts = useMemo(() => {
    const stored = getPosts();
    return stored.length > 0 ? stored : INITIAL_EXPLORE_POSTS;
  }, []);

  // ? Filter postingan milik pengguna aktif
  const userPosts = useMemo(() => {
    const filtered = allPosts.filter(
      (item) => item.userId === user.id || item.user?.id === user.id,
    );

    if (filtered.length > 0) return filtered;

    // Fallback bila user demo belum memiliki postingan, tampilkan postingan u1
    const fallbackItems = INITIAL_EXPLORE_POSTS.filter(
      (item) => item.userId === user.id || item.userId === "u1",
    );

    return fallbackItems.length > 0
      ? fallbackItems
      : INITIAL_EXPLORE_POSTS.slice(0, 6);
  }, [allPosts, user.id]);

  // * Hitung statistik postingan (postingan dan sudah kembali)
  const stats = useMemo(() => {
    return {
      posts: userPosts.length,
      returned: userPosts.filter((item) => item.isReturned).length,
    };
  }, [userPosts]);

  return {
    user,
    updateProfile,
    stats,
    posts: userPosts,
  };
}
