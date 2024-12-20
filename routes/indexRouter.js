const {Router} = require('express');

const indexRouter = Router();

const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.getHomePage);

indexRouter.get('/create', indexController.getCreateItemPage);

indexRouter.get('/:id/update', indexController.getUpdateItemPage);

indexRouter.post('/:id/update', indexController.updateItem);

indexRouter.post('/create', indexController.createItem);

indexRouter.post('/:id/delete', indexController.deleteItem);

module.exports = indexRouter;