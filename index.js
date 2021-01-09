let storageID = 'from-autosave';

const getId = function (input) {
  if (input.id.length > 0) {
    return input.id;
  }

  if (input.name.length > 0) {
    return input.name;
  }

  return null;
}

const loadData = function () {

  let saved = localStorage.getItem(storageID);
  if (!saved) return;
  saved = JSON.parse(saved);

  const inputs = document.querySelectorAll('#save-me input, #save-me textarea');

  Array.prototype.slice.call(inputs).forEach(function (input) {

    const id = getId(input);
    if (!id) return;
    if (!saved[id]) return;

    input.value = saved[id];
  })
}

const inputHandler = function (event) {
  if (!event.target.closest('#save-me')) return;
  const id = getId(event.target);
  if (!id) return;

  let saved = localStorage.getItem(storageID);
  saved = saved ? JSON.parse(saved) : {};
  saved[id] = event.target.value;
  localStorage.setItem(storageID, JSON.stringify(saved));
};

const submitHandler = function (event) {
  event.preventDefault();

  if (event.target.id !== 'save-me') return;
  localStorage.removeItem(storageID);
}

loadData();

document.addEventListener('input', inputHandler, false);
document.addEventListener('submit', submitHandler, false);