import * as d3 from 'd3'
import {espereanceVie, revenuparPersonne, populationTotal} from '../data/life_expectancy_years.csv'

 import file from '../data/population_total.csv'
  import gdp from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
  import lifeexpectency from '../data/life_expectancy_years.csv'
 import population from '../data/population_total.csv'

//console.log("la pop est trans",popTransformed);

console.log("file2",gdp);
console.log("life", lifeexpectency);

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
  function esperancetrans(){
    const esperancedevieTrans = espereanceVie.map((d) =>{
      let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];
      let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0,-1)) : d["2021"];
     // Selon la valeur SI, multiplier par la puissance
     switch (SI) {
         case 'M': {
             return {  "": Math.pow(10, 6) * number};
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
  return esperancedevieTrans;
  }