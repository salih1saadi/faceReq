import React from 'react';

const CelebName = ( {renderCelebrity, celebName} ) => {
	if(renderCelebrity){
		return (
			<div>
				<p className='f2 f-headline lh-solid'>
			 		{'This seems to be ' + celebName} 
			 	</p>
			</div>
		);
	}else{
		return (<div></div>);
	}
};

export default CelebName;