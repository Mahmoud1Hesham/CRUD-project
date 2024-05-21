var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productImgInput = document.getElementById("productimg");
var productDescInput = document.getElementById("productdesc");
var productList = [];

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    img: productImgInput.value,
    desc: productDescInput.value,
  };
  productList.push(product);
  clearForm();
  displayData();
  }

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productImgInput.value = null;
  productDescInput.value = null;
}
function displayData() {
  var container = ``;
  var lastIndex = productList.length - 1;
  container = `                <tr>
    <td>${lastIndex+1}</td>
    <td>${productList[lastIndex].name}</td>
    <td>${productList[lastIndex].price}</td>
    <td><img width="100px" src="assets/5bc2f42dccad941a506d145c_Controller.png" alt="Product"></td>
    <td>${productList[lastIndex].desc}</td>
    <td>${productList[lastIndex].category}</td>
    <td>
        <button class="btn btn-warning btn-sm">Update</button>
        <button class="btn btn-danger btn-sm">Delete</button>
    </td>
</tr>
`
  document.getElementById("tbody").innerHTML += container;
}
