import { SimpleFormStyles } from './SimpleForm.styles.ts';
import { Button } from '@mui/material';
import { useState } from 'react';

const { Root, TextFieldStyled } = SimpleFormStyles;

const SimpleForm = () => {
    const [value, setValue] = useState('');
    const [hasError, setHasError] = useState(false);

    const onClick = () => {
        setHasError(false);

        const isInteger = value ? Number.isInteger(Number(value)) : false;
        setTimeout(() => {
            setHasError(!isInteger);
            if (isInteger) {
                alert(value);
            }
        });
    };

    return (
        <Root>
            <TextFieldStyled
                label='Type an integer'
                variant="outlined"
                className={hasError ? 'validation-error' : ''}
                onChange={({ target}) => setValue(target.value)}
            />

            <Button variant="contained" size="large" onClick={onClick}>Click me!</Button>
        </Root>
    );
};

export default SimpleForm;
