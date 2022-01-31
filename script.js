const imageContainer = document.getElementById('image-container'); 
let ready = false; 
let imagesLoaded = 0; 
let totalImages = 0;
let photosArray = []; 
let initialLoad = true;

// Unsplash API 
const count = 3; 
const apiKey = '72dhT5K8lKoSSpgiJ_rF6riJ4hyWyTnd1N1EHIJyOEU';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


// Helper function to set attributes on DOM ELEMENTS
function setAttributes (element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// Check if the images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready=true; 
        loader.hidden = true;
        initialLoad = false;
        console.log('ready', ready);
        count = 30
    }
}

// Create elements for links and photos 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length; 
    console.log('total images', totalImages);
    photosArray.forEach((photo) =>{
        // Create <a> to  link to unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank'
        });
         //Create <img> for photo
         const img = document.createElement('img'); 
      
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description, 
            title: photo.alt_description
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded); 
      
        //  Put the image inside <a>, then put both inside imageContainer Element
        item.appendChild(img); 
        imageContainer.appendChild(item);
    }); 
}

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


// Check to see if scrolling near bottom of the page, load more photos 
window.addEventListener('scroll', () => {
    //scrollY how heigh we are from the top of the page
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight -
    1000 && ready) {
    ready = false;
    getPhotos();
  }
});


//On load 
getPhotos();