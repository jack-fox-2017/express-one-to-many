class Address {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getAddress(conn, callback) {
    conn.all(`SELECT addresses.id, addresses.alamat, addresses.kodepos, addresses.contacts_id, contacts.name FROM addresses left JOIN contacts ON contacts.id = addresses.contacts_id;`, function (err, rowsP) {
      if (!err) {
        conn.all(`SELECT * FROM contacts`, function (err, rowsC) {
          if (!err) {
            callback(false, rowsP, rowsC)
          }
        })
      }
    })
  }



  addAddress(conn, alamat, kodepos, conId) {
    conn.run(`INSERT INTO addresses (alamat, kodepos, contacts_id)
      VALUES ('${alamat}', '${kodepos}', '${conId}');`)
  }

  getAddressE(conn, where, callback) {
    conn.all(`SELECT * FROM contacts`, (errA, rowsA) => {
      if (errA) throw errA

      conn.serialize(function () {
        rowsA.forEach((item, index) => {
          rowsA[index].alamat = []
          conn.all(`SELECT alamat FROM addresses WHERE contacts_id=${item.id}`, (err, rows) => {
            rowsA[index].alamat = rows.map(x => { return x.alamat })
          })
        })

        conn.all(`SELECT id, name FROM contacts`, (errC, rowsC) => {
callback(false, rowsA, rowsC)
        })
      })
    })
  }

  updateAddress(conn, alamat, kodepos, contacts_id, id) {
    conn.run(`UPDATE addresses SET alamat = '${alamat}', kodepos = '${kodepos}', contacts_id = '${contacts_id}' WHERE id = ${id};`)
  }

  deleteAddress(conn, id) {
    conn.run(`DELETE FROM addresses WHERE id = ${id};`)
  }
}

module.exports = Address
