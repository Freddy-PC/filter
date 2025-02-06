// Data = Mock Server (Database)
// Dynamically renders in "cats" class
const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

//0 Use DOM elements as references
const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

//1 function to display products
// Parameter filterproducts = the mapped array of the items going into class "products"
const displayProducts = (filterProducts) => {
  productsContainer.innerHTML = filterProducts
    .map(
      (product) =>
        // pre-created HTML as template literals within "products" class
        // accessing properties from data object through dot notation
        `
        <div class="product">
            <img src=${product.img} alt=""/>
            <span class="name">${product.name}</span>
            <span class="priceText">${product.price}</span>
        </div>
        `
    )
    .join("");
};

displayProducts(data);

/* add event listener for the search input 
   to filter the products based on user input */
// Listens to key presses and passes a helper function
// Made in a non-case sensitive way
// The parameter = e

// If there is a value present from user key input...
// Use the helper function, filter the array based on the "value" === event === user input in search
// toLocaleLowerCase() sets the name values in the data array about all lower case
// toLocaleLowerCase() on search + toLowerCase() on e = searching for same value in LOWERCASE
// -1 === not a string ; !== -1 (means there isn't a string) ; anything above -1 means it's true
// get index value of search input (value) AND if it is not equal to -1 (not a string) return the displayProducts...
searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLocaleLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

//2 display categories as clickable <span> tags
// if they click on one category, it will display products in that cat.
// function that displays all categories
// categories array
const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All", // displays all products
    ...allCats.filter((item, i) => {
      // ...allCats === all arrays
      // returns the first category that appears
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
        <span class="cat">${cat}</span>
        `
    )
    .join("");
  // Event listner for category filtering
  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;
    if (selectedCat === "All") {
      displayProducts(data);
    } else {
      displayProducts(data.filter((item) => item.cat === selectedCat));
    }
  });
};

setCategories();
