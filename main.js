const cssPromises = []


const app = document.getElementById('app');
const container = document.createElement('div');
container.classList.add('container','d-flex','justify-content-between','flex-wrap','py-5');
const pageParams = new URLSearchParams(window.location.search);
const id = pageParams.get('_id');

app.append(container)

chekUrl(id)

window.addEventListener('popstate',(event)=>{
  container.innerHTML=''
  const pageParams = new URLSearchParams(window.location.search);
  const id = pageParams.get('_id');
  chekUrl(id)
})

function renderPage(moduleName,apiUrl,bootsStyle, style){
  Promise.all([moduleName,apiUrl,bootsStyle, style].map(src=>loadResource(src)))
    .then(([pageModul,data])=>{
      container.innerHTML=''
      pageModul.render(data)
    })
}


function chekUrl(id){
  if(id){
    renderPage(
      './renderFilms.js',
      `https://www.swapi.tech/api/films/${id}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
      './style.css',
    );
  }
  else{
    renderPage(
      './renderPages.js',
      'https://www.swapi.tech/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
      './style.css',
    )
  }
}

function loadResource(src){
  //js файлы
  if(src.endsWith('.js')){
      return import(src)
  }
  //css файлы
  if(src.endsWith('.css')){
      if(!cssPromises[src]){
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href  = src;
          cssPromises[src] = new Promise(resolve => {
              link.addEventListener('load',()=> resolve())
          });
          document.head.append(link)
      }
      return cssPromises[src];
  }
  //данные с сервера
  return fetch(src).then(res => res.json());
}
