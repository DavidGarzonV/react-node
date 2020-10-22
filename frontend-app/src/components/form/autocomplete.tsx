import React from 'react'; // let's also import Component
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { AutocompleteOption } from '../../interfaces/autocomplete';

type Props = {
    label: string,
    options: AutocompleteOption[],
    value: any | undefined,
    name: string,
    setInput: Function
}

export default function ComboBox(props: Props) {
    var value = {
        value: '',
        label: '',
    }

    if (props.value !== null && props.value !== undefined && props.value.id !== undefined) {
        value.value = props.value.id;
        value.label = props.value.name;
    }else if(props.value !== null && props.value !== undefined){
        value = props.value;
    }

    return (
        <Autocomplete
            id="combo-box"
            key="combo-box"
            value={value}
            noOptionsText={"No se encontraron registros"}
            onChange={(event, newInputValue) => {
                props.setInput(newInputValue);
            }}
            options={props.options}
            getOptionSelected={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => <TextField {...params} name={props.name} label={props.label} variant="outlined" />}
        />
    );
}