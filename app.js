const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "pretty solid",
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});
const Person = mongoose.model("Person", personSchema);

const anon = new Fruit({
  name: "Anon",
  rating: 5,
  review: "Fiuuuu",
});
anon.save();
// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favouriteFruit: pineapple,
// });
//person.save();

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // console.log(fruits);
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
      mongoose.connection.close();
    });
  }
});

//agregar un elemento a una lista determinada
Person.updateOne({ name: "jhon" }, { favouriteFruit: anon }, function (err) {
  if (err) {
    console.log("err");
  } else {
    console.log("succesfully update the document");
  }
});

//eliminar una lista
//Fruit.deleteOne({name:},function(err){})

//agregar varias listas
// const kiwi = new Fruit({
//   name: "kiwi",
//   rating: 10,
//   review: "the best fruit",
// });

// const orange = new Fruit({
//   name: "Orange",
//   rating: 4,
//   review: "Too sour for me",
// });

// const banana = new Fruit({
//   name: "Banana",
//   rating: 3,
//   review: "weird texture",
// });
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("succesfully saved all the fruits to fruitsDB");
//   }
// });
