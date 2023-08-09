let DL=document.querySelector(".DL");
let container=document.querySelector(".container");
let input=document.querySelector(".input");
let container2=document.querySelector(".container2");
let header=document.querySelector(".header");
let form=document.querySelector(".form");
let todoesul=document.querySelector(".todoesul");
let itemsleftAndClear=document.querySelector(".itemsleftAndClear");
let allActiveCompleted=document.querySelector(".allActiveCompleted");
let itemsLeft=document.querySelector(".itemsLeft");
let clearCompleted=document.querySelector(".clearCompleted");
let all=document.querySelector(".all");
let active=document.querySelector(".active");
let completed=document.querySelector(".completed");

let completedTaskIds = JSON.parse(localStorage.getItem("completedTaskIds")) || [];

DL.addEventListener("click",()=>{
    darkMode();
})

function darkMode(){
container.classList.toggle("darkContainer");
   
    if(container.classList.contains("darkContainer")){
        DL.src="./assets/sun.svg" ;
    }else{
        DL.src="./assets/moon.svg"  
    }

    container2.classList.toggle("darkContainer2");
    header.classList.toggle("darkheader");
    input.classList.toggle("darkInput");
    todoesul.classList.toggle("darktodoesul");
    itemsleftAndClear.classList.toggle("darkitemsleftAndClear");
    allActiveCompleted.classList.toggle("darkallActiveCompleted")
    
}

let toDoes=JSON.parse(localStorage.getItem("toDoes")) || [];

let count=JSON.parse(localStorage.getItem("count"))|| 0;



form.addEventListener("submit",(e)=>{
    sumbmitFunction(e)
})

if(toDoes!==[]){
    localStorage.setItem("count", 0)
}

function sumbmitFunction(e){
    e.preventDefault();
    input.value=input.value.trim()

    if(input.value!==""){
        count++

        let newTodo={
            title:input.value,
            id:count,
            active:false
        }
        toDoes.push(newTodo)


        
        localStorage.setItem("count",JSON.stringify(count))
        localStorage.setItem("toDoes",JSON.stringify(toDoes))
        
        drawTodo()
       
    }
}

function drawTodo(){


    
    input.value=""
    todoesul.innerHTML=toDoes.map(el=>(


        `
        <li class=${el.active ? "toDoesText" :""}>
        <img data-id="${el.id}" class="circleImg" src="./assets/circle.svg"> 
        ${el.title}
        <img class="xImg" src="./assets/x.svg" > 
        </li>
        
        
        
        
        `
    )).join("")


    
   
    todoesul.addEventListener("click", event => {
        if (event.target.matches(".circleImg")) {
            changeCircleImg(event.target);
        }
    });


 
  }

  
  


// drawTodo()









function changeCircleImg(circleImg) {
    const li = circleImg.closest("li");
    const todoId = parseInt(circleImg.getAttribute("data-id"));

    const todo = toDoes.find(todo => todo.id === todoId);
    if (todo) {
        todo.active = !todo.active;
    }

    circleImg.classList.toggle("doneImg");
    li.classList.toggle("doneText");

    if (circleImg.classList.contains("doneImg")) {
        circleImg.src = "./assets/circle.svg";
        li.style.textDecoration = "none";
        li.style.color = "#494C6B";
    } else {
        circleImg.src = "./assets/done.svg";
        li.style.textDecoration = "line-through";
        li.style.color = "#C8CBE7";
    }

    localStorage.setItem("toDoes", JSON.stringify(toDoes));
}




  drawTodo()