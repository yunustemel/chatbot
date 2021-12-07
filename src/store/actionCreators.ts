import * as actionTypes from './actionTypes';

export function setMessages(message: IMessage) {
    const action: IMessageAction = {
        type: actionTypes.SET_MESSAGES,
        message,
    };
    return action;
}

export function clearMessages() {
    const action: IMessageAction = {
        type: actionTypes.CLEAR_MESSAGES,
    };
    return action;
}
