const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const router2 = express.Router();

router.use('/static', express.static('public'));

app.use(bodyParser.urlencoded({ extend: false }));
app.use(bodyParser.json());

router2.get('/query', (req, res) => {
  res.json(req.query);
});

router2.post('/body', (req, res) => {
  res.send(JSON.stringify(req.body));
});

router2.get('/users/:id', (req, res) => {
  const users = [{
    id: 1,
    name: 'Joe',
    age: 18,
  }, {
    id: 2,
    name: 'John',
    age: 22,
  }];
  // console.log(req.params.id);
  res.json(users[req.params.id - 1]);
});

router.use('/api', router2);

router.get('/', (req, res) => {
  res.send('<h1>首頁</h1>');
});

app.use('/', router);

app.use((req, res) => {
  res.send('404 Not Found');
});

app.listen(3000, () => {
  // console.log('App listening on port 3000!');
});
