/**
 * @fileoverview Form state orchestrator and business logic hook.
 * Handles validation, photo conversions, and submission lifecycle.
 */

import { useState, useCallback } from "react";
import { POST_STATUS, FORM_LIMITS } from "../constants/postConstants";
import { savePost } from "../services/postStorage";

/**
 * Initial empty form values.
 */
const initialFormValues = {
  status: POST_STATUS.LOST,
  itemName: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  location: "",
  description: "",
  contactWhatsapp: "",
  photos: [],
};

/**
 * Custom hook for post creation state and operations.
 * @param {Object} options
 * @param {(createdPost: Object) => void} [options.onSuccess] - Callback after successful save.
 * @returns {Object} Form bindings, handlers, and validation state.
 */
export function useCreatePost({ onSuccess } = {}) {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates status between LOST and FOUND.
   * @param {string} nextStatus
   */
  const handleStatusChange = useCallback((nextStatus) => {
    setValues((prev) => ({ ...prev, status: nextStatus }));
  }, []);

  /**
   * Generic text/select change handler.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>} e
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  }, []);

  /**
   * Validates and appends files up to MAX_PHOTOS.
   * @param {FileList | File[]} fileList
   */
  const handleAddPhotos = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      const remainingSlots = FORM_LIMITS.MAX_PHOTOS - values.photos.length;
      if (remainingSlots <= 0) {
        setErrors((prev) => ({
          ...prev,
          photos: `Maksimal ${FORM_LIMITS.MAX_PHOTOS} foto`,
        }));
        return;
      }

      const filesToProcess = incoming.slice(0, remainingSlots);
      const validFiles = filesToProcess.filter((file) => {
        if (!FORM_LIMITS.SUPPORTED_IMAGE_TYPES.includes(file.type)) {
          setErrors((prev) => ({
            ...prev,
            photos: "Format foto harus JPG, PNG, atau WebP",
          }));
          return false;
        }
        if (file.size > FORM_LIMITS.MAX_PHOTO_SIZE_BYTES) {
          setErrors((prev) => ({
            ...prev,
            photos: "Ukuran foto maksimal 5 MB per berkas",
          }));
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      // Convert files to base64 for persistent preview and localStorage persistence
      Promise.all(
        validFiles.map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (ev) => resolve(ev.target.result);
              reader.readAsDataURL(file);
            }),
        ),
      ).then((dataUrls) => {
        setValues((prev) => ({
          ...prev,
          photos: [...prev.photos, ...dataUrls],
        }));
        setErrors((prev) => ({ ...prev, photos: "" }));
      });
    },
    [values.photos.length],
  );

  /**
   * Removes photo by index.
   * @param {number} index
   */
  const handleRemovePhoto = useCallback((index) => {
    setValues((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  }, []);

  /**
   * Pure validation check.
   * @returns {boolean} True if all mandatory fields valid.
   */
  const validateForm = useCallback(() => {
    const nextErrors = {};

    if (!values.itemName.trim()) {
      nextErrors.itemName = "Nama barang wajib diisi";
    }
    if (!values.category) {
      nextErrors.category = "Pilih kategori barang";
    }
    if (!values.date) {
      nextErrors.date = "Tanggal wajib diisi";
    }
    if (!values.location.trim()) {
      nextErrors.location = "Lokasi wajib diisi";
    }

    const cleanWa = values.contactWhatsapp.trim();
    if (!cleanWa) {
      nextErrors.contactWhatsapp = "Nomor WhatsApp wajib diisi";
    } else if (!/^08[0-9]{8,12}$/.test(cleanWa.replace(/[-\s]/g, ""))) {
      nextErrors.contactWhatsapp =
        "Format nomor WhatsApp tidak valid (cth: 081234567890)";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  /**
   * Form submit executor.
   * @param {React.FormEvent} e
   */
  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!validateForm()) return;

      setIsSubmitting(true);
      try {
        const saved = savePost({
          status: values.status,
          itemName: values.itemName.trim(),
          category: values.category,
          date: values.date,
          location: values.location.trim(),
          description: values.description.trim(),
          contactWhatsapp: values.contactWhatsapp.trim(),
          photos: values.photos,
        });

        if (onSuccess) {
          onSuccess(saved);
        }
      } catch (err) {
        setErrors((prev) => ({ ...prev, form: err.message }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, values, onSuccess],
  );

  return {
    values,
    errors,
    isSubmitting,
    handleStatusChange,
    handleInputChange,
    handleAddPhotos,
    handleRemovePhoto,
    handleSubmit,
  };
}
