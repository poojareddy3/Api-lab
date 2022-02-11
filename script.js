const BASE_URL = `http://www.omdbapi.com/?`;
const IMAGE_BASE = `http://img.omdbapi.com/?`;
const API_KEY = `176bb1e6`;
const movieInput = document.querySelector("input");
const button = document.querySelector("button");
const section = document.querySelector(".movie-list");
const imgPoster = document.createElement("div");
section.appendChild(imgPoster);

function renderList(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i].Title, arr[i].Year, arr[i].Poster);
    section.innerHTML += `<ul><li>${arr[i].Title}</li></ul>`;
    section.innerHTML += `<img src=${arr[i].Poster}>`;
    section.innerHTML += `<button id ='${[i]}'class ="info_B"> More Info</button>`;
    section.innerHTML += `<div class ="movie_info">
    <p>Title: ${arr[i].Title}</p>
    <p>Year: ${arr[i].Year}</p>
    <p>id: ${arr[i].imdbID}</p></div>`;
  } 
  //display nth all 
  const AllInfo = document.querySelectorAll('.movie_info');
  for(let i = 0; i < AllInfo.length;i++){
    AllInfo[i].style.display = 'none';
  }
const button = document.querySelectorAll(".info_B");

button.forEach(function (i){
    i.addEventListener('click',function(){
        // console.log(i);
        num = i.id;
        AllInfo[num].style.display = 'block';
    })
})
}

button.addEventListener("click", async () => {
  let valueInput = movieInput.value;
  try {
    let response = await axios.get(
      `${BASE_URL}apikey=${API_KEY}&s=${valueInput}`
    );
    let movieInfo = response.data.Search;
    renderList(movieInfo);
    console.log(response);
    //console.log(movieInfo);
  } catch (error) {
    console.log(error);
  }
})

