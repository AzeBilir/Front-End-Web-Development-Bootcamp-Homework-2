let data = [];

const fetchData = () => {
  //verinin çekildiği yer
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      //json'dan okunan verinin data array'ine atanması
      data = responseData;

      //veri geldikten sonra filtreleme butonu , checkboxları görünür olsun
      let filterButton = document.querySelector("#filterButton");
      filterButton.setAttribute("style", "");

      let labelAdult = document.querySelector("#labelAdult");
      labelAdult.setAttribute("style", "");

      let labelActive = document.querySelector("#labelActive");
      labelActive.setAttribute("style", "");

      let labelCharacter = document.querySelector("#labelCharacter");
      labelCharacter.setAttribute("style", "");

      let myCharacter = document.querySelector("#myCharacter");
      myCharacter.setAttribute("style", "");

      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      alert("Bir hata oluştu");
      console.log(err);
    });
};

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
  let list = document.querySelector(".list");
  list.innerHTML = data
    .map((element) => {
      return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
            <span class='bold'>age:</span> ${element.age}
            <span class='bold'>isactive:</span> ${element.isActive}
        </li>
        `;
    })
    .join(" ");
};

//verinin filtrelenmesini sağlayan fonksiyon
//TODO
const filterData = () => {
  let isActiveValue = document.getElementById("inputActive").checked;
  let isAdultValue = document.getElementById("inputAdult").checked;
  let text = document.getElementById("myCharacter").value;

  if (isActiveValue && isAdultValue && text != "") {
    let newtext = text.toUpperCase();
    let character = newtext.charAt(0);
    let filteredData = data.filter(
      (element) =>
        element.name.charAt(0) == character &&
        element.age > 17 &&
        element.isActive === true
    );
    //console.log(filterData);
    listData(filteredData);
  } else if (isAdultValue && text != "") {
    let newtext = text.toUpperCase();
    let character = newtext.charAt(0);
    let filteredData = data.filter(
      (element) => element.name.charAt(0) == character && element.age > 17
    );
    listData(filteredData);
  } else if (isActiveValue && text != "") {
    let newtext = text.toUpperCase();
    let character = newtext.charAt(0);
    let filteredData = data.filter(
      (element) =>
        element.name.charAt(0) == character && element.isActive === true
    );
    listData(filteredData);
  } else if (isActiveValue && isAdultValue) {
    let filteredData = data.filter(
      (element) => element.isActive === true && element.age > 17
    );
    listData(filteredData);
  } else if (text != "") {
    let newtext = text.toUpperCase(); // console.log(text);
    let character = newtext.charAt(0); // console.log(character);
    let filteredData = data.filter(
      (element) => element.name.charAt(0) == character
    ); // console.log(filteredData);
    listData(filteredData);
  } else if (isAdultValue) {
    let filteredData = data.filter((element) => element.age > 17);
    listData(filteredData);
  } else {
    let filteredData = data.filter((element) => element.isActive === true);
    listData(filteredData);
  }
};
