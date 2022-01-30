const imageContainer = document.getElementById('loader'); 
let photosArray = []; 

// Create elements for links and photos 
function displayPhotos() {
    photosArray.forEach((photo) =>{
        // Create <a> to  link to unsplash 
        const item = document.createElement('a');




    }); 

}




// Unsplash API 
const count = 10; 
const apiKey = '72dhT5K8lKoSSpgiJ_rF6riJ4hyWyTnd1N1EHIJyOEU';

const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Get Photos from unsplash api

async function getPhotos() {
    try {
        const response = await fetch(apiURL); 
        photosArray = await response.json(); 
        displayPhotos();

    }
    catch(error) {
        //Catch error here
    }
}

//On load 
getPhotos();