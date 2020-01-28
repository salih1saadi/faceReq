import React from 'react';


const Rank = ({name,entries}) =>{

return(

<div>
     <div className='white f3'>
       {`Hello ${name}, your current entry photos count is...`}
      </div>
       <div className='white f3'>
       {entries}
      </div>
</div>



	);

}

export default Rank ;