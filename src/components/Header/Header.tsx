import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const CustomAppBar = styled(AppBar)({
    borderRadius: '5px 5px 0 0',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '5px 10px 5px',
});

export default function DenseAppBar() {
    return (
        <CustomAppBar position="static" data-cy="app-header">
            <Toolbar variant="dense">
                <Typography variant="h5" color="inherit" component="div">
                    Chat
                </Typography>
            </Toolbar>
        </CustomAppBar>
    );
}
