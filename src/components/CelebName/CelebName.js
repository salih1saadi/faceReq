import React from 'react';

const CelebName = ( {renderCelebrity, celebName} ) => {
	if(renderCelebrity){
		return (
			<div>
				<p className='f3'>
			 		{'This seems to be ' + celebName} 
			 	</p>
			</div>
		);
	}else{
		return (<div></div>);
	}
};

export default CelebName;