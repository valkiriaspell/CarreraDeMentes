import React, { useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {firebaseCerrarSesion} from '../../utils/Firebase';
import '../STYLES/home.modules.css';
import { FaPowerOff } from 'react-icons/fa';
import UserCard from './userCard';
import Instructions from './instructions';
import {BsFacebook, BsLinkedin, BsTwitter, BsWhatsapp} from 'react-icons/bs';
import {createRoom, loginUser, modifyHost} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';

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
		const host = await dispatch(modifyHost(email, true));
		console.log(host);
		const idRoom = await dispatch(createRoom(user));

		history.push(`/room/${idRoom?.id}`);
	}

	if (autenticado) {
		return (
			<div className='container'>
				<div className='nav'>
					<div>
						<NavLink className='buttonsNav' to={'/tienda'}>
							<button>Tienda</button>
						</NavLink>
						<NavLink className='buttonsNav' to={'/editProfile'}>
							<button>Mi perfil</button>
						</NavLink>
					</div>
					<div className="logo">
						<img width="200px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Fzooper-logo.png?alt=media&token=d211e20b-1313-420f-91a8-aa791a6aae3c"></img>
					</div>
					<div className='infoUser'>
						{/* COMPONENTE USERCARD */}
						<UserCard location={props.location} />
						<div>
							<NavLink className='buttonsNav' to={'/'}>
								<button
									className='buttonCerrarSesión'
									onClick={(e) => handleSignOut(e)}
								>
									<FaPowerOff />
								</button>
							</NavLink>
						</div>
					</div>
				</div>
				<div className='content'>
					<div className='contentButtons'>
						<button className='button' onClick={handleCreateRoom}>
							Iniciar partida
						</button>
						<NavLink to={'/partidasDisponibles'}>
							<button className='button'>Partidas disponibles</button>
						</NavLink>
						<NavLink to={'/añadirPregunta'}>
							<button className='button'>Crear Preguntas</button>
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
