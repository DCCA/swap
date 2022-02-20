import React from "react";
import { Button, Card, CardContent, Typography } from '@mui/material';
import Link from "next/link";

const CardData = (props) => {
    const {data, description, action, href} = props;

    const roundNumbers = (number) => {
        const result = (parseFloat(number)).toFixed(3)
        return result + ' ETH';
    }

    return (
        <Card raised='true' sx={{marginBottom: '1rem', display: 'flex', justifyContent: 'center', textAlign: 'center', bgcolor: 'secondary.dark', overflow: 'visible'}}>
            <CardContent>
                <Typography sx={{fontSize: '2.25rem', fontWeight: '600', lineHeight: '2.25rem', color: 'white'}}>
                    {roundNumbers(data)}
                </Typography>
                <Typography sx={{fontSize: '.875rem', lineHeight: '1.25rem', color: 'white'}}>
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