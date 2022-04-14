import React, { useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {firebaseCerrarSesion} from '../../utils/Firebase';
import '../STYLES/home.modules.css';
import '../STYLES/buttons.css';
import { FaPowerOff } from 'react-icons/fa';
import UserCard from './userCard';
import Instructions from './instructions';
import {BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp} from 'react-icons/bs';
import {createRoom, loginUser} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import { modifyHost } from '../PRE-GAMEROOM/utils';

function Home(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const autenticado = localStorage.getItem('token');
	const { user } = useSelector((state) => state);
	const email = localStorage.getItem('email');
	useEffect(() =>{
		!user?.name && dispatch(loginUser(email))
	}, [])
	async function handleSignOut(e) {
		e.preventDefault();
		await firebaseCerrarSesion();
		localStorage.clear();
		history.push('/');
	}

	async function handleCreateRoom() {
		await modifyHost(email, true);
		await dispatch(loginUser(email))
		const idRoom = await dispatch(createRoom(user));
		history.push(`/room/${idRoom?.id}`);
	}

	if (autenticado) {
		return (
			<div className='container'>
				<div className='nav'>
					<div style={{marginTop: "0.6rem"}} >
						<NavLink style={{margin:"0.5rem"}} to={'/tienda'}>
							<button style={{fontSize:"11px"}} className="buttonSides brown">Tienda</button>
						</NavLink>
						<NavLink style={{margin:"0.5rem"}} to={'/editProfile'}>
							<button style={{fontSize:"11px"}} className="buttonSides brown">Mi perfil</button>
						</NavLink>
					</div>
					<div className="logo">
						<img width="240px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt='Logo'></img>
					</div>

					<div>
						{/* COMPONENTE USERCARD */}
						<UserCard location={props.location} />
					</div>
						<div>
							<NavLink className='buttonsNav' to={'/'}>
								<button
								style={{fontSize:"11px"}}
									className='buttonSides brown buttonCerrarSesión'
									onClick={(e) => handleSignOut(e)}
								>
									<FaPowerOff />
								</button>
							</NavLink>
						</div>
				</div>

     {/* <-----------------------------  ESTO SE RENDERIZA EN SMARTPHONE     --------------------------------------> */}
				<div className='nav__smartphone'>
					<div className='contentNav__smartphone'>
					<div style={{marginTop: "1rem"}} >
						<NavLink style={{margin:"0.2rem"}} to={'/tienda'}>
							<button style={{fontSize:"11px"}} className="buttonSides brown">Tienda</button>
						</NavLink>
						<NavLink style={{margin:"0.2rem"}} to={'/editProfile'}>
							<button style={{fontSize:"11px"}} className="buttonSides brown">Mi perfil</button>
						</NavLink>
						{/* <div>
							<NavLink style={{display: "flex", justifyContent: "start"}} to={'/'}>
								<button
								style={{fontSize:"11px"}}
									className='buttonSides brown buttonCerrarSesión'
									onClick={(e) => handleSignOut(e)}
								>
									<FaPowerOff />
								</button>
							</NavLink>
						</div> */}
					</div>
					<div>
						{/* COMPONENTE USERCARD */}
						<UserCard location={props.location} />
					</div>
					</div>
					<div>
					<div className="logo">
						<img width="240px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt='Logo'></img>
					</div>
					</div>
				</div>
         {/* <-----------------------------             --------------------------------------> */}
				<div className='content'>
					<div className='contentButtons'>
						<button className='buttonSides brown' onClick={handleCreateRoom}>
							Crear partida
						</button>
						<NavLink to={'/partidasDisponibles'}>
							<button className='buttonSides brown'>Partidas disponibles</button>
						</NavLink>
						<NavLink to={'/añadirPregunta'}>
							<button className='buttonSides brown'>Crear Preguntas</button>
						</NavLink>
					</div>
					<div>
						<Instructions />
					</div>
				</div>
				<div>
					<ul className='social-icons'>
						<li>
							<a
								href='http://www.facebook.com/sharer.php?u=https://www.zoopertrivia.com/'
								target='blanck'
							>
								<i>
									<BsFacebook />
								</i>
							</a>
						</li>
						<li>
							<a
								href='https://www.linkedin.com/sharing/share-offsite/?url=https://www.zoopertrivia.com/'
								target='blanck'
							>
								<i>
									<BsLinkedin />
								</i>
							</a>
						</li>
						<li>
							<a
								href='https://twitter.com/intent/tweet?text=juega%20conmigo&url=https://www.zoopertrivia.com/&hashtags=ZooPerTrivia'
								target='blanck'
							>
								<i>
									<BsTwitter />
								</i>
							</a>
						</li>
						<li>
							<a
								href='https://api.whatsapp.com/send?text=https://www.zoopertrivia.com/'
								target='blanck'
							>
								<i>
									<BsWhatsapp />
								</i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	} else {
		history.push('/');
		return <div></div>;
	}
}

export default Home;
