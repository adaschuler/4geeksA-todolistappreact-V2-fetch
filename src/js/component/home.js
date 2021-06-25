import React, { useState, useEffect } from "react";
export function Home() {
	// 01 - Crear un array
	const [todos, setTodos] = useState([]);
	/// 02 guardar texto que digito el usuario
	const [task, setTask] = useState({});

	const llamaToDo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/adaschuler", {
			method: "GET",
			/* body: JSON.stringify(todos), */
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json()) // (returns promise) will try to parse the result as json as return a promise that you can .then for results

			.then(data => setTodos(data))
			//here is were your code should start after the fetch finishes
			//this will print on the console the exact object received from the server

			.catch(error => {
				//error handling
				console.log(error);
			});
	};

	const updateToDo = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/adaschuler", {
			method: "PUT",
			body: JSON.stringify(todos),
			//en el body ira el arreglo en su formato de texto plano
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json()) // (returns promise) will try to parse the result as json as return a promise that you can .then for results

			.then(data => llamaToDo())
			//enviar a la API la actualizacion de la funcion llamaToDo
			//here is were your code should start after the fetch finishes
			//this will print on the console the exact object received from the server

			.catch(error => {
				//error handling
				console.log(error);
			});
	};
	/* const deleteAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/adaschuler", {
			method: "DELETE",
			body: JSON.stringify(todos),
			//en el body ira el arreglo en su formato de texto plano
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json()) // (returns promise) will try to parse the result as json as return a promise that you can .then for results

			.then(data => llamaToDo())
			//enviar a la API la solicitud de vaciar todo, incluida la funcion llamaToDo, la pagina quedaria vacia, por eso todo esta comentado
			//here is were your code should start after the fetch finishes
			//this will print on the console the exact object received from the server

			.catch(error => {
				//error handling
				console.log(error);
			});
	}; */
	function todosEliminar(index) {
		if (index > -1) {
			const filterList = todos.filter(item => item !== todos[index]);
			setTodos(filterList);
		}
	}

	useEffect(() => {
		llamaToDo();
	}, []);

	return (
		// 03 Hacer el formulario
		<div className="text-center mt-5 container">
			<h1>TODO LIST</h1>
			<h5>WITH REACT+FETCH</h5>
			<br />
			<form
				onSubmit={evento => {
					evento.preventDefault();
					if (task.label.length > 0) setTodos([...todos, task]);
					setTask({ label: "", done: "" });
				}}>
				<input
					className="form-control form-control-lg"
					placeholder="¿Que necesitas hacer?"
					onChange={evento =>
						setTask({ label: evento.target.value, done: false })
					}
					value={task.label}></input>
			</form>
			{/* 04 mostrar el contenido del arreglo */}
			<ul>
				{todos.map((item, index) => {
					return (
						<li key={index}>
							<span>{item.label}</span>
							<button
								className="btn btn-light float-right"
								onClick={() => {
									todosEliminar(index);
								}}>
								<i className="far fa-star"></i>
							</button>
						</li>
					);
				})}
			</ul>
			<div className="pendientes">{todos.length} pendiente/s</div>
			<p />
			<button
				className="update btn btn-secondary"
				onClick={() => updateToDo()}>
				Grabar en la API
			</button>
			{/* <p />
			<button
				className="delete btn btn-danger"
				onClick={() => deleteAll()}>
				Borrar y vaciar la API
			</button> */}
		</div>
	);
}
