
export async function render(data){

  const arrUrl =[
    {
      urls: data.result.properties.species
    },
    {
      urls: data.result.properties.planets
    }
  ]
  loadResurs(data,arrUrl)
}

function loadResurs(data,arrUrl){
  Promise.all(
    arrUrl.map(item=>{
      return Promise.all(item.urls.map(src=>load(src)))
    })
  ).then(([dataSpecies, dataPlanet])=>{
    const container = document.querySelector('.container');
    const titleH = document.createElement('h1');
    const descP = document.createElement('p');
    const buttonBack = document.createElement('a')
    const buttonBackWrapper = document.createElement('div')
    const planetsTitle = document.createElement('h2')
    const speciesTitle = document.createElement('h2')
    const ulPlanets = document.createElement('ul')
    const ulSpecies = document.createElement('ul')
    const planetWrapper = document.createElement('div')
    const speciesWrapper = document.createElement('div')

    buttonBack.href = '/14_async-event-loop/Star-Wars/index.html';
    buttonBack.classList.add('a__back')
    buttonBack.textContent = 'Вернуться к списку фильмов'
    titleH.textContent = `${data.result.uid} ${data.result.properties.title}`
    planetsTitle.textContent = 'Планеты'
    speciesTitle.textContent = 'Существа'
    descP.textContent = data.result.properties.opening_crawl
    dataSpecies.forEach(item=>{
      const liSpecies = document.createElement('li')
      liSpecies.textContent = item.result.properties.name;
      ulSpecies.append(liSpecies)
    })
    speciesWrapper.append(speciesTitle,ulSpecies)
    dataPlanet.forEach(item=>{
      const liPlanet = document.createElement('li')
      liPlanet.textContent = item.result.properties.name;
      ulPlanets.append(liPlanet)
    })
    planetWrapper.append(planetsTitle,ulPlanets)
    buttonBackWrapper.append(buttonBack)
    container.append(titleH,descP,planetWrapper,speciesWrapper,buttonBackWrapper)
  })
}

function load(src){
  return fetch(src).then(res => res.json());
}
