const Dish = require('../models/dishes');


const getallDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const toggleStatus = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found in data base ' });
    }

    dish.isPublished = !dish.isPublished;
    await dish.save();

    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const directtoggleDishStatus = async (id) => {
  const dish = await Dish.findById(id);
  if (!dish) {
    throw new Error('Dish not found in database');
  }
  dish.isPublished = !dish.isPublished;
  await dish.save();
  return dish;

}

module.exports = {
    getallDishes,
    toggleStatus,
    directtoggleDishStatus
};