import http from 'http';
import {
  savePeople,
  getAllPeopleByKey,
  initialPeople,
  getPeopleById,
  getAllPeople,
} from './src/people.js';
const server = http.createServer((req, res) => {
  const urlParts = req.url.split('/');
  const endpoint = urlParts[1];
  const id = urlParts[2];
  switch (endpoint) {
    case '/':
      res.write('Hello World!');
      break;
    case 'people':
      getAllPeople().then((data) => {
        res.write(JSON.stringify(data));
        res.end();
      });
      break;
    case 'people-by-id':
      getPeopleById(parseInt(id)).then((data) => {
        res.write(JSON.stringify(data));
        res.end();
      });
      break;
    default:
      res.writeHead(404);
      res.write('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
