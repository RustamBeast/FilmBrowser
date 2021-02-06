const searchItems = document.getElementById('search');
const pictureElement = document.querySelector('.gallery');

const searchForm = document.querySelector('.search-form');
searchForm.addEventListener('submit', event => {

  if (!searchItems.value){
    searchItems.style.border = '1px solid red';
    event.preventDefault();
    return;
  }
})

document.addEventListener('DOMContentLoaded', event => {
  const params = (new URL (document.location)).searchParams;
  const pictureQuery = params.get('title');

  if (!pictureQuery){
    return;
  }

  //console.log(pictureQuery);
  getItems(pictureQuery);

});

async function getItems(value){
    const gallery = document.getElementById('gallery');
    gallery.innerHTML="";
    const certainURL = "http://www.omdbapi.com/?apikey=5d449eb7&t=" + value;
    const certainResponse = await fetch(certainURL);
    const itemJSON = await certainResponse.json();

    if (itemJSON.Response == "True"){

    const thumbElement = document.createElement('div');
      thumbElement.classList.add('thumb');

    const objectImage = document.createElement('img');
    objectImage.src = itemJSON.Poster;
    objectImage.classList.add('object-image');
    objectImage.setAttribute('id', 'object-image');
    thumbElement.appendChild(objectImage);

    const objectLabel = document.createElement('div');
    objectLabel.classList.add('object-label');
    thumbElement.appendChild(objectLabel);

    const titleElement = document.createElement('span');
      titleElement.classList.add('title');
      var title = document.createTextNode(itemJSON.Title);
      titleElement.appendChild(title);
      objectLabel.appendChild(titleElement);

    const runtimeElement = document.createElement('span');
    runtimeElement.classList.add('runtime');
    var runtime = document.createTextNode(itemJSON.Runtime);
    runtimeElement.appendChild(runtime);
    objectLabel.appendChild(runtimeElement);

    const ratingElement = document.createElement('span');
    ratingElement.classList.add('rating');
    var rating = document.createTextNode('IMDb: ' + itemJSON.Ratings[0].Value);
    ratingElement.appendChild(rating);
    objectLabel.appendChild(ratingElement);

    pictureElement.appendChild(thumbElement);
	}
	else {
		const thumbElement = document.createElement('div');
      thumbElement.classList.add('thumb');
      var error = document.createTextNode("The film was not found");
      thumbElement.appendChild(error);
      
      pictureElement.appendChild(thumbElement);
	}
}