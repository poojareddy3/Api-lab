const BASE_URL =`http://www.omdbapi.com/?apikey=`;
const API_KEY = `9eff9676`;
const button = document.querySelector("#search");
const searchInput = document.querySelector("#blank");
const displayDiv = document.querySelector("#resultDiv");
button.addEventListener('click', async () => {
    let inputValue = searchInput.value;
    try{
    let response = await axios.get(`${BASE_URL}${API_KEY}&s=${inputValue}`);
    console.log(response.data);
    let resultArray = response.data.Search;
    renderList(resultArray);
    }
    catch(e){
        console.log(e);
    }
})
function renderList(arrObj){
    for(let i = 0; i < arrObj.length; i++){
        // console.log(arrObj[i].Title);
        let Title= document.createElement('h4');
            let TitleT = document.createTextNode("Title: " + arrObj[i].Title);
            Title.appendChild(TitleT);
        let Year = document.createElement('h5');
            let YearT = document.createTextNode("Year: " + arrObj[i].Year);
             Year.appendChild(YearT);
        let newImg = document.createElement('img');
        let newBr = document.createElement('br');
        newImg.setAttribute("src", arrObj[i].Poster);
        let viewMoreButton = document.createElement("button");
        viewMoreButton.textContent ="View More Info";
        viewMoreButton.style.cursor = "pointer";//change
        let infoDiv = document.createElement('div');
        viewMoreButton.addEventListener('click', async ()=>{
            try {
                const response = await axios.get(`${BASE_URL}${API_KEY}&t= ${arrObj[i].Title}`);
                console.log(response);
                let resultViewInfo = response.data;
                infoDiv.innerHTML = ` Actors: ${resultViewInfo.Actors} <br>
                                    Director: ${resultViewInfo.Director}<br>
                                    Language: ${resultViewInfo.Language}<br>
                                    Genre: ${resultViewInfo.Genre}<br>
                                    Runtime: ${resultViewInfo.Runtime} <br>
                                    Plot: ${resultViewInfo.Plot} `;
            } catch (e) {
                console.log(e);
            }
        })
        displayDiv.appendChild(Title);
        displayDiv.appendChild(Year);
        displayDiv.appendChild(newImg);
        displayDiv.appendChild(newBr);//change
        displayDiv.appendChild(viewMoreButton);
        displayDiv.appendChild(infoDiv);
    }
}