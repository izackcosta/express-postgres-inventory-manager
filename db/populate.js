const {Client} = require('pg');

const QUERY = `

    CREATE TABLE categories(
        category_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        category_name text NOT NULL
    );

    CREATE TABLE items(
        item_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        item_name text NOT NULL,
        item_quantity integer NOT NULL,
        category_id integer references categories(category_id) ON DELETE CASCADE
    );

    INSERT INTO categories (category_name)
    VALUES ('Weapon'), ('Armor'), ('Consumable'), ('Key');

    INSERT INTO items (item_name, item_quantity, category_id)
    VALUES ('Rusty Sword', 1, 1), ('Healing Potion', 10, 3), ('Firebolt Scroll', 2, 3), ('Ring of Dextery', 1, 2), ('Key to Sewer', 1, 4); 

`;

async function main(){

    console.log('seeding');
    const {CONNECTION_STRING} = process.env;
    const client = new Client({connectionString: CONNECTION_STRING});
    await client.connect();
    await client.query(QUERY);
    await client.end();
    console.log('done');

};

main();