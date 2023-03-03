// Get Data
function fetchRamens(){
    fetch (`http://localhost:3000/ramens`)
    .then (response => response.json())
     .then(allRamens=> allRamens.forEach(renderRamens))
}

    // DOM SELECTORS
   
    let menuDiv = document.querySelector('#ramen-menu');

    let mainImg = document.querySelector('.detail-image');

    let mainName = document.querySelector('.name');

    let mainRestaurant = document.querySelector('.restaurant');

    let mainRating = document.querySelector('#rating-display');

    let mainComment = document.querySelector('#comment-display');

    let formRamen = document.querySelector('#new-ramen')

    // Rendering function
    function renderRamens (allRamens){
        let ramenImg = document.createElement(`img`);
       ramenImg.src = allRamens.image;
       menuDiv.append(ramenImg);
       ramenImg.addEventListener('click', ()=>{
        mainImg.src = allRamens.image;
        mainName.textContent = allRamens.name;
        mainRestaurant.textContent = allRamens.restaurant;
        mainRating.textContent=allRamens.rating;
        mainComment.textContent=allRamens.comment;
       })

       }
    
       formRamen.addEventListener('submit', (e)=>{
        e.preventDefault()
        const name = e.target.name.value;
        const restaurant = e.target.restaurant.value;
        const image = e.target.image.value;
        const rating = e.target.rating.value;
        const comment = e.target['new-comment'].value;
        let newRamen = {
            name,
            restaurant,
            image,
            rating,
            comment,

        }
       renderRamens(newRamen)
    })
 fetchRamens()

    
