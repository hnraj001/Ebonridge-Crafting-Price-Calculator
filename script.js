function calculatePrice() {
  const itemName = document.getElementById("itemName").value;

  const mat1Qty = parseFloat(document.getElementById("mat1Qty").value) || 0;
  const mat1Price = parseFloat(document.getElementById("mat1Price").value) || 0;

  const mat2Qty = parseFloat(document.getElementById("mat2Qty").value) || 0;
  const mat2Price = parseFloat(document.getElementById("mat2Price").value) || 0;

  const total =
    (mat1Qty * mat1Price * 4) + (mat2Qty * mat2Price * 4);

  document.getElementById("result").innerHTML =
    `<strong>${itemName || "Item"} Suggested Price:</strong> $${total.toFixed(2)}`;
}
