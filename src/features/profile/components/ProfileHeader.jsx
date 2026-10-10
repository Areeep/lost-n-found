 /**                                                                        
     *                                                                         
  ============================================================================ 
     * Component   : ProfileHeader                                             
     * Layer       : Feature Component                                         
     *                                                                         
     * Description:                                                            
     * Menampilkan avatar dengan ring aksen, username, aksi edit/bagikan profil,
     * ringkasan statistik (postingan, sudah kembali, disimpan), serta biodata.
     * Mendukung tata letak responsif mobile & desktop.                        
     *                                                                         
  ============================================================================ 
     */                                                                        
                                                                               
    import { LogOut } from "lucide-react";                                     
                                                                               
    /**                                                                        
     * Komponen header profil pengguna.                                        
     *                                                                         
     * @param {object} props Properti komponen.                                
     * @param {object} props.user Data objek pengguna.                         
     * @param {object} props.stats Statistik postingan pengguna.               
     * @param {Function} [props.onLogout] Handler logout pada mobile.          
     * @param {Function} [props.onEditProfile] Handler tombol edit profil.     
     * @param {Function} [props.onShareProfile] Handler tombol bagikan profil. 
     * @returns {JSX.Element} Bagian header profil.                            
     */                                                                        
    export function ProfileHeader({                                            
      user,                                                                    
      stats,                                                                   
      onLogout,                                                                
      onEditProfile,                                                           
      onShareProfile,                                                          
    }) {                                                                       
      return (                                                                 
        <header className="mb-6">                                              
          {/* =========================================================        
              VERSI DESKTOP (md:flex)                                          
              ========================================================= */}    
          <div className="hidden md:flex items-start gap-12">                  
            {/* Avatar Desktop dengan Outer Ring Coral */}                     
            <div className="shrink-0">                                         
              <div className="p-1 border-[3px] border-orange-600 rounded-full inline-block">                                                               
                <div                                                           
                  className={`size-36 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-heading font-extrabold text-4xl select-none`}                                                                
                >                                                              
                  {user.avatarInitials}                                        
                </div>                                                         
              </div>                                                           
            </div>                                                             
                                                                               
            {/* Info & Aksi Desktop */}                                        
            <div className="flex-1 space-y-4 pt-2">                            
              {/* Baris 1: Username & Tombol Aksi */}                          
              <div className="flex items-center gap-4">                        
                <h1 className="font-heading font-bold text-2xl text-gray-900 tracking-tight">                                                             
                  {user.username}                                              
                </h1>                                                          
                <div className="flex items-center gap-2">                      
                  <button                                                      
                    type="button"                                              
                    onClick={onEditProfile}                                    
                    className="h-9 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold transition-colors cursor-pointer"        
                  >                                                            
                    Edit profil                                                
                  </button>                                                    
                  <button                                                      
                    type="button"                                              
                    onClick={onShareProfile}                                   
                    className="h-9 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold transition-colors cursor-pointer"        
                  >                                                            
                    Bagikan profil                                             
                  </button>                                                    
                </div>                                                         
              </div>                                                           
                                                                               
              {/* Baris 2: Statistik */}                                       
              <div className="flex items-center gap-8 text-sm text-gray-700">  
                <div>                                                          
                  <strong className="text-gray-900 font-bold text-base mr-1.5">
                    {stats.posts}                                              
                  </strong>                                                    
                  <span>postingan</span>                                       
                </div>                                                         
                <div>                                                          
                  <strong className="text-gray-900 font-bold text-base mr-1.5">
                    {stats.returned}                                           
                  </strong>                                                    
                  <span>sudah kembali</span>                                   
                </div>                                                         
                <div>                                                          
                  <strong className="text-gray-900 font-bold text-base mr-1.5">
                    {stats.saved}                                              
                  </strong>                                                    
                  <span>disimpan</span>                                        
                </div>                                                         
              </div>                                                           
                                                                               
              {/* Baris 3: Nama Lengkap & Bio */}                              
              <div>                                                            
                <h2 className="font-bold text-sm text-gray-900">{user.name}</h2>                                                                   
                <p className="text-sm text-gray-600 mt-0.5">{user.bio}</p>     
              </div>                                                           
            </div>                                                             
          </div>                                                               
                                                                               
          {/* =========================================================        
              VERSI MOBILE (< md)                                              
              ========================================================= */}    
          <div className="md:hidden">                                          
            {/* Top Header: Username & Logout */}                              
            <div className="flex items-center justify-between mb-4">           
              <h1 className="font-heading font-bold text-lg text-gray-900">    
                {user.username}                                                
              </h1>                                                            
              <button                                                          
                type="button"                                                  
                onClick={onLogout}                                             
                aria-label="Keluar dari akun"                                  
                className="size-10 flex items-center justify-center text-gray-900 hover:text-orange-700 transition-colors"                                 
              >                                                                
                <LogOut size={22} />                                           
              </button>                                                        
            </div>                                                              
                                                                               
            {/* Baris Avatar & Statistik */}                                   
            <div className="flex items-center gap-6 mb-4">                     
              {/* Avatar Mobile */}                                            
              <div className="p-0.5 border-2 border-orange-600 rounded-full shrink-0">                                                                   
                <div                                                           
                  className={`size-20 rounded-full ${user.avatarColor} flex items-center justify-center text-white font-heading font-extrabold text-2xl select-none`}                                                                
                >                                                              
                  {user.avatarInitials}                                        
                </div>                                                         
              </div>                                                           
                                                                               
              {/* Statistik Mobile */}                                         
              <div className="flex-1 grid grid-cols-3 text-center">            
                <div>                                                          
                  <span className="block font-bold text-base text-gray-900">   
                    {stats.posts}                                              
                  </span>                                                      
                  <span className="text-xs text-gray-600">Postingan</span>     
                </div>                                                         
                <div>                                                          
                  <span className="block font-bold text-base text-gray-900">   
                    {stats.returned}                                           
                  </span>                                                      
                  <span className="text-xs text-gray-600 leading-tight">       
                    Sudah kembali                                              
                  </span>                                                      
                </div>                                                         
                <div>                                                          
                  <span className="block font-bold text-base text-gray-900">   
                    {stats.saved}                                              
                  </span>                                                      
                  <span className="text-xs text-gray-600">Disimpan</span>      
                </div>                                                         
              </div>                                                           
            </div>                                                             
                                                                               
            {/* Bio Mobile */}                                                 
            <div className="mb-4">                                             
              <h2 className="font-bold text-sm text-gray-900">{user.name}</h2> 
              <p className="text-sm text-gray-600 mt-0.5">{user.bio}</p>       
            </div>                                                             
                                                                               
            {/* Tombol Aksi Mobile */}                                         
            <div className="grid grid-cols-2 gap-2">                           
              <button                                                          
                type="button"                                                  
                onClick={onEditProfile}                                        
                className="h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold transition-colors"                                
              >                                                                
                Edit profil                                                    
              </button>                                                        
              <button                                                          
                type="button"                                                  
                onClick={onShareProfile}                                       
                className="h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold transition-colors"                                
              >                                                                
                Bagikan profil                                                 
              </button>                                                        
            </div>                                                             
          </div>                                                               
        </header>                                                              
      );                                                                       
    } 