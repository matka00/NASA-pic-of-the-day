const sectionInput = function () {
  return `
    <h2>Astronomy picture of the day from NASA</h2>
    <section id="input-container">
        <p id="action-text">Pick a date for a wonderful photo of a previous day</p>
        <input type="date" id="date-picker" onchange="handler(event)">
    </section>
    <section id="photo-container">
        <img id="image-cont"src="">
        <h3 id="title-cont"></h3>
        <p id="explanation-cont"></p>
    </section>
    `;
};

const loadEvent = async function () {
  const rootElement = document.getElementById("root");

  rootElement.insertAdjacentHTML("beforeend", sectionInput());

  fetchData();
};

const fetchData = async function (inputDate) {
  let url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
  if (inputDate) {
    url += `&date=${inputDate}`;
  }

  const response = await fetch(url);
  const responseJson = await response.json();

  //debugger;

  if (response.status === 200) {
    let image = document.getElementById("image-cont");
    let title = document.getElementById("title-cont");
    let explanation = document.getElementById("explanation-cont");

    image.src = responseJson.url;
    title.innerHTML = responseJson.title;
    explanation.innerHTML = responseJson.explanation;
  } else if (responseJson.msg) {
    alert(responseJson.msg);
  } else {
    alert(response.statusText);
  }
};

const handler = function (e) {
  fetchData(e.target.value);
};

window.addEventListener("load", loadEvent);
