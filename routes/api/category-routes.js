const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ['category_id'],
      },
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({
          message: 'No match found for this ID'
        });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new category, destructuring akin to Jest-Another-RPG project
  Category.create({
      category_name: req.body.category_name,
    })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({
          message: 'No categories match this ID'
        });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({
          message: 'No categories match this ID'
        });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;