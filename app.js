const http = require('http');
const { Client } = require('pg')
const client = new Client({
  user: 'set',
  host: 'dpg-ckli9q3j89us73f8udv0-a.oregon-postgres.render.com',
  database: 'db_1bgq',
  password: 'AQtwUlfkxOWfYkKhWCEL1Ed3A3HybesL',
  port: 5432,
})
client.connect(function (err) {
  console.log("Connected!");
});

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*', // Adjust as needed
    'Access-Control-Allow-Headers': '*', // Adjust as needed
  });
    if (req.method === 'POST' && req.url === '/insert') {
      let requestData = '';

      req.on('data', (data) => {
        requestData += data;
      });
      req.on('end', () => {
        const postData = JSON.parse(requestData);

        const pid = Math.floor(Math.random() * 1000) + 1;

        const sql = `INSERT INTO patient (patientid, name, dateOfBirth) VALUES (?, ?, ?)`;
        const values = [pid, postData.name, postData.dateOfBirth];
        client.query(sql, values, (err, result) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error inserting data' }));
          } else {
            res.end(JSON.stringify({ message: 'Data inserted successfully', insertedId: pid }));
          }
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
}).listen(3000);