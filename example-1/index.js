const { Component } = React;
const { createStore } = Redux;

const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

const incrementCounter = () => ({
	type: COUNTER_INCREMENT
});

const decrementCounter = () => ({
	type: COUNTER_DECREMENT
});

const counter = (state = 0, action) => {
	switch (action.type) {
		case COUNTER_INCREMENT:
			return state + 1;
			
		case COUNTER_DECREMENT:
			return state - 1;
			
		default:
			return state;
	}
};

const store = createStore(counter);

const Counter = ({
	value,
	onIncrement,
	onDecrement
}) => (
	<div>
		<span>{ value }</span>
		<button onClick={ onIncrement }>+</button>
		<button onClick={ onDecrement }>-</button>
	</div>
);

const render = () => {
	ReactDOM.render(
		<Counter
			value={ store.getState() }
			onIncrement={ () => store.dispatch(incrementCounter()) }
			onDecrement={ () => store.dispatch(decrementCounter()) }
			/>,
		document.getElementById('example-application')
	);
};

store.subscribe(render);
render();
