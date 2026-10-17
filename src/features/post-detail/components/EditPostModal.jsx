/**
 * ============================================================================
 * Component   : EditPostModal
 * Layer       : Feature Component
 *
 * Description:
 * Modal dialog untuk mengedit data postingan barang (nama, status, kategori,
 * lokasi, tanggal, deskripsi, ciri-ciri, kontak, dan status pengembalian).
 * ============================================================================
 */

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { ITEM_CATEGORIES } from "../../posts/constants/postConstants";

/**
 * Komponen modal dialog pengubah data postingan.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.post Data postingan saat ini.
 * @param {boolean} props.isOpen Status keterbukaan modal.
 * @param {Function} props.onClose Callback saat modal ditutup.
 * @param {Function} props.onSave Callback menyimpan perubahan data postingan.
 * @returns {JSX.Element|null} Elemen dialog modal edit postingan.
 */
export function EditPostModal({ post, isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("hilang");
  const [category, setCategory] = useState("Lainnya");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [contact, setContact] = useState("");
  const [isReturned, setIsReturned] = useState(false);

  // * Sinkronisasi data form dengan props post ketika modal dibuka
  useEffect(() => {
    if (post && isOpen) {
      setName(post.name || "");
      setStatus(post.status || "hilang");
      setCategory(post.category || "Lainnya");
      setLocation(post.location || "");
      setDate(post.date || "");
      setDescription(post.description || "");
      setFeatures(post.features || "");
      setContact(post.contact || "");
      setIsReturned(Boolean(post.isReturned));
    }
  }, [post, isOpen]);

  // * Tutup modal menggunakan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  // * Handler submit pembaruan postingan
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      status,
      category,
      location: location.trim(),
      date: date.trim(),
      description: description.trim(),
      features: features.trim(),
      contact: contact.trim(),
      isReturned,
    });
  };

  const isHilang = status === "hilang";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-post-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-card-enter overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
          <h2
            id="edit-post-modal-title"
            className="font-heading text-lg font-bold text-gray-900"
          >
            Edit Postingan
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Formulir Edit Postingan */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Barang (Hilang vs Ditemukan) */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider">
              Status Barang
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("hilang")}
                className={`h-11 rounded-xl border-2 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  isHilang
                    ? "border-orange-700 bg-orange-50 text-orange-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Hilang</span>
              </button>

              <button
                type="button"
                onClick={() => setStatus("ditemukan")}
                className={`h-11 rounded-xl border-2 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  !isHilang
                    ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Ditemukan</span>
              </button>
            </div>
          </div>

          {/* Nama Barang */}
          <div>
            <label
              htmlFor="edit-post-name"
              className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
            >
              Nama Barang
            </label>
            <input
              id="edit-post-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
              placeholder="cth. Dompet kulit coklat"
            />
          </div>

          {/* Kategori Barang */}
          <div>
            <label
              htmlFor="edit-post-category"
              className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
            >
              Kategori
            </label>
            <select
              id="edit-post-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
            >
              {ITEM_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Lokasi & Tanggal */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="edit-post-location"
                className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
              >
                Lokasi
              </label>
              <input
                id="edit-post-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
                placeholder="cth. Kantin Gedung B"
              />
            </div>
            <div>
              <label
                htmlFor="edit-post-date"
                className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
              >
                Waktu / Tanggal
              </label>
              <input
                id="edit-post-date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
                placeholder="cth. Kemarin / 10 Okt"
              />
            </div>
          </div>

          {/* Ciri-ciri & Deskripsi */}
          <div>
            <label
              htmlFor="edit-post-description"
              className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
            >
              Deskripsi
            </label>
            <textarea
              id="edit-post-description"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
              placeholder="Jelaskan detail barang..."
            />
          </div>

          <div>
            <label
              htmlFor="edit-post-features"
              className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
            >
              Ciri-ciri Khusus
            </label>
            <input
              id="edit-post-features"
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
              placeholder="cth. Ada stiker kucing di pojok kanan"
            />
          </div>

          {/* Kontak WhatsApp */}
          <div>
            <label
              htmlFor="edit-post-contact"
              className="mb-1.5 block text-xs font-bold text-gray-900 uppercase tracking-wider"
            >
              Nomor WhatsApp
            </label>
            <input
              id="edit-post-contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-300 bg-white px-3.5 text-sm text-gray-900 focus:outline-2 focus:outline-blue-700"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          {/* Toggle Tandai Sudah Kembali */}
          <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/80 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isReturned}
              onChange={(e) => setIsReturned(e.target.checked)}
              className="size-4.5 rounded text-primary focus:ring-primary cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">
                Tandai sudah kembali
              </span>
              <span className="text-xs text-gray-600">
                Barang sudah berhasil dikembalikan ke pemiliknya.
              </span>
            </div>
          </label>

          {/* Tombol Aksi Modal */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-gray-300 bg-white px-5 font-bold text-sm text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-primary px-5 font-bold text-sm text-white shadow-xs transition-colors hover:bg-primary-hover cursor-pointer"
            >
              Simpan perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
