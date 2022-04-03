const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const cors = require('cors');
require('./db.js');

/// conexion de sockets
const server = express();
var app=require('http').Server(server);
var io=require('socket.io')(app,{
	cors:{
		origin:"*"
	}
})
//server.use(express.static('public'))

io.on('connection',(socket)=>{//que hago cuando recibo 'connect'?
        
    const {room,email}=socket.handshake;    
    socket.join(room)
	//crear ruta en rooms para conectar un usuario nuevo
    
    io.to(room).emit('NEW_CONNECTION', email)
    
    socket.on('READY',(id)=>{
        io.to(room).emit('READY',id)
    })
	socket.on('START',()=>{
		io.to(room).emit('START')
	})
	socket.on('EXPEL_PLAYER',(id)=>{
		io.to(room).emit('EXPEL_PLAYER', id)
	})

    socket.on('DISCONNECT',()=>{//alguien se desconecta de la room
        console.log("se desconecto")
		//crear ruta en rooms para desconectar un usuario         
		io.to(room).emit('DISCONNECT')
    })
    socket.on('NEW_MESSAGE',(data)=>{ //alguien envia un nuevo mensaje
        const {text,name, email}=data;//cual es el mensaje?  para que room? quien lo envia?
        io.to(room).emit('NEW_MESSAGE',{text,name, email})
    }) 
})

server.name = 'API';

server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
//server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
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
server.use(
	session({
		name: 'sid',
		secret: 'secret', // Debería estar en un archivo de environment
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 2, // Está en milisegundos --> 2hs
		},
	})
);
server.use(cookieParser('secret'));

server.use('/', routes);

module.exports = app;
