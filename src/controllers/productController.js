const fs = require('fs');
const path = require('path');

function findAll(){
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const data = JSON.parse(jsonData);
    return data;
};

function create(data){
    const dataString = JSON.stringify(data, null, 4)  // el null y el 4, son el espacio para que quede mejor identado el codigo en el objeto q modifica
    fs.writeFileSync(path.join(__dirname, '../data/products.json'), dataString);
};

const controller = {
    list: (req, res) => {
        const data = findAll();
        console.log(data)
        res.render('menu-products', { products : data });
    },
    detail: (req, res) => {
        const data = findAll();
        const platoEncontrado = data.find( plato => plato.id == req.params.id);
        res.render('product-detail', { plato : platoEncontrado });
    },
    create: (req, res) => {
        res.render('product-create-form')
    },
    store: (req, res) => {
        const data = findAll();
        const newProduct = {
            id: data.length + 1,
            name: req.body.name,
            price: Number(req.body.price),
            description: req.body.description
        };

        data.push(newProduct);
        create(data);
        res.redirect('/products/list');
    }
};

module.exports = controller;
