const fs = require('fs');
const path = require('path');

function findAll(){
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/products.json'));
    const data = JSON.parse(jsonData);
    return data;
};

function writeFile(data){
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
            description: req.body.description,
            image: req.file.filename
        };

        data.push(newProduct);
        writeFile(data);
        res.redirect('/products/create');
    },
    edit: (req, res) => {
        const data = findAll();
        const platoEncontrado = data.find(plato => plato.id == req.params.id);
        res.render('product-update-form', { plato : platoEncontrado});
    },
    update: (req, res) => {
        const data = findAll();
        const platoEncontrado = data.find(plato => plato.id == req.params.id);

        platoEncontrado.name = req.body.name;
        platoEncontrado.price = req.body.price;
        platoEncontrado.description = req.body.description;

        writeFile(data);
        res.redirect('/products/list');
    },
    destroy: (req, res) => {
        const data = findAll();
        const platoEncontrado = data.findIndex(plato => plato.id == req.params.id ); // findIndex (devuelve el indice dnd se encuentra el elemento)
        
        data.splice(platoEncontrado, 1);
        writeFile(data);
        res.redirect('/products/list');
    }
};

module.exports = controller;
