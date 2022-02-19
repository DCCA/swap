import { react } from "@babel/types";
import { AppBar, Button, Container, MenuItem, Typography } from '@mui/material';
import { Box } from "@mui/system";
import Link from "next/link";

const Header = () => {

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Link href={`/`} style={{justifySelf: 'start'}}>
                    <MenuItem>
                        /temakiBar
                    </MenuItem>
                </Link>
                <Box sx={{display: 'flex'}}>
                    <Link href={`/cashier`}>
                        <MenuItem>
                            Cashier
                        </MenuItem>
                    </Link>
                    <Link href={`/bet`}>
                        <MenuItem>
                            Bet
                        </MenuItem>
                    </Link>
                </Box>
            </Container>
        </AppBar>
    )
}

export default Header;