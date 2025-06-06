var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");
var textDiv = document.getElementById("list_users");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");

async function save() {
  var name = document.getElementById("name");
  var pass = document.getElementById("pass");
  if (
    !name.value ||
    name.value.trim() === "" ||
    !pass.value ||
    pass.value.trim() === ""
  ) {
    console.error("cannot be empty");
    return;
  }
  const response = await fetch("/signin/save-name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name.value, pass: pass.value }),
  });
  name.value = ""; // xóa input sau khi lưu
  pass.value = ""; // xóa input sau khi lưu
  alert(response.statusText);
}
async function getUsers() {
  const response = await fetch("/signin/get-users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error("Error fetching users:", response.statusText);
    return [];
  }
  const users = await response.json();

  // Hiển thị danh sách users lên div#text
  textDiv.innerHTML = ""; // xóa nội dung cũ
  var id = 1;
  users.forEach((user) => {
    const p = document.createElement("p");
    p.textContent = "id: " + id + "name: " + user.name + " pass: " + user.pass;
    id++;
    textDiv.appendChild(p);
  });
}

async function deleteUser() {
  const response = await fetch("/signin/delete-user", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.error("Error deleting user:", response.statusText);
    return;
  }
  const result = await response.json();
  getUsers();
  console.log(result.message);
}

function toHome() {
  window.location.href = "/";
}

btn.addEventListener("click", save);
btn2.addEventListener("click", getUsers);
btn3.addEventListener("click", deleteUser);
btn4.addEventListener("click", toHome);
