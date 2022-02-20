import { react } from "@babel/types";
import { AppBar, Button, Container, MenuItem, SvgIcon, Typography } from '@mui/material';
import { Box, typography } from "@mui/system";
import Link from "next/link";
import TemakiIcon from '../assets/temaki-icon.svg';

const Header = () => {

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="sm" sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Link href={`/`} style={{justifySelf: 'start'}}>
                    <MenuItem sx={{paddingLeft: '0'}}>
                        <SvgIcon component={TemakiIcon} inheritViewBox/>
                        <Typography>
                            temakiBar
                        </Typography>
                    </MenuItem>
                </Link>
                <Box sx={{display: 'flex'}}>
                    <Link href={`/cashier`}>
                        <MenuItem>
                            .cashier
                        </MenuItem>
                    </Link>
                    <Link href={`/bet`}>
                        <MenuItem>
                            .bar
                        </MenuItem>
                    </Link>
                </Box>
            </Container>
        </AppBar>
    )
}

export default Header;