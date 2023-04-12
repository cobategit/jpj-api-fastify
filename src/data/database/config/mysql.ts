import mysql2 from 'mysql2/promise'

export async function mysqlConn() {
  let pool = mysql2.createConnection({
    connectionLimit: 10000,
    waitForConnections: true,
    user: process.env.USER_MySql,
    host: process.env.HOST_MySql,
    database: process.env.DB_NAME_MySql,
    password: process.env.PASSWORD_MySql,
    port: Number(process.env.PORT_MySql),
  })

  return pool
}
