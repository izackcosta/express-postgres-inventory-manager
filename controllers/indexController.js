const queries = require('../db/queries');

const {body, validationResult} = require('express-validator');

exports.getHomePage = async(req,res) =>{
    const items = await queries.getAllItems();
    res.render('index', {items: items});
};

exports.deleteItem = async(req,res) =>{
    const {id} = req.params;
    await queries.deleteUser(id);
    res.redirect('/');
};

exports.getCreateItemPage = async(req,res) =>{
    const categories = await queries.getCategories();
    res.render('create', {categories: categories, errors: []});
}

const validateItemName = [body('name').notEmpty().withMessage(`Item name must not be empty`).isAlpha().withMessage(`Item name must be composed of alphanumeric characters`)];

exports.createItem = [
    validateItemName,
    async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const categories = await queries.getCategories();
        return res.status(400).render('create', {categories: categories, errors: errors.array()});
    };
    const {name, quantity, category} = req.body;
    await queries.createItem(name, quantity, category);
    res.redirect('/');
}];

exports.getUpdateItemPage = async(req,res) =>{
    const {id} = req.params;
    const categories = await queries.getCategories();
    res.render('update', {categories: categories, errors: [], id: id});
};

exports.updateItem = [
    validateItemName,
    async(req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const categories = await queries.getCategories();
            return res.status(400).render('update', {categories: categories, errors: errors.array()});
        };
        const {id} = req.params;
        const {name, quantity, category} = req.body;
        await queries.updateItem(id, name, quantity, category);
        res.redirect('/')
    }
];