/**
 * @fileoverview Constants and domain definitions for post creation.
 * Follows design token specs in design.md and validation rules in prd.md.
 */

/**
 * Status types available for a post.
 * @readonly
 * @enum {string}
 */
export const POST_STATUS = {
  LOST: "LOST",
  FOUND: "FOUND",
};

/**
 * Metadata config per status type.
 * Strict Tailwind palette matching design.md (Orange-700 lost, Blue-700 found).
 */
export const STATUS_CONFIG = {
  [POST_STATUS.LOST]: {
    id: POST_STATUS.LOST,
    labelTitle: "Aku kehilangan",
    labelSubtitle: "Status: Hilang",
    dateLabel: "Tanggal hilang",
    locationLabel: "Terakhir terlihat di",
    locationPlaceholder: "cth. Kantin Gedung B",
    colorKey: "orange",
    activeBorder: "border-orange-700",
    activeBg: "bg-orange-50",
    activeText: "text-orange-700",
    previewBg: "bg-orange-100",
  },
  [POST_STATUS.FOUND]: {
    id: POST_STATUS.FOUND,
    labelTitle: "Aku menemukan",
    labelSubtitle: "Status: Ditemukan",
    dateLabel: "Tanggal ditemukan",
    locationLabel: "Ditemukan di",
    locationPlaceholder: "cth. Meja Perpustakaan Lt. 2",
    colorKey: "blue",
    activeBorder: "border-blue-700",
    activeBg: "bg-blue-50",
    activeText: "text-blue-700",
    previewBg: "bg-blue-100",
  },
};

/**
 * Category options per PRD section 5.
 * @readonly
 * @type {readonly string[]}
 */
export const ITEM_CATEGORIES = [
  "Elektronik",
  "Dompet & Tas",
  "Dokumen & Kartu",
  "Kunci",
  "Pakaian & Aksesoris",
  "Buku & Alat Tulis",
  "Lainnya",
];

/**
 * Form field constraints.
 */
export const FORM_LIMITS = {
  MAX_PHOTOS: 3,
  MAX_PHOTO_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
};
