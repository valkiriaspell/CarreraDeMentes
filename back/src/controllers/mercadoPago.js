const mercadopago = require('mercadopago');
const { Coins, Users } = require("../db");

// POST cuando hacemos clic en el boton de pagar, enviamos por body el nombre del producto
// el precio y la cantidad de items.
const crearLinkPago = async (req, res) => {
    const { description, price, quantity, email, external_reference } = req.body;
    try {
        let preference = {
            items: [
                {
                    title: description, //nombre del producto
                    unit_price: Number(price), //precio del producto
                    quantity: Number(quantity), //cantidad de productos
                }
            ],
            payer: {
                email: email //email del usuario
            },
            external_reference : external_reference, //Referencia para saber cual es el monto del pedido a ingresar en la bd una vez aprobado el pago
            back_urls: {
                "success": "'http://localhost:3000'/home", //Si todo sale bien volvemos acá
                "failure": "'http://localhost:3000'/home", // Si hay algún error volvemos acá
                "pending": "'http://localhost:3000'/home" // Si esta pendiente volvemos acá
            },
            payment_methods: {
                "excluded_payment_types": [
                    {
                        "id": "ticket" // excluye el metodo de pago en efectivo
                    }
                ],
                "installments": 12 //maximo de cuotas que ofrecemos
            },
        };
    
        const create = await mercadopago.preferences.create(preference) //creamos la preferencia
        if(create.body.init_point){ //si todo sale bien y tiene una url de pago, contestamos al front con la url para abrir una nueva pestaña, asi continuamos con el pago
            res.json({
                init_point: create.body.init_point //esta es la url para el front
            });
        }
    } catch (error) {
        console.log(error);
    }
}

// GET para saber el estado del pago y asi saber si fue aprobado o no, y si fue aprobado saber 
// que referencia tiene para saber que monto agregar de monedas al usuario en la bd
const insertarCoinsUsuario = async (req, res) => {
    const { status, external_reference } = req.query;
    const { email } = req.body;
    try {
        if(status === 'approved'){
            //CREAR FUNCION PARA AGREGAR COINS AL USUARIO
            //External_reference es el id del producto, asi consultas la tabla de productos y sabes
            // cual producto compro el usuario para agregar esa cantidad a sus coins
            const productos = await Coins.findAll()
            const referencia = productos.find(producto => producto.id === external_reference) //producto que compro el usuario
            const usuario = await Users.findOne({where: {email}}) //usuario que compro el producto
            await usuario.update({coins: usuario.coins + referencia.coins}, {where: {email}})
            res.json({icon: 'success', mensaje: `Se agregaron ${referencia.coins} coins a tu cuenta. Ahora tienes ${usuario.coins} coins`});
        } else{
            res.json({icon: 'error', mensaje: 'Hubo un error con tu pago, intente nuevamente'});
        }       
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    crearLinkPago,
    insertarCoinsUsuario
}