import React, {useState, useEffect} from 'react';
// import Graph from './ReactFC/ReactFC';
import Sales from './components/Sales/Sales';
import './App.css';




async function fetchMoviesAndCategories() {
  const [framResponse, valvolineResponse, motulResponse] = await Promise.all([
    fetch(url(1,11)),
    fetch(url(3,11)),
    fetch(url(12,11)),
  ]);

  const fram        = await framResponse.json();
  const valvoline   = await valvolineResponse.json();
  const motul       = await motulResponse.json();




  return {fram,valvoline, motul};
}


const App = () => {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(0);
  const [array, setArray] =useState([]);

   useEffect(() => {
       setLoading(true);
       fetchMoviesAndCategories().then(({ fram, motul, valvoline, total, selenia }) => {
          var arreglo=[ extractSales(fram),     extractVolume(fram),
                        extractSales(valvoline),extractVolume(valvoline),
                        extractSales(motul),    extractVolume(motul)];
          return(arreglo);
        })
           .then((result) => {setProduct(result); setArray(result);})
          //  .then((result) => {})
           .then(()       =>  setLoading(false))
   }, []);



  return (<div>{loading ? "cargando..." :
      <div>
        <div className="eerr">
          <h2>FILTROS</h2>
          <Sales name="fram"     um="uni" id={1}   mm={"11"}/>
          <Sales name="Ofertas"  um="uni" id={23}  mm={"10"}/>
          <Sales name="Kits"     um="uni" id={16}  mm={"11"}/>
          <br/>
          <h2>LUBRSICANTES</h2>
          <Sales name="valvo"    um="lit" id={3}    mm={"11"}/>
          <Sales name="motul"    um="lit" id={12}   mm={"11"}/>
          <Sales name="total"    um="lit" id={5}    mm={"11"}/>
          <Sales name="motul"    um="lit" id={316}  mm={"11"}/>
          </div>
      </div>}
      {/* <Graph data={array}/> */}
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

