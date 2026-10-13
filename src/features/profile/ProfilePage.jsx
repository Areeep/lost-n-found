/**                                                                        
    *                                                                         
 ============================================================================ 
    * Component   : ProfilePage                                               
    * Layer       : Feature Page                                              
    *                                                                         
    * Description:                                                            
    * Komposisi utama halaman profil pengguna, mengintegrasikan sidebar       
 desktop,                                                                     
    * bottom navigation mobile, header profil, tab navigasi, dan grid         
 postingan.                                                                   
    *                                                                         
 ============================================================================ 
    */

import {
  House,
  Search,
  Bell,
  MessageSquare,
  User,
  Plus,
  SquarePlus,
} from "lucide-react";
import { useProfile } from "./hooks/useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileTabs } from "./components/ProfileTabs";
import { ProfilePostGrid } from "./components/ProfilePostGrid";
import { Sidebar } from "../../components/Sidebar";
/**                                                                        
 * Halaman Profil Utama aplikasi temuin.                                   
 *                                                                         
 * @param {object} props Properti komponen.                                
 * @param {Function} [props.onNavigateHome] Callback navigasi ke Beranda.  
 * @param {Function} [props.onNavigateSearch] Callback navigasi ke Cari.   
 * @param {Function} [props.onNavigateCreate] Callback navigasi ke Buat    
Postingan.                                                                   
 * @param {Function} [props.onNavigatePostDetail] Callback navigasi ke     
Detail Postingan.                                                            
 * @param {Function} [props.onLogout] Callback keluar akun.                
 * @returns {JSX.Element} Tampilan lengkap halaman profil.                 
 */
export function ProfilePage({
  onNavigateHome,
  onNavigateSearch,
  onNavigateCreate,
  onNavigatePostDetail,
  onLogout,
}) {
  const { user, activeTab, setActiveTab, stats, posts } = useProfile();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans text-gray-900">
      {/* =========================================================        
              DESKTOP SIDEBAR (md: >= 768px sesuai design.md §5)               
              ========================================================= */}
      <Sidebar activeItem="profil" />

      {/* =========================================================        
              KONTEN UTAMA PROFIL                                              
              ========================================================= */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-8">
        <div className="max-w-[935px] w-full mx-auto p-4 md:p-8">
          {/* Header Profil */}
          <ProfileHeader
            user={user}
            stats={stats}
            onLogout={onLogout}
            onEditProfile={() => alert("Fitur edit profil")}
            onShareProfile={() => alert("Tautan profil disalin")}
          />

          {/* Tab Navigasi */}
          <ProfileTabs activeTab={activeTab} onChangeTab={setActiveTab} />

          {/* Grid Foto Postingan */}
          <ProfilePostGrid
            posts={posts}
            onSelectPost={(id) => onNavigatePostDetail?.(id)}
          />
        </div>
      </main>

      {/* =========================================================        
              MOBILE BOTTOM NAV (< md: 768px sesuai design.md §6)              
              ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 h-14 grid grid-cols-4 items-center">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600"
        >
          <House size={20} />
          <span className="text-[11px]">Beranda</span>
        </button>
        <button
          type="button"
          onClick={onNavigateSearch}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600"
        >
          <Search size={20} />
          <span className="text-[11px]">Cari</span>
        </button>
        <button
          type="button"
          onClick={onNavigateCreate}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600"
        >
          <SquarePlus size={20} />
          <span className="text-[11px]">Posting</span>
        </button>
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-0.5 text-gray-900 font-bold"
        >
          <User size={20} fill="currentColor" />
          <span className="text-[11px]">Profil</span>
        </button>
      </nav>
    </div>
  );
}
