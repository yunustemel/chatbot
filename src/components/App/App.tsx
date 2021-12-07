import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import Header from '../Header/Header';
import Body from '../Body/Body';
import Footer from '../Footer/Footer';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { clearMessages } from '../../store/actionCreators';

const ChatContainer = styled(Box)({
    borderRadius: '10px',
    boxShadow: `0px 2px 10px 1px grey`,
    width: '90vw',
    maxWidth: '370px',
    'z-index': 1000,
    bottom: '12%',
    right: '3%',
    position: 'absolute',
});

const CustomFab = styled(Fab)({
    bottom: '3%',
    right: '3%',
    position: 'absolute',
});

export default function App() {
    const dispatch: Dispatch<any> = useDispatch();
    const [chatOpen, setChatOpen] = useState(false);

    const resetMessages = React.useCallback(() => dispatch(clearMessages()), [dispatch]);

    useEffect(() => {
        if (!chatOpen) {
            resetMessages();
        }
    }, [chatOpen, resetMessages]);

    const toggle = () => {
        setChatOpen(!chatOpen);
    };
    return (
        <Grid container data-cy="app">
            {chatOpen && (
                <ChatContainer>
                    <Header />
                    <Body />
                    <Footer />
                </ChatContainer>
            )}
            <CustomFab color="primary" aria-label="add" onClick={toggle} data-cy="start-chat">
                {chatOpen ? <CloseIcon /> : <MessageIcon />}
            </CustomFab>
        </Grid>
    );
}
