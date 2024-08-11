import React,{ Component } from 'react';
import Home from './HomeComponent'
import  {connect}  from 'react-redux';
import { Row, Col } from 'reactstrap'; // or import { Row, Col } from 'tailwindcss';
import '../index.css'
// import '../App.css'


const mapStateToProps = state => {
  return {
    auth:state.auth,
    user:state.user,
  }
}

const mapDispatchToProps  = (dispatch) => ({
})
class  Main extends Component {

componentDidMount(){
  
}

  render(){
    
    return (
      <div className="full-window" >
        
        <Home />
      </div>
    );
  }
  
}

export default Main;
