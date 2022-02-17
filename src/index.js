const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
var methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const port = 3000;

const route = require('./routes/');
const db = require('./config/db');
// Connect to DB
db.connect();
app.use(express.static(path.join(__dirname, 'public')));

app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());
//Http logger
// app.use(morgan("combined"));

app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);
//template engine
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		helpers: {
			sum: (a, b) => a + b,
			sortable: (field, sort) => {
				const sortType = field === sort.column ? sort.type : 'default';

				const icons = {
					default: 'oi oi-elevator',
					asc: 'oi oi-sort-ascending',
					desc: 'oi oi-sort-descending',
				};

				const types = {
					default: 'desc',
					asc: 'desc',
					desc: 'asc',
				};

				const icon = icons[sortType];
				const type = types[sortType];

				return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
			},
		},
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//routes init
route(app);

app.listen(process.env.PORT || 3000, () => {
	console.log(`\r\App listening at http://localhost:${port}`);
});
