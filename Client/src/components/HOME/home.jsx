import React, { useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {firebaseCerrarSesion} from '../../utils/Firebase';
import '../STYLES/home.modules.css';
import '../STYLES/buttons.css';
import UserCard from './userCard';
import Instructions from './instructions';
import {createRoom, loginUser} from '../../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import { modifyHost } from '../PRE-GAMEROOM/utils';
import Music from '../MUSICA/musica';
import Social from './social';
import Swal from "sweetalert2";

function Home(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const autenticado = localStorage.getItem('token');
	const { user } = useSelector((state) => state);
	const email = localStorage.getItem('email');
	
	useEffect(() =>{
		!user?.name && dispatch(loginUser(email))
		console.log(user)
	}, [])

	useEffect(() => {
		if(Date.parse(user.bannerTime)>new Date()){
			Swal.fire({
			  icon: "error",
			  title:
				`Lo sentimos, el usuario se encuentra bloqueado hasta el ${user.bannerTime}`,
			  heightAuto: false,
			  timer: 3000,
			  }).then(()=>history.push('/'))
		  }
	}, [user])

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
				<Music/>
				<div className='nav'>
					<div style={{marginTop: "0.6rem"}} >
						<NavLink style={{margin:"0.5rem"}} to={'/ranking'}>
							<button  className="buttonSides brown">Ranking</button>
						</NavLink>
						<NavLink style={{margin:"0.5rem"}} to={'/tienda'}>
							<button  className="buttonSides brown">Tienda</button>
						</NavLink>
						<NavLink style={{margin:"0.5rem"}} to={'/editProfile'}>
							<button className="buttonSides brown">Mi perfil</button>
						</NavLink>
					</div>
					<div className="logo">
						<img width="450px" src="https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4" alt='Logo'></img>
					</div>
					<div>
						{/* COMPONENTE USERCARD */}
						<UserCard location={props.location} />
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
						<NavLink style={{margin:"0.2rem"}} to={'/ranking'}>
							<button style={{fontSize:"11px"}}  className="buttonSides brown">Ranking</button>
						</NavLink>
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
						<NavLink  to={'/'}>
								<button
								className='buttonSides brown'
									onClick={(e) => handleSignOut(e)}
								>
									SALIR
								</button>
							</NavLink>
					</div>
					<div>
						<Instructions />
					</div>
					<div className='contentSocial'>
					<Social />
					</div>
				</div>
				<div className='contentSocialSmartphone'>
					<Social/>
				</div>
			</div>
		);
	} else {
		history.push('/');
		return <div></div>;
	}
}

export default Home;
