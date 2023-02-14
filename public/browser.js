const usersContainer = document.querySelector(".users");
const loading = document.querySelector(".loading-text");
const form = document.querySelector(".user-form");
const input = document.querySelector(".user-field");

const showUsers = async () => {
  loading.style.display = "block";
  try {
    const {
      data: { users },
    } = await axios.get("/api/v1/users");
    if (users.length < 1) {
      const noUser = `<p>No user found in database</p>`;
      return (usersContainer.innerHTML = noUser);
    }
    const createdUsers = users
      .map((user) => {
        const { _id: userID, name, verified } = user;
        return `<div class="user-container">
        <div class="username ${verified && "user-created"}">
        <span><i class="far fa-check-circle"></i></span>
            <h5>
            ${name}
            </h5>
        </div>
        <div>
            <a href="user.html?id=${userID}" class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <span class="delete-btn" data-id=${userID}>
            <i class="fas fa-trash"></i>
            </span>

        </div>
        </div>`;
      })
      .join("");
    usersContainer.innerHTML = createdUsers;
    loading.style.display = "none";
  } catch (error) {
    console.log(error);
  }
};

showUsers();

// Delete user
usersContainer.addEventListener("click", async (e) => {
  const elem = e.target;
  try {
    if (elem.parentElement.classList.contains("delete-btn")) {
      const id = elem.parentElement.dataset.id;
      await axios.delete(`/api/v1/users/${id}`);
      showUsers();
    }
  } catch (error) {
    console.log(error);
  }
});

// Add user
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = input.value;
  try {
    await axios.post("/api/v1/users", { name });
    showUsers();
  } catch (error) {
    console.log(error);
  }
  input.value = "";
});
