const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}],
      // includes associated products
      attributes: ['id', 'category_name']
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
      attributes: ['id', 'category_name']
    });

    if (!categoryData) {
      res.status(404).json({ message: 'The category with this id does not exist!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
     where: { 
      id: req.params.id 
    },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'Requested category failed to update!'});
    } else {
      res.status(200).json({ message: 'Category has been updated!'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

if (!categoryData) {
  res.status(404).json({ message: 'No category has been found with this id!'});
  return;
}

res.status(200).json({message: 'Category has been deleted!'});
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;