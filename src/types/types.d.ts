interface IData {
    imgSrc?: string;
}

interface IMessage {
    from: string;
    text: string;
    time: string;
    data?: Data;
}

interface IMessagesState {
    messages: Message[];
}

interface IMessageAction {
    type: string;
    message?: Message;
}

type DispatchType = (args: MessageAction) => MessageAction;
