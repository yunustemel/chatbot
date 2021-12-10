import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import App from './components/App/App';

const store: Store<IMessagesState, IMessageAction> & {
    dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement,
);
