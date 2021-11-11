// TODO importa því sem nota þarf
import { fetchNews } from './lib/news.js';
import { fetchAndRenderLists } from './lib/ui.js';
/** Fjöldi frétta til að birta á forsíðu */
const CATEGORY_ITEMS_ON_FRONTPAGE = 5;

/** Vísun í <main> sem geymir allt efnið og við búum til element inn í */
const main = document.querySelector('main');

/**
 * Athugar útfrá url (`window.location`) hvað skal birta:
 * - `/` birtir yfirlit
 * - `/?category=X` birtir yfirlit fyrir flokk `X`
 */
async function route() {
  let fetched;

  const fetchingText = document.createElement('p');
  fetchingText.innerText = 'Sæki lista af fréttum...';
  main.appendChild(fetchingText);

  if (window.location.search === '') {
    
    fetched = await fetchNews('');

    main.removeChild(fetchingText);

    if (fetched === null) {
      const err = document.createElement('p');
      err.innerText = 'upp kom villa';

    } else {
      let len;
      if (fetched.length > 5) {
        len = 5;
      } 
      else {
        len = fetched.length;
      }
      for (let i = 0; i < len; i++) {
        fetchAndRenderLists(fetched[i].id);
      }
    }
  }
}

route();
