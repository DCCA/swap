import React from "react";
import { Button, ButtonGroup, Card, CardContent, Container, Typography } from '@mui/material';
import Link from "next/link";

const CardData = (props) => {
    const {data, description, action, href} = props;

    return (
        <Card raised='true' sx={{marginBottom: '1rem', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
            <CardContent>
                <Typography sx={{fontSize: '2.25rem', fontWeight: '600', lineHeight: '2.25rem'}}>
                    {data}
                </Typography>
                <Typography sx={{fontSize: '.875rem', lineHeight: '1.25rem'}}>
                    {description}
                </Typography>
                <Link href={href}>
                    <Button color="primary" variant="contained" sx={{marginTop: '.5rem', textTransform: 'lowercase'}}>
                        <Typography>
                            {action}
                        </Typography>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default CardData;