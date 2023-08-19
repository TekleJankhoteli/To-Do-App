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



DL.addEventListener("click", () => {
    toggleDarkMode();
    saveDarkModeState();
})



function toggleDarkMode() {
    container.classList.toggle("darkContainer");
    container2.classList.toggle("darkContainer2");
    header.classList.toggle("darkheader");
    input.classList.toggle("darkInput");
    todoesul.classList.toggle("darktodoesul");
    itemsleftAndClear.classList.toggle("darkitemsleftAndClear");
    allActiveCompleted.classList.toggle("darkallActiveCompleted");
    if (container.classList.contains("darkContainer")) {
        DL.src = "./assets/sun.svg";
    } else {
        DL.src = "./assets/moon.svg";
    }
}



function saveDarkModeState() {
    const isDarkMode = container.classList.contains("darkContainer");
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
}



function loadDarkModeState() {
    const isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
    if (isDarkMode) {
        toggleDarkMode();
    }
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



        localStorage.setItem("toDoes",JSON.stringify(toDoes))
        localStorage.setItem("count",JSON.stringify(count))
        drawTodo()
       
    }
}





function drawTodo() {
    input.value = "";
    todoesul.innerHTML = toDoes.map(el => (
        `
        <li class=${el.active ? "toDoesText" : ""}>
        <img onclick="toggleActive(${el.id},event)" class="circleImg" src="${el.active ? './assets/done.svg' : './assets/circle.svg'}"> 
        ${el.title}
        <img onclick="deleteTodoes(${el.id})" class="xImg" src="./assets/x.svg" > 
        </li>
        `
    )).join("");


    const activeTodoCount = toDoes.filter(el => !el.active).length;
    itemsLeft.textContent = `${activeTodoCount} item${activeTodoCount !== 1 ? 's' : ''} left`;
}

  
function deleteTodoes(id){
    toDoes=toDoes.filter(el=>el.id !==id)
    localStorage.setItem("toDoes",JSON.stringify(toDoes))
    drawTodo()
}
function toggleActive(id,event) {
    event.stopPropagation();
    toDoes = toDoes.map(el => {
        if (el.id === id) {
            return { ...el, active: !el.active };
        } else {
            return el;
        }
    });
    localStorage.setItem("toDoes",JSON.stringify(toDoes))
    drawTodo();
}

clearCompleted.addEventListener("click", () =>{
    clearCompletedTasks();
})

function  clearCompletedTasks(){
    toDoes=toDoes.filter(el=> !el.active);
    localStorage.setItem("toDoes", JSON.stringify(toDoes));
    drawTodo();
}


all.addEventListener("click",()=>{
    showAllTasks()


    all.classList.add("point");
    active.classList.remove("point");
    completed.classList.remove("point");
});

active.addEventListener("click",()=>{
    showActiveTasks()
    all.classList.remove("point");
    active.classList.add("point");
    completed.classList.remove("point");
});

completed.addEventListener("click",()=>{
    showCompletedTasks()
    all.classList.remove("point");
    active.classList.remove("point");
    completed.classList.add("point");
});

function showAllTasks(){
    todoesul.innerHTML=toDoes.map(el => createTodoItemHTML(el)).join("");
};

function showActiveTasks(){
    const activeTasks = toDoes.filter(el => !el.active);
    todoesul.innerHTML = activeTasks.map(el => createTodoItemHTML(el)).join("");
}


function showCompletedTasks(){
    const completedTasks = toDoes.filter(el => el.active);
    todoesul.innerHTML = completedTasks.map(el => createTodoItemHTML(el)).join("");
}


function createTodoItemHTML(todo) {
    return `
        <li class=${todo.active ? "toDoesText" : ""}>
            <img onclick="toggleActive(${todo.id},event)" class="circleImg" src="${todo.active ? './assets/done.svg' : './assets/circle.svg'}"> 
            ${todo.title}
            <img onclick="deleteTodoes(${todo.id})" class="xImg" src="./assets/x.svg" > 
        </li>
    `;
}



drawTodo()
loadDarkModeState();




