const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.task-row-wrapper button');
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createCheckbox = function () {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  return checkbox;
};

const createLabel = function (taskText) {
  const label = document.createElement('label');
  // innerText, not innerHTML: user input must not be parsed as HTML
  label.innerText = taskText;
  label.className = 'task';
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';
  deleteButton.className = 'delete';
  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const createTaskItem = function (taskText) {
  const taskItem = document.createElement('li');
  taskItem.append(
    createCheckbox(),
    createLabel(taskText),
    createEditInput(),
    createEditButton(),
    createDeleteButton(),
  );
  return taskItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskItem = createTaskItem(newTaskInput.value);

  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = '';
};

const toggleEditMode = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editButton = taskItem.querySelector('.edit');
  const isEditMode = taskItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const parentList = taskItem.parentNode;
  parentList.removeChild(taskItem);
};

const toggleTaskCompletion = function () {
  const taskItem = this.parentNode;
  const targetList = this.checked ? completedTasksList : incompleteTasksList;
  targetList.appendChild(taskItem);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = toggleEditMode;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskCompletion;
};

for (const taskItem of [
  ...incompleteTasksList.children,
  ...completedTasksList.children,
]) {
  bindTaskEvents(taskItem);
}
