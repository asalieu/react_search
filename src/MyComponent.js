import React from "react";
import ReactDOM from "react-dom"; 
import 'react-bootstrap'; 


class MyApp extends React.Component{  
    
    constructor(props){
    super(props)
    this.state={
        temperatures:[] ,
        avgtemp:0
    }
}
componentDidMount(){ 
        const refreshintervalObj = setInterval(() => {  
            fetch('http://localhost:9000/temperatures/')
            .then(response=>response.json())
            .then(response=>this.setState({temperatures:response.data}))
            .catch(err=>{console.log(err)})  

            var sum = 0;
            for (let i = 0;i < this.state.temperatures.length; i++) {
            sum += this.state.temperatures[i].temperature; 
            }   
            this.state.avgtemp = sum /5;

          }, 600); 
    }  
    render(){   
        return(  
                <React.Fragment>
                    <h1>This Table for Show Data is coming from another component called MyComponent.js</h1>
                    <p>The Average Temperature is : {this.state.avgtemp}</p>
                    <table border='1' width='100%' >
                    <thead>
                        <tr>
                            <th>Unit ID</th>
                            <th>Temperature</th>
                            <th>Unix TimeStamp</th>
                        </tr>
                    </thead>
                    {this.state.temperatures.map((measurement)=>(
                    <tbody>
                        <tr>
                            <td>{measurement.unit_id}</td>
                            <td>{measurement.temperature}</td>
                            <td>{measurement.unix_timestamp}</td>
                        </tr>
                    </tbody>
                    ))}
                    </table>
                </React.Fragment>  
            
        );
    }
} 
export default MyApp; 