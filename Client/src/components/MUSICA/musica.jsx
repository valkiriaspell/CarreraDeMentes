import React, {useState} from 'react';
import audioMusic from './music.mp3';
import '../STYLES/musica.modules.css';
import {AiFillSound} from 'react-icons/ai';
import Volumen from '../IMG/volume.png';
import Mute from '../IMG/mute.png';

function Music() {
	// Datos que debe cargar el audio
	const [music, setMusic] = useState(false);
	const item = [
		{
			id: 1,
			audio: audioMusic,
			formato: 'audio/mp3',
		},
	];

	function handleMusic(e) {
		if (music === false) {
			document.getElementById('player').play();
			setMusic(true);
		} else {
			document.getElementById('player').pause();
			setMusic(false);
		}
	}

	return item.map((item) => {
		// Es necesario colocar una 'key' a partir de la versión de React JS 16
		// colocamos el objeto 'id: 1' en <div key={ item.id }

		return (
			<div className='audioPlayer' key={item.id}>
				<audio id='player' loop>
					<source src={item.audio} type={item.formato} />
				</audio>
				<div>
					<button value='play' onClick={(e) => handleMusic(e)}>
						{music ? (
							<img src={Volumen} alt='Volumen' width={35} />
						) : (
							<img src={Mute} alt='Mute' width={35} />
						)}
					</button>
				</div>
			</div>
		);
	});
}

export default Music;
