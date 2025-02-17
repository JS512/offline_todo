const sqlite3 = require('sqlite3').verbose();

const db_path = './datas/chinook.sqlite3';
let db = new sqlite3.Database(db_path);

// insert one row into the student table
db.run(`CREATE TABLE IF NOT EXISTS Todo(
    plan_date timestamp,
    plan text,
    create_test timestamp default CURRENT_TIMESTAMP,
    start INTEGER,
    hold INTEGER,
    processing INTEGER,
    done INTEGER
  );`, function (err) {
    if (err) {
        return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});


exports.get_todo_data = () => {

    return new Promise(function(resolve, reject){
            let db = new sqlite3.Database(db_path);
            db.serialize(function () {
                db.all('SELECT * FROM Todo', function(err, rows){
                    resolve(rows)
                })
            })
        }
    )
    
};