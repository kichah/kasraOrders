const buyerName = document.querySelector('.order__form-name');
const buyerNumber = document.querySelector('.order__form-number');
const container = document.querySelector('.order');
const btn = document.querySelector('.btn');
const clear = document.querySelector('.clear');

const clients = [];

const itemStored = JSON.parse(localStorage.getItem('user'));
window.addEventListener('load', function (e) {
  if (!itemStored) return;
  itemStored.forEach((cli) => {
    renderClient(cli);
    clients.push(cli);
  });
});
btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    !buyerName.value ||
    !buyerNumber.value ||
    +buyerNumber.value < 0 ||
    +buyerNumber.value > 20
  )
    return;
  const client = {
    cName: buyerName.value,
    numberOfItems: buyerNumber.value,
  };
  clients.push(client);
  renderClient(client);
  localStorage.setItem('user', JSON.stringify(clients));
  clearFields();
});

function renderClient(item) {
  const markup = `      
  <div class="order__display">
  <div class="order__display-name">${item.cName}</div>
  <div class="order__display-number">${item.numberOfItems}</div>
</div>
`;
  container.insertAdjacentHTML('beforeend', markup);
}

clear.addEventListener('click', () => {
  while (clients.length > 0) {
    clients.pop();
  }
  localStorage.clear();
  const displayElem = document.querySelectorAll('.order__display');
  displayElem.forEach((el) => {
    el.remove();
  });
  clearFields();
});

function clearFields() {
  buyerName.value = '';
  buyerNumber.value = '';
  console.log('cleared');
}
