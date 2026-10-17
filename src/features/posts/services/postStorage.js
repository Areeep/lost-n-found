/**
 * @fileoverview LocalStorage service for post operations.
 * Integrates directly with shared storage schema and currentUser session.
 */

import { getPosts, STORAGE_KEYS, getCurrentUser } from "../../../lib/storage";

/**
 * Saves new post with full schema expected by Explore & PostDetail pages.
 * @param {Object} postData - Form values from useCreatePost.
 * @returns {Object} Created post object.
 */
export function savePost(postData) {
  const existing = getPosts();
  const currentUser = getCurrentUser() || {
    id: "u_local",
    username: "kamu",
    name: "Pengguna",
    avatarInitials: "KM",
    avatarColor: "bg-blue-700",
  };

  const statusMapped =
    postData.status === "FOUND" || postData.status === "ditemukan"
      ? "ditemukan"
      : "hilang";

  const newPost = {
    id: `post_${Date.now()}`,
    userId: currentUser.id,
    name: postData.itemName || postData.name || "Barang",
    status: statusMapped,
    isReturned: false,
    category: postData.category || "Lainnya",
    location: postData.location || "-",
    date: postData.date || new Date().toISOString().split("T")[0],
    description: postData.description || "",
    features: postData.description || postData.features || "-",
    contact: postData.contactWhatsapp || postData.contact || "",
    bgTint: statusMapped === "hilang" ? "bg-orange-100" : "bg-emerald-100",
    photos:
      postData.photos && postData.photos.length > 0
        ? postData.photos
        : ["", "", ""],
    likes: [],
    comments: [],
    user: currentUser,
    createdAt: new Date().toISOString(),
    postedTimeAgo: "Baru saja",
  };

  const updated = [newPost, ...existing];
  try {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(updated));
  } catch (error) {
    console.error("Gagal menyimpan postingan:", error);
    throw new Error("Penyimpanan lokal penuh. Hapus beberapa foto atau data.", {
      cause: error,
    });
  }

  return newPost;
}
