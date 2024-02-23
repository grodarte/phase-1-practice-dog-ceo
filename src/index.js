// console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    getDogImages()
    getDogBreeds()
    document.getElementById("breed-dropdown").addEventListener("change", e => {
        const selectedLetter = e.target.value
        filterDogs(selectedLetter)
    })
})


function getDogImages(){
    fetch ("https://dog.ceo/api/breeds/image/random/4")
    .then(res=>res.json())
    .then(dogData => {
         dogData.message.forEach(dog => postImage(dog))
    })
}

function postImage(dog){
    const imageContainer = document.getElementById("dog-image-container")

    let img = document.createElement("img")
    img.src = dog
    imageContainer.appendChild(img)
}

function getDogBreeds(){
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res=>res.json())
    .then(breedData=>{
        for (const breed in breedData.message){
            const subBreeds = breedData.message[breed]
            if (Array.isArray(subBreeds) && subBreeds.length > 0){
                subBreeds.forEach(subBreed => {
                    postBreed(`${breed} - ${subBreed}`)
                })
            } else {
                postBreed(breed)
            }
        }
    })
}

function postBreed(breed){
    const breedList = document.getElementById("dog-breeds")
    let li = document.createElement("li")
    li.innerText = breed
    li.addEventListener("click", e => {
        changeColor(e)
    })
    breedList.appendChild(li)
}

function changeColor(e){
    e.target.style.color = "red"
}



function filterDogs(selectedLetter){
    const breedList = document.getElementById("dog-breeds")
    const breeds = breedList.getElementsByTagName("li")

    for (const breed of breeds){
        const breedName = breed.innerText
        if (breedName.startsWith(selectedLetter)){
            breed.style.display = "block"
        } else {
            breed.style.display = "none"
        }
    }
}

