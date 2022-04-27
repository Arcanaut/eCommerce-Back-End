const router = require('express').Router();
const res = require('express/lib/response');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
//attributes: ['id','product_name','price','stock','category_id'],
// get all products
router.get('/', (req,res) => {
  Product.findAll({
    attributes: [
      'id', 
      'product_name', 
      'price', 
      'stock', 
      'category_id'
    ],
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
    .then(productData => res.json(productData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})


// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data

  //using eager loading from sequelize, specifically 'Many-to-Many' relationship kind
  //https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ["category_name"],
      },
      {
        model: Tag,
        attributes: ["tag_name"],
      },
    ]
  })
  .then((productData) => {
    if(!productData) {
      res.status(404).json({message:'No products with this ID found.'});
      return;
    }
    res.json(productData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create new product
router.post('/', (req, res) => {
//establishes required parameters for newly created products
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tag_id,
    category_id: req.body.category_id,
  })

  
   .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  }) // find all associated tags from ProductTag
  //TODO: Get .then to read value of product
  .then((product) => {
    return ProductTag.findAll({ where: { product_id: req.params.id } });
  })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.params.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figures out which ones to remove
      const removedProductTag = productTags
        .filter(({ tag_id }) => !req.params.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: removedProductTag } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy ({
    where: {
      id: req.params.id
  }
})
  .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'No products match this ID'});
        return;
      }
      res.json(productData);
})
  .catch(err => {
      console.log(err); 
      res.status(500).json(err);
  });
});

module.exports = router;