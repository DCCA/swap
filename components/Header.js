import { react } from "@babel/types";
import { AppBar, Button, Container, MenuItem, Typography } from '@mui/material';
import Link from "next/link";

const Header = () => {

    return (
        <AppBar position="static" color="primary">
            <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'center'}}>
                <Link href={`/`}>
                    <MenuItem>
                        Logo
                    </MenuItem>
                </Link>
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
            </Container>
        </AppBar>
    )
}

export default Header;