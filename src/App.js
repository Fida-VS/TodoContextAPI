import styles from './App.module.css';
import { Title } from './components/Title';
import { TodoList } from './components/todo-list/todo-list';
import { AppContext } from './context';
import { useState, useEffect } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [updateInputValue, setUpdateInputValue] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [isSorted, setIsSorted] = useState(false);
	const [todos, setTodos] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const [edit, setEdit] = useState(null);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	useEffect(() => {
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((loadedTodos) => {
				console.log('loadedTodos', loadedTodos);
				setTodos(loadedTodos);
			});
	}, [refreshTodosFlag]);

	const requestAddNewTodo = () => {
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo added, answer of server:', response);
				refreshTodos();
			});
	};

	const requestUpdateTodo = (id) => {
		fetch('http://localhost:3005/todos/' + id, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				text: updateInputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo updated, answer of server:', response);
				refreshTodos();
				setEdit(null);
			});
	};

	const requestDeleteTodo = (id) => {
		fetch('http://localhost:3005/todos/' + id, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Todo deleted, answer of server:', response);
				refreshTodos();
			});
	};

	const filteredTodos = todos.filter((todo) => {
		return todo.text.toLowerCase().includes(value.toLowerCase());
	});

	const onSearch = () => {
		setIsSearching(!isSearching);
		setTodos(filteredTodos);
	};

	const sortedTodos = [...todos].sort((a, b) => {
		if (b.text.toLowerCase() > a.text.toLowerCase()) {
			return -1;
		}
		if (b.text.toLowerCase() < a.text.toLowerCase()) {
			return 1;
		}
		return 0;
	});

	function getSortedTodos() {
		setIsSorted(!isSorted);
		if (isSorted === true) {
			setTodos(sortedTodos);
		} else if (isSorted === false) {
			setTodos(todos);
		}
	}

	return (
		<AppContext.Provider
			value={{
				value,
				setValue,
				requestAddNewTodo,
				getSortedTodos,
				onSearch,
				requestUpdateTodo,
				requestDeleteTodo,
				edit,
				setEdit,
				updateInputValue,
				setUpdateInputValue,
			}}
		>
			<div className={styles.app}>
				<Title />
				<TodoList
					todos={todos}
				/>
			</div>
		</AppContext.Provider>
	);
};
