const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('./db.js');
const { MP_TKN } = process.env;

//Configuracion Mercado Pago
mercadopago.configure({
	access_token: MP_TKN,
});

/// conexion de sockets
const server = express();
var app = require('http').Server(server);
var io = require('socket.io')(app, {
	cors: {
		origin: '*',
	},
});
//server.use(express.static('public'))



io.on('connection', (socket) => {
	//que hago cuando recibo 'connect'?
	
	const {idGameRoom, email} = socket.handshake.query;
	console.log('yo soy la room', idGameRoom)
	socket.join(idGameRoom);
	//crear ruta en rooms para conectar un usuario nuevo
    
	
    io.to(idGameRoom).emit('NEW_CONNECTION', email)
    
    socket.on('READY',(id)=>{
		io.to(idGameRoom).emit('READY',id)
    })
	socket.on('START',()=>{
		io.to(idGameRoom).emit('START')
	})
	socket.on('EXPEL_PLAYER',(id)=>{
		io.to(idGameRoom).emit('EXPEL_PLAYER', id)
	})
	
	socket.on('DISCONNECT', () => {
		//alguien se desconecta de la room
		console.log('se desconecto');
		//crear ruta en rooms para desconectar un usuario
		io.to(idGameRoom).emit('DISCONNECT');
	});
	socket.on('NEW_MESSAGE', ({text, name, email}) => {
		//alguien envia un nuevo mensaje
		/* const {text, name, email} = data; */ //cual es el mensaje?  para que room? quien lo envia?
		io.to(idGameRoom).emit('NEW_MESSAGE', {text, name, email});
	});
	socket.on('NEW_EVENT', (userState) => {
		io.to(idGameRoom).emit('NEW_EVENT',userState)
	});
	socket.on('CONFIG_ROOM',(roomConfiguration)=>{
		io.to(idGameRoom).emit('CONFIG_ROOM',roomConfiguration)
	})
});

server.name = 'API';

server.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "authorization",
    ],
  }));


server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
//server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Expose-Headers', 'Set-Cookie');
	next();
});

// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

//LOGIN

server.use(cookieParser('secret'));

server.use('/', routes);

module.exports = app;
