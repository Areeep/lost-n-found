/**
 * ============================================================================
 * Component   : EditProfileModal
 * Layer       : Feature Component
 *
 * Description:
 * Modal dialog formulir edit profil pengguna.
 * Mengubah nama lengkap, username, bio, dan warna avatar.
 * ============================================================================
 */

import { useState } from "react";
import { X } from "lucide-react";

// * Pilihan warna avatar sesuai design.md §2
const AVATAR_COLORS = [
  { label: "Violet", value: "bg-violet-600" },
  { label: "Teal", value: "bg-teal-700" },
  { label: "Amber", value: "bg-amber-700" },
  { label: "Blue", value: "bg-blue-700" },
  { label: "Orange", value: "bg-orange-700" },
];

/**
 * Komponen modal dialog pengubah data profil.
 *
 * @param {object} props Properti komponen.
 * @param {object} props.user Data pengguna saat ini.
 * @param {boolean} props.isOpen Status visibilitas modal.
 * @param {Function} props.onClose Callback penutup modal.
 * @param {Function} props.onSave Callback penyimpan data perubahan profil.
 * @returns {JSX.Element|null} Tampilan modal edit profil.
 */
export function EditProfileModal({ user, isOpen, onClose, onSave }) {
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatarColor, setAvatarColor] = useState(
    user.avatarColor || "bg-violet-600",
  );
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // * Handler submit formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama lengkap wajib diisi.");
      return;
    }

    if (!username.trim()) {
      setError("Username wajib diisi.");
      return;
    }

    onSave({
      name: name.trim(),
      username: username.trim().toLowerCase(),
      bio: bio.trim(),
      avatarColor,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-edit-profile-title"
      className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-xs duration-200"
    >
      <div className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2
            id="modal-edit-profile-title"
            className="font-heading text-lg font-bold text-gray-900"
          >
            Edit Profil
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="flex size-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Pesan Kesalahan */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form Isi Data */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Pilihan Warna Avatar */}
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-900">
              Warna Avatar
            </label>
            <div className="flex items-center gap-3">
              {AVATAR_COLORS.map((col) => (
                <button
                  key={col.value}
                  type="button"
                  onClick={() => setAvatarColor(col.value)}
                  aria-label={col.label}
                  className={`size-9 rounded-full ${col.value} transition-transform ${
                    avatarColor === col.value
                      ? "scale-110 ring-2 ring-gray-900 ring-offset-2"
                      : "opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Input Nama Lengkap */}
          <div>
            <label
              htmlFor="edit-profile-name"
              className="mb-1 block text-sm font-bold text-gray-900"
            >
              Nama Lengkap
            </label>
            <input
              id="edit-profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-[15px] focus:outline-2 focus:outline-blue-700"
              placeholder="Nama lengkap Anda"
            />
          </div>

          {/* Input Username */}
          <div>
            <label
              htmlFor="edit-profile-username"
              className="mb-1 block text-sm font-bold text-gray-900"
            >
              Username
            </label>
            <input
              id="edit-profile-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-[15px] focus:outline-2 focus:outline-blue-700"
              placeholder="Username akun"
            />
          </div>

          {/* Input Biodata */}
          <div>
            <label
              htmlFor="edit-profile-bio"
              className="mb-1 block text-sm font-bold text-gray-900"
            >
              Bio
            </label>
            <textarea
              id="edit-profile-bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-[15px] focus:outline-2 focus:outline-blue-700"
              placeholder="Deskripsi singkat profil Anda"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-xl border border-gray-300 bg-white px-5 font-bold text-gray-900 transition-colors hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-gray-900 px-5 font-bold text-white transition-colors hover:bg-gray-800"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
