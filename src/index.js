import React from "react";
import ReactDOM from "react-dom";  
import MyApp from "../src/MyComponent"; 

    class App extends React.Component{
        
        constructor(props){
        super(props);
        this.state={
            temperatures:[],
            avgtemp:0            
        } 
    } 
    onClick(){
        alert('you have clicked a header button')
    } 
        componentDidMount(){
          const refreshintervalObj = setInterval(() => {
                fetch('http://localhost:9000/temperatures/')
                .then(response=>response.json())
                .then(response=>this.setState({temperatures : response.data}))
                .catch(err=>{console.log(err)})   
                var sum = 0;
                for (let i = 0;i < this.state.temperatures.length; i++) {
                    sum += this.state.temperatures[i].temperature; 
                }   
                this.state.avgtemp = sum /5;
            
          }, 3000);
           
        }   
         render(){
            return (
                <React.Fragment>
                <h1>Temperature Table</h1>
                <p>Average Temp is {this.state.avgtemp}</p> 
                <table border='1' width='100%' >  
               <thead>
                   <tr>
                   <th onClick={this.onClick} className="btn btn-default">Unit ID</th>
                   <th onClick={this.onClick} className="btn btn-default">Temperature</th>
                   <th onClick={this.onClick} className="btn btn-default">Unix Stamp</th>  
                   </tr>
               </thead> 
        
                {this.state.temperatures.map((measurement) => (
                    <tbody>
                    <tr> 
                        <td>{measurement.unit_id }</td>
                        <td>{measurement.temperature }</td>
                        <td>{measurement.unix_timestamp }</td>
                    </tr>
                    </tbody>
                ))}
                </table> 
                <MyApp />
                </React.Fragment>
            );

          }  
      } 
ReactDOM.render(<App />, document.getElementById('root'));