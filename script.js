const todoList = document.getElementById("todo-list");
const inputField = document.getElementById("input-field");
const inputCount = document.getElementById("input-count");
const inputContainer = document.getElementById("input-container");
const filterButtons = document.getElementById("filter-buttons");
const all = document.getElementById("all");
const active = document.getElementById("active");
const completed = document.getElementById("completed");
const clearcompleted = document.getElementById("clear-completed");
const downArrow = document.getElementById("down-arrow-icon");

let countChecked = 0;



inputField.addEventListener('keypress', (e) => {
  if (e.key === "Enter" && inputField.value.trim() !== "") {
    addItem();
    showElements();
  }
});

function showElements() {
  document.querySelector('.counter').style.display = "flex";
  inputCount.style.display = "flex";
  filterButtons.style.display = "flex";
  downArrow.style.display = "flex";
}

function hideElements() {
  document.querySelector('.counter').style.display = "none";
  inputCount.style.display = "none";
  filterButtons.style.display = "none";
  downArrow.style.display = "none";

}

function addItem() {
  const itemValue = inputField.value.trim();

  const inputFieldItem = createInputElement('text', itemValue, true);
  inputFieldItem.classList.add('input-box');
  const checkbox = createInputElement('checkbox', '', false, updateItemCount);
  checkbox.classList.add('tag-box');

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      countChecked++;
      inputFieldItem.style.textDecoration = 'line-through';
    } else {
      countChecked--;
      inputFieldItem.style.textDecoration = 'none';
    }
    updateItemCount();
  });

  downArrow.addEventListener('click', function () {
    const checkboxlist = document.querySelectorAll('.tag-box');
    let toggleCheckbox = true;

    checkboxlist.forEach(function (toggle) {
      if (toggle.checked == false) {
        toggleCheckbox = false;
        countChecked++;
        updateItemCount();
      }
    });

    checkboxlist.forEach(function (toggle) {
      toggle.checked = !toggleCheckbox;
      if (toggleCheckbox == true) {
        countChecked--;
        updateItemCount();
      }
    });
  });

  const deleteIcon = createDeleteIcon(() => {
    inputFieldItem.parentNode.remove();
    if (countChecked > 0) {
      countChecked--;
    }
    updateItemCount();
  });

  const inputbox = document.createElement('div');
  inputbox.classList.add("div-container");

  inputFieldItem.addEventListener('dblclick', () => {
    inputFieldItem.removeAttribute('readonly');
    inputFieldItem.focus();
  });

  inputFieldItem.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
      inputFieldItem.setAttribute('readonly', 'readonly');
      inputFieldItem.blur();
    }
  });

  inputbox.append(checkbox, inputFieldItem, deleteIcon);
  inputContainer.appendChild(inputbox);

  inputField.value = '';
  updateItemCount();
}

function createInputElement(type, value, readonly, eventListener = null) {
  const input = document.createElement('input');
  input.type = type;
  input.value = value;
  if (readonly) input.setAttribute('readonly', 'readonly');
  if (eventListener) input.addEventListener('change', eventListener);
  return input;
}

function createDeleteIcon(clickHandler) {
  const deleteIcon = document.createElement('span');
  deleteIcon.innerHTML = "&#x274C";
  deleteIcon.classList.add('delete-icon');
  deleteIcon.addEventListener('click', clickHandler);
  return deleteIcon;
}

all.addEventListener('click', function () {
  inputContainer.querySelectorAll(".div-container").forEach(function (container) {
    container.style.display = 'flex';
  });

});

active.addEventListener('click', function () {
  inputContainer.querySelectorAll(".div-container").forEach(function (container) {
    const checkbox = container.querySelector('.tag-box');
    if (checkbox && checkbox.checked) {
      container.style.display = 'none';
    }
    else {
      container.style.display = 'flex';
    }
  });
});

completed.addEventListener('click', function () {
  inputContainer.querySelectorAll(".div-container").forEach(function (container) {
    const checkbox = container.querySelector('.tag-box');
    if (checkbox && checkbox.checked) {
      container.style.display = 'flex';
    }
    else {
      container.style.display = 'none';
    }
  });
});

clearcompleted.addEventListener('click', function () {
  inputContainer.querySelectorAll(".div-container").forEach(function (container) {
    const checkbox = container.querySelector('.tag-box');
    if (checkbox && checkbox.checked) {
      container.remove();
      countChecked--;
    }
  });
  updateItemCount();
});

function updateItemCount() {
  const counter = inputContainer.getElementsByTagName('div').length;
  const totalCount = counter - countChecked;
  if (counter == 0) {
    hideElements();
  }
  console.log(counter);

  const itemText = counter === 1 ? 'item' : 'items';
  inputCount.querySelector('p').textContent = `${totalCount} ${itemText} left`;
}

