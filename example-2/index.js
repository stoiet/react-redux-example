const { Component } = React;
const { createStore, combineReducers } = Redux;

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

const addTodo = (id, text) => ({
	type: ADD_TODO,
	id,
	text
});

const toggleTodo = (id) => ({
	type: TOGGLE_TODO,
	id
});

const setVisibilityFilter = (filter) => ({
	type: SET_VISIBILITY_FILTER,
	filter
});

const todo = (state, action) => {
	switch (action.type) {
		
		case ADD_TODO:
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
			
		case TOGGLE_TODO: {
			if (state.id !== action.id) { return state; }
			
			return {
				...state,
				completed: !state.completed
			};	
		}
		
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		
		case ADD_TODO:
			return [...state, todo(undefined, action)];
			
		case TOGGLE_TODO:
			return state.map(todoItem => todo(todoItem, action));
		
		default:
			return state;
	}
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch (action.type) {
		
		case SET_VISIBILITY_FILTER:
			return action.filter;
		
		default:
			return state;
	}
};

let reducer = (state = {}, action) => ({
	todos: todos(state.todos, action),
	visibilityFilter: visibilityFilter(state.visibilityFilter, action)
});

// reducer = combineReducers({
// 	todos,
// 	visibilityFilter
// });

let store = createStore(reducer);

// store = createStore(reducer, {
// 	todos: [{ id: 0, text: 'DEFAULT', completed: true }],
// 	visibiltyFilter: 'SHOW_ALL'
// });

const filterTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
			
		case 'SHOW_ACTIVE':
			return todos.filter(todo => !todo.completed);
			
		case 'SHOW_COMPLETED':
			return todos.filter(todo => todo.completed);
			
		default:
			return todos;
	}
};

class Application extends Component {
	
	constructor(props) {
		super(props);
		
		this.nextTodoId = this.props.store.getState().todos.length;
	}
	
	render() {
		const filteredTodos = filterTodos(
			this.props.store.getState().todos,
			this.props.store.getState().visibilityFilter
		);
		
		return (
			<div>
				<input ref={ inputNode => { this.input = inputNode; }} />
				<button
					onClick={ () => this.props.store.dispatch(addTodo(this.nextTodoId++, this.input.value))}
					>
					{ 'Add Todo' }
				</button>
				<ul>
					{ filteredTodos.map(todo =>
						<li
							key={ todo.id }
							onClick={ () => this.props.store.dispatch(toggleTodo(todo.id)) }
							style={{ color: todo.completed ? 'green' : 'black' }}
							>
							{ todo.text }
						</li>
					)}
				</ul>
				{ 'Show: ' }
				<a href="#" onClick={ () => this.props.store.dispatch(setVisibilityFilter('SHOW_ALL')) }>{ 'All' }</a>
				{ ', ' }
				<a href="#" onClick={ () => this.props.store.dispatch(setVisibilityFilter('SHOW_ACTIVE')) }>{ 'Active' }</a>
				{ ', ' }
				<a href="#" onClick={ () => this.props.store.dispatch(setVisibilityFilter('SHOW_COMPLETED')) }>{ 'Completed' }</a>
			</div>
		);
	}
	
}

const render = () => {
	ReactDOM.render(
		<Application store={ store } />,
		document.getElementById('example-application')
	);
};

store.subscribe(render);
render();
