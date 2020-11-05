import express from 'express';
import routes from './routes';

const cors = require('cors');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "POST,PUT,GET,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    app.use(cors());
    next();
});
app.use(express.json());
app.use(routes);

app.listen(3333);

