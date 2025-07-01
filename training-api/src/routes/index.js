function setRoutes(app) {
    const IndexController = require('../controllers/index').IndexController;
    const controller = new IndexController();

    app.get('/items', controller.getItems.bind(controller));
    app.post('/items', controller.createItem.bind(controller));
}

module.exports = setRoutes;