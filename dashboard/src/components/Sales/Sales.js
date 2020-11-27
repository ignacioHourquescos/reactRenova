import React, {useState, useEffect} from 'react';
import './Sales.css'



const Sales = ({id, mm, name,um}) => {
  async function fetchMoviesAndCategories() {
    const [framResponse] = await Promise.all([
      fetch(url(id,mm))
    ]);
    const fram = await framResponse.json();  
    return {fram};
  }
  
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(0);
  const [array, setArray] =useState([]);

   useEffect(() => {
       setLoading(true);
       fetchMoviesAndCategories().then(({ fram }) => {
          var arreglo=[ extractSales(fram), extractVolume(fram)];
          return(arreglo);
        })
           .then((result) => {setProduct(result); setArray(result);})
           .then(()       =>  setLoading(false)) 
   }, []);
      

  return (<>
      <div className="flex">
        <div className="flex2">
          <h4 className="titulo">{name}</h4>
          <h4 className="ventas"> ${product[0]} </h4>
        </div>
        <h4 className="unidades">{product[1]} {um}</h4>
      </div> 
  </>
   )
  
}

export default Sales





//AUXILIAR FUNCTIONS


function extractSales(brand){
  var counter =0;
  for (var i=0;i<brand.length;i++){     
    counter=counter+brand[i].impor;
  }
  return (counter.toFixed(0))
}

function extractCost(brand){
  var counter =0;
  for (var i=0;i<brand.length;i++){     
    counter=counter+brand[i].costo;
  }
  return (counter.toFixed(0))
}

function extractVolume(brand){
  var counter =0;
  for (var i=0;i<brand.length;i++){     
    counter=counter+brand[i].canti_kilos;
  }
  return (counter.toFixed(0))
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 


function url(id,mes){
  return('http://renovaapi.herokuapp.com/ventasPorAgrupacion?id='+id+'&fechaDesde=2020'+mes+'01&fechaHasta=2020'+mes+'29');
}

