import './style.css'

type Todo = {
  id: string
  name: string
  complete: boolean
}

const form = document.querySelector<HTMLFormElement>('#new-todo-form')!
const inputTodo = document.querySelector<HTMLInputElement>('#todo-input')!
const list = document.querySelector<HTMLUListElement>('#list')!

let todos: Todo[] = [];
todos.forEach(renderNewTodo)

form.addEventListener("submit", (e)=> {
  e.preventDefault()
  const todoName = inputTodo.value
  if(todoName === "") return
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    name: todoName,  
    complete: false
  }
  todos.push(newTodo)
  renderNewTodo(newTodo)
  inputTodo.value = ""
})

function renderNewTodo(todo: Todo){
  const listItem = document.createElement("li")
  listItem.classList.add("list-item")

  const label = document.createElement("label")
  label.classList.add("list-item-label")

  const checkbox = document.createElement("input")
  checkbox.classList.add("label-input")
  checkbox.type = "checkbox"
  checkbox.checked = todo.complete
  checkbox.addEventListener("change", () => {
    todo.complete = checkbox.checked
  })

  const textEl = document.createElement("span")
  textEl.classList.add("label-text") 
  textEl.innerHTML = todo.name

  const deleteBtn = document.createElement("button")
  deleteBtn.classList.add("delete-btn")
  deleteBtn.innerHTML = "Delete"
  deleteBtn.addEventListener("click", () => {
    listItem.remove()
    todos = todos.filter(t => t.id !== todo.id)
  })

  label.append(checkbox, textEl)
  listItem.append(label, deleteBtn)
  list.append(listItem)
}


