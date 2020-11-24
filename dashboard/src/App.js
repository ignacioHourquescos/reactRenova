
import React, {useState, useEffect} from 'react';


const array=[];

function url(id,mes){
  return('http://renovaapi.herokuapp.com/ventasPorAgrupacion?id='+id+'&fechaDesde=2020'+mes+'01&fechaHasta=2020'+mes+'29');
}


async function fetchMoviesAndCategories() {
  const [moviesResponse, categoriesResponse] = await Promise.all([
    fetch(url(1,11)),
    fetch(url(12,11))
  ]);

  const movies = await moviesResponse.json();
  const categories = await categoriesResponse.json();

  return {movies,categories};
}


 


const App = () => {

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(0);

   useEffect(() => {
       setLoading(true);
       fetchMoviesAndCategories().then(({ movies, categories }) => {
        var sumador1=0;
        var sumador2=0;
          for (var i=0;i<movies.length;i++){     
            sumador1=sumador1+movies[i].impor;
          }
          for (var i=0;i<categories.length;i++){     
            sumador2=sumador2+categories[i].impor;
          }
          array.push(movies);     // fetched movies
          array.push(categories); // fetched categories
          var arreglo=[numberWithCommas(sumador1.toFixed(0)),numberWithCommas(sumador2.toFixed(0))]
          return(arreglo);
        })
           .then((result) => {setProduct(result);}) 
           .then(()       =>  setLoading(false)) 
   }, []);
      

   function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 
  return (<div>{loading ? "cargando..." :
      <div>
          <h4>Fram: ${product[0]}</h4>
          <h4>Motul: ${product[1]}</h4>
      </div>}
     </div>
   )
  
}

export default App