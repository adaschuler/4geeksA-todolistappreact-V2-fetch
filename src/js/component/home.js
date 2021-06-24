import React, { useState } from "react";
export function Home() {
	// 01 - Crear un array
	const [todos, setTodos] = useState(["tarea 1", "tarea 2", "tarea 3"]);
	/// 02 guardar texto que digito el usuario
	const [task, setTask] = useState("");
	function todosEliminar(index) {
		if (index > -1) {
			const filterList = todos.filter(item => item !== todos[index]);
			setTodos(filterList);
		}
	}
	return (
		// 03 Hacer el formulario
		<div className="text-center mt-5 container">
			<h1>TODO LIST WITH REACT</h1>
			<form
				onSubmit={evento => {
					evento.preventDefault();
					if (task.length > 0) setTodos([...todos, task]);
					setTask("");
				}}>
				<input
					className="form-control form-control-lg"
					placeholder="Ingrese su tarea"
					onChange={evento => setTask(evento.target.value)}
					value={task}></input>
			</form>
			{/* 04 mostrar el contenido del arreglo */}
			<ul>
				{todos.map((item, index) => {
					return (
						<li key={index}>
							<span>{item}</span>
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
		</div>
	);
}
