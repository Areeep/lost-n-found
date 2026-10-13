 /**                                                                        
     *                                                                         
  ============================================================================ 
     * Component   : ProfilePostGrid                                           
     * Layer       : Feature Component                                         
     *                                                                         
     * Description:                                                            
     * Menampilkan grid 3 kolom postingan berbentuk persegi dengan status      
     * overlay "SUDAH KEMBALI" dan badge nama barang di kiri bawah.            
     *                                                                         
  ============================================================================ 
     */                                                                        
                                                                               
    import { Check } from "lucide-react";                                      
                                                                               
    /**                                                                        
     * Grid item postingan profil.                                             
     *                                                                         
     * @param {object} props Properti komponen.                                
     * @param {Array<object>} props.posts Daftar item postingan.               
     * @param {Function} [props.onSelectPost] Callback ketika item ditekan.    
     * @returns {JSX.Element} Elemen grid postingan.                           
     */                                                                        
    export function ProfilePostGrid({ posts, onSelectPost }) {                 
      if (!posts || posts.length === 0) {                                      
        return (                                                               
          <div className="py-16 text-center text-sm text-gray-500">            
            Belum ada postingan untuk ditampilkan.                             
          </div>                                                               
        );                                                                     
      }                                                                        
                                                                               
      return (                                                                 
        <div className="grid grid-cols-3 gap-0.5 md:gap-1.5">                  
          {posts.map((item) => {                                               
            // ? Warna fallback bila foto belum diunggah                       
            const bgClass = item.bgColor || "bg-gray-200";                     
                                                                               
            return (                                                           
              <button                                                          
                key={item.id}                                                  
                type="button"                                                  
                onClick={() => onSelectPost?.(item.id)}                        
                className={`aspect-square relative overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-blue-700 cursor-pointer ${bgClass}`}                                                                 
              >                                                                
                {/* Overlay SUDAH KEMBALI jika barang telah kembali */}        
                {item.isReturned && (                                          
                  <div className="absolute inset-0 bg-gray-900/40 flex flex-col items-center justify-center text-white p-2">                                 
                    <Check                                                     
                      size={26}                                                
                      strokeWidth={2.5}                                        
                      className="mb-1 text-white"                              
                    />                                                         
                    <span className="font-heading font-extrabold text-[11px] md:text-xs tracking-wider uppercase text-center">                            
                      SUDAH KEMBALI                                            
                    </span>                                                    
                  </div>                                                       
                )}                                                             
                                                                               
                {/* Label Nama Barang di Kiri Bawah */}                        
                <div className="absolute bottom-2 left-2 max-w-[85%]">         
                  <span                                                        
                    className={`inline-block truncate text-[11px] md:text-xs px-2 py-0.5 rounded shadow-sm ${                                             
                      item.isReturned                                          
                        ? "bg-black/50 text-white font-medium backdrop-blur-xs"
                        : "bg-white/95 text-gray-900 font-semibold"            
                    }`}                                                        
                  >                                                            
                    {item.name}                                                
                  </span>                                                      
                </div>                                                         
              </button>                                                        
            );                                                                 
          })}                                                                  
        </div>                                                                 
      );                                                                       
    } 