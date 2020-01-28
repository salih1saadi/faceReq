import React from 'react';
import brain from './Navigation/logo.png';


const Navigation = ({ onRouteChange, isSignIn }) =>{


if(isSignIn){
return(
<div >
<nav style={{display:'flex', justifyContent:'flex-end'}}>
   <p onClick= {()=>onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
</nav>
<h1 className='f1 f-headline lh-solid mid-gray '>{'Welcome To Recognition App'}</h1>
</div>


	);

}else{

return (
	<div>
<nav style={{display:'flex', justifyContent:'flex-end'}}>
   <p onClick= {()=>onRouteChange('Signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
   <p onClick= {()=>onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>

</nav>
<h1 className='f1 f-headline lh-solid near-white '>{'Welcome To Recognition App'}</h1>
<div className='ma4 mt0'>
 <Tilt className="Tilt br3 shadow-3" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
  <div className="Tilt-inner pa4"> <img style={{paddingTop:'5px'}} src={brain} alt='logo'/> </div>
 </Tilt>
</div>
<p className='f3 ba shadow-5 b--black-10  center'>
      {'This Magic App will detect faces in picture and if the picture for a celeb person click recognize and it will tells you his/her name . Go and try!'}
   </p>
   </div>
);

   }

}

export default Navigation;