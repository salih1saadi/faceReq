import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import CelebName from './components/CelebName/CelebName';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
 apiKey: '70a09e5088604ee9b6fd9e710d0a33d3'
});



const particlesOption ={
            		particles: {
            			number:{
                       value:50,
                       density:{

                       	enable:true,
                       	value_area:800
                       }

            		}
            			
            	}
}

const initialState ={

  input:'',
  imageUrl:'',
  celebName: '',
  renderCelebrity: false,
  box:{},
  route:'Signin',
  isSignIn:false,
  user:{

    id:'',
    name:'',
    email:'',
    entries:0,
    joined: ''


    }

  }

class App extends Component{

constructor(){
super();
this.state = initialState;

}

loadUser = (data) =>{

 this.setState({user:{

    id:data.id,
    name:data.name,
    email:data.email,
    entries:data.entries,
    joined: data.joined

 }})
}

calculateFaceLocation = (data) =>{

const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputImage');
const width = Number(image.width);
const height = Number(image.height);
return{

leftCol: clarifaiFace.left_col * width,
topRow: clarifaiFace.top_row * height,
rightCol: width -(clarifaiFace.right_col * width),
bottomRow: height - (clarifaiFace.bottom_row * height)

  }
}

displayFaceBox = (box) =>{

this.setState({box: box});

}

onInputChange = (event) =>{

this.setState({input:event.target.value});
this.setState({renderCelebrity: false});

}

 recognizeCelebrity = (data) => {
    const celebrityName = data.outputs[0].data.regions[0].data.concepts[0].name;
    this.setState({celebName: celebrityName});
    this.setState({renderCelebrity: true});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.CELEBRITY_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('https://serene-woodland-92507.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.recognizeCelebrity(response);
      })
      .catch(err => console.log(err));
  }



onSubmit =() =>{
	this.setState({imageUrl: this.state.input});
fetch('https://serene-woodland-92507.herokuapp.com/imageUrl', {
  method:'post',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({

  input:this.state.input

   })
})
.then(response=> response.json())
.then(response => {
  if(response){

   fetch('https://serene-woodland-92507.herokuapp.com/image', {
  method:'put',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({
  id:this.state.user.id


   })
})
   .then(response=> response.json())
   .then(count =>{

 this.setState(Object.assign(this.state.user, { entries: count}))
   
    

    })
   
   .catch(console.log)

  }
 this.displayFaceBox(this.calculateFaceLocation(response))
})
.catch(err => console.log(err));
  


}

onRouteChange = (route) =>{

if(route === 'signout'){

this.setState(initialState)

}else if (route === 'home') {

this.setState({isSignIn:true})

}

	this.setState({route: route});
}

render(){
 return (
    <div className="App">
    <Particles className='particles'
              params={particlesOption}
             
            />
     <Navigation isSignIn={this.state.isSignIn} onRouteChange={this.onRouteChange} />
     { this.state.route === 'home' 
     ? <div>
         <Logo /> 
         <Rank
            name={this.state.user.name}
            entries={this.state.user.entries}

          />
          <CelebName renderCelebrity={this.state.renderCelebrity} celebName={this.state.celebName} />
         <ImageLinkForm onButtonSubmit={this.onButtonSubmit}
     onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
    
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
       : (
        	this.state.route === 'Signin'
        	?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
     }
    </div>
  );



}

}



export default App;
