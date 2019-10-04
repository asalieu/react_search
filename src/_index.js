import React from "react";
import ReactDOM from "react-dom";  
import "css-loader";  
import MyApp from "./newindex"; 

// const Index = () => {
//   return <div>
//             <div><h2>This is my Header</h2></div>
//             <div>Hello This new change React!</div> 
//       </div>;
// };
const Index2 = () => {
    return <div>
              <div><h2>This is index 2</h2></div>
              <div>Index 2 okay!</div>  
              <MyApp />   
        </div>;
  };
  
  
  
ReactDOM.render(<Index2 />, document.getElementById("index2"));
//ReactDOM.render(<App />, document.getElementById("index"));

