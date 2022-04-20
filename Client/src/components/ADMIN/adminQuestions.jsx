import React, {useEffect, useState} from 'react';
import {CgDarkMode} from 'react-icons/cg';
import {useDispatch, useSelector} from 'react-redux';
import {
	getNewQuestions,
	handleQuestion,
	sendingMail,
} from '../../redux/actions';
import '../STYLES/admin.css';
import Swal from 'sweetalert2';
import {GrRefresh, GrUpdate} from 'react-icons/gr';
import {useHistory, NavLink} from 'react-router-dom';
import {deleteStorage} from '../../utils/Firebase.js';
import {loginUser} from '../../redux/actions';
import AdminNav from './adminNav';
import admin01 from '../IMG/Admin1.png';

export default function AdminQuestions() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [preguntasID, setPreguntas] = useState([]);
	const [category, setCategory] = useState('');
	const [images, setImages] = useState([]);
	const [emails, setEmails] = useState([]);
	const textReject =
		'Lamentablemente tu pregunta no cumplió los requisitos para formar parte de ZooPer Trivia! Intentalo nuevamente!!';
	const textAccept =
		'Te informamos que tu pregunta fue exitosamente agregada a las preguntas de ZooPer Trivia! Gracias por participar y a seguir jugando!';
	const admin = localStorage.getItem('admin');

	const {user} = useSelector((state) => state);

	useEffect(() => {
		dispatch(getNewQuestions());
	}, []);

	let {newQuestions} = useSelector((state) => state);
	console.log('nuevasP', newQuestions);

	///////////---->>> Functions  <<<----///////////
	function darkTheme(e) {
		e.preventDefault();
		let [tablaPreguntas] = document.getElementsByClassName('questionTable');
		if (tablaPreguntas.classList.contains('dark')) {
			console.log(tablaPreguntas.classList);
			tablaPreguntas.style.background = 'rgb(38, 2, 31)';
			tablaPreguntas.classList.remove('dark');
			tablaPreguntas.style.color = 'white';
		} else {
			tablaPreguntas.classList.add('dark');
			tablaPreguntas.style.background = 'white';
			tablaPreguntas.style.color = 'rgb(38, 2, 31)';
		}
	}

	function handleChecks(e, img) {
		if (!preguntasID.includes(e.target.value)) {
			setPreguntas([...preguntasID, e.target.value]);
			setImages([...images, img]);
		} else {
			let newPreguntas = preguntasID.filter((p) => p !== e.target.value);
			let newImages = images.filter((p) => p !== img);
			setPreguntas(newPreguntas);
			setImages(newImages);
		}
		if (!emails.includes(e.target.name)) {
			setEmails([...emails, e.target.name]);
		} else {
			let newEmails = emails.filter((e) => e !== e.target.name);
			setEmails(newEmails);
		}
	}

	function acceptQuestions() {
		console.log(preguntasID, 'preguntas ids');
		Swal.fire({
			title: `Estas preguntas serán agregadas a la base de datos de ZooPer Trivia`,
			icon: 'warning',
			showDenyButton: true,
			backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
			confirmButtonText: 'Aceptar',
			denyButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				const accept = 'accept';
				preguntasID.forEach((p) => dispatch(handleQuestion(p, accept)));
				emails.forEach((e) =>
					dispatch(
						sendingMail({
							userMail: e,
							textMail: textAccept,
						})
					)
				);
				Swal.fire({
					title: 'Preguntas enviadas',
					confirmButtonText: 'Ok',
				}).then((result) => {
					if (result.isConfirmed) {
						document.location.reload(true);
					}
				});
			}
		});
	}

	function rejectQuestions() {
		Swal.fire({
			title: `Estas preguntas serán eliminadas de forma permanente`,
			icon: 'warning',
			showDenyButton: true,
			backdrop: `
                    rgba(0,0,123,0.4)
                    left top
                    no-repeat
                  `,
			confirmButtonText: 'Aceptar',
			denyButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				const reject = 'reject';
				preguntasID.forEach((p) => {
					dispatch(handleQuestion(p, reject));
				});
				images.forEach((img) => {
					deleteStorage(img);
				});
				emails.forEach((e) =>
					dispatch(
						sendingMail({
							userMail: e,
							textMail: textReject,
						})
					)
				);
				Swal.fire({
					title: 'Preguntas eliminadas',
					confirmButtonText: 'Ok',
				}).then((result) => {
					if (result.isConfirmed) {
						document.location.reload(true);
					}
				});
			}
		});
	}
	function refresh() {
		document.location.reload(true);
	}

	function handleCategory(e) {
		setCategory(e.target.value);
	}

	if (category && category !== '') {
		newQuestions = newQuestions.filter((d) =>
			d.category.toLowerCase().includes(category.toLowerCase())
		);
	}

	newQuestions = newQuestions.sort((a, b) => {
		if (a.id > b.id) {
			return 1;
		}
		if (a.id < b.id) {
			return -1;
		}
		return 0;
	});

	if (admin) {
		return (
			<div className='adminHome'>
				<div className='questionsNav'>
					<NavLink exact to='/adminHome'>
						<img
							width='300px'
							src='https://firebasestorage.googleapis.com/v0/b/carreradementes-773d8.appspot.com/o/logotipos%2Flogo-jungla.png?alt=media&token=56d936a4-646a-4ef4-ae78-e635f8a5a9c4'
							alt='Logo'
						></img>
					</NavLink>
					<h2>Bienvenido/a a la sección de Revisión de Preguntas</h2>
					<img width='100px' src={admin01} alt='Admin01'></img>
					<AdminNav />
				</div>
				<hr />

				<div className='navHomeAdmin'>
					<h6 className='botonesBarra'>
						Preguntas seleccionadas: {preguntasID.length}
					</h6>
					<div>
						{/* <label>Filtrar por</label> */}
						<select
							className='botonesBarra'
							onChange={(e) => handleCategory(e)}
							placeholder='Categoria'
							name=''
							id=''
						>
							<option value=''>Categoria</option>
							<option value='Historia'>Historia</option>
							<option value='Geografía'>Geografía</option>
							<option value='Arte'>Arte</option>
							<option value='Ciencias'>Ciencias</option>
							<option value='Cine'>Cine</option>
							<option value='Deporte'>Deporte</option>
							<option value='Música'>Música</option>
						</select>
					</div>
					<button
						disabled={preguntasID.length === 0 || preguntasID.length > 1}
						className='botonesBarra'
						onClick={() => acceptQuestions()}
					>
						Aceptar
					</button>
					<button
						disabled={preguntasID.length === 0 || preguntasID.length > 1}
						className='botonesBarra'
						onClick={() => rejectQuestions()}
					>
						Rechazar
					</button>
					<button
						className='botonesBarra'
						id='refresh'
						onClick={(e) => refresh(e)}
					>
						<GrUpdate />
					</button>
					{/* <button className='botonesBarra' onClick={(e) => darkTheme(e)}><CgDarkMode /></button> */}
				</div>
				<hr />

				<div className='adminQuestions'>
					<table className='questionTable'>
						<tbody>
							<tr>
								<th>Seleccionar</th>
								<th>ID</th>
								<th>Autor</th>
								<th>Categoría</th>
								<th>Pregunta</th>
								<th>Respuesta Correcta</th>
								<th>Res. Falsa 1</th>
								<th>Res. Falsa 2</th>
								<th>Res. Falsa 3</th>
								<th>Imagen</th>
							</tr>
							{newQuestions?.map((q) => (
								<tr key={q.id}>
									<td>
										<input
											type='checkbox'
											name={q.email}
											value={q.id}
											onClick={(e) => handleChecks(e, q.image)}
										/>
									</td>
									<td>{q.id}</td>
									<td>{q.email}</td>
									<td>{q.category}</td>
									<td>{q.question}</td>
									<td>{q.answer}</td>
									<td>{q.false1}</td>
									<td>{q.false2}</td>
									<td>{q.false3}</td>
									<td>
										<a href={q.image} target='_blank'>
											Ver Imagen
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	} else {
		history.push('/');
		return <div></div>;
	}
}
