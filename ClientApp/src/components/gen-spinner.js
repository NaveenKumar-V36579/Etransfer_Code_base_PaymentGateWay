import React from 'react';
import { connect } from "react-redux";

const SpinnerWheel = props => (
<React.Fragment>
  {props.isloading &&
    <div className="spinner spinner-border mx-auto" role="status">
    <span className="sr-only">Loading...</span>
  </div>
  }
  
</React.Fragment>
    
)




const mapStateToProps = state=>{
    return{
        isloading:state.api.isLoading
    }
}

export default connect(mapStateToProps)(SpinnerWheel)