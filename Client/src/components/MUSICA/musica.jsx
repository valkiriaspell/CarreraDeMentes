import React from 'react';
import audioMusic from './music.mp3';
import '../STYLES/musica.modules.css';

function Music() {
	// Datos que debe cargar el audio

	const item = [
		{
			id: 1,
			audio: audioMusic,
			formato: 'audio/mp3',
		},
	];

	return item.map((item) => {
		// Es necesario colocar una 'key' a partir de la versión de React JS 16
		// colocamos el objeto 'id: 1' en <div key={ item.id }

		return (
			<div className='audioPlayer' key={item.id}>
				<audio className='audio' controls>
					<source src={item.audio} type={item.formato} />
				</audio>
			</div>
		);
	});
}

export default Music;
