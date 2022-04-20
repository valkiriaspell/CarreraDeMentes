const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const cors = require('cors');
const mercadopago = require('mercadopago');
require('./db.js');
const { MP_TKN, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS,SUPERADMIN_EMAIL } = process.env;
const nodeMailer = require("nodemailer")

//Configuracion Mercado Pago
mercadopago.configure({
	access_token: MP_TKN,
});

/// conexion de sockets
const server = express();
var app = require('http').Server(server);
var io = require('socket.io')(app, {
	cors: {
		origin: 'https://www.zoopertrivia.com',
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
	socket.on('EXPEL_PLAYER',({id, arrayRemoveUser})=>{
		io.to(idGameRoom).emit('EXPEL_PLAYER', {id, arrayRemoveUser})
	})
 
	socket.on('DISCONNECT', (id) => {
		//alguien se desconecta de la room
		console.log('se desconecto');
		//crear ruta en rooms para desconectar un usuario
		io.to(idGameRoom).emit('DISCONNECT', id);
	});
	socket.on('NEW_MESSAGE', ({text, name, email}) => {
		//alguien envia un nuevo mensaje
		/* const {text, name, email} = data; */ //cual es el mensaje?  para que room? quien lo envia?
		io.to(idGameRoom).emit('NEW_MESSAGE', {text, name, email});
	});
	socket.on('NEW_EVENT', ({id, pointsTotal, point, name}) => {
		io.to(idGameRoom).emit('NEW_EVENT', {id, pointsTotal, point, name})
	});
	socket.on('CONFIG_ROOM',(roomConfiguration)=>{
		io.to(idGameRoom).emit('CONFIG_ROOM',roomConfiguration)
	})
	socket.on('FAST_REMOVE',(id)=>{
		io.to(idGameRoom).emit('FAST_REMOVE',id)
	})
	socket.on('ALL_START_GAME',(bool)=>{
		io.to(idGameRoom).emit('ALL_START_GAME', bool)
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

///////NodeMailer
server.post("/send_mail", cors(), async (req, res) => {
	let {textMail, userMail} = req.body
	////los datos del servicio de mailing, en este caso SENDGRID
	const transport = nodeMailer.createTransport({
		host: MAIL_HOST,
		port: MAIL_PORT,
		auth: {
			user: MAIL_USER,
			pass: MAIL_PASS
		}
	})
	////prototipo de mail que enviamos, con datos variables que recibe del front por body
await transport.sendMail({
	from: SUPERADMIN_EMAIL, 
	to: userMail,
	subject: "Notificación de ZooPer Trivia",
	html: `<div className="email" style="
	border: 1px solid black;
	padding: 20px;
	font-family: sans-serif;
	font-size: 18px;
	">
	<h2> Hola ${userMail}! </h2>
	<p>${textMail}</p>
	<img width="150px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo5.png?alt=media&token=5e5bb88d-806a-4c38-b667-b27a9b5b01fc"  alt="logo"/>
	<p>Equipo de Zooper Trivia</p>
	<p>www.zoopertrivia.com</p>
	</div>
	 `
	 
})
})
/////////NodeMailer

//server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://www.zoopertrivia.com'); // update to match the domain you will make the request from
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
