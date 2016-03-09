const { Component } = React;
const { createStore, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;

// Action Types
const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
const COUNTER_DECREMENT = 'COUNTER_DECREMENT';

// Action Creators
const incrementCounter = () => ({
	type: COUNTER_INCREMENT
});

const decrementCounter = () => ({
	type: COUNTER_DECREMENT
});

// Reducers
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

// Components

@connect(
	state => state,
	dispatch => ({
		onIncrement: bindActionCreators(incrementCounter),
		onDecrement: bindActionCreators(decrementCounter)
	})
)
class Counter extends Component {

	render() {
		const { counter, onIncrement, onDecrement } = this.props;
		
		return (
			<div>
				<span>{ counter }</span>
				<button onClick={ onIncrement }>+</button>
				<button onClick={ onDecrement }>-</button>
			</div>
		);
	}

}

// const Counter = ({
// 	value,
// 	onIncrement,
// 	onDecrement
// }) => (
// 	<div>
// 		<span>{ value }</span>
// 		<button onClick={ onIncrement }>+</button>
// 		<button onClick={ onDecrement }>-</button>
// 	</div>
// );

// const Application = connect(
// 	state => ({ value: state }),
// 	dispatch => ({
// 		onIncrement: bindActionCreators(incrementCounter, dispatch),
// 		onDecrement: bindActionCreators(decrementCounter, dispatch)
// 	})
// )(Counter)

ReactDOM.render(
	<Provider store={ createStore(counter) }>
		<Application />
	</Provider>,
	document.getElementById('example-application')
);
