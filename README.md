# FC Pro Clubs Match & Squad Hub

Aplikasi berbasis web untuk melacak statistik skuad dan riwayat pertandingan tim EA Sports FC Pro Clubs Anda. Dibangun dengan HTML5, jQuery, DataTables, Bootstrap 5, dan Chart.js.

## Fitur Utama
- **Real-Time Data**: Mengambil data pemain dan pertandingan langsung dari server EA Sports FC.
- **Player Stats & Badges**: Menampilkan statistik lengkap skuad (Gol, Assist, Match Rating, dsb) beserta badge penghargaan untuk top scorer, top assist, dan MVP.
- **Player Radar Chart**: Klik pada nama pemain untuk melihat grafik radar perbandingan performa pemain melawan rata-rata tim (didukung oleh Chart.js).
- **Club KPI & Match Streak**: Menampilkan rasio kemenangan (win rate), total gol, dan indikator visual rentetan 5 hasil laga terakhir (🟢🔴🟡).
- **Dark Mode**: Dukungan mode gelap yang cantik untuk kenyamanan mata.

## EA Sports FC Pro Clubs API Endpoints

Aplikasi ini menggunakan beberapa endpoint resmi dari EA Sports API untuk mendapatkan data. Karena API EA diblokir oleh kebijakan CORS (Cross-Origin Resource Sharing) untuk *request* dari browser, aplikasi ini wajib menggunakan Proxy (contoh: Vercel Rewrites, corsproxy.io, dll).

Berikut adalah daftar endpoint API yang digunakan beserta deskripsinya:

### 1. `clubs/info`
- **Fungsi**: Mendapatkan informasi dasar klub (seperti nama asli klub dan URL logo/crest khusus jika ada).
- **Format Endpoint**:
  ```http
  GET https://proclubs.ea.com/api/fc/clubs/info?platform={platform}&clubIds={clubId}
  ```
- **Contoh Penggunaan**: Mengupdate judul *header* dengan nama klub yang sebenarnya.

### 2. `members/stats`
- **Fungsi**: Mendapatkan daftar seluruh anggota (pemain) di dalam klub beserta statistik individu masing-masing (jumlah match, gol, assist, passes, rating, dll).
- **Format Endpoint**:
  ```http
  GET https://proclubs.ea.com/api/fc/members/stats?platform={platform}&clubId={clubId}
  ```
- **Contoh Penggunaan**: Digunakan untuk mengisi baris-baris pada *Squad Table* (DataTables) dan menghitung nilai top scorer, assist, serta MVP.

### 3. `clubs/matches`
- **Fungsi**: Mendapatkan daftar riwayat pertandingan terakhir dari sebuah klub, termasuk skor akhir, tanggal, dan nama tim lawan.
- **Format Endpoint**:
  ```http
  GET https://proclubs.ea.com/api/fc/clubs/matches?platform={platform}&clubIds={clubId}&matchType={matchType}&maxResultCount={limit}
  ```
- **Contoh Penggunaan**: Menampilkan 10 laga terakhir di *Matches Table* dan memvisualisasikan kemenangan beruntun (Streak 🟢🔴🟡).

### 4. `clubs/overallStats`
- **Fungsi**: Mendapatkan data keseluruhan rekor tim secara lengkap dan akurat berdasarkan ID Klub (Win Rate, Total Menang-Seri-Kalah, Gol, dan Divisi Terbaik).
- **Format Endpoint**:
  ```http
  GET https://proclubs.ea.com/api/fc/clubs/overallStats?platform={platform}&clubIds={clubId}
  ```
- **Catatan Penting**: Endpoint ini jauh lebih akurat dibandingkan mengkueri data dari `allTimeLeaderboard/search` (papan peringkat) karena mengambil langsung dari statistik tim, sehingga mencegah kesalahan jika ada nama klub yang sama di server.

### 5. `allTimeLeaderboard/search`
- **Fungsi**: Digunakan hanya untuk fitur pencarian klub (Cari Klub) berdasarkan input nama teks dari *user*. 
- **Format Endpoint**:
  ```http
  GET https://proclubs.ea.com/api/fc/allTimeLeaderboard/search?platform={platform}&clubName={clubName}
  ```

---

### Daftar Platform (Parameter `platform`)
- `common-gen5`: Cross-gen 5 (PS5 / PC / Xbox Series X|S)
- `common-gen4`: Cross-gen 4 (PS4 / Xbox One)

## Menjalankan Aplikasi Secara Lokal (Development)

Untuk menjalankan aplikasi ini agar API berfungsi tanpa error CORS di Vercel:

1. **Jalankan via Vercel CLI** (Rekomendasi)
   Pastikan Anda sudah menginstall Vercel CLI (`npm i -g vercel`), lalu ketik perintah:
   ```bash
   vercel dev
   ```
   Ini akan menjalankan *server local* (biasanya di `localhost:3000`) dengan fitur *proxy rewrites* yang terdefinisi di `vercel.json` secara otomatis aktif.

2. **Atau, gunakan VSCode Live Server**
   Cukup klik "Go Live" pada ekstensi Live Server di VSCode.
   *Catatan: Jika memakai Live Server, aplikasi akan melakukan "fallback" dan menarik data menggunakan public CORS proxy (`allorigins.win` atau `corsproxy.io`) jika endpoint API EA diblokir browser.*
