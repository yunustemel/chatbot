import React, { useEffect, useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../store/actionCreators';
import settings from '../../config/settings';

const { SocketClient } = require('@cognigy/socket-client');

export default function Footer() {
    const dispatch: Dispatch<any> = useDispatch();
    const [messageToSend, setMessageToSend] = useState<string>('');
    const saveMessages = React.useCallback((message: IMessage) => dispatch(setMessages(message)), [dispatch]);

    const client = useRef(
        new SocketClient(settings.apiUrl, settings.token, {
            // if you use node, internet explorer or safari, you need to enforce websockets
            forceWebsockets: true,
        }),
    );

    useEffect(() => {
        const time = new Date();
        const n = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
        (async () => {
            client.current.on('output', (output: { text: string; data: { imgSrc?: 'string' } }) => {
                console.log('Text: ' + output.text + '   Data: ' + output.data);
                saveMessages({
                    from: 'Bot',
                    text: output.text,
                    time: n,
                    data: output.data,
                });
            });
            // establish a socket connection (returns a promise)
            await client.current.connect();
        })();
    }, [client, saveMessages]);

    const sendMessage = (messageToSend: string) => {
        const time = new Date();
        const n = ('0' + time.getHours()).slice(-2) + ':' + ('0' + time.getMinutes()).slice(-2);
        if (messageToSend !== '') {
            // send a message with text, text and data, data only
            client.current.sendMessage(messageToSend);
            saveMessages({
                from: 'You',
                text: messageToSend,
                time: n,
                data: {},
            });
        }
        setMessageToSend('');
    };

    return (
        <Paper component="form" sx={{ display: 'flex' }} data-cy="app-footer">
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                data-cy="app-footer-textField"
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                placeholder="Type your message"
                inputProps={{ 'aria-label': 'type your message' }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage(messageToSend);
                    }
                }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                color="primary"
                sx={{ p: '10px' }}
                data-cy="app-footer-sendButton"
                aria-label="send"
                onClick={() => sendMessage(messageToSend)}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
}
