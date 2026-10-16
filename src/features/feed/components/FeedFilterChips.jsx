/**
 * ============================================================================
 * Component   : FeedFilterChips
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan barisan tombol filter chip horizontal untuk memfilter status
 * (Semua, Hilang, Ditemukan) dan kategori barang pada halaman Beranda.
 * ============================================================================
 */

const FEED_FILTERS = [
    { id: "semua", label: "Semua", type: "all" },
    { id: "hilang", label: "Hilang", type: "status", value: "Hilang" },
    { id: "ditemukan", label: "Ditemukan", type: "status", value: "Ditemukan" },
    { id: "dompet", label: "Dompet", type: "category", value: "Dompet" },
    { id: "elektronik", label: "Elektronik", type: "category", value: "Elektronik" },
    { id: "kunci", label: "Kunci", type: "category", value: "Kunci" },
    { id: "pakaian", label: "Pakaian", type: "category", value: "Pakaian" },
    { id: "buku", label: "Buku", type: "category", value: "Buku" },
    { id: "lainnya", label: "Lainnya", type: "category", value: "Lainnya" },
];

/**
 * Komponen bilah chip filter beranda.
 *
 * @param {object} props Properti komponen.
 * @param {string} props.statusFilter Filter status yang aktif saat ini.
 * @param {(status: string) => void} props.onStatusChange Callback saat status diubah.
 * @param {string} props.categoryFilter Filter kategori yang aktif saat ini.
 * @param {(category: string) => void} props.onCategoryChange Callback saat kategori diubah.
 * @returns {JSX.Element} Elemen barisan chip filter yang dapat digeser.
 */
export function FeedFilterChips({
    statusFilter,
    onStatusChange,
    categoryFilter,
    onCategoryChange,
}) {
    // * Menentukan apakah chip tertentu sedang dalam kondisi aktif
    const isChipActive = (filter) => {
        if (filter.type === "all") {
            return statusFilter === "Semua" && categoryFilter === "Semua";
        }
        if (filter.type === "status") {
            return statusFilter === filter.value && categoryFilter === "Semua";
        }
        if (filter.type === "category") {
            return categoryFilter === filter.value;
        }
        return false;
    };

    // * Handler klik chip untuk memperbarui filter terkait
    const handleChipClick = (filter) => {
        if (filter.type === "all") {
            onStatusChange("Semua");
            onCategoryChange("Semua");
        } else if (filter.type === "status") {
            onStatusChange(filter.value);
            onCategoryChange("Semua");
        } else if (filter.type === "category") {
            onCategoryChange(filter.value);
            onStatusChange("Semua");
        }
    };

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FEED_FILTERS.map((filter) => {
                const active = isChipActive(filter);
                return (
                    <button
                        key={filter.id}
                        type="button"
                        onClick={() => handleChipClick(filter)}
                        className={`h-9 shrink-0 px-4 rounded-full border text-sm font-semibold transition-colors cursor-pointer ${
                            active
                                ? "bg-gray-900 border-gray-900 text-white"
                                : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}
