# Diagram Orbit (Lost & Found)

Diagram ditulis dengan [Mermaid](https://mermaid.js.org) dan dirender otomatis
oleh GitHub.

## 1. Diagram komponen (arsitektur berlapis)

```mermaid
flowchart TD
    subgraph Pages["Halaman (src/features/*)"]
        Login["LoginPage"]
        Feed["FeedPage"]
        Explore["ExplorePage"]
        Detail["PostDetailPage"]
        Create["CreatePostPage"]
        Profile["ProfilePage"]
    end

    subgraph Hooks["Hooks fitur"]
        useLogin["useLoginForms"]
        useFeed["useFeed"]
        useExplore["useExplore"]
        usePost["usePostDetail"]
        useCreate["useCreatePost"]
        useProfile["useProfile"]
    end

    Guard["ProtectedRoute"]
    Svc["postStorage (service)"]
    Store["lib/storage.js (data layer)"]
    LS[("localStorage")]

    Login --> useLogin
    Feed --> useFeed
    Explore --> useExplore
    Detail --> usePost
    Create --> useCreate
    Profile --> useProfile
    Guard -.melindungi.-> Feed
    Guard -.melindungi.-> Explore
    Guard -.melindungi.-> Detail
    Guard -.melindungi.-> Create
    Guard -.melindungi.-> Profile

    useLogin --> Store
    useFeed --> Store
    useExplore --> Store
    usePost --> Store
    useProfile --> Store
    useCreate --> Svc
    Svc --> Store
    Store --> LS
```

## 2. Alur navigasi dan autentikasi

```mermaid
flowchart TD
    Start(["Buka aplikasi"]) --> Session{"Ada sesi di localStorage?"}
    Session -- tidak --> Login["/login"]
    Login --> Valid{"Username min. 3 karakter dan kata sandi min. 6 karakter?"}
    Valid -- tidak --> Err["Tampilkan pesan galat"]
    Err --> Login
    Valid -- ya --> Match{"Cocok dengan akun mock?"}
    Match -- ya --> Save["Simpan currentUser (akun mock)"]
    Match -- tidak --> New["Buat profil baru dari username"]
    New --> Save
    Save --> Home["/ (Beranda)"]
    Session -- ya --> Home
    Home --> Explore["/explore"]
    Home --> Detail["/post/:id"]
    Home --> Create["/create"]
    Home --> Profile["/profile"]
    Profile --> Logout["Logout: hapus sesi"]
    Logout --> Login
```

## 3. Diagram urutan: membuat postingan

```mermaid
sequenceDiagram
    actor U as Pengguna
    participant P as CreatePostPage
    participant H as useCreatePost
    participant S as postStorage.savePost
    participant L as localStorage

    U->>P: Isi form dan pilih foto
    P->>H: submit(values)
    H->>H: validasi field wajib
    alt data tidak valid
        H-->>P: errors (pesan inline)
    else data valid
        H->>S: savePost(postData)
        S->>L: setItem(temuin_posts)
        alt kuota penuh
            L-->>S: QuotaExceededError
            S-->>H: Error (cause)
            H-->>P: tampilkan galat
        else berhasil
            S-->>H: newPost
            H-->>P: onSuccess(newPost)
            P->>P: navigate("/")
        end
    end
```

## 4. Diagram kelas: model data

```mermaid
classDiagram
    class User {
        +String id
        +String username
        +String name
        +String email
        +String avatarInitials
        +String avatarColor
    }
    class Post {
        +String id
        +String userId
        +String name
        +String status
        +Boolean isReturned
        +String category
        +String location
        +String date
        +String description
        +String features
        +String contact
        +String[] photos
        +String[] likes
        +String createdAt
    }
    class Comment {
        +String id
        +String userId
        +String text
        +String createdAt
    }
    User "1" --> "0..*" Post : memposting
    Post "1" *-- "0..*" Comment : memiliki
    User "1" --> "0..*" Comment : menulis
    User "0..*" --> "0..*" Post : menyimpan (temuin_saved)
```

## 5. Alur data (ERD sederhana)

```mermaid
erDiagram
    USER ||--o{ POST : memposting
    POST ||--o{ COMMENT : memiliki
    USER ||--o{ COMMENT : menulis
    USER }o--o{ POST : "like / simpan"
```

Kunci `localStorage`: `temuin_currentUser`, `temuin_posts`, `temuin_saved`
(`src/lib/storage.js:15`).
