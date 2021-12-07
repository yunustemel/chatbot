import * as actionTypes from './actionTypes';

const initialState: IMessagesState = {
    messages: [],
};

const reducer = (state: IMessagesState = initialState, action: IMessageAction): IMessagesState => {
    switch (action.type) {
        case actionTypes.SET_MESSAGES:
            const newMessage: IMessage = action.message;
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        case actionTypes.CLEAR_MESSAGES:
            return {
                ...state,
                messages: [],
            };
    }
    return state;
};

export default reducer;
