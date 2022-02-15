import React from "react";

const Card = ({image,title,description}) => {
	return(
		<div>
			<img src={image} />
			<div>
				<p>{title}</p>
				<p>{description}</p>
			</div>
		</div>
		
	)
}

export default Card;