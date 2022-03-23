
    
     import {json} from 'd3-fetch';
     import * as d3 from 'd3';
    
     let postsuser = [];
     let listetab = [];
    Promise.all([
        json('https://jsonplaceholder.typicode.com/posts'),
      json('https://jsonplaceholder.typicode.com/users')
     ])
    
     .then(([posts, users]) =>  {
         const tab = users.map((x,i)=>{
           postsuser[i]= new Array();
             posts.forEach(element => {
                 if(element.userId == x.id){
                    postsuser[i].push(element.title)
                 }

             });
            // console.log(postsuser);
         
           
            return {"nom d'utilisateur": x.username, "ville": x['address']['city'], "nom_compagnie": x['company']['name'], "titre posts": postsuser[i]}
         });
         console.log("ça n'as pas de sens", tab);
        // console.log("ahahhahah",tab[0]["nom_compagnie"])
         let maxbod = 0;
         let usemax  
          
          const pluslongpost = users.map((x,i)=>{
           // postsuser[i]= new Array();
              posts.forEach(element => {
                  if(element.userId == x.id){
                    if(element.body.length> maxbod){
                      maxbod = element.body.length;
                      console.log("là",element.body);
                      usemax = x;
                    } 
                  }
                  
              });
              return usemax.username
            
            
          });
          let last = pluslongpost.length
          let newp = d3.select('body').append('p').text("La personne ayant écrit le plus long post est: "+pluslongpost[last-1]);
          tab.forEach(t=>{
            d3.select('body').append('a').html(t["nom d'utilisateur"]+" "+t["titre posts"].length+"<br><br>");
          })
          let totalpostusr = new Array();
          tab.forEach((d,i) => {
            totalpostusr[i] = d["titre posts"].length;
          });
          
         
          function compteposts (array){
            let nbrposts = array.filter((d,i)=>{
              nbrposts = d['titre posts'].length;
              return nbrposts
            })
          }

          

let svg = d3.select("body")
.append("svg")
.attr("width", 500)
.attr("height", 200)
let dataset = totalpostusr;


const x = d3.scaleLinear()
				.domain([0, 190])
				.range([0, 190]);

         svg.selectAll('.bar')
         .data(dataset)
         .enter()
         .append('rect')
         .attr('x', (d,i) => i*25 )
         .attr('width', 20)
         .attr('height', (d) => d*10)
         .attr('y', (d) => 180-d*10)
        
        .append("text").text((d)=>d)
         .attr('x', 10)
         .attr('y', 10)
         .attr('color', 'red');
         
     });
     