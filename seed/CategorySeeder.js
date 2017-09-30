let Category = require('../models/category');
let mongoose = require('mongoose');
const dbUrl = require('../config/db').url

mongoose.connect(dbUrl);

var categories = [
  new Category({
    imagePath: 'pet.png',
    name: 'pet',
    title: 'Chúng tôi có mọi loại pets mà bạn muốn.',
    description: 'Since 1926, our pet store has helped people throughout the area find a new family pet to bring home and love. Whether you like traditional pets such as kittens and puppies or need a low-maintenance pet such as a fish, you are sure to find the right animal for you.',
    amount: 100
  }),
  new Category({
    imagePath: 'care.png',
    name: 'service',
    title: 'Nhiều dịch vụ chăm sóc pet',
    description: 'Purebred Puppies, Mixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
    amount: 38
  }),
  new Category({
    imagePath: 'acessories.png',
    name: 'accessory',
    title: 'Với rất nhiều phụ kiện cho pet',
    description: 'Purebred Puppies, Mixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
    amount: 72
  })
]

var done = 0;
for (let i = 0; i < categories.length; i++) {
  categories[i].save((err, result) => {
    done++;
    console.log(`inserted: ${result}`)
    if (done === categories.length) {
      mongoose.disconnect();
    }
  })
}