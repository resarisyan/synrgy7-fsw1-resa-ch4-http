import http from 'http';
import {
  getPeopleById,
  getAllPeople,
  searchPeople,
  deletePeopleById,
} from './src/people.js';

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('/');
  const endpoint = urlParts[1];
  const param = urlParts[2];

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method == 'GET') {
    res.setHeader('Content-Type', 'application/json');
    if (endpoint === 'people') {
      if (param) {
        getPeopleById(+param).then((data) => {
          res.end(JSON.stringify(data));
        });
      } else {
        getAllPeople().then((data) => {
          res.end(JSON.stringify(data));
        });
      }
    } else if (endpoint === 'people-by-usename') {
      if (param) {
        searchPeople(param).then((data) => {
          res.end(JSON.stringify(data));
        });
      }
    } else {
      res.end('Invalid endpoint');
    }
  } else if (req.method == 'DELETE') {
    if (endpoint === 'people') {
      deletePeopleById(param).then(() => {
        res.end('Data has been deleted successfully');
      });
    } else {
      res.end('Invalid endpoint');
    }
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
