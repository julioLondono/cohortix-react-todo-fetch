import React from "react";
import { ToDoLine } from "./toDoLine.js";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: [
				"Wake Up",
				"Make Breakfast",
				"Go to Work",
				"sleep in my bed"
			],
			inputValue: ""
		};
	}

	handleSubmit = event => {
		event.preventDefault();
		let newTodoList = this.state;
		newTodoList.todos.push(this.state.inputValue);
		newTodoList.inputValue = "";
		this.setState(newTodoList);
	};

	deleteLine = index => {
		let tempState = this.state;
		tempState.todos.splice(index, 1);
		this.setState(tempState);
	};

	moveUp = index => {
		const splicedArray = this.state.todos.splice(index, 1);
		// console.log("todos=" + this.state.todos);
		// console.log("Spliced Array=" + splicedArray);
		let orderedArray = this.state.todos.splice(index - 1, 0, splicedArray);
		this.setState(orderedArray);
	};

	componetDidMount() {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/alesanchezr", {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be tru if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}

	render() {
		const mappedItems = this.state.todos.map((item, index) => {
			let firstLine = index === 0 ? "hideBtn" : "fas fa-angle-up";

			return (
				<ToDoLine
					key={index}
					toDo={item}
					delete={() => this.deleteLine(index)}
					upBtn={firstLine}
					move={() => this.moveUp(index)}
				/>
			);
		});

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit}>
					<div id="myDIV" className="header">
						<h2>My To Do List</h2>
						<input
							autoFocus={true}
							type="text"
							id="myInput"
							placeholder="Add New To Do Task..."
							value={this.state.inputValue}
							onChange={event => {
								this.setState({
									inputValue: event.target.value
								});
							}}
						/>
					</div>
				</form>
				<div className="todosTable">
					<ol id="myUL" className="tabla">
						{mappedItems}
					</ol>
				</div>
				<br />
				<p>Tasks Quantity= {this.state.todos.length}</p>
				<button
					onClick={event => {
						this.setState({
							todos: []
						});
					}}>
					{" "}
					Clean List{" "}
				</button>
			</div>
		);
	}
}
