/**
 * ============================================================================
 * Hook        : useExplore
 * Layer       : Feature Hook
 *
 * Description:
 * Mengelola state input pencarian kata kunci, filter status, dan filter kategori.
 * Membaca data postingan dari storage lokal agar postingan baru otomatis tampil.
 * ============================================================================
 */

import { useState, useMemo } from "react";
import { getPosts } from "../../../lib/storage";

/**
 * Hook pengelola logika pencarian dan penyaringan barang temuin.
 *
 * @returns {object} Kumpulan state filter dan postingan yang tersaring.
 */
export function useExplore() {
    // * Inisialisasi dari localStorage agar postingan baru langsung muncul di urutan pertama
    const [posts] = useState(() => getPosts());
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua");
    const [categoryFilter, setCategoryFilter] = useState("Semua");

    // * Filter reaktif berdasarkan kata kunci, status, dan kategori
    const filteredPosts = useMemo(() => {
        return posts.filter((item) => {
            // 1. Filter status
            if (statusFilter !== "Semua") {
                const matchesStatus =
                    item.status.toLowerCase() === statusFilter.toLowerCase();
                if (!matchesStatus) return false;
            }

            // 2. Filter kategori
            if (categoryFilter !== "Semua") {
                if (item.category !== categoryFilter) return false;
            }

            // 3. Filter teks pencarian (nama, deskripsi, lokasi)
            if (searchQuery.trim() !== "") {
                const query = searchQuery.toLowerCase().trim();
                const matchesName = item.name.toLowerCase().includes(query);
                const matchesDesc = item.description?.toLowerCase().includes(query);
                const matchesLocation = item.location?.toLowerCase().includes(query);

                if (!matchesName && !matchesDesc && !matchesLocation) {
                    return false;
                }
            }

            return true;
        });
    }, [posts, searchQuery, statusFilter, categoryFilter]);

    return {
        posts,
        filteredPosts,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        categoryFilter,
        setCategoryFilter,
    };
}
