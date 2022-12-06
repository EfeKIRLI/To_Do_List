// tüm elementleri seç
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
// card ın altına alert ekle 
const firstCardBody =document.getElementsByClassName("card-body")[0];
const SecondCardBody =document.getElementsByClassName("card-body")[1];
const filter  = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();
function eventListener(){ // tüm eventListener burada...
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",laodAllTodosToUI);
    SecondCardBody.addEventListener("click",deletetodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

    
    
}
function clearAllTodos(){

    if (confirm("Hepsini silmek istediğinizden emin misiniz?")) {
         //arayüzden todoları kaldır.
        // todoList.innerHTML=""; //yavas bir yöntem.
            while(todoList.firstElementChild !=null)  {
                todoList.removeChild(todoList.firstElementChild);           }
        
    }
   localStorage.removeItem("todos")
}

function filterTodos(e){  
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue)=== -1){
            listItem.setAttribute("style","display : none !important"); // sayfada var ama göstermez
        } else {
            listItem.setAttribute("style","display : block");
        
        }
    })
    console.log(e.target.value);
}
function deletetodo(e){
    if(e.target.className === "fa-solid fa-xmark"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("alert alert-success"," Todo başarıyla silindi...");
        // console.log("silme islemi") // deneme yapildi silme ikonu çalıstı
    }
    // console.log(e.target); // sayfa üzerine tıkladığımızda hangi elemente tıkladığımızı gösterir.
}
function deleteTodoFromStorage(deletetodo){
        let todos = getTodosFromStorage(); // array olarak storage'den alır.

        todos.forEach(function(todo,index){
            if (todo === deletetodo){
                todos.splice(index,1);// arrayden değeri sil

            }

        });
        localStorage.setItem("todos",JSON.stringify(todos));
}

function laodAllTodosToUI () {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){ // herbir elementin üzerinde gezinir.
         addTodoToUI(todo);
    })
}
function addTodo(e){

    const newTodo = todoInput.value.trim(); // trim bastan ve sonran boslukları siler
    // console.log(newTodo);

    if (newTodo === ""){
        
        showAlert("alert alert-danger", "Lütfen bir ToDo giriniz ");
        
        // <div class="alert alert-warning" role="alert">
        // A simple warning alert—check it out!
        // </div>
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("alert alert-success", "ToDo Başarılıyla eklendi!")
        
    }  


    e.preventDefault();
}
function getTodosFromStorage(){ // storagedan bütün Todo ları alır.
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

    
}
function showAlert(type,messeage){
    const alert = document.createElement("div");
    
    alert.className = `alert alert- ${type}` ;
    
    alert.textContent = messeage;

    firstCardBody.appendChild(alert);
    
    //setTimeout
    
    setTimeout(function(){
        alert.remove();
    },5000);

    // console.log(alert)

}

function addTodoToUI(newTodo){ //aldığı string değeri liste item olarak UI'ya  (arayüz'e) ekler.
    // <li class="list-group-item d-flex justify-content-between">
    //                                 Todo 1
    //                                 <a href="#" class="delete-item">
    //                                     <i class="fa-solid fa-xmark"></i>
    //                                 </a>

    //                             </li>

    //List item oluşturma
    const listItem = document.createElement("li");
    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className ="delete-item";
    link.innerHTML = " <i class='fa-solid fa-xmark'></i>"       //" ' ' "

    listItem.className ="list-group-item d-flex justify-content-between";

    //text node ekleme 
    listItem.appendChild(document.createTextNode(newTodo)); 
    listItem.appendChild(link);

    // Todo List'e listItem'ı ekle (ul içine li)
    todoList.appendChild(listItem);


    todoInput.value= ""; // yeni bir Todo eklemek için bir öncekini siler...
    // console.log(listItem)
  
}