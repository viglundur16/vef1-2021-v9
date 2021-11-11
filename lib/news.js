/** Slóð á frétta vefþjónustu */
const NEWS_API = 'https://vef2-2021-ruv-rss-json-proxy.herokuapp.com/';

/**
 * Hlutur sem heldur utan um in-memory „cache“ af gögnum í minni á client (í vafra).
 * Nýtir það að þegar forrit er keyrt mun `fetchNews` fallið *alltaf* keyra þar sem `cache` er í
 * scope, og það verður alltaf sami hluturinn. Við getum því bætt við niðurstöðum í hlutinn með
 * vel þekktum „lykli“ (cache key), við næstu köll getum við athugað hvort hlutur innihaldi þennan
 * lykil og skilað þá þeirri niðurstöðu í stað þess að gera sama kall aftur.
 */
const cache = {};

const indexFetch = [];

const DELAY_PROBABILITY = 0.1;
const ERROR_PROBABILITY = 0.1;

export function delay() {
}

/**
 * Sækir fréttir frá vefþjónustu. Geymir í in-memory cache gögn eftir `id`.
 * @param {string} [id=''] ID á fréttaflokk til að sækja, sjálgefið tómi (grunn) flokkurinn
 * @returns {Promise<Array<object> | null>} Promise sem verður uppfyllt með fylki af fréttum.
 *           Skilar `null` ef villa kom upp við að sækja gögn.
 */
export async function fetchNews(id = '') {
  // TODO útfæra

  const newsLink = NEWS_API + id;

  try {
    const res = await fetch(newsLink);
    const resjson = await res.json();

    if (resjson !== null) {
      let key;
      for (let i = 0; i < resjson.length; i++) {
        key = resjson[i].id;
        if (!(key in cache)) {
          cache[key] = resjson[i];
          indexFetch.push(key);
        }
      }
      const isDelay = Math.random();
      if (isDelay <= DELAY_PROBABILITY) {
        await delay();
      }
    }

    const isError = Math.random();
    if (isError > ERROR_PROBABILITY) {
      return resjson;
    }
    return null;
  } catch (error) {
    console.warn(error);
    return null;
  }
}
