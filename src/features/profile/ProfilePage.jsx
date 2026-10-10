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
          <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 p-6 shrink-0 justify-between min-h-screen sticky top-0 h-screen">                                                                     
            <div className="space-y-6">                                        
              {/* Logo Brand */}                                               
              <div className="font-heading font-extrabold text-[28px] tracking-tight text-gray-900">                                                        
                temuin<span className="text-orange-700">.</span>               
              </div>                                                           
                                                                               
              {/* Menu Navigasi Samping */}                                    
              <nav className="space-y-1">                                      
                <button                                                        
                  type="button"                                                
                  onClick={onNavigateHome}                                     
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"                                                  
                >                                                              
                  <House size={20} />                                          
                  <span>Beranda</span>                                         
                </button>                                                      
                <button                                                        
                  type="button"                                                
                  onClick={onNavigateSearch}                                   
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"                                                  
                >                                                              
                  <Search size={20} />                                         
                  <span>Cari</span>                                            
                </button>                                                      
                <button                                                        
                  type="button"                                                
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"                                                  
                >                                                              
                  <Bell size={20} />                                           
                  <span>Notifikasi</span>                                      
                </button>                                                      
                <button                                                        
                  type="button"                                                
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"                                                  
                >                                                              
                  <MessageSquare size={20} />                                  
                  <span>Pesan</span>                                           
                </button>                                                      
                {/* Item Aktif: Profil */}                                     
                <button                                                        
                  type="button"                                                
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-gray-900 bg-gray-100 transition-colors"    
                >                                                              
                  <User size={20} fill="currentColor" />                       
                  <span>Profil</span>                                          
                </button>                                                      
              </nav>                                                           
                                                                               
              {/* Tombol Buat Postingan Desktop */}                            
              <button                                                          
                type="button"                                                  
                onClick={onNavigateCreate}                                     
                className="w-full h-12 rounded-xl bg-gray-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"                                  
              >                                                                
                <Plus size={18} />                                             
                <span>Posting barang</span>                                    
              </button>                                                        
            </div>                                                             
          </aside>                                                             
                                                                               
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
