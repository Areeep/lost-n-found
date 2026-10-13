/**
 * ============================================================================
 * Hook        : useExplore
 * Layer       : Feature Hook
 *
 * Description:
 * Mengelola state input pencarian kata kunci, pemilihan tab status (Semua /
 * Hilang / Ditemukan), dan kategori barang dengan komputasi filter terisolasi.
 * ============================================================================
 */

import { useState, useMemo } from "react";
import { INITIAL_EXPLORE_POSTS } from "../data/mockPosts";

/**
 * Hook pengelola logika filter daftar pencarian barang.
 *
 * @returns {object} Kumpulan state pencarian dan daftar barang hasil filter.
 */
export function useExplore() {
    const [posts] = useState(INITIAL_EXPLORE_POSTS);
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