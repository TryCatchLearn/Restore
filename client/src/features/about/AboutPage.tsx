import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this!'))
            .catch(error => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant={'h2'}>Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))} variant={'contained'}>Test 400 error</Button>
                <Button onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))} variant={'contained'}>Test 401 error</Button>
                <Button onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))} variant={'contained'}>Test 404 error</Button>
                <Button onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))} variant={'contained'}>Test 500 error</Button>
                <Button onClick={getValidationError} variant={'contained'}>Test validation
                    error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>}
        </Container>
    )
}