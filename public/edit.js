const editStat = document.querySelector(".edited");
const editBtn = document.querySelector(".edit-submit-btn");
const form = document.querySelector(".single-user-form");
const userID = document.querySelector(".user-id-string");
const inputField = document.querySelector(".user-field");
const verified_field = document.querySelector(".verified-checker");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const getSingleUser = async () => {
  try {
    const {
      data: { user },
    } = await axios.get(`/api/v1/users/${id}`);
    const { _id, name, verified } = user;
    userID.textContent = _id;
    inputField.value = name;
    verified_field.checked = verified;
  } catch (error) {
    console.log(error);
  }
};

getSingleUser();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  editBtn.textContent = "processing...";
  try {
    const username = inputField.value;
    const verified_user = verified_field.checked;
    const {
      data: { user },
    } = await axios.patch(`/api/v1/users/${id}`, {
      name: username,
      verified: verified_user,
    });
    const { _id, name, verified } = user;
    userID.textContent = _id;
    inputField.value = name;
    verified_field.checked = verified;

    editStat.textContent = "Edited Successfully";
  } catch (error) {
    console.log(error);
  }
  editBtn.textContent = "Edit";
  setTimeout(() => {
    editStat.textContent = "";
  }, 3000);
});
