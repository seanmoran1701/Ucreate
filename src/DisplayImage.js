
export default function DisplayImage(props) {
	function forceUpdate(){

		this.forceUpdate();

	}
	const image = props.image;
	return (
		<div>
			<img src={`data:image/jpeg;base64,${image}`} />
		</div>
	)
}