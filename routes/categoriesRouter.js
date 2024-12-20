const {Router} = require('express');

const categoriesRouter = Router();

const categoriesController = require('../controllers/categoriesController');

categoriesRouter.get('/:update?', categoriesController.getCategoriesPage);

categoriesRouter.post('/:id/delete', categoriesController.deleteCategory);

categoriesRouter.post('/create', categoriesController.createCategory);

categoriesRouter.post('/:id/update', categoriesController.updateCategory);

module.exports = categoriesRouter;