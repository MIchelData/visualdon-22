import * as d3 from 'd3';

console.log('oui');
let cxRouge = 50;
let cxVert = 150;
let cxBleu = 250;
let cyBleu = 250;
let rouge = d3.select("#rouge");
let vert = d3.select("#vert");
let bleu = d3.select("#bleu");
let svg = d3.select("#lescercles");

svg.append("text").text("Ceci est un cercle").attr("x", cxRouge).attr("y", cxRouge+60);
svg.append("text").text("Ceci est un cercle").attr("x", cxVert-20).attr("y", cxVert+60);
svg.append("text").text("Ceci est un cercle").attr("x", cxBleu).attr("y", cxBleu+60);
bleu.text("ahhhhhhh");
const dernier = document.querySelector('#bleu');

vert.attr("fill", "orange");


rouge.attr("cx", cxRouge= cxRouge+50);
bleu.attr("cx", cxBleu= cxBleu+50);
bleu.on("click",()=>{
    console.log(cxBleu);
    vert.attr("cx", cxBleu);
    rouge.attr("cx", cxBleu);
})

const arr = [20, 5, 25, 8, 15];

let svg4 = d3.select('body').append('svg')
let color = ["red", "green", "blue", "orange", "pink"]

svg4.selectAll('rect').data(arr).enter().append('rect')
.attr("height",d=> d)
.attr("width",20)
.attr("x",(d,i)=> i*20)
.attr("y",d=> 40-d)
.attr("fill", (d,i)=> color[i])





