/**
 * Anti-FOUC boot script.
 *
 * Restoring this is what stops a visitor who chose, say, Noir Gallery from
 * seeing a flash of the default Cobalt Blueprint on every page load: the theme
 * has to be on <html> before the first paint.
 *
 * It MUST be inlined, synchronous and parser-blocking in <head>. Any deferral
 * (defer / async / separate file) lets the first paint happen first, which is
 * exactly the flash it exists to prevent.
 *
 * CSP: public/_headers already allows script-src 'self' 'unsafe-inline', so this
 * runs with no header change; a hash-based allowance is the cleaner end state.
 *
 * Resolution order (mirrors ./provider.tsx):
 *   1. URL override  (?theme=…)   — preview only, never persisted
 *   2. stored choice (validated against the registry)
 *   3. DEFAULT_THEME (cobalt)
 *
 * Two hygiene steps are included: a leftover mode value in the theme key (the
 * earliest build stored "dark" there) is discarded rather than treated as a
 * theme id, and the now-obsolete portfolio-mode key is deleted.
 */
export const THEME_BOOT_SCRIPT = `
(function(){try{
  var d=document.documentElement;
  var T=['cobalt','aurora','graphite','ember','sage','noir'];
  var theme=null;
  try{
    var q=new URLSearchParams(window.location.search);
    var qt=q.get('theme');
    if(qt&&T.indexOf(qt)>-1)theme=qt;
  }catch(e){}
  try{
    var st=localStorage.getItem('portfolio-theme');
    if(st==='dark'||st==='light'){st=null;}
    if(!theme&&st&&T.indexOf(st)>-1)theme=st;
    localStorage.removeItem('portfolio-mode');
  }catch(e){}
  d.setAttribute('data-theme',theme||'cobalt');
  d.style.colorScheme='dark';
}catch(e){}})();
`.trim()
