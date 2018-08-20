/**
 * http://usejsdoc.org/
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;

//use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname)));

//route service call to router.js
const route = require('./src/Route/router');
route(app);

app.listen(port, () => {
	console.log('bibiServer listening at port %d', port);
});