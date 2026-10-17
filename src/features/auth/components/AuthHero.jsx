/**
 * ============================================================================
 * Component   : AuthHero
 * Layer       : Feature Component
 *
 * Description:
 * Kolom samping visual branding (desktop) berisi logo, 3 kartu showcase
 * floating status barang (HILANG, DITEMUKAN, SUDAH KEMBALI), dan tagline utama.
 * ============================================================================
 */

import { Check } from "lucide-react";
import { AuthBrandLogo } from "./AuthBrandLogo";

/**
 * Komponen hero panel samping khusus layar desktop.
 *
 * @returns {JSX.Element} Panel hero branding desktop.
 */
export function AuthHero() {
    return (
        <aside className="hidden md:flex flex-col justify-between bg-gray-900 text-white p-8 lg:p-14 min-h-screen relative overflow-hidden select-none">
            {/* Top Logo */}
            <div>
                <AuthBrandLogo theme="light" />
            </div>

            {/* Showcase Floating Cards */}
            <div className="my-auto space-y-4 max-w-sm w-full py-8">
                {/* Kartu 1: Hilang */}
                <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 transform -rotate-3 transition-transform duration-300 hover:rotate-0">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="size-12 rounded-xl bg-orange-100 flex-shrink-0" />
                        <div className="min-w-0">
                            <h2 className="font-bold text-sm text-gray-900 truncate">
                                Dompet kulit coklat
                            </h2>
                            <p className="text-xs text-gray-600 truncate">
                                Kantin Gedung B
                            </p>
                        </div>
                    </div>
                    <span className="bg-orange-700 text-white font-heading font-bold text-xs capitalize px-2.5 py-1 rounded-md flex-shrink-0">
                        Hilang
                    </span>
                </div>

                {/* Kartu 2: Ditemukan */}
                <div className="bg-white text-gray-900 p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 transform -rotate-1 translate-x-3 transition-transform duration-300 hover:rotate-0 hover:translate-x-0">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="size-12 rounded-xl bg-emerald-100 flex-shrink-0" />
                        <div className="min-w-0">
                            <h2 className="font-bold text-sm text-gray-900 truncate">
                                Kunci motor
                            </h2>
                            <p className="text-xs text-gray-600 truncate">
                                Parkiran Timur
                            </p>
                        </div>
                    </div>
                    <span className="bg-emerald-700 text-white font-heading font-bold text-xs capitalize px-2.5 py-1 rounded-md flex-shrink-0">
                        Ditemukan
                    </span>
                </div>

                {/* Kartu 3: SUDAH KEMBALI */}
                <div className="bg-gray-700/80 backdrop-blur border border-gray-600/40 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 transform rotate-1 transition-transform duration-300 hover:rotate-0">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="size-12 rounded-xl bg-emerald-200 flex-shrink-0" />
                        <div className="min-w-0">
                            <h2 className="font-bold text-sm text-white truncate">
                                Botol minum hijau
                            </h2>
                            <p className="text-xs text-gray-300 truncate">
                                Kembali ke pemiliknya
                            </p>
                        </div>
                    </div>
                    <div className="size-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Check size={16} className="text-white" strokeWidth={3} />
                    </div>
                </div>
            </div>

            {/* Bottom Headline */}
            <div>
                <h1 className="font-heading font-extrabold text-3xl lg:text-5xl text-white tracking-tight leading-tight max-w-sm">
                    Barang hilang? Temuin di sini.
                </h1>
            </div>
        </aside>
    );
}
