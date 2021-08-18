'use strict';

require('./database'); // Conecta a la BD
const FoodModel = require('./models/Food'); // Modelo

module.exports.getFood = async (event) => {

  let foodArray = [];

  try {
    await FoodModel.find({}, (err, result) => {
      error = err
      foodArray = result
    })
  }
  catch (err) {
    return err;
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(foodArray, null, 2),
  };

};

module.exports.putFood = async (event) => {

  const body = JSON.parse(event.body)

  const newFoodName = body.newFoodName;
  const id = body.id;

  try {
    await FoodModel.findById(id, (err, updateFood) => {
      updateFood.foodName = newFoodName;
      updateFood.save();
    })
  }
  catch (error) {
    return error
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ message: `Updated data`, }, null, 2),
  };

};

module.exports.createFood = async (event) => {
  const body = JSON.parse(event.body)

  const foodName = body.foodName;
  const days = body.days;

  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days })

  try {
    await food.save();
  }
  catch (err) {
    return err;
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ message: `Inserted data`, }, null, 2),
  };

};

module.exports.deleteFood = async (event) => {

  const id = event.pathParameters.id;

  try {
    await FoodModel.findByIdAndRemove(id).exec()
  }
  catch (err) {
    return err
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ message: `Deleted data`, }, null, 2),
  };

};