// Get Data
const ramenMenu = document.getElementById("ramen-menu");
const detailImg = document.querySelector("#ramen-detail img");

fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramenArray) => {
    ramenArray.forEach((ramen) => {
      appendRamenToMenu(ramen);
    });
  });

function appendRamenToMenu(ramenObj) {
  const div = document.createElement("div");
  const imageDomElement = document.createElement("img");
  const deleteBtn = document.createElement("button");

  imageDomElement.src = ramenObj.image;
  imageDomElement.addEventListener("click", () => {
    detailImg.src = ramenObj.image;
    document.querySelector("#ramen-detail .name").textContent = ramenObj.name;
    document.querySelector("#ramen-detail .restaurant").textContent =
      ramenObj.restaurant;
    document.querySelector("#rating-display").textContent = ramenObj.rating;
    document.querySelector("#comment-display").textContent = ramenObj.comment;
  });

  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/ramens/${ramenObj.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      div.remove();
    });
  });

  div.append(imageDomElement, deleteBtn);
  ramenMenu.append(div);
}

const form = document.querySelector("#new-ramen");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newRamenName = event.target.name.value;
  const newRestaurant = event.target["new-restaurant"].value;
  const newImage = event.target["new-image"].value;
  const newRating = event.target["new-rating"].value;
  const newComment = event.target["new-comment"].value;
  const newRamen = {
    name: newRamenName,
    restaurant: newRestaurant,
    image: newImage,
    rating: newRating,
    comment: newComment,
  };

  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRamen),
  })
    .then((response) => response.json())
    .then((ramen) => {
      appendRamenToMenu(ramen);
      event.target.reset();
    });
});
