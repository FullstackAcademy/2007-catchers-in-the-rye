const router = require('express').Router();
const { Costume } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const costumes = await Costume.findAll();
    res.send(costumes);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const costume = await Costume.findByPk(req.params.id);
    res.send(costume);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const costume = await Costume.create(req.body);
    res.status(201).send(costume);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  console.log(req);
  console.log('put is being called');
  const updatedCostume = await Costume.update(
    {
      costumeName: req.body.costumeName,
      price: req.body.price,
      quantity: req.body.quantity,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
    },
    { returning: true, where: { id: req.params.id } },
  );
  res.send(updatedCostume);
});

module.exports = router;
