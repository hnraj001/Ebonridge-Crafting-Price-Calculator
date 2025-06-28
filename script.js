let materials = {};
let currentItemMaterials = [];
let items = [];

function addMaterial() {
  const name = document.getElementById("materialName").value.trim();
  const price = parseFloat(document.getElementById("materialPrice").value);

  if (!name || isNaN(price)) return alert("Enter valid name and price");

  materials[name] = price;
  updateMaterialList();
  document.getElementById("materialName").value = "";
  document.getElementById("materialPrice").value = "";
}

function deleteMaterial(name) {
  delete materials[name];
  updateMaterialList();
}

function updateMaterialList() {
  const list = document.getElementById("materialList");
  list.innerHTML = "";
  for (const [name, price] of Object.entries(materials)) {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${name} - $${price}</span>
      <button onclick="deleteMaterial('${name}')">🗑️</button>
    `;
    list.appendChild(li);
  }

  updateMaterialDropdowns();
}

function updateMaterialDropdowns() {
  const selects = document.querySelectorAll(".material-select");
  selects.forEach(select => {
    select.innerHTML = "";
    for (const name in materials) {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    }
  });
}

function addItemMaterial() {
  const container = document.createElement("div");

  const select = document.createElement("select");
  select.className = "material-select";

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.placeholder = "Qty";
  qtyInput.className = "material-qty";

  container.appendChild(select);
  container.appendChild(qtyInput);

  document.getElementById("itemMaterials").appendChild(container);
  updateMaterialDropdowns();
}

function saveItem() {
  const itemName = document.getElementById("itemName").value.trim();
  if (!itemName) return alert("Enter item name");

  const materialDivs = document.querySelectorAll("#itemMaterials > div");
  const mats = [];

  materialDivs.forEach(div => {
    const material = div.querySelector("select").value;
    const qty = parseFloat(div.querySelector("input").value);
    if (material && !isNaN(qty)) {
      mats.push({ material, qty });
    }
  });

  if (mats.length === 0) return alert("Add at least one material");

  items.push({ name: itemName, materials: mats });
  updateItemList();
  document.getElementById("itemMaterials").innerHTML = "";
  document.getElementById("itemName").value = "";
}

function updateItemList() {
  const ul = document.getElementById("itemList");
  const out = document.getElementById("calculatedPrices");
  ul.innerHTML = "";
  out.innerHTML = "";

  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.name}</strong>`;
    ul.appendChild(li);

    // Calculate price
    let total = 0;
    item.materials.forEach(mat => {
      const matPrice = materials[mat.material] || 0;
      total += mat.qty * matPrice * 4;
    });

    const res = document.createElement("div");
    res.className = "result-box";
    res.innerHTML = `<strong>${item.name}</strong>: $${total.toFixed(2)}`;
    out.appendChild(res);
  });
}
