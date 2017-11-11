let Category = require('../models/CategoryModel');
let mongoose = require('mongoose');
const dbUrl = require('../config/config').url

console.log('Connecting:' + dbUrl)
if (!dbUrl.startsWith('mongodb://')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
  return;
}
mongoose.connect(dbUrl);

var categories = [
  new Category({
    imagePath: 'pet.png',
    name: 'pets',
    nameMenu: 'Thú cưng',
    title: 'Chúng tôi có mọi loại pets mà bạn muốn.',
    description: 'Since 1926, our pet store has helped people throughout the area find a new family pet to bring home and love. Whether you like traditional pets such as kittens and puppies or need a low-maintenance pet such as a fish, you are sure to find the right animal for you.',
    amount: 100,
    display: true,
    displayOrder: 1
  }),
  new Category({
    imagePath: 'care.png',
    name: 'service',
    nameMenu: 'Dịch vụ',
    title: 'Nhiều dịch vụ chăm sóc pet',
    description: 'Purebred Puppies, Mixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
    amount: 38,
    display: true,
    displayOrder: 2
  }),
  new Category({
    imagePath: 'acessories.png',
    name: 'accessory',
    nameMenu: 'Phụ kiện',
    title: 'Với rất nhiều phụ kiện cho pet',
    description: 'Purebred Puppies, Mixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
    amount: 72,
    display: true,
    displayOrder: 3
  }),
  new Category({
    imagePath: 'acessories2.png',
    name: 'anymore test data',
    title: 'anymore test dataanymore test dataanymore test data',
    description: 'Purebred Puppies, anymore test dataanymore test dataanymore test dataMixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
    amount: 1,
    display: false,
    displayOrder: 3
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