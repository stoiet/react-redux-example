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

class Counter extends Component {
	
	onIncrement() {
		this.props.store.dispatch(incrementCounter())
	}
	
	onDecrement() {
		this.props.store.dispatch(decrementCounter())
	}
	
	render() {
		return (
			<div>
				<span>{ this.props.store.getState() }</span>
				<button onClick={ () => this.onIncrement() }>+</button>
				<button onClick={ () => this.onDecrement() }>-</button>
			</div>
		);
	}
	
}

const render = () => {
	ReactDOM.render(
		<Counter store={ store } />,
		document.getElementById('example-application')
	);
};

store.subscribe(render);
render();
