const fs = require('fs');
const {v4 : uuidv4} = require('uuid')

module.exports = (app) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8')); // Ask Ben why this works and not readFile
    
    // GET /api/notes should read the db.json file and return all saved notes as JSON.
    app.get('/api/notes', (req, res) => {      
        res.json(db); // res.json converts data into json
    })

    // POST /api/notes receives a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you)
    app.post('/api/notes', (req, res) => {
        const {title, text} = req.body;
        const id = uuidv4()

        db.push({id, title, text});
        fs.writeFileSync('./db/db.json', JSON.stringify(db));
        
        res.json(db)
    });

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        let index;
     
        for (let i=0; i<db.length; i++) {
            if (db[i].id === id) {
                index = i;

                if (i === 0) {
                    db.shift();
                } else if (i === db.length-1){
                    db.pop();
                } else {
                    db1 = db.slice(0, i); 
                    db2 = db.slice(i+1);

                    console.log(db1)
                    console.log(db2)
                    db = db1.concat(db2); 
                };
            
                fs.writeFileSync('./db/db.json', JSON.stringify(db));
                res.json(db);
            };
        };
    });
};



