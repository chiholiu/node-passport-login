var Product = require('../models/Product');

// In order to connect mongoose to seeder
var mongoose = require('mongoose');

// DB Config
let db = require('../config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

var products = [
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Gothic Video',
		description: 'Absolutely stunning',
		price: 10,
		qty: 1
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Baby',
		description: 'Awesom Game!!!!',
		price: 30,
		qty: 1
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Baba',
		description: 'Awesom Game!!!!',
		price: 100,
		qty: 1
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Lala',
		description: 'Awesom Game!!!!',
		price: 1000,
		qty: 1
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Popo',
		description: 'Awesom Game!!!!',
		price: 890,
		qty: 1
	}),
	new Product({
		imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png',
		title: 'Gogo',
		description: 'Awesom Game!!!!',
		price: 600,
		qty: 1
	})
];

let done = 0;
for(let i =  0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if(done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
