/**
 * @fileoverview Main Page Component for "Buat Postingan".
 * Harmonizes mobile and desktop viewport designs faithfully with mockups.
 */

import { Sidebar } from "../../../components/Sidebar";
import { PhotoUploader } from "../components/PhotoUploader";
import { StatusPicker } from "../components/StatusPicker";
import { useCreatePost } from "../hooks/useCreatePost";
import { ITEM_CATEGORIES, STATUS_CONFIG } from "../constants/postConstants";

/**
 * Fullscreen Buat Postingan page.
 * @param {Object} props
 * @param {() => void} [props.onCancel] - Navigation callback when user cancels.
 * @param {(post: Object) => void} [props.onCreated] - Callback on post completion.
 */
export function CreatePostPage({ onCancel, onCreated }) {
  const {
    values,
    errors,
    isSubmitting,
    handleStatusChange,
    handleInputChange,
    handleAddPhotos,
    handleRemovePhoto,
    handleSubmit,
  } = useCreatePost({
    onSuccess: (post) => {
      alert("Postingan berhasil disimpan!");
      if (onCreated) onCreated(post);
    },
  });

  const statusCfg = STATUS_CONFIG[values.status];

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 font-sans text-gray-900 md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <main className="flex min-w-0 flex-1 flex-col items-center md:px-8 md:py-10">
        {/* --- MOBILE TOP NAVBAR (< md) --- */}
        <header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
          <button
            type="button"
            onClick={onCancel}
            className="flex min-h-[44px] cursor-pointer items-center text-sm font-semibold text-gray-900"
          >
            Batal
          </button>
          <h1 className="font-heading text-base font-bold text-gray-900">
            Buat postingan
          </h1>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex min-h-[44px] cursor-pointer items-center text-sm font-bold text-blue-700 disabled:opacity-50"
          >
            Bagikan
          </button>
        </header>

        {/* Content Box */}
        <div className="w-full max-w-5xl">
          {/* Desktop Title & Subtitle Header */}
          <div className="mb-6 hidden items-start justify-between md:flex">
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-gray-900">
                Buat postingan
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Makin lengkap ciri-cirinya, makin cepat barangnya ketemu.
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer pt-1 text-sm font-bold text-gray-900 transition hover:text-gray-600"
            >
              Batal
            </button>
          </div>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white p-4 shadow-none md:rounded-2xl md:border md:border-gray-200 md:p-8 md:shadow-sm"
          >
            {errors.form && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errors.form}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
              {/* LEFT COLUMN: Photo Uploading (5 cols on desktop) */}
              <div className="md:col-span-5">
                <PhotoUploader
                  photos={values.photos}
                  status={values.status}
                  onAddPhotos={handleAddPhotos}
                  onRemovePhoto={handleRemovePhoto}
                  error={errors.photos}
                />
              </div>

              {/* RIGHT COLUMN: Form Inputs (7 cols on desktop) */}
              <div className="space-y-5 md:col-span-7">
                {/* 1. Status Picker */}
                <StatusPicker
                  status={values.status}
                  onChange={handleStatusChange}
                />

                {/* 2. Nama Barang */}
                <div>
                  <label
                    htmlFor="itemName"
                    className="mb-1.5 block text-sm font-bold text-gray-900"
                  >
                    Nama barang
                  </label>
                  <input
                    id="itemName"
                    name="itemName"
                    type="text"
                    value={values.itemName}
                    onChange={handleInputChange}
                    placeholder="cth. Dompet kulit coklat"
                    className={`h-12 w-full rounded-lg border px-3 text-sm text-gray-900 transition focus:ring-2 focus:ring-gray-900 focus:outline-none ${
                      errors.itemName ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  {errors.itemName && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {errors.itemName}
                    </p>
                  )}
                </div>

                {/* 3. Kategori & Tanggal (2 columns) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Kategori */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-1.5 block text-sm font-bold text-gray-900"
                    >
                      Kategori
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={values.category}
                      onChange={handleInputChange}
                      className={`h-12 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 transition focus:ring-2 focus:ring-gray-900 focus:outline-none ${
                        errors.category ? "border-red-600" : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih...</option>
                      {ITEM_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Tanggal */}
                  <div>
                    <label
                      htmlFor="date"
                      className="mb-1.5 block text-sm font-bold text-gray-900"
                    >
                      {statusCfg.dateLabel}
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={values.date}
                      onChange={handleInputChange}
                      className={`h-12 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 transition focus:ring-2 focus:ring-gray-900 focus:outline-none ${
                        errors.date ? "border-red-600" : "border-gray-300"
                      }`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs font-medium text-red-600">
                        {errors.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* 4. Lokasi */}
                <div>
                  <label
                    htmlFor="location"
                    className="mb-1.5 block text-sm font-bold text-gray-900"
                  >
                    {statusCfg.locationLabel}
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={values.location}
                    onChange={handleInputChange}
                    placeholder={statusCfg.locationPlaceholder}
                    className={`h-12 w-full rounded-lg border px-3 text-sm text-gray-900 transition focus:ring-2 focus:ring-gray-900 focus:outline-none ${
                      errors.location ? "border-red-600" : "border-gray-300"
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* 5. Ciri-ciri & keterangan */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-1.5 block text-sm font-bold text-gray-900"
                  >
                    Ciri-ciri &amp; keterangan
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={values.description}
                    onChange={handleInputChange}
                    placeholder="Warna, merek, isi, tanda khusus..."
                    className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-gray-900 transition focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  />
                </div>

                {/* 6. Kontak (WhatsApp) */}
                <div>
                  <label
                    htmlFor="contactWhatsapp"
                    className="mb-1.5 block text-sm font-bold text-gray-900"
                  >
                    Kontak (WhatsApp)
                  </label>
                  <input
                    id="contactWhatsapp"
                    name="contactWhatsapp"
                    type="tel"
                    value={values.contactWhatsapp}
                    onChange={handleInputChange}
                    placeholder="08xx-xxxx-xxxx"
                    className={`h-12 w-full rounded-lg border px-3 text-sm text-gray-900 transition focus:ring-2 focus:ring-gray-900 focus:outline-none ${
                      errors.contactWhatsapp
                        ? "border-red-600"
                        : "border-gray-300"
                    }`}
                  />
                  <p className="mt-1.5 text-xs text-gray-600">
                    Hanya terlihat oleh orang yang menghubungimu lewat chat.
                  </p>
                  {errors.contactWhatsapp && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {errors.contactWhatsapp}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white shadow-sm transition hover:bg-gray-800 disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Menyimpan..." : "Bagikan postingan"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
