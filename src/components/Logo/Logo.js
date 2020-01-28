import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './logo.png';


const Logo = () =>{

return(

<div className='ma4 mt0'>
 <Tilt className="Tilt br3 shadow-3" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
  <div className="Tilt-inner pa4"> <img style={{paddingTop:'5px'}} src={brain} alt='logo'/> </div>
 </Tilt>
</div>



	);

}

export default Logo;