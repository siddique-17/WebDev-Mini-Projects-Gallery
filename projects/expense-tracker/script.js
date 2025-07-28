let balance = 0;
function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amt = parseFloat(document.getElementById("amount").value);
  if (!desc || isNaN(amt)) return alert("Please fill all fields");

  balance += amt;
  document.getElementById("balance").innerText = `₹${balance}`;
  const li = document.createElement("li");
  li.innerText = `${desc}: ₹${amt}`;
  document.getElementById("list").appendChild(li);

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}
