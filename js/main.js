var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImgInput = document.getElementById("productimg");
var productDescInput = document.getElementById("productdesc");
var addBtn =document.querySelector("#addBtn");
var updateBtn =document.querySelector("#updateBtn");
var searchInput = document.querySelector("#productSearch");
var searchType = "name";
var updatedIndex=0;
var productList = [];
if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayAllData(productList);
}
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    img: `assets/${productImgInput.files[0]?.name || ''}`,
    desc: productDescInput.value,
  };
  productList.push(product);
  localStorage.setItem("productList", JSON.stringify(productList));
  clearForm();
  displayLastIndex();
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productImgInput.value = null;
  productDescInput.value = null;
}
function displayLastIndex() {
  var container = ``;
  var lastIndex = productList.length - 1;
  container = `                <tr>
    <td>${lastIndex + 1}</td>
    <td>${productList[lastIndex].name}</td>
    <td>${productList[lastIndex].price}</td>
    <td><img width="100px" src="${productList[lastIndex].img}" alt="Product"></td>
    <td>${productList[lastIndex].desc}</td>
    <td>${productList[lastIndex].category}</td>
    <td>
        <button onclick="updatePrep(${lastIndex})" class="btn btn-warning btn-sm">Update</button>
        <button onclick="deleteProduct(${lastIndex});" class="btn btn-danger btn-sm">Delete</button>
    </td>
</tr>
`;
  document.getElementById("tbody").innerHTML += container;
}
function displayAllData(list,term) {
  var container = ``;
  for (var i = 0; i < list.length; i++) {
    container += `                <tr>
    <td>${i + 1}</td>
    <td>${term ? list[i].name.toLowerCase().replaceAll(term,`<span class="bg-dark text-white fw-bolder">${term}</span>`):list[i].name}</td>
    <td>${term ? list[i].price.toLowerCase().replaceAll(term,`<span class="bg-dark text-white fw-bolder">${term}</span>`):list[i].price}</td>
    <td><img width="100px" src="${list[i].img}" alt="Product"></td>
    <td>${list[i].desc}</td>
    <td>${term ? list[i].category.toLowerCase().replaceAll(term,`<span class="bg-dark text-white fw-bolder">${term}</span>`):list[i].category}</td>
    <td>
        <button onclick="updatePrep(${i})" class="btn btn-warning btn-sm">Update</button>
        <button onclick="deleteProduct(${i});" class="btn btn-danger btn-sm">Delete</button>
    </td>
</tr>
`;
  }
  document.getElementById("tbody").innerHTML = container;
}
function setSearchType(type) {
  searchType = type;
  document.querySelector(".dropdown-toggle").textContent = type.charAt(0).toUpperCase() + type.slice(1);
}

function search() {
  var searchText = searchInput.value.toLowerCase();
  var filteredArr = [];
  
  for (var i = 0; i < productList.length; i++) {
    if (productList[i][searchType].toLowerCase().includes(searchText)) {
      filteredArr.push(productList[i]);
    }
  }
  displayAllData(filteredArr ,searchInput.value);
}

function deleteProduct(index){
productList.splice(index,1);
localStorage.setItem("productList", JSON.stringify(productList));
displayAllData(productList);
}
function updatePrep(idx){
  productNameInput.value = productList[idx].name;
  productPriceInput.value = productList[idx].price;
  productCategoryInput.value = productList[idx].category;
  // productImgInput.value = productList[idx].img;
  productDescInput.value = productList[idx].desc;

  addBtn.classList.replace("d-block","d-none");
  updateBtn.classList.replace("d-none","d-block");
  updatedIndex = idx;
}
function updateProduct(){
productList[updatedIndex].name = productNameInput.value;
productList[updatedIndex].price = productPriceInput.value;
productList[updatedIndex].category = productCategoryInput.value;
// productList[updatedIndex].img = productImgInput.value;
productList[updatedIndex].desc = productDescInput.value;
localStorage.setItem("productList", JSON.stringify(productList));
updateBtn.classList.replace("d-block","d-none");
addBtn.classList.replace("d-none","d-block");
clearForm();
displayAllData(productList); 
}