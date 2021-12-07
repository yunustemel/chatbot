import React, { useRef, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector, shallowEqual } from 'react-redux';
import { styled } from '@mui/material/styles';
import { sentStyle, receivedStyle, imgStyle } from './styles';

const CustomListItemText = styled(ListItemText)((props: { from: string }) => {
    const { from } = props;
    const style = from === 'You' ? sentStyle : receivedStyle;
    return style;
});

const CustomImg = styled('img')(imgStyle);

export default function Body() {
    const messages: IMessage[] = useSelector((state: IMessagesState) => state.messages, shallowEqual);
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, imageLoaded]);

    return (
        <Grid container data-cy="app-body">
            <Grid item xs={12}>
                <List style={{ height: '40vh', overflowY: 'auto' }}>
                    {messages.map((message, index) => {
                        return (
                            <ListItem key={index}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <CustomListItemText
                                            data-cy="message-bubble"
                                            primary={message.text}
                                            secondary={message.time}
                                            from={message.from}
                                            secondaryTypographyProps={{
                                                style: { color: message.from === 'You' ? '#fff' : '#000' },
                                            }}
                                        />
                                        {Object.keys(message.data).length > 0 && message.data.imgSrc && (
                                            <CustomImg
                                                src={message.data.imgSrc}
                                                alt={message.text}
                                                onLoad={() => setImageLoaded(!imageLoaded)}
                                                loading="lazy"
                                                data-cy="message-img"
                                            />
                                        )}
                                    </Grid>
                                </Grid>
                                <div ref={scrollRef} />
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
        </Grid>
    );
}
