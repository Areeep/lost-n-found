/**
 * ============================================================================
 * Component   : PostDetailComments
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan daftar komentar postingan, status kosong, counter otomatis,
 * dan form input komentar dengan tombol kirim berikon pesawat (Send).
 * ============================================================================
 */

import { Send } from "lucide-react";

/**
 * Komponen komentar postingan barang.
 *
 * @param {object} props Properti komponen.
 * @param {Array<object>} props.comments Daftar komentar postingan.
 * @param {string} props.commentText Teks komentar saat ini.
 * @param {Function} props.onCommentChange Handler perubahan teks komentar.
 * @param {Function} props.onSubmit Handler pengiriman komentar.
 * @returns {JSX.Element} Elemen tampilan komentar.
 */
export function PostDetailComments({
    comments = [],
    commentText = "",
    onCommentChange,
    onSubmit,
}) {
    const isCommentEmpty = !commentText.trim();

    return (
        <div className="space-y-4">
            {/* * Counter jumlah komentar otomatis terhitung dari panjang array */}
            <h2 className="font-heading text-sm font-bold text-gray-900">
                Komentar ({comments.length})
            </h2>

            {/* List Komentar */}
            <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
                {comments.length === 0 ? (
                    <p className="py-2 text-xs italic text-gray-500">
                        Belum ada komentar. Jadilah yang pertama berkomentar!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2.5">
                            <div
                                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${comment.avatarColor || "bg-teal-700"
                                    }`}
                            >
                                {comment.avatarInitials}
                            </div>
                            <div className="flex-1 text-sm leading-snug">
                                <span className="mr-1.5 font-bold text-gray-900">
                                    {comment.username}
                                </span>
                                <span className="text-gray-900">{comment.text}</span>
                                <p className="mt-0.5 text-xs text-gray-600">
                                    {comment.createdAt}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Input Komentar Berikon Pesawat */}
            <form onSubmit={onSubmit} className="relative flex items-center pt-1">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="h-11 w-full rounded-full border border-gray-300 bg-white pr-12 pl-4 text-sm text-gray-900 placeholder:text-gray-600 transition-colors focus:border-gray-900 focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={isCommentEmpty}
                    aria-label="Kirim komentar"
                    className="absolute right-1.5 flex size-8 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-30"
                >
                    {/* * Icon pesawat (Send) dari Lucide sesuai design.md */}
                    <Send size={15} />
                </button>
            </form>
        </div>
    );
}
