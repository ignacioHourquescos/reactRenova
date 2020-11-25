
import React, {useState, useEffect} from 'react';


const array=[];




function url(id,mes){
  return('http://renovaapi.herokuapp.com/ventasPorAgrupacion?id='+id+'&fechaDesde=2020'+mes+'01&fechaHasta=2020'+mes+'29');
}


async function fetchMoviesAndCategories() {
  const [framResponse, categoriesResponse] = await Promise.all([
    fetch(url(1,11)),
    fetch(url(12,11))
  ]);

  const fram = await framResponse.json();
  const categories = await categoriesResponse.json();

  return {fram,categories};
}


 


const App = () => {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(0);

   useEffect(() => {
       setLoading(true);
       fetchMoviesAndCategories().then(({ fram, motul, valvoline, total, selenia }) => {
          var arreglo=[extractSales(fram),extractCost(fram),extractVolume(fram),extractVolume(fram)];
          return(arreglo);
        })
           .then((result) => {setProduct(result);}) 
           .then(()       =>  setLoading(false)) 
   }, []);
      





  return (<div>{loading ? "cargando..." :
      <div>
          <h4>Fram: ${product[0]}</h4>
          <h4>Motul: ${product[1]}</h4>
          <h4>Motul: ${product[2]}</h4>

      </div>}
     </div>
   )
  
}

export default App





//AUXILIAR FUNCTIONS


function extractSales(brand){
  var counter =0;
  for (var i=0;i<brand.length;i++){     
    counter=counter+brand[i].impor;
  }
  return (numberWithCommas(counter.toFixed(0)))
}

function extractCost(brand){
  var counter =0;
  for (var i=0;i<brand.length;i++){     
    counter=counter+brand[i].costo;
  }
  return (numberWithCommas(counter.toFixed(0)))
}

function extractVolume(brand){
  var counter =0;
  for (var i=0;i<brand.length;i++){     
    counter=counter+brand[i].canti_kilos;
  }
  return (numberWithCommas(counter.toFixed(0)))
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 
