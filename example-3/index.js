const { Component } = React;
const { createStore, combineReducers } = Redux;

const SHOW_ALL = 'SHOW_ALL';
const SHOW_ACTIVE = 'SHOW_ACTIVE';
const SHOW_COMPLETED = 'SHOW_COMPLETED';

const filterTodos = (todos, filter) => {
	switch (filter) {
		case SHOW_ALL:
			return todos;
			
		case SHOW_ACTIVE:
			return todos.filter(todo => !todo.completed);
			
		case SHOW_COMPLETED:
			return todos.filter(todo => todo.completed);
			
		default:
			return todos;
	}
};

// Actions
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// Action Creators
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

// Reducers
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

const reducer = combineReducers({
	todos,
	visibilityFilter
});

const store = createStore(reducer);

// Components

const AddTodo = ({
	onTodoAdd
}) => {
	let input;
	
	return (
		<div>
			<input ref={ inputNode => { input = inputNode; }} />
			<button onClick={ () => onTodoAdd(input.value) } >
				{ 'Add Todo' }
			</button>
		</div>
	);
};

const Todo = ({
	text,
	completed,
	onClick
}) => (
	<li onClick={ onClick } style={{ color: completed ? 'green' : 'black' }} >
		{ text }
	</li>
);

const TodoList = ({
	todos,
	onTodoClick
}) => (
	<ul>
		{ todos.map(todo =>
			<Todo key={ todo.id } {...todo} onClick={ () => onTodoClick(todo.id) } />
		)}
	</ul>
);

const FilterLinks = ({
	filterTodos
}) => (
	<div>
		{ 'Show: ' }
		<a href="#" onClick={ () => filterTodos(SHOW_ALL) }>{ 'All' }</a>
		{ ', ' }
		<a href="#" onClick={ () => filterTodos(SHOW_ACTIVE) }>{ 'Active' }</a>
		{ ', ' }
		<a href="#" onClick={ () => filterTodos(SHOW_COMPLETED) }>{ 'Completed' }</a>
	</div>
);

class Application extends Component {
	
	constructor(props) {
		super(props);
		
		this.nextTodoId = this.props.todos.length;
	}
	
	render() {
		return (
			<div>
				<AddTodo onTodoAdd={ (value) => this.props.store.dispatch(addTodo(this.nextTodoId++, value)) } />
				<TodoList
					todos={ filterTodos(this.props.todos, this.props.visibilityFilter) }
					onTodoClick={ (id) => this.props.store.dispatch(toggleTodo(id)) }
				/>
				<FilterLinks filterTodos={ (filter) => this.props.store.dispatch(setVisibilityFilter(filter)) } />
			</div>
		);
	}
	
}

const render = () => {
	ReactDOM.render(
		<Application
			store={ store }
			todos={ store.getState().todos }
			visibilityFilter={ store.getState().visibilityFilter }
			/>,
		document.getElementById('example-application')
	);
};

store.subscribe(render);
render();
