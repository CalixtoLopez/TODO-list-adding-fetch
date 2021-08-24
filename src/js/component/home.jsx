import React, { useState, useEffect } from "react";
import Task from "./task.jsx";
//create your first component
const Home = () => {
	const [notes, setNotes] = useState([]);
	const [myListNotes, setMyListNotes] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/saurotauro", {
			method: "GET"
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				setNotes(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (notes.length) {
			setMyListNotes(
				notes.map((note, index) => {
					return (
						<Task
							text={note}
							id={index}
							key={index.toString()}
							delete={deleteNote}
						/>
					);
				})
			);
		}
	}, [notes]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/saurotauro", {
			method: "PUT",
			body: JSON.stringify(notes),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, [notes]);

	const deleteNote = indexDelete => {
		setNotes(notes.filter((_, index) => index !== indexDelete));
	};

	return (
		<div className="text-center mt-5">
			<form
				onSubmit={event => {
					event.preventDefault();
				}}>
				<h1>Note:</h1>
				<input
					id="myListNotes.length"
					className="task"
					type="tasks"
					onKeyPress={event => {
						if (event.key == "Enter") {
							if (event.key === "Enter") {
								setNotes([
									...notes,
									{ label: event.target.value, done: false }
								]);
								event.currentTarget.value = "";
							}
						}
					}}
					placeholder="note ......"
				/>
				<span>{(myListNotes.length, myListNotes)}</span>
			</form>
		</div>
	);
};

export default Home;
