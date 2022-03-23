import * as d3 from 'd3';

    d3.json('https://jsonplaceholder.typicode.com/posts')
    d3.json('https://jsonplaceholder.typicode.com/users')
    .then (function(data){
     //  console.log(data);
        const sommes_posts = data.reduce((r,d)=>{
          //  console.log(r);
        })
        const posts = data.filter((d, i)=>{
           const completed = d.completed;
         //  console.log(d.compagnie);
           return completed==true;
            
           // console.log(posts);
            return posts;
        })     
    //Console.log("ici",posts);
        //console.log(data.posts);
    })
   
    .catch (function(error){
        console.log(error);
    })
    
    import {json} from 'd3-fetch';
    Promise.all([
        json('https://jsonplaceholder.typicode.com/posts'),
      json('https://jsonplaceholder.typicode.com/users')
     ])
    
     .then(([posts, users]) =>  {
     // const postetus =  d3.merge([posts, users]);
     // const tableauprec = data.filter((d,i) =>{
          
     // })

      
     // console.log("lemerge", postetus);
     // postetus
      // console.log("le merge", postetus);
        let tab= new Array();
        let x = -1;
       // let tabtest = [{'bernard': 2},{'Bernard':3},{'bernard':'Nicolas'} ]
        //console.log("plz",tabtest[0].bernard);
         users.forEach(element  => {
             let titres_post=new Array();
            posts.forEach(ele=>{  
                if(ele['userId']==element['id']){
                    titres_post.push(ele['title']);
                    //console.log("titrepost", ele['title']);

                }
              //  console.log("titrepost", titres_post);
            })
           tab[x+=1]= [{"nom d'utilisateur" : element.username},{"ville": element['address']['city']},{"nom de compagnie": element['company']['name']}, {"titre post": titres_post}];
           for(let i=0; i<titres_post.length; i++){
               titres_post.slice(i);  
           }
         });
         let maximum = 0;
         let usmax ;
         tab.forEach(element => {
           //if(element["titre post"].length>maximum){
           //    maximum= element["titre post"].length;
             //   usmax = element["nom d'utilisateur"]
          // } 
           console.log(usmax)
         });
         
        // console.log("ich",users[0]['address']['city'])
        // console.log("allez",users.indexOf('Karianne'))
         console.log("le fam", tab);
        // console.log("hererere",tab);
      // console.log("les posts", posts);
      //  console.log("les users", users.address["city"]);
        
     });





     