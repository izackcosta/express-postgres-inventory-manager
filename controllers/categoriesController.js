const queries = require('../db/queries');

const {body, validationResult} = require('express-validator');

exports.getCategoriesPage = async(req,res) =>{
    const categories = await queries.getCategories();
    const {update} = req.params
    res.render('categories', {categories: categories, errors: [], update: update || -1});
};

exports.deleteCategory = async(req,res) =>{
    const {id} = req.params;
    await queries.deleteCategory(id);
    res.redirect('/categories');
};

validateCategoryName = [
    body('name').notEmpty().withMessage(`Category name must not be empty`)
    .isAlpha().withMessage(`Category name must be composed of alphanumeric characters`)
]

exports.createCategory = [
    validateCategoryName,
    async (req,res) =>{
    const {name} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const categories = await queries.getCategories();
        return res.status(400).render('categories', {categories: categories, errors: errors.array(), upate: -1});
    };
    await queries.createCategory(name);
    res.redirect('/categories');
    }
];

exports.updateCategory = [
    validateCategoryName,
    async(req,res) =>{
        const {name} = req.body;
        const {id} = req.params;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const categories = await queries.getCategories();
            return res.status(400).render('categories', {categories: categories, errors: errors.array(), update: id});
        };
        await queries.updateCategory(id, name);
        res.redirect('/categories');
    }
];