let Product = require('../models/ProductModel');
let Category = require('../models/CategoryModel');
let mongoose = require('mongoose');
const dbUrl = require('../config/config').url

mongoose.connect(dbUrl, {
  useMongoClient: true
});

var categories = [];

function getCategories() {
  console.log('before get');
  Category.find({}, function (err, docs) {
    docs.forEach(function (doc) {
      // console.log(doc);
      categories.push(doc);
    });
    var done = 0;
    var products = [
      new Product({
        image: [{
          pathImage: 'http://www.whitewaypetshop.net/img/0573/125.jpg'
        }],
        title: 'Helping You Find Your New Friend',
        description: 'Since 1926, our pet store has helped people throughout the area find a new family pet to bring home and love. Whether you like traditional pets such as kittens and puppies or need a low-maintenance pet such as a fish, you are sure to find the right animal for you.',
        price: 100,
        category: categories[0],
        priceSale: 90,
        amount: 2,
        views: 100,
        starts: 3
      }),
      new Product({
        image: [{
          pathImage: 'http://www.whitewaypetshop.net/img/0573/331.jpg'
        }],
        title: 'Our Pets',
        description: 'Purebred Puppies, Mixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
        price: 38,
        category: categories[0],
        priceSale: 30,
        amount: 12,
        views: 150,
        starts: 5
      }),
      new Product({
        image: [
          {
            pathImage: 'https://images-na.ssl-images-amazon.com/images/G/01/img17/pet-products/vertical-store/1025139_us_pets_sns_upd_vd-hero_1920x693._CB521773290_.jpg'
          },
          {
            pathImage: 'https://i2.wp.com/www.k9magazine.com/wp-content/uploads/2970437ec4b1c86d_640_dogs1.jpg?resize=640%2C435',
          },
          {
            pathImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTArHm3iwagqE7-CmEniarLon0WAfxQWqfP7hsZqO3-FEwxambH'
          }
        ],
        title: 'Our Pets',
        description: 'Purebred Puppies, Mixed Breed Puppies, Kittens, Fish, Assortment of Small Animals',
        price: 72,
        category: categories[0],
        priceSale: 70,
        amount: 9,
        views: 550,
        starts: 5
      }),
      new Product({
        image: [{ pathImage: 'http://www.whitewaypetshop.net/img/0573/587.jpg' }],
        title: 'Ready to Go Home',
        description: 'Both the purebred and mixed puppies are ready to go home the day you meet them, since each pup is eight weeks old when we get them. Come by today and take your new furry friend home.',
        price: 99,
        category: categories[0],
        priceSale: 90,
        amount: 3,
        views: 200,
        starts: 4
      }),
      new Product({
        image: [{ pathImage:'http://www.whitewaypetshop.net/img/0573/551.jpg'}],
        title: 'New Purebreds Weekly',
        description: 'After meeting all the cuddly pups in the shop, and you don\'t see the particular breed you want, don\'t worry. Just visit the store weekly, as we get new purebred puppies in each week, such as beagles, shih tzus, and more.',
        price: 20,
        category: categories[0],
        priceSale: 10,
        amount: 1,
        views: 10,
        starts: 1
      }),
      new Product({
        image: [
          { pathImage:'http://www.whitewaypetshop.net/img/0579/448.jpg'},
          { pathImage:'https://www.aspca.org/sites/default/files/pet-care_general-pet-care_thumb.jpg'}
        ],
        title: 'Your Source for Affordable Pet Supplies',
        description: 'In addition to selling animals, our pet store sells the affordable pet supplies you need to ensure your pet lives a long and health life. Bait and tackle are also available for both fresh and saltwater fish.',
        price: 910,
        category: categories[0],
        priceSale: 900,
        amount: 1,
        views: 40,
        starts: 2
      }),
      new Product({
        image: [{ pathImage:'http://cdn.skim.gs/image/upload/v1456338394/msi/designer-pet-accessories-coach-collar_ytgkd1.jpg'}],
        title: 'Coach Leather Collar with Dog Bone Charm',
        description: 'Coach sells a fantastic line of pet collars and leashes that you\'ll be proud to put on your cat or dog, and that they\'ll love wearing! Find something to match whatever your Coach style may be -- from a classic red leather collar to a leash with the Coach signature print, these designer pet goods are high-quality, chic items with outstanding craftmanship. $78',
        price: 150,
        category: categories[2],
        priceSale: 130,
        amount: 12,
        views: 15,
        starts: 3
      }),
      new Product({
        image: [{ pathImage:'http://cdn.skim.gs/image/upload/c_fill,dpr_1.0,f_auto,fl_lossy,q_auto,w_940/v1456338396/msi/designer-pet-accessories-coach-leash_yqv2rk.jpg'}],
        title: 'Louis Vuitton Baxter Dog Leash',
        description: 'You wouldn\'t dare carry a Louis Vuitton yourself, then take your posh pooch on a walk with nothing less than the same! For girls who love their Louie, designer pet accessories are not an option -- they\'re a requirement. The Louis Vuitton Baxter dog leash is just one of an entire line of pet products that will have you swooning. $380',
        price: 310,
        category: categories[2],
        priceSale: 300,
        amount: 12,
        views: 190,
        starts: 2
      }),
      new Product({
        image: [{ pathImage:'http://www.illtakecareofitconcierge.com/wp-content/uploads/pet-stuff-services-300x225.jpg'}],
        title: 'Pet Stuff',
        description: 'Your pets are family, too. Don’t worry about taking that well deserved vacation or staying late for work. You can be assured your pet will get lots of love and attention.',
        price: 120,
        category: categories[1],
        priceSale: 110,
        amount: 11,
        views: 110,
        starts: 1
      }),
      new Product({
        image: [{ pathImage:'http://pad3.whstatic.com/images/thumb/1/1b/Take-Care-of-Puppies-Step-28.jpg/aid165555-v4-728px-Take-Care-of-Puppies-Step-28.jpg'}],
        title: 'Protect your puppy',
        description: 'Puppies are naturally curious, and even with the most attentive care they sometimes escape the yard and get lost. Make sure your puppy wears a comfortable adjustable collar with a tag that lists your contact information. The tag should include your puppy\'s name, along with your address and phone number.',
        price: 555,
        category: categories[1],
        priceSale: 500,
        amount: 123,
        views: 110,
        starts: 5
      })
    ]

    for (let i = 0; i < products.length; i++) {
      products[i].save((err, result) => {
        done++;
        if (done === products.length) {
          mongoose.disconnect();
        }
      })
    }


  });
  console.log('after get');
}

async function seedProduct() {
  try {

    const res = await getCategories();
  } catch (e) {
    console.log(e);
  }
}

seedProduct();


// var done = 0;
// for (let i = 0; i < products.length; i++) {
//   products[i].save((err, result) => {
//     done++;
//     if (done === products.length) {
//       mongoose.disconnect();
//     }
//   })
// }