import React, {useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {
	firebaseLogin,
	firebaseLoginFacebook,
	firebaseLoginGoogle,
} from '../../../utils/Firebase';
import '../../STYLES/login.modules.css';
import Google from '../../IMG/google.png';
import Facebook from '../../IMG/facebook.png';
import Contraseña from '../../IMG/unlock.png';
import Email from '../../IMG/email.png';
import Arrow from '../../IMG/arrow.png';
import Perfil from '../../IMG/users.png';
import {useDispatch} from 'react-redux';
import {loginUser, registerUser, userToken} from '../../../redux/actions';
import Swal from 'sweetalert2';
import Music from '../../MUSICA/musica';

const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

function Login() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [input, setInput] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState({});

	function validar(input) {
		let errors = {};

		if (!input.email) {
			return Swal.fire({
				title: `Ingresa un usuario`,
				icon: 'warning',
				confirmButtonText: 'OK',
				heightAuto: false,
				backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
			});
		} else if (!emailRegex.test(input.email)) {
			Swal.fire({
				icon: 'error',
				heightAuto: false,
				title: 'Oops...',
				text: 'Ingresa un mail valido',
			});
		}

		if (input.password.length === 0) {
			return Swal.fire({
				title: `Ingresa una contraseña`,
				icon: 'warning',
				confirmButtonText: 'OK',
				heightAuto: false,
				backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
			});
		}
		if (input.password.length < 6) {
			return Swal.fire({
				title: `La contraseña debe contener al menos 6 caracteres`,
				icon: 'warning',
				heightAuto: false,
				confirmButtonText: 'OK',
				backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
			});
		}
		return errors;
	}

	function handleOnChange(e) {
		setInput({...input, [e.target.name]: e.target.value});
	}

	async function handleLogin(e) {
		e.preventDefault();
		const validacion = validar(input);

		if (Object.keys(validacion).length === 0) {
			const login = await firebaseLogin(input.email, input.password);
			if (login?.accessToken) {
				if (login.emailVerified === true) {
					await dispatch(loginUser(input.email));
					dispatch(userToken(login.accessToken));
					localStorage.setItem('email', login.email);
					localStorage.setItem('token', login.accessToken);
					history.push('/home');
				} else {
					return Swal.fire({
						title: `Por favor, verifique su cuenta para poder ingresar`,
						icon: 'warning',
						confirmButtonText: 'OK',
						heightAuto: false,
						backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
					});
				}
			} else {
				setError({mensaje: login});
			}
		} else {
			setError(() => validacion);
		}
	}

	async function handleLoginGoogle() {
		const iniciarSesion = await firebaseLoginGoogle();
		if (iniciarSesion.accessToken) {
			await dispatch(
				registerUser({
					name: iniciarSesion.displayName,
					email: iniciarSesion.email,
					idAvatar: 1,
				})
			);
			localStorage.setItem('email', iniciarSesion.email);
			localStorage.setItem('token', iniciarSesion.accessToken);
			history.push('/home');
		} else {
			setError({mensaje: iniciarSesion});
		}
	}

	async function handleLoginFacebook() {
		const iniciarSesion = await firebaseLoginFacebook();
		console.log(iniciarSesion);
		if (iniciarSesion.accessToken) {
			await dispatch(
				registerUser({
					name: iniciarSesion.displayName,
					email: iniciarSesion.email,
					idAvatar: 1,
				})
			);
			localStorage.setItem('email', iniciarSesion.email);
			localStorage.setItem('token', iniciarSesion.accessToken);
			history.push('/home');
		} else {
			setError({mensaje: iniciarSesion});
		}
	}

	return (
		<div>
			<Music />
			<div className='containerLogin'>
				<div className='logo'>
					<img
						width='220px'
						src='https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4'
						alt='Logo'
					></img>
				</div>
				<div className='contentLogin'>
					<form onSubmit={handleLogin}>
						<div className='imgUser'>
							<img src={Perfil} alt='User' width={60} />
						</div>
						<div className='input'>
							<img src={Email} alt='Email' width={22} />
							<input
								name='email'
								type='email'
								placeholder='Email'
								value={input.email}
								onChange={(e) => handleOnChange(e)}
							/>
						</div>
						<div className='input'>
							<img src={Contraseña} alt='Contraseña' width={20} />
							<input
								name='password'
								type='password'
								placeholder='Contraseña'
								value={input.password}
								onChange={(e) => handleOnChange(e)}
							/>
						</div>
						<button className='buttonLogin' type='submit'>
							Ingresar
						</button>
						<NavLink className='linkContraseña' to={'recuperarcontrasena'}>
							¿Olvidaste tu contraseña?
						</NavLink>
					</form>
					<div className='contentLogin2'>
						<img src={Arrow} alt='Arrow' className='imgArrow' width={27} />
						<Link className='buttonSingUP' to={'/signup'}>
							Registrarse
						</Link>
						<button onClick={handleLoginFacebook}>
							Ingresar con Facebook{' '}
							<img src={Facebook} width={20} alt='Facebook' />
						</button>
						<button onClick={handleLoginGoogle}>
							Ingresar con Google <img src={Google} width={20} alt='Google' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
