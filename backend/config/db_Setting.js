const mysql = require('mysql2');
// require("dotenv").config();
class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dwebserv_ditn_online',
            connectionLimit: 10,
        });
        console.log("Database pool created successfully!");
    }
    select(tbl_name, column = "*", where = "", print = false) {
        let wr = "";
        if (where !== "") wr = `WHERE ${where}`;
        const sql = `SELECT ${column} FROM ${tbl_name} ${wr}`;
        if (print) console.log(sql);
        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
    selectAll(tbl_name, column = "*", where = "", orderby = "", print = false) {
        let wr = "";
        if (where !== "") wr = `WHERE ${where}`;
        const sql = `SELECT ${column} FROM ${tbl_name} ${wr} ${orderby}`;
        if (print) console.log(sql);

        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    insert(tbl_name, data, print = false) {
        const fields = Object.keys(data)
            .map((key) => `\`${key}\``)
            .join(",");
        const values = Object.values(data)
            .map((value) => (value === null ? "NULL" : this.pool.escape(value)))
            .join(",");

        const sql = `INSERT INTO ${tbl_name} (${fields}) VALUES (${values})`;
        if (print) console.log(sql);
        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve({
                    status: true,
                    insert_id: result.insertId,
                    affected_rows: result.affectedRows,
                    info: result.info,
                });
            });
        });
    }
    update(table_name, form_data, where = "", print = false) {
        let whereSQL = where ? ` WHERE ${where}` : "";

        const sets = Object.entries(form_data).map(([column, value]) =>
            value === null
                ? `\`${column}\` = NULL`
                : `\`${column}\` = ${this.pool.escape(value)}`
        );
        const sql = `UPDATE ${table_name} SET ${sets.join(", ")} ${whereSQL}`;
        if (print) console.log(sql);
        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve({
                    status: true,
                    affected_rows: result.affectedRows,
                    info: result.info,
                });
            });
        });
    }
    delete(tbl_name, where = "", print = false) {
        let whereSQL = "";
        if (where !== "") {
            whereSQL = " WHERE ";
            if (typeof where === "object") {
                const conditions = Object.entries(where).map(
                    ([key, value]) => `\`${key}\` = ${this.pool.escape(value)}`
                );
                whereSQL += conditions.join(" AND ");
            } else {
                whereSQL += where;
            }
        }
        const sql = `DELETE FROM ${tbl_name} ${whereSQL}`;
        if (print) console.log(sql);

        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve({
                    status: true,
                    info: result.info,
                });
            });
        });
    }
    query(sql, print = false) {
        if (print) console.log(sql);
        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
    queryAll(sql, print = false) {
        if (print) console.log(sql);

        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    insertAll(sql, print = false) {
        if (print) console.log(sql);
        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve({ status: true });
            });
        });
    }
    close() {
        this.pool.end((err) => {
            if (err) {
                console.error("Error closing pool:", err);
            } else {
                console.log("Database pool closed.");
            }
        });
    }
}
const db = new Database();
module.exports = db;