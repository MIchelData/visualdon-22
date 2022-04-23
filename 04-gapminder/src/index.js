import * as d3 from 'd3'
import {espereanceVie, revenuparPersonne, populationTotal} from '../data/life_expectancy_years.csv'


 import file from '../data/population_total.csv'
  import gdp from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
  import lifeexpectency from '../data/life_expectancy_years.csv'
 import population from '../data/population_total.csv'
import { easeCubic } from 'd3'
import { easeLinear } from 'd3'
 //import worldmap from '../data/worldmap.json';
 

//console.log("la pop est trans",popTransformed);

console.log("file2",gdp);
console.log("life", lifeexpectency);
//console.log("world map", worldmap);


let legdp = gdptrans();
let onlygdp = new Array();
// J'aurais dû faire en une fois avec un array map
console.log("legdp1",legdp[1]['GDP'])
for(let i=0; i< legdp.length; i++){
  onlygdp[i] =  legdp[i]['GDP'];
}
console.log("onlygdp",onlygdp);

let populationTransformee = poptrans();
let pays = new Array();
for(let i=0; i<populationTransformee.length; i++){
  pays[i] = populationTransformee[i]['country'];
}
let totalpop = new Array();
for(let i=0; i<populationTransformee.length; i++){
  totalpop[i]= populationTransformee[i]['pop']
}
console.log(totalpop);
console.log("uh", pays)
console.log("test poptrans", populationTransformee[0]['country'])
let esperanceVie2021 = lifeexpectency.map(d=>{
  if(d['2021']===null){
    d['2021']= 68; //Très important en statistique d'inventer des données lorsqu'elles n'existent pas; cela rend l'analyse beaucoup plus pertinente!
  }
  return d['2021']
})
console.log("esperance de vie 2021", esperanceVie2021);

const tabcomplet = onlygdp.map((d, i)=>{
  return {"gdp": d, "esperancedevie": esperanceVie2021[i], "totalpop": totalpop[i]}
})
console.log("rabcomplet", tabcomplet);




   let margin = {top: 10, right: 20, bottom: 30, left: 50},
   width = 500 - margin.left - margin.right,
   height = 420 - margin.top - margin.bottom;
  
   let svg = d3.select("body")
   .append("svg")
   .attr("width",width + margin.left + margin.right)
   .attr("height", height+ margin.top + margin.bottom)
   .append("g")
   .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



let x = d3.scaleLinear()
.domain([0, 100000])
.range([ 0, width]);
svg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));

let y = d3.scaleLinear()
  .domain([45, 90])
  .range([height, 0]);
  svg.append("g")
  .call(d3.axisLeft(y));
 

let z = d3.scaleSqrt()
.domain([1000, 4000000000])
.range([1,40]);

   
   svg.append("g")
   .selectAll("dot")
   .data(tabcomplet)
  .enter()
  .append('circle')
  .attr("cx", function (d){return x(d['gdp']);})
  .attr("cy", function (d){return y(d['esperancedevie']);})
  .attr("r", function (d){return z(d['totalpop']);})
  .attr("fill", "red")
  .style("opacity", "0.5");


 d3.scaleSqrt(totalpop)
 .domain([1000, 4000000])
 .range([1,40])





  function poptrans(){
    const popTransformed = population.map(d => {
     // Trouver le format SI (M, B, k)
     let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
     // Extraire la partie numérique
     let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0,-1)) : d["2021"];
     // Selon la valeur SI, multiplier par la puissance
     switch (SI) {
         case 'M': {
             return { "country": d.country, "pop": Math.pow(10, 6) * number};
             break;
         }
         case 'B': {
             return { "country": d.country, "pop": Math.pow(10, 9) * number};
             break;
         }
         case 'k': {
             return { "country": d.country, "pop": Math.pow(10, 3) * number};
             break;
         }
         default: {
             return { "country": d.country, "pop": number};
             break;
         }
     }
   })
   return popTransformed;
    }

  function gdptrans(){
    const GDPtrans = gdp.map((d) =>{
      let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
      let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0,-1)) : d["2021"];
     // Selon la valeur SI, multiplier par la puissance
     switch (SI) {
         case 'M': {
             return {  "GDP": Math.pow(10, 6) * number};
             break;
         }
         case 'B': {
             return {  "GDP": Math.pow(10, 9) * number};
             break;
         }
         case 'k': {
             return {  "GDP": Math.pow(10, 3) * number};
             break;
         }
         default: {
             return {  "GDP": number};
             break;
         }
     }
   })
  return GDPtrans;

  }
 

  //Ex Cartographique

  let requestOptions = {
    method: 'GET',
  };

  const life2021country = lifeexpectency.map((d, i)=>{
    return {"pays": d['country'], "esperanceVie": d['2021']};
  })
  console.log("life + pays 2021", life2021country);

  let width3 = 960 ,
  height3 = 480;

  const path = d3.geoPath();

  const projection = d3.geoMercator()
  .scale(125)
  .center([0,30])
  .translate([width3/2, height3/2]);
  
  
    

 const svg2 = d3.select('#map').append("svg")
 .attr("id", "svg")
 .attr("class", "Red")
   .attr("width", width3)
  .attr("height", height3);

  const deps = svg2.append("g");



// let quantile = d3.scaleQuantile()
//   .domain([0, d3.max(life2021country, e=> +e.esperanceVie)])
//   .range(d3.range(10));

// let colorScale = d3.scaleThreshold()
//   .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
//   .range(d3.schemeBlues[7]);



  

let current
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(geojson){
  deps.selectAll("path")
  .data(geojson.features)
  .enter()
  .append("path")
  .attr("d", path)
  .attr('name', d => "d" + d.name)
   .attr("fill", function (d,i) {
     life2021country.forEach(element => {
       if(element['pays']==d['properties']['name']){
          return current = element['esperanceVie']
         
       }
      
     });
     
    // console.log(n);
    let n = Math.round((current-50)/4);
    console.log("current", n);
     return d3.schemeGreens[9][n];
    //return d3.schemeGreens[6][n];
    // console.log("ghgh", d['properties']['name']);
        
          
      })
      
});


let legend = svg2.append('g')
.attr('transform', 'translate(525, 150)')
.attr('id', 'legend');

for(let i=0; i<9; i++){
 legend.append('svg:rect')
 .attr('y', i*20+150+'px')
 .attr('height', '20px')
 .attr('width', '20px')
 .attr('x', '-400px')
 .style('fill', d3.schemeGreens[9][i])
 .style('stroke', 'black');

 legend.append("text").text((i*4)+50)
 .attr('y', i*20+165+'px')
 .attr('x', '-370px')
}

path.projection(projection)



  async function chargeGeo(pays){
  fetch("https://api.geoapify.com/v1/geocode/search?country="+pays+"&apiKey=3c268728ab1d4198ab8adf947e58b03a", requestOptions)
 .then (response => prov = {"lon": response['features'][0]['properties']['lon'], "lat": response['features'][0]['properties']['lon']});
 return prov;
  //console.log("long, lat", result['features'][0]['properties']['lon']);
  }
  

  //Topogramme //(pas fait)*************************************************************************************************************

// Exercice gapminder


function tabgapminderyear(year){
  let poptransanne= datacleanyear(population,year);
  let gdptransanne= datacleanyear(gdp, year);
  let gdpgoodyear = new Array();
  let lifegoodyear = new Array();
  let tabgapminder = poptransanne.map((d, i)=>{
   gdptransanne.forEach(element => {
    if(d.country == element.country ){
       gdpgoodyear[i]= element.num; 
    }
    
   });
  lifeexpectency.forEach(element => {
    if(d.country == element.country ){
      lifegoodyear[i]= element[year]; 
   }
  });
  
  return {pop: d.num, gdp: gdpgoodyear[i], life: lifegoodyear[i]} 
    
       
  });
  return tabgapminder
 
}

tabgapminderyear(1980);





let margin2 = {top: 10, right: 20, bottom: 30, left: 50},
width2 = 500 - margin2.left - margin2.right,
height2 = 420 - margin2.top - margin2.bottom;

let svg3 = d3.select("body")
.append("svg")
.attr("width",width2 + margin2.left + margin2.right)
.attr("height", height2+ margin2.top + margin2.bottom)
.append("g")
.attr("transform",
       "translate(" + margin.left + "," + margin.top + ")");

       let x2 = d3.scaleLinear()
       .domain([0, 100000])
       .range([ 0, width]);
       svg3.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));
       
       let y2 = d3.scaleLinear()
         .domain([0, 90])
         .range([height, 0]);
         svg3.append("g")
         .call(d3.axisLeft(y));
        
       
       let z2 = d3.scaleSqrt()
       .domain([1000, 4000000000])
       .range([1,40]);
      let datagapminderallyears = new Array()
      for(let i=1800; i<2050; i++){
        datagapminderallyears[i-1800] = tabgapminderyear(i);
      }
      console.log("le vizir", datagapminderallyears);
       let currentyear = 1800;
     let datagapminder =  tabgapminderyear(currentyear); 
     let n =0;
          let t = d3.transition()
          .duration(200)
          .ease(easeLinear)

function updateData(newdata){
  svg3.selectAll('circle').remove();
  svg3
  .append("g")
  .selectAll("circle")
  .data(newdata)
 .enter()
 .append('circle')
//  .transition(d3.transition()
//  .duration(500)
//  .ease(d3.easeLinear))
  .attr("cx", function (d){return x2(d.gdp);})
 .attr("cy", function (d){return y2(d.life);})
 .attr("r", function (d){return z2(d.pop);})
 .attr("fill", "red")
 .style("opacity", "0.5");

// ** Je ne suis pas parvenu a faire les transitions; les cercles ne prenaient pas leur dernier emplacement comme point de départ

//  update => update.transition(d3.transition().duration(500)
//  .ease(d3.easeLinear))
//  .attr("cx", function (d){return x2(d.gdp);})
//  .attr("cy", function (d){return y2(d.life);})
//  .attr("r", function (d){return z2(d.pop);}),
//  exit=> exit.remove())
//  .transition(t)
//  .attr("cy", function (d){return y2(d.life);})
//  .attr("r", function (d){return z2(d.pop);});

}
let nIntervId;

function stop() {
  clearInterval(nIntervId);
  nIntervId = null;
      }

function animate() {
  // regarder si l'intervalle a été déjà démarré
  if (!nIntervId) {
    nIntervId = setInterval(play, 500);
  }
  }
let i=0;
function play() {
  if(i == datagapminderallyears.length-1) {
  i = 0;
  } else {
  i++;
  }
  d3.select('#date').text(i+1800)
  updateData(datagapminderallyears[i]);
}
document.getElementById("play").addEventListener("click", animate);
	document.getElementById("stop").addEventListener("click", stop);
         
       
       
        d3.scaleSqrt(totalpop)
        .domain([1000, 4000000])
        .range([1,40])

        console.log("tabcomplet", tabcomplet);


        function datacleanyear(data, year){
          const popTransformed = data.map(d => {
           // Trouver le format SI (M, B, k)
           let SI = typeof d[year] === 'string' || d[year] instanceof String ? d[year].slice(-1) : d[year];
           // Extraire la partie numérique
           let number = typeof d[year] === 'string' || d[year] instanceof String ? parseFloat(d[year].slice(0,-1)) : d[year];
           // Selon la valeur SI, multiplier par la puissance
           switch (SI) {
               case 'M': {
                   return { "country": d.country, "num": Math.pow(10, 6) * number};
                   break;
               }
               case 'B': {
                   return { "country": d.country, "num": Math.pow(10, 9) * number};
                   break;
               }
               case 'k': {
                   return { "country": d.country, "num": Math.pow(10, 3) * number};
                   break;
               }
               default: {
                   return { "country": d.country, "num": number};
                   break;
               }
           }
         })
         return popTransformed;
          }



//console.log("poptranseachyears", poptranseachyers(1980))
















  //d3.cartogram = function() {

    function carto(topology, geometries) {
      // copy it first
      topology = copy(topology);
  let tf = transformer(topology.transform),x,y,len1,i1,out1,len2=topology.arcs.length,i2=0,
  projectedArcs = new Array(len2);
  while(i2<len2){
    x = 0;
    y = 0;
    len1 = topology.arcs[i2].length;
    i1 = 0;
    out1 = new Array(len1);
    while(i1<len1){
      topology.arcs[i2][i1][0] = (x += topology.arcs[i2][i1][0]);
      topology.arcs[i2][i1][1] = (y += topology.arcs[i2][i1][1]);
      out1[i1] = projection(tf(topology.arcs[i2][i1]));
      i1++;
    }
    projectedArcs[i2++]=out1;
    
  }
  // path with identity projection
 // let path = d3.geo.path()
 // .projection(null);

let objects = object(projectedArcs, {type: "GeometryCollection", geometries: geometries})
    .geometries.map(function(geom) {  
      return {
        type: "Feature",
        id: geom.id,
        properties: properties.call(null, geom, topology),
        geometry: geom
      };
    });

let values = objects.map(value),
    totalValue = d3.sum(values);

// no iterations; just return the features
if (iterations <= 0) {
  return objects;
}
    }
 // }
    

