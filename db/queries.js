const pool = require('./pool');

module.exports = {

    getAllItems : async() => {
        const {rows} = await pool.query('SELECT * FROM items JOIN categories ON items.category_id = categories.category_id');
        return rows;
    },

    getCategories : async() =>{
        const {rows} = await pool.query('SELECT * FROM categories');
        return rows;
    },

    deleteUser : async(id) => {
        await pool.query(`DELETE FROM items WHERE item_id = ${id}`)
    },

    createItem : async(name, quantity, category) =>{
        await pool.query(`INSERT INTO items(item_name, item_quantity, category_id) VALUES ('${name}', ${quantity}, ${category})`);
    },

    updateItem : async(id, name, quantity, category) =>{
        await pool.query(`UPDATE items SET item_name = '${name}', item_quantity = ${quantity}, category_id = ${category} WHERE item_id = ${id}`)
    },

    deleteCategory: async(id) =>{
        await pool.query(`DELETE FROM categories WHERE category_id = ${id}`);
    },

    createCategory: async(name) =>{
        await pool.query(`INSERT INTO categories(category_name) VALUES ('${name}')`);
    },

    updateCategory: async(id, name) =>{
        await pool.query(`UPDATE categories SET category_name = '${name}' WHERE category_id = ${id}`);
    }

}