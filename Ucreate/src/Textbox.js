import { Box, TextField } from '@mui/material'

const boxStyle = {
	color: 'black'
}
export default function Textbox() {
	const getText = (e) => {
		
			sessionStorage.setItem('prompt', e.target.value);
		
	}
	return(
		<TextField style={boxStyle}
			id="prompt"
			label="Enter prompt"
			onChange={getText}
			margin="normal"
		/>
    )
}
