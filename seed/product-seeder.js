var Product = require('../models/Product');

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

const done = 0;
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
