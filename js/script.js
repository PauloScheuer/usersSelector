//variavéis dos valores
let usersAll = [];
let usersSearch = [];
let numMale = null;
let numFemale = null;
let sumAge = null;
let aver2age = null;

//elementos html
let inputName = null;
let numUsers = null;
let spanNumMale = null;
let spanNumFemale = null;
let spanSumAge = null;
let spanAver2Age = null;
let result = null;

//formatador de número
let numberFormat = null;



window.addEventListener('load', () => {
  inputName = document.querySelector("#name");
  numUsers = document.querySelector("#numUsers");
  spanNumMale = document.querySelector("#numMale");
  spanNumFemale = document.querySelector("#numFemale");
  spanSumAge = document.querySelector("#sumAge");
  spanAver2Age = document.querySelector("#aver2age");
  result = document.querySelector("#result");

  numberFormat = Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2
  });

  numUsers.textContent = "Digite na barra de pesquisa!";
  inputName.focus();

  inputName.addEventListener('keyup', doSearch);
  doFetch();
});

async function doFetch() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  usersAll = json.results.map(person => {
    const { name, picture, dob, gender } = person;
    return {
      completeName: name.first + " " + name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender
    }
  });
}
function doSearch() {
  let search = inputName.value.toLowerCase();
  if (search !== "") {
    usersSearch = usersAll.filter(person => {
      return person.completeName.toLowerCase().includes(search);
    });
  } else {
    usersSearch = null;
  }
  render();
}
function render() {
  renderPeople();
  renderNumPeople();
  renderNumMale();
  renderNumFemale();
  renderSumAge();
  renderAver2Age();
}

function renderPeople() {
  let resultHTML = "<div>";
  if (usersSearch !== null) {
    usersSearch.forEach(person => {
      const { completeName, picture, age, gender } = person;
      resultHTML += `
    <div class="person">

    <img src="${picture}" alt="${completeName}">
    
    <span>${completeName}</span>
    <section>
    <span>${age} anos</span>
    </section>
    </div>
    `
    });
  }
  resultHTML += "</div>";

  result.innerHTML = resultHTML;
}

function renderNumPeople() {
  let text = null
  if (usersSearch === null) {
    text = "Nenhuma pessoa encontrada";
  } else if (usersSearch.length === 1) {
    text = `${usersSearch.length} pessoa encontrada`;
  } else {
    text = `${usersSearch.length} pessoas encontradas`;
  }
  numUsers.textContent = text;
}

function renderNumMale() {
  if (usersSearch !== null) {
    numMale = usersSearch.reduce((acc, cur) => {
      if (cur.gender === "male") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  } else {
    numMale = 0;
  }
  spanNumMale.textContent = `${numMale} usuário(s)`;
}

function renderNumFemale() {
  if (usersSearch !== null) {
    numFemale = usersSearch.reduce((acc, cur) => {
      if (cur.gender === "female") {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  } else {
    numFemale = 0;
  }
  spanNumFemale.textContent = `${numFemale} usuário(s)`;
}

function renderSumAge() {
  if (usersSearch !== null) {
    sumAge = usersSearch.reduce((acc, cur) => {
      return acc + cur.age;
    }, 0);
  } else {
    sumAge = 0;
  }
  sumAge = formatNumber(sumAge);
  spanSumAge.textContent = `${sumAge} anos`;
}

function renderAver2Age() {
  if (usersSearch !== null) {
    aver2age = usersSearch.reduce((acc, cur) => {
      return acc + cur.age;
    }, 0);
    if (usersSearch.length !== 0) {
      aver2age = aver2age / usersSearch.length;
    }
  } else {
    aver2age = 0;
  }
  aver2age = formatNumber(aver2age);
  spanAver2Age.textContent = `${aver2age} anos`;
}
function formatNumber(number) {
  return numberFormat.format(number);
}