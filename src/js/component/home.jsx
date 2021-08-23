import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [notes, setNotes] = useState([]);
	const [myListNotes, setMyListNotes] = useState([]);

	const addNote = note => {
		if (event.key === "Enter") {
			setNotes([...notes, note.target.value]);
			event.target.value = "";
		}
	};

	useEffect(() => {
		setMyListNotes(
			notes.map((element, index) => (
				<li key={index.toString()}>{element}</li>
			))
		);
	}, [notes]);

	return (
		<div className="text-center mt-5">
			<h1>Notas:</h1>

			<input
				type="text"
				name="note"
				id="note"
				onKeyPress={event => {
					addNote(event);
				}}
				placeholder="Escribir notas.."
			/>

			{myListNotes}
		</div>
	);
};

export default Home;
