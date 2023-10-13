import styles from './addNewTodoForm.module.css';
import { AppContext } from '../../context';
import { useContext } from 'react';


export const AddNewTodoForm = () => {

	const {value, setValue, requestAddNewTodo, getSortedTodos, onSearch} = useContext(AppContext);

	return (

			<form className={styles.addNewTodoForm}>
				<input
					type="text"
					name="newTodo"
					value={value}
					placeholder='Поиск...'
					onChange={({ target }) => setValue(target.value)}
					className={styles.input}
				/>
				<button onClick={requestAddNewTodo} className={styles.AddNewTodoButton}>Добавить</button>
				<button type='button' onClick={() => getSortedTodos()} className={styles.buttonAlphabeticalSorting}>По алфавиту</button>
				<button type='button' onClick={() => onSearch()} className={styles.buttonSearch}>🔎</button>
			</form>

	);
};
