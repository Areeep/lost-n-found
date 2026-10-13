  /**                                                                        
     *                                                                         
  ============================================================================ 
     * Hook        : useProfile                                                
     * Layer       : Feature Hook                                              
     *                                                                         
     * Description:                                                            
     * Mengelola state profil pengguna, tab aktif, statistik postingan,        
     * dan penyaringan data item untuk grid profil.                            
     *                                                                         
  ============================================================================ 
     */                                                                        
                                                                               
    import { useState, useMemo } from "react";                                 
    import { getPosts, isPostSaved } from "../../../lib/storage";              
                                                                               
    // * Data mock pengguna sesuai screenshot & PRD §6                         
    const DEFAULT_USER = {                                                     
      id: "u1",                                                                
      username: "rina.ay",                                                     
      name: "Rina Ayuningtyas",                                                
      bio: "Teknik Informatika '24 · suka lupa naruh barang",                  
      avatarInitials: "RA",                                                    
      avatarColor: "bg-violet-600",                                            
    };                                                                         
                                                                               
    // * Mock item visual spesifik sesuai screenshot bila belum ada di storage 
    const FALLBACK_PROFILE_POSTS = [                                           
      {                                                                        
        id: "p1",                                                              
        name: "Dompet coklat",                                                 
        isReturned: false,                                                     
        bgColor: "bg-[#fde4c7]",                                               
        category: "Dompet",                                                    
      },                                                                       
      {                                                                        
        id: "p2",                                                              
        name: "Botol minum",                                                   
        isReturned: true,                                                      
        bgColor: "bg-[#526a6e]",                                               
        category: "Lainnya",                                                   
      },                                                                       
      {                                                                        
        id: "p3",                                                              
        name: "Charger laptop",                                                
        isReturned: true,                                                      
        bgColor: "bg-[#575f6d]",                                               
        category: "Elektronik",                                                
      },                                                                       
      {                                                                        
        id: "p4",                                                              
        name: "Payung",                                                        
        isReturned: false,                                                     
        bgColor: "bg-[#dce9fc]",                                               
        category: "Lainnya",                                                   
      },                                                                       
      {                                                                        
        id: "p5",                                                              
        name: "Kartu parkir",                                                  
        isReturned: true,                                                      
        bgColor: "bg-[#64685e]",                                               
        category: "Kartu",                                                     
      },                                                                       
      {                                                                        
        id: "p6",                                                              
        name: "Jaket abu",                                                     
        isReturned: false,                                                     
        bgColor: "bg-[#ece7fd]",                                               
        category: "Pakaian",                                                   
      },                                                                       
    ];                                                                         
                                                                               
    /**                                                                        
     * Hook kustom untuk mengelola data dan interaksi halaman profil.          
     *                                                                         
     * @param {string} [username="rina.ay"] Username profil yang dibuka.       
     * @returns {object} State profil, daftar postingan, tab aktif, dan handler
  aksi.                                                                        
     */                                                                        
    export function useProfile(username = "rina.ay") {                         
      const [activeTab, setActiveTab] = useState("posts"); // "posts" | "saved"
                                                                               
      // * Membaca data storage lokal                                          
      const allPosts = useMemo(() => {                                         
        const stored = getPosts();                                             
        return stored.length > 0 ? stored : FALLBACK_PROFILE_POSTS;            
      }, []);                                                                  
                                                                               
      // ? Mengelompokkan item postingan milik user                            
      const userPosts = useMemo(() => {                                        
        const filtered = allPosts.filter(                                      
          (item) => !item.userId || item.userId === DEFAULT_USER.id            
        );                                                                     
        return filtered.length > 0 ? filtered : FALLBACK_PROFILE_POSTS;        
      }, [allPosts]);                                                          
                                                                               
      // ? Mengambil item yang disimpan pengguna                               
      const savedPosts = useMemo(() => {                                       
        return allPosts.filter((item) => isPostSaved(item.id));                
      }, [allPosts]);                                                          
                                                                               
      // * Menghitung ringkasan statistik                                      
      const stats = useMemo(() => {                                            
        const totalPosts = userPosts.length;                                   
        const returnedCount = userPosts.filter((item) => item.isReturned).length                                               
        const savedCount = savedPosts.length > 0 ? savedPosts.length : 4; //  Mock 4 sesuai screenshot                                                     
                                                                               
        return {                                                               
          posts: totalPosts,                                                   
          returned: returnedCount,                                             
          saved: savedCount,                                                   
        };                                                                     
      }, [userPosts, savedPosts]);                                             
                                                                               
      // ! Menentukan daftar item aktif berdasarkan tab yang dipilih           
      const displayPosts = activeTab === "posts" ? userPosts : savedPosts;     
                                                                               
      return {                                                                 
        user: DEFAULT_USER,                                                    
        activeTab,                                                             
        setActiveTab,                                                          
        stats,                                                                 
        posts: displayPosts,                                                   
      };                                                                       
    }   