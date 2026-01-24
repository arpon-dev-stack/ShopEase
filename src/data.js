import mixer from './assets/mixer.webp'
import earbud from './assets/earbud.webp'
import earmuff from './assets/earmuff.webp'
import headphone from './assets/headphone.webp'
import jacket from './assets/jacket.webp'
import womenJacket from './assets/womenjacket.webp'
import shoes from './assets/shoes.webp'
import watch from './assets/watch.webp'
import gameconsole from './assets/gameconsole.webp'
import travellbag from './assets/travellbag.webp'

export const products = [
  {
    id: 1,
    name: "PlayStation 5 Game Console",
    price: 89.99,
    image: gameconsole,
    category: "Electronics",
    description: "New featured wareless controllers",
    rating: 4.5,
    reviews: 128,
    isShow: true
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 129.99,
    image: shoes,
    category: "Fashion",
    description: "Comfortable running shoes for all terrains",
    rating: 4.7,
    isShow: true,
    reviews: 256
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 249.99,
    image: watch,
    category: "Electronics",
    description: "Track your fitness and notifications",
    rating: 4.3,
    reviews: 89,
    isShow: true
  },
  {
    id: 4,
    name: "Backpack",
    price: 59.99,
    image: travellbag,
    category: "Fashion",
    description: "Durable backpack for daily use",
    rating: 4.2,
    reviews: 42,
    isShow: true

  },
  {
    id: 5,
    name: "Kitchen Accessories",
    price: 79.99,
    image: mixer,
    category: "Home",
    description: "Automatic Feature reach Kitchen maker with timer",
    rating: 4.6,
    reviews: 156,
    isShow: true
  },
  {
    id: 6,
    name: "Wonen Jacket",
    price: 34.99,
    image: womenJacket,
    category: "Fashion",
    description: "Non-slip yoga mat with carrying strap",
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