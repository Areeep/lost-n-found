/**
 * ============================================================================
 * Component   : ProfileTabs
 * Layer       : Feature Component
 *
 * Description:
 * Header penanda bagian daftar POSTINGAN pada halaman profil.
 * ============================================================================
 */

/**
 * Komponen penanda bagian grid postingan profil.
 *
 * @returns {JSX.Element} Elemen tab postingan.
 */
export function ProfileTabs() {
  return (
    <div className="border-t border-gray-200">
      <div className="flex justify-center">
        <div className="-mt-[1px] border-t-2 border-gray-900 px-4 py-3 text-xs font-bold tracking-wider text-gray-900 uppercase">
          POSTINGAN
        </div>
      </div>
    </div>
  );
}
