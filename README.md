# Band Manager
## `Setup`
1. Clone projek ini ke penyimpanan lokal anda.
2. Jalankan perintah untuk menginstal dependency yang dibutuhkan.
```bash
# install dependencies
$ npm install
```
3. Tambahkan file env yang dibutuhkan sebelum menjalankan projek.
```bash
MONGODB_URL=
SERVICE_NAME=
```
4. Ketikan npm run dev untuk menjalankan projek
```bash
# serve with hot reload at localhost:3000
$ npm run dev
```

### `Testing`
Untuk menjalankan perintah test, ketikan:
```bash
# run testing command
$ npm run test
```

### `Struktur Database`
Database: MongoDB.  
Database name: bonapp.  
Collections: band, player.  
Field of Collection `band`: _id, name, max_member, current_member, members, createdAt, updatedAt.  
Field of Collection `player`: _id, name, position, band_id, createdAt, updatedAt.  


