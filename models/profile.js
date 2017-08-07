class Profile {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getProfile(conn, callback) {
    conn.all(`SELECT profiles.id, profiles.username, profiles.contacts_id, contacts.name FROM profiles left JOIN contacts ON contacts.id = profiles.contacts_id;`, function (err, rowsP) {
      if (!err) {
        conn.all(`SELECT * FROM contacts`, function (err, rowsC) {
          if (!err) {
            callback(false, rowsP, rowsC)
          }
        })
      }
    })
  }

  addProfile(conn, user, conId) {
    conn.run(`INSERT INTO profiles (username, contacts_id)
      VALUES ('${user}', '${conId}');`)
  }

  getProfileE(conn, where, callback) {
    conn.all(`SELECT profiles.id, profiles.username, profiles.contacts_id, contacts.name FROM profiles left JOIN contacts WHERE profiles.contacts_id = ${where};`, function (err, rowsP) {
      if (!err) {
        conn.all(`SELECT * FROM contacts`, function (err, rowsC) {
          if (!err) {
            callback(false, rowsP, rowsC)
          }
        })
      }
    })
  }

  updateProfile(conn, user, conId, id) {
    conn.run(`UPDATE profiles SET username = '${user}', contacts_id = '${conId}'  WHERE id = ${id};`)
  }

  deleteProfile(conn, id) {
    conn.run(`DELETE FROM profiles WHERE id = ${id};`)
  }
}

module.exports = Profile
