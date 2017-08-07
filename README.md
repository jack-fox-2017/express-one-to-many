/**
/** EXPRESS WITH SQLITE3 - ONE TO MANY
---------------------------
Buatlah sebuah aplikasi sederhana menggunakan Express JS dan SQLITE3 untuk
CRUD Contacts dan Addresses dimana relasi nya adalah Contact has many Addresses.

- Release 0
1. Buatlah file dengan nama setup.js yang akan dijalankan pertama kali untuk membuat
table pada database. Tentukan column mana saja yang akan di set unique.
2. Berikan validasi di query create table sehingga meskipun setup dijalankan berulang
kali, tidak error

Structure table:
* Contacts: id type integer, name type string, company type string, phone type string, email type string
* Addresses: id type integer, street type string, city type integer, zip_code type string
* tambahkan foreign key yang diperlukan!

Jalankan dengan : node setup.js, kemudian lihat ke database apakah table Contacts dan Addresses sudah terbuat.

- Release 1 - CRUD Contacts
1. Buat sebuah aplikasi express yang baru, kemudian tambahkan beberapa routes yang respon nya me-render view(ejs) dengan keterangan sbb:

----------------------------------------------------------------------
METHOD | ROUTE                | KETERANGAN
----------------------------------------------------------------------
GET    | /                    | Menampilkan link Contacts, Addresses
GET    | /contacts            | Menampilkan semua data contacts
POST   | /contacts            | Menerima data dari form untuk input contacts
GET    | /contacts/edit/:id   | Menampilkan data dari contacts tertentu untuk diubah
POST   | /contacts/edit/:id   | Menerima data form untuk update contacts
GET    | /contacts/delete/:id | Menghapus data contacts berdasarkan id

Ketika edit, data contacts harus di populate ke masing-masing input form nya.

- Release 2 - CRUD Addresses
1. Lanjutkan release 1, tambahkan beberapa routes yang respon nya me-render view(ejs) dengan keterangan sbb:

----------------------------------------------------------------------
METHOD | ROUTE                | KETERANGAN
----------------------------------------------------------------------
GET    | /addresses            | Menampilkan semua data addresses
POST   | /addresses            | Menerima data dari form untuk input addresses
GET    | /addresses/edit/:id   | Menampilkan data dari addresses tertentu untuk diubah
POST   | /addresses/edit/:id   | Menerima data form untuk update addresses
GET    | /addresses/delete/:id | Menghapus data addresses berdasarkan id

Input fields untuk contact id nya harus dalam bentuk drop down yang menampilkan name nya.

Ketika edit, data address harus di populate ke masing-masing input form nya, termasuk selected drop down nya.

- Release 3 - Callback -
Buatlah routing baru /addresses_with_contact yang isinya menampilkan list dari addresses (boleh copy dari /addresses), kemudian tambahkan name dan company dari Contact yang sesuai, dengan cara memanipulasi object di routing sebelum dikirimkan ke view menggunakan callback (tidak boleh menggunakan join)
**/
