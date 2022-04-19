import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { updateUser } from '../../redux/actions';
import {Link, useHistory} from 'react-router-dom';
import {getAvatars, updateUser} from '../../redux/actions';
import Avatars from '../AVATARS/avatars';
import '../STYLES/form.css';
import Swal from 'sweetalert2';

export default function EditProfile() {
	const dispatch = useDispatch();
	const history = useHistory();
	const autenticado = localStorage.getItem('token');

	//////////  ---->    Local states data   <------ //////////////
	const [msg, setMSG] = useState('');
	const [username, setUsername] = useState('');
	const [avatar, setAvatar] = useState(1);

	//////////  ---->    Local states errors   <------ //////////////
	const [errorName, setErrorName] = useState('');

	/////////  ---->    Store states    <------ //////////////
	const {user} = useSelector((state) => state);

	useEffect(() => {
		dispatch(getAvatars());
	}, []);

	if (user.guest) {
		Swal.fire({
			icon: 'error',
			title: 'Debes tener una cuenta para editar tu perfil',
			showConfirmButton: false,
			heightAuto: false,
			timer: 3000,
		});
		history.push('/home');
	}

	//////////////// ---->    VALIDATIONS    <------ /////////////

	function validation(e) {
		switch (true) {
			case e.target.name === 'name':
				if (/[\*\/\"\|\{\}\[\]\^\$\#\%\&\!\?\+\s]/.test(e.target.value)) {
					setUsername(e.target.value);
					setErrorName('Caracteres no permitidos');
				} else if (e.target.value.length > 16) {
					setUsername(e.target.value);
					setErrorName('Máximo 16 caracteres');
				} else {
					setUsername(e.target.value);
					setErrorName('');
				}
				break;
			default:
				console.log('default');
		}
	}

	//////////  ---->    on Submit   <------ //////////////
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateUser({
				id: user.id,
				name: username,
				idAvatar: avatar,
			})
		);
		setMSG('Cambios guardados');
		setUsername('');
	};
	if (autenticado) {
		return (
			<div className='form'>
				<div className='logo'>
					<img
						width='220px'
						src='https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4'
						alt='Logo'
					></img>
				</div>
				<form onSubmit={onSubmit}>
					<h3>Editar perfil</h3>
					<div className='formName'>
						<label>Nuevo nombre de Usuario:</label>
						<>
							<input
								className={errorName !== '' ? 'danger' : 'inputName'}
								name='name'
								type='text'
								value={username}
								onChange={(e) => validation(e)}
							/>
							{errorName ? <p className='error'>{errorName}</p> : null}
						</>
					</div>
					<div className='formAvatar'>
						<label>Seleccionar Avatar:</label>
						<div>
							<Avatars setAvatar={setAvatar} />
						</div>
					</div>
					<div className='FormSubmit'>
						<input
							disabled={errorName || (!username && !avatar)}
							className={
								errorName || (!username && !avatar) ? 'disabled' : 'enabled'
							}
							type='submit'
							value='Guardar cambios'
						/>
					</div>
					{msg ? <p>{msg}</p> : null}
				</form>

				<Link to='/home'>
					<button className='volver'>← Volver atras </button>
				</Link>
			</div>
		);
	} else {
		history.push('/');
		return <div></div>;
	}
}
