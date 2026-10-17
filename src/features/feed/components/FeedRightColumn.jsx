/**
 * ============================================================================
 * Component   : FeedRightColumn
 * Layer       : Feature Component
 *
 * Description:
 * Kolom samping kanan untuk tampilan desktop (>= 1024px). Menampilkan
 * ringkasan profil pengguna aktif, daftar barang baru saja kembali yang
 * diambil langsung dari storage.js, serta kartu ajakan (callout).
 * ============================================================================
 */

import { Link } from "react-router-dom";
import { getPosts } from "../../../lib/storage";

/**
 * Komponen kolom kanan beranda desktop.
 *
 * @param {object} props Properti komponen.
 * @param {object|null} props.currentUser Pengguna aktif saat ini.
 * @returns {JSX.Element} Elemen kolom kanan desktop.
 */
export function FeedRightColumn({ currentUser }) {
    const user = currentUser || {
        username: "rina.ay",
        name: "Rina Ayuningtyas",
        avatarInitials: "RA",
        avatarColor: "bg-violet-600",
    };

    // * Ambil seluruh data postingan dari storage.js
    const allPosts = getPosts();

    // ? Saring postingan yang berstatus sudah kembali (isReturned: true)
    const returnedPosts = allPosts.filter((item) => item.isReturned);

    // * Gunakan postingan sudah kembali, atau fallback ke barang storage representatif
    const displayedItems =
        returnedPosts.length > 0
            ? returnedPosts.slice(0, 4)
            : allPosts.filter((item) => ["p4", "p7", "p11"].includes(item.id)).length > 0
            ? allPosts.filter((item) => ["p4", "p7", "p11"].includes(item.id))
            : allPosts.slice(0, 3);

    return (
        <aside className="w-80 shrink-0 space-y-5 hidden lg:block sticky top-8 self-start">
            {/* Profil Ringkas Pengguna */}
            <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                    <div
                        className={`size-11 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 ${
                            user.avatarColor || "bg-violet-600"
                        }`}
                    >
                        {user.avatarInitials || "RA"}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-bold text-sm text-gray-900 leading-tight">
                            {user.username}
                        </span>
                        <span className="text-xs text-gray-600 leading-tight">
                            {user.name}
                        </span>
                    </div>
                </div>

                <Link
                    to="/profil"
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                    Profil
                </Link>
            </div>

            {/* Kartu: Baru saja kembali (Data dari storage.js) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
                <h2 className="font-heading font-bold text-sm text-gray-900 mb-3.5">
                    Baru saja kembali
                </h2>

                <div className="space-y-3">
                    {displayedItems.map((item, index) => {
                        const photoUrl =
                            item.photos && item.photos.length > 0 ? item.photos[0] : null;

                        const timeLabel = item.postedTimeAgo
                            ? `Kembali ${item.postedTimeAgo.replace("Diposting ", "")}`
                            : index === 0
                            ? "Kembali ke pemiliknya kemarin"
                            : `Kembali ${index + 1} hari lalu`;

                        return (
                            <Link
                                key={item.id}
                                to={`/post/${item.id}`}
                                className="flex items-center gap-3 group transition-opacity hover:opacity-85"
                            >
                                {photoUrl ? (
                                    <img
                                        src={photoUrl}
                                        alt={item.name}
                                        className="size-10 rounded-lg object-cover shrink-0 border border-gray-100"
                                    />
                                ) : (
                                    <div
                                        className={`size-10 rounded-lg ${
                                            item.bgTint || "bg-emerald-100"
                                        } shrink-0`}
                                    />
                                )}
                                <div className="flex flex-col min-w-0">
                                    <span className="font-bold text-xs text-gray-900 truncate group-hover:underline">
                                        {item.name}
                                    </span>
                                    <span className="text-[11px] text-gray-600 truncate">
                                        {timeLabel}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Kartu Callout: Nemu barang orang? */}
            <div className="bg-primary rounded-2xl p-5 text-white shadow-xs">
                <h2 className="font-heading font-bold text-base mb-1.5">
                    Nemu barang orang?
                </h2>
                <p className="text-xs text-blue-200 leading-relaxed mb-4">
                    Foto barangnya, tulis lokasinya, lalu titipkan ke pos satpam terdekat kalau bisa.
                </p>

                <Link
                    to="/buat"
                    className="w-full h-10 bg-white hover:bg-blue-50 text-primary font-bold text-xs rounded-xl flex items-center justify-center transition-colors shadow-xs"
                >
                    Posting sekarang
                </Link>
            </div>
        </aside>
    );
}
