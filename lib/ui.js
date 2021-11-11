import { delay } from './news.js';

/**
 * Föll sem sjá um að kalla í `fetchNews` og birta viðmót:
 * - Loading state meðan gögn eru sótt
 * - Villu state ef villa kemur upp við að sækja gögn
 * - Birta gögnin ef allt OK
 * Fyrir gögnin eru líka búnir til takkar sem leyfa að fara milli forsíðu og
 * flokks *án þess* að nota sjálfgefna <a href> virkni—við tökum yfir og sjáum
 * um sjálf með History API.
 */

/**
 * Sér um smell á flokk og birtir flokkinn *á sömu síðu* og við erum á.
 * Þarf að:
 * - Stoppa sjálfgefna hegðun <a href>
 * - Tæma `container` þ.a. ekki sé verið að setja efni ofan í annað efni
 * - Útbúa link sem fer til baka frá flokk á forsíðu, þess vegna þarf `newsItemLimit`
 * - Sækja og birta flokk
 * - Bæta við færslu í `history` þ.a. back takki virki
 *
 * Notum lokun þ.a. við getum útbúið föll fyrir alla flokka með einu falli. Notkun:
 * ```
 * link.addEventListener('click', handleCategoryClick(categoryId, container, newsItemLimit));
 * ```
 *
 * @param {string} id ID á flokk sem birta á eftir að smellt er
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
 function handleCategoryClick(id, container, newsItemLimit) {
  return (e) => {
    e.preventDefault();
  };
}
 const DELAY_PROBABILITY = 0.1;
 const ERROR_PROBABILITY = 0.1;
export async function fetchAndRenderCategory(id, parent, link = null) {
  const section = document.createElement('section');
  section.classList.add('news');
  section.classList.add('newsList__item');
  parent.classList.add('newsList__list');
  parent.appendChild(section);

  if (window.location.search !== '') {
    parent.classList.add('news__larger');
  }

  const fetchingText = document.createElement('p');
  fetchingText.innerText = 'Sæki gögn...';
  fetchingText.classList.add('margin-text');
  section.appendChild(fetchingText);

  const res = await fetch(link);
  let json = await res.json();

  const isDelay = Math.random();
  if (isDelay <= DELAY_PROBABILITY) {
    await delay();
  }

  section.removeChild(fetchingText);
  const isError = Math.random();
  if (isError <= ERROR_PROBABILITY) {
    json = null;
  }

  if (json === null) {
    const err = document.createElement('p');
    err.innerText = 'Villa kom upp';
    err.classList.add('margin-text');
    section.appendChild(err);
  } else {
    const titlee = document.createElement('strong');
    titlee.innerText = json.title;
    titlee.classList.add('news__title');


    const div = document.createElement('div');
    div.classList.add('news__list');
    section.appendChild(div);

    let p;
    let a;
    for (let i = 0; i < json.items.length; i++) {
      a = document.createElement('a');
      a.href = json.items[i].link;
      div.appendChild(a);

      p = document.createElement('p');
      p.innerText = json.items[i].title;
      p.classList.add('frettir');
      a.appendChild(p);
    }
  }
}

/**
 * Eins og `handleCategoryClick`, nema býr til link sem fer á forsíðu.
 *
 * @param {HTMLElement} container Element sem á að birta fréttirnar í
 * @param {number} newsItemLimit Hámark frétta sem á að birta
 * @returns {function} Fall sem bundið er við click event á link/takka
 */
 function handleBackClick(container, newsItemLimit) {
  return (e) => {
    e.preventDefault();
  };
}
export async function fetchAndRenderLists(container) {
  let path;
  if (container === 'Allar fréttir') {
  } else if (container === 'Erlendar fréttir') {
  } else if (container === 'Íþróttir') {
  } else {
    path = container.toLowerCase();
  }
  const fetchLink = `https://vef2-2021-ruv-rss-json-proxy.herokuapp.com/${path}`;
  const parent = document.querySelector('.layout__main');
  fetchAndRenderCategory(path, parent, fetchLink);
  /**
 * Sækir gögn fyrir flokk og birtir í DOM.
 * @param {string} id ID á category sem við erum að sækja
 * @param {HTMLElement} parent Element sem setja á flokkinn í
 * @param {HTMLELement | null} [link=null] Linkur sem á að setja eftir fréttum
 * @param {number} [limit=Infinity] Hámarks fjöldi frétta til að sýna
 */

}
