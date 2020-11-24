
import React, {useEffect, useState} from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


var array =[];
var sumador =0;


const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
      console.log('The first promise has resolved');

      resolve(10);
  }, 1 * 1000);

});

 const getData = () =>{fetch(url(12,11))
   .then(function(response) { 
     response.json().then(function(data) {
       sumador=0;
       for (var i=0;i<data.length;i++){     sumador=sumador+data[i].canti_kilos;}
       array.push(sumador);
      //  console.log(array);
     });
   })
   .then(fetch(url(1,11))
   .then(function(response) { 
     response.json().then(function(data) {
       sumador=0;
       for (var i=0;i<data.length;i++){     sumador=sumador+data[i].canti_kilos;}
       array.push(sumador);
      //  console.log(array);
     });
   }))
   .then(fetch(url(3,11))
   .then(function(response) { 
     response.json().then(function(data) {
       sumador=0;
      //  console.log(data);
       for (var i=0;i<data.length;i++){     sumador=sumador+data[i].canti_kilos;}
       array.push(sumador);;
     });
   }))
   .finally(function(array) {console.log(array)})
 }

function url(id,mes){
  return('http://renovaapi.herokuapp.com/ventasPorAgrupacion?id='+id+'&fechaDesde=2020'+mes+'01&fechaHasta=2020'+mes+'29');
}





// const array = [
//   {
//     label: "Venezuela",
//     value: array[0]
//   },
//   {
//     label: "Saudi",
//     value: 3000
//   },
//   {
//     label: "Canada",
//     value: 5000
//   }
// ];


// const chartConfigs = {
//   type: "column2d", // The chart type
//   width: "700", // Width of the chart
//   height: "400", // Height of the chart
//   dataFormat: "json", // Data type
//   dataSource: {
//     chart: {
//       caption: "Countries With Most Oil Reserves [2017-18]",
//       subCaption: "In MMbbl = One Million barrels",
//       xAxisName: "Country",
//       yAxisName: "Reserves (MMbbl)",
//       numberSuffix: "K",
//       theme: "fusion"
//     },
//     // Chart Data
//     data: array
//   }
// };

 

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return(
//     renderGraph()
//     )
//   }
// }

// export default App;




const App = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);

   useEffect(() => {
       setLoading(true);
       getData()
           .then((result) => {setProduct(result);}) 
           .then(()       =>  setLoading(false)) 
   }, []);
      
  return (<div>{loading ? "cargando..." : {product }}</div>)
  
}

export default App