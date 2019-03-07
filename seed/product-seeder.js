var Product = require('../models/product');

// In order to connect mongoose to seeder
var mongoose = require('mongoose');

const db = require('./config/keys').MongoURI;
 // "cd seed" to go to the seed directory the type"node product-seeder.js"
 mongoose.connect(db, { useNewUrlParser: true})
 .then(() => console.log('MongoDB Connected...'))
 .catch(err => console.log(err));

// Connect to Mongo
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = [
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Gothic Video',
		description: 'Absolutely stunning',
		price: 10
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Baby',
		description: 'Awesom Game!!!!',
		price: 30
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Baba',
		description: 'Awesom Game!!!!',
		price: 100
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Lala',
		description: 'Awesom Game!!!!',
		price: 1000
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Popo',
		description: 'Awesom Game!!!!',
		price: 890
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Gogo',
		description: 'Awesom Game!!!!',
		price: 600
	})
];

var done = 0;
for (var i = 0; i < products.length; i++) {
	products[i].save(function(err, result) {
		done++;
		if(done === products.length) {
			exit();
		}
	});
}

function exit() {
	// At the end of the file disconnect mongoose
	mongoose.disconnect();
}