let on = true;
document.querySelector('rect#rectangle').addEventListener("click", function(){
    if(on == true){
        rectangle.setAttribute("fill", "black");
        on = false;
    }else{
        rectangle.setAttribute("fill", 'red');
        on = true;
    }

});;
let circleext = document.querySelector('circle#ext');
circleext.addEventListener("mouseover", function(){
    let rayon = circleext.getAttribute('r');
    console.log(rayon);
    circleext.setAttribute('r', Number(rayon)+2);
    console.log(circleext.getAttribute('r'));

    console.log(rayon);

});;

console.log(rectangle);


    

