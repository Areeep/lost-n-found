/**
 * @fileoverview Photo upload component handling drag-and-drop and previews.
 * Conforms to 44px touch targets and desktop dropzone visual spec.
 */

import { useRef } from "react";
import { Upload, Plus, X } from "lucide-react";
import { FORM_LIMITS, STATUS_CONFIG } from "../constants/postConstants";

/**
 * Photo upload section with responsive mobile strip and desktop dropzone.
 * @param {Object} props
 * @param {string[]} props.photos - Array of image base64 strings.
 * @param {string} props.status - Current active POST_STATUS.
 * @param {(files: FileList) => void} props.onAddPhotos - Callback on file selection.
 * @param {(index: number) => void} props.onRemovePhoto - Callback on photo delete.
 * @param {string} [props.error] - Optional validation error message.
 */
export function PhotoUploader({
  photos,
  status,
  onAddPhotos,
  onRemovePhoto,
  error,
}) {
  const inputRef = useRef(null);
  const statusCfg = STATUS_CONFIG[status];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddPhotos(e.target.files);
      e.target.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddPhotos(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const canAddMore = photos.length < FORM_LIMITS.MAX_PHOTOS;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* --- DESKTOP DROPZONE (Hidden on mobile) --- */}
      <div className="hidden md:block">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-bold text-gray-900">
            Foto barang (maks. 3)
          </label>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => canAddMore && inputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
            canAddMore
              ? "cursor-pointer border-gray-400 bg-gray-50/50 hover:border-gray-900"
              : "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
          }`}
        >
          <Upload className="mb-3 h-8 w-8 text-gray-500" />
          <p className="text-sm font-bold text-gray-900">
            Seret foto ke sini atau klik untuk pilih
          </p>
          <p className="mt-1 text-xs text-gray-600">JPG / PNG, maks. 5 MB</p>
        </div>

        {/* Desktop 3-slot preview row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[0, 1, 2].map((slotIndex) => {
            const photoUrl = photos[slotIndex];

            if (photoUrl) {
              return (
                <div
                  key={slotIndex}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200"
                >
                  <img
                    src={photoUrl}
                    alt={`Preview ${slotIndex + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemovePhoto(slotIndex)}
                    className="absolute top-1.5 right-1.5 rounded-full bg-gray-900/80 p-1 text-white transition hover:bg-gray-900"
                    title="Hapus foto"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            }

            return (
              <div
                key={slotIndex}
                className="flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50"
              >
                <span className="text-xs font-medium text-gray-400">—</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MOBILE STRIP (Visible only below md) --- */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-3">
          {/* Slot 1: Add action / First photo */}
          {photos.length === 0 ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400 bg-white p-2 text-center text-gray-900 transition hover:border-gray-900"
            >
              <Plus className="mb-1 h-5 w-5 text-gray-900" />
              <span className="text-xs leading-tight font-bold">
                Tambah foto
              </span>
            </button>
          ) : (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200">
              <img
                src={photos[0]}
                alt="Foto 1"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemovePhoto(0)}
                className="absolute top-1 right-1 rounded-full bg-gray-900/80 p-1 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          {/* Slot 2 */}
          {photos.length > 1 ? (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200">
              <img
                src={photos[1]}
                alt="Foto 2"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemovePhoto(1)}
                className="absolute top-1 right-1 rounded-full bg-gray-900/80 p-1 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : photos.length === 1 ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400 p-2 text-gray-900"
            >
              <Plus className="mb-1 h-5 w-5" />
              <span className="text-xs leading-tight font-bold">
                Tambah foto
              </span>
            </button>
          ) : (
            <div
              className={`aspect-square rounded-xl border border-dashed border-gray-300 ${statusCfg.previewBg} flex items-center justify-center p-2 text-center`}
            >
              <span className="text-xs font-medium text-gray-600">
                [Pratinjau]
              </span>
            </div>
          )}

          {/* Slot 3 */}
          {photos.length > 2 ? (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200">
              <img
                src={photos[2]}
                alt="Foto 3"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemovePhoto(2)}
                className="absolute top-1 right-1 rounded-full bg-gray-900/80 p-1 text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : photos.length === 2 ? (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-400 p-2 text-gray-900"
            >
              <Plus className="mb-1 h-5 w-5" />
              <span className="text-xs leading-tight font-bold">
                Tambah foto
              </span>
            </button>
          ) : (
            <div className="aspect-square rounded-xl border border-gray-200 bg-white" />
          )}
        </div>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}
