import { AppContext } from '../../context';
import { useContext } from 'react';
import styles from './todo.module.css';


export const Todo = ({text, id}) => {

	const {requestUpdateTodo, requestDeleteTodo, edit, setEdit, updateInputValue, setUpdateInputValue} = useContext(AppContext);

function updateTodo(id, text){
	setEdit(id);
	setUpdateInputValue(text);
}

	return (
		<li className={styles.todo}>

			{
			edit === id ?
			<div>
				<input onChange={(e)=>setUpdateInputValue(e.target.value)} value={updateInputValue} />
			</div>
			: <span>{text}</span>
		}
		{
			edit === id ?
			<div><button onClick={()=>requestUpdateTodo(id)}>Сохранить</button></div>
			: <div className={styles.buttonDiv}>
			<button onClick={() => updateTodo(id, text)} className={styles.changeTodo}>🖉</button>
			<button onClick={() => requestDeleteTodo(id)} className={styles.deleteTodo}>✖</button>
			</div>
		}

		</li>
	);
};
