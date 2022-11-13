export function render(data) {
  const container = document.querySelector('.container');
  data.result.forEach(item => {
    const a = document.createElement('a')
    const spanTitle = document.createElement('span')
    const spanIdFilm = document.createElement('span')
    spanIdFilm.textContent= item.uid;
    spanTitle.textContent = item.properties.title;

    a.classList.add('cards');

    a.href = `?_id=${item.uid}`
    a.addEventListener('click',event=>{
      event.preventDefault();
      container.innerHTML=''
      history.pushState(null, '', `?_id=${item.uid}`)
      renderPage('./renderFilms.js',`https://www.swapi.tech/api/films/${item.uid}`);
    })
    a.append(spanIdFilm, spanTitle)
    container.append(a)
  });
}


function renderPage(moduleName,apiUrl){
  Promise.all([moduleName,apiUrl].map(src=>loadResource(src)))
    .then(([pageModul,data])=>{
      pageModul.render(data)
    })
}

function loadResource(src){
  //js файлы
  if(src.endsWith('.js')){
      return import(src)
  }
  //данные с сервера
  return fetch(src).then(res => res.json());
}
