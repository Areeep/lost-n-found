/**
 * ============================================================================
 * Component   : PostDetailComments
 * Layer       : Feature Component
 *
 * Description:
 * Menampilkan daftar komentar dari pengguna lain serta input untuk
 * menambahkan komentar baru.
 * ============================================================================
 */

/**
 * Komponen komentar postingan.
 *
 * @param {object} props Properti komponen.
 * @param {Array<object>} props.comments Daftar komentar.
 * @param {string} props.commentText Nilai input komentar.
 * @param {Function} props.onCommentChange Handler perubahan teks komentar.
 * @param {Function} props.onSubmit Handler submit komentar.
 * @returns {JSX.Element} Bagian komentar.
 */
export function PostDetailComments({
    comments = [],
    commentText,
    onCommentChange,
    onSubmit,
}) {
    return (
        <div className="space-y-4">
            <h2 className="font-heading font-bold text-sm text-gray-900">
                Komentar ({comments.length})
            </h2>

            {/* List Komentar */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-2.5">
                        <div
                            className={`size-8 shrink-0 rounded-full text-white text-xs font-bold flex items-center justify-center ${comment.avatarColor || "bg-teal-700"
                                }`}
                        >
                            {comment.avatarInitials}
                        </div>
                        <div className="flex-1 text-sm leading-snug">
                            <span className="font-bold text-gray-900 mr-1.5">
                                {comment.username}
                            </span>
                            <span className="text-gray-900">{comment.text}</span>
                            <p className="text-xs text-gray-600 mt-0.5">{comment.createdAt}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Input Komentar */}
            <form onSubmit={onSubmit} className="pt-1">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder="Tulis komentar..."
                    className="w-full h-11 px-4 rounded-full border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none focus:border-gray-900 transition-colors"
                />
            </form>
        </div>
    );
}
