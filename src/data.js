import mixer from './assets/mixer.webp'
import womenJacket from './assets/womenjacket.webp'
import shoes from './assets/shoes.webp'
import watch from './assets/watch.webp'
import gameconsole from './assets/gameconsole.webp'
import travellbag from './assets/travellbag.webp'

export const  products = [
  {
    id: 1,
    name: "playstation 5 game console",
    price: 89.99,
    image: gameconsole,
    category: "electronics",
    description: "new featured wireless controllers",
    rating: 4.5,
    reviews: 128,
    isShow: true
  },
  {
    id: 2,
    name: "running shoes",
    price: 129.99,
    image: shoes,
    category: "fashion",
    description: "comfortable running shoes for all terrains",
    rating: 4.7,
    reviews: 256,
    isShow: true
  },
  {
    id: 3,
    name: "smart watch",
    price: 249.99,
    image: watch,
    category: "electronics",
    description: "track your fitness and notifications",
    rating: 4.3,
    reviews: 89,
    isShow: true
  },
  {
    id: 4,
    name: "backpack",
    price: 59.99,
    image: travellbag,
    category: "fashion",
    description: "durable backpack for daily use",
    rating: 4.2,
    reviews: 42,
    isShow: true
  },
  {
    id: 5,
    name: "kitchen accessories",
    price: 79.99,
    image: mixer,
    category: "home",
    description: "automatic feature reach kitchen maker with timer",
    rating: 4.6,
    reviews: 156,
    isShow: true
  },
  {
    id: 6,
    name: "women jacket",
    price: 34.99,
    image: womenJacket,
    category: "fashion",
    description: "non-slip yoga mat with carrying strap",
    rating: 4.4,
    reviews: 73,
    isShow: true
  }
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Books"
];