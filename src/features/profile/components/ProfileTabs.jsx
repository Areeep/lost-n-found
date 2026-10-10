 /**                                                                        
     *                                                                         
  ============================================================================ 
     * Component   : ProfileTabs                                               
     * Layer       : Feature Component                                         
     *                                                                         
     * Description:                                                            
     * Tab navigasi untuk beralih antara tampilan POSTINGAN dan DISIMPAN.      
     *                                                                         
  ============================================================================ 
     */                                                                        
                                                                               
    /**                                                                        
     * Komponen pemilih tab postingan / simpanan profil.                       
     *                                                                         
     * @param {object} props Properti komponen.                                
     * @param {string} props.activeTab Tab yang aktif ("posts" | "saved").     
     * @param {Function} props.onChangeTab Callback pergantian tab.            
     * @returns {JSX.Element} Elemen tab navigasi.                             
     */                                                                        
    export function ProfileTabs({ activeTab, onChangeTab }) {                  
      return (                                                                 
        <div className="border-t border-gray-200">                             
          <div className="flex justify-center md:gap-12">                      
            {/* Tab Postingan */}                                              
            <button                                                            
              type="button"                                                    
              onClick={() => onChangeTab("posts")}                             
              className={`flex-1 md:flex-none py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-t-2 ${      
                activeTab === "posts"                                          
                  ? "border-gray-900 text-gray-900 -mt-[1px]"                  
                  : "border-transparent text-gray-500 hover:text-gray-900"     
              }`}                                                              
            >                                                                  
              POSTINGAN                                                        
            </button>                                                          
                                                                               
            {/* Tab Disimpan */}                                               
            <button                                                            
              type="button"                                                    
              onClick={() => onChangeTab("saved")}                             
              className={`flex-1 md:flex-none py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-t-2 ${      
                activeTab === "saved"                                          
                  ? "border-gray-900 text-gray-900 -mt-[1px]"                  
                  : "border-transparent text-gray-500 hover:text-gray-900"     
              }`}                                                              
            >                                                                  
              DISIMPAN                                                         
            </button>                                                          
          </div>                                                               
        </div>                                                                 
      );                                                                       
    } 