

var nameInp = document.getElementById("ProductName");
var categoryInp = document.getElementById("ProductCategory");
var priceInp = document.getElementById("ProductPrice");
var descInp = document.getElementById("ProductDescription");



varnameAlert = document.getElementById("nameAlert");
var categoryAlert = document.getElementById("categoryAlert");
var priceAlert = document.getElementById("priceAlert");

var categoryFound = document.getElementById("categoryFound");
var PriceFound = document.getElementById("PriceFound");
var DescriptionFound = document.getElementById("DescriptionFound");



if (localStorage.getItem("productData") == null) {
  var productList = [];
} else {
  var productList = JSON.parse(localStorage.getItem("productData"));
}

function addProduct() {
  if (
    validateProductname() == true &&
    categoryInp.value != "" &&
    priceInp.value != "" &&
    descInp.value != ""
  ) {
    var product = {
      name: nameInp.value,
      category: categoryInp.value,
      price: priceInp.value,
      desc: descInp.value,
    };

    productList.push(product);



    localStorage.setItem("productData", JSON.stringify(productList));

    console.log(productList);
    dispalyProducts();
   
  }

  else if(
     categoryInp.value == "" &&
     priceInp.value == "" &&
     descInp.value == ""){
    categoryFound.classList.remove("d-none");
    PriceFound.classList.remove("d-none");
    DescriptionFound.classList.remove("d-none");
  }
  clear();
}

function dispalyProducts() {
  var trs = "";
  for (var i = 0; i < productList.length; i++) {
    trs += `<tr><td>${i}</td><td>${productList[i].name}</td><td>${productList[i].category}</td><td>${productList[i].price}</td><td>${productList[i].desc}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>
</td>
<td>
    <button onclick="retriveData(${i})" class="btn btn-warning">update</button>
</td>


    </tr>`;
  }

  document.getElementById("tbody").innerHTML = trs;
}

dispalyProducts();

function deleteProduct(x) {
  productList.splice(x, 1);

  localStorage.setItem("productData", JSON.stringify(productList));
  dispalyProducts();
}

var searchInp = document.getElementById("search");

function search() {
  console.log(searchInp.value);

  var trs = "";
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toUpperCase().includes(searchInp.value.toUpperCase())
    ) {
      trs += `<tr><td>${i}</td><td>${productList[i].name.replace(
        searchInp.value,
        `<span style="background-color: yellow;">${searchInp.value}</span>`
      )}</td><td>${productList[i].category}</td><td>${productList[i].price
        }</td><td>${productList[i].desc}</td>
      <td>
      <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>
  </td>
  <td>
      <button class="btn btn-warning">update</button>
  </td>
  
  
      </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = trs;
}

var addBtn = document.getElementById("addProduct");

function retriveData(x) {
  nameInp.value = productList[x].name;
  categoryInp.value = productList[x].category;
  priceInp.value = productList[x].price;
  descInp.value = productList[x].desc;
  addBtn.innerHTML = "update product";

  addBtn.onclick = function () {
    productList[x].name = nameInp.value;
    productList[x].category = categoryInp.value;
    productList[x].price = priceInp.value;
    productList[x].desc = descInp.value;

    localStorage.setItem("productData", JSON.stringify(productList));

    dispalyProducts();

    addBtn.innerHTML = "add product";
    clear();

    addBtn.onclick = addProduct;
  };
 
}


function validateProductname() {
  var nameRegex = /^[A-Z][a-z 0-9 A-Z]{0,15}$/;
  var nameValue = nameInp.value;

  if (nameRegex.test(nameValue)) {
    nameInp.classList.remove("is-invalid");
    nameInp.classList.add("is-valid");
   nameAlert.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;
  } else {
    nameInp.classList.add("is-invalid");
   nameAlert.classList.remove("d-none");
    addBtn.setAttribute("disabled", "true");

    return false;
  }
}

function validateCategory() {
  var categoryRegex =/^[A-Z][a-z 0-9 A-Z]{0,15}$/;
  var categoryValue = categoryInp.value;

  if (categoryRegex.test(categoryValue)) {
    categoryInp.classList.remove("is-invalid");
    categoryInp.classList.add("is-valid");
    categoryAlert.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;

  } else {
    categoryInp.classList.add("is-invalid");
    categoryAlert.classList.remove("d-none");
    addBtn.setAttribute("disabled", "true");

    return false;
  }
}

function validatePrice() {
  var priceRegex =/^[0-9]{1,5}$/;
  var priceValue = priceInp.value;

  if (priceRegex.test(priceValue)) {
    priceInp.classList.remove("is-invalid");
    priceInp.classList.add("is-valid");
    priceAlert.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;

  } else {
    priceInp.classList.add("is-invalid");
    priceAlert.classList.remove("d-none");
    addBtn.setAttribute("disabled", "true");

    return false;
  }
}
function validatedesc() {
  var descRegex =/^[a-z A-Z 0-9]{0,100}$/;
  var descValue = descInp.value;

  if (descRegex.test(descValue)) {
    descInp.classList.remove("is-invalid");
    descInp.classList.add("is-valid");
    DescriptionFound.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;

  } else {
    descInp.classList.add("is-invalid");
    DescriptionFound.classList.remove("d-none");
    addBtn.setAttribute("disabled", "true");

    return false;
  }
}

nameInp.addEventListener("keyup", validateProductname);
categoryInp.addEventListener("keyup", validateCategory);
priceInp.addEventListener("keyup", validatePrice);
descInp.addEventListener("keyup", validatedesc);

function clear(){
  nameInp.value="";
  categoryInp.value="";
  priceInp.value="";
  descInp.value="";

}


