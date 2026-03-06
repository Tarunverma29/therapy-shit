// animejs ships its own types via @types/animejs
// This file exists to allow the `animejs/lib/anime.es.js` path used in older code.
// We now use the standard `import anime from 'animejs'` which resolves automatically.
declare module 'animejs/lib/anime.es.js' {
  import anime from 'animejs';
  export = anime;
  export default anime;
}
