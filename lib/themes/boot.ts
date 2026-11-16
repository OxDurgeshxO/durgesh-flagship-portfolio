/**
 * Anti-FOUC boot script.
 *
 * Applies the stored or URL-selected theme onto <html> before first paint.
 *
 * It MUST be inlined, synchronous and parser-blocking in <head>.
 *
 * Resolution order:
 *   1. URL override (?theme=…) — preview only, never persisted
 *   2. stored choice (validated against the registry)
 *   3. DEFAULT_THEME (neural-signal)
 */
export const THEME_BOOT_SCRIPT = `
(function(){try{
  var d=document.documentElement;
  var T=['neural-signal','quantum-indigo','solar-forge','obsidian-emerald','cyber-violet','terminal-lime','arctic-steel','carbon-rose','deep-ocean','monolith'];
  var old=['cobalt','aurora','graphite','ember','sage','noir','dark','light'];
  var theme=null;
  try{
    var q=new URLSearchParams(window.location.search);
    var qt=q.get('theme');
    if(qt&&T.indexOf(qt)>-1)theme=qt;
  }catch(e){}
  try{
    var st=localStorage.getItem('portfolio-theme');
    if(st&&old.indexOf(st)>-1){
      localStorage.removeItem('portfolio-theme');
      st=null;
    }
    if(!theme&&st&&T.indexOf(st)>-1)theme=st;
    localStorage.removeItem('portfolio-mode');
  }catch(e){}
  d.setAttribute('data-theme',theme||'neural-signal');
  d.style.colorScheme='dark';
}catch(e){}})();
`.trim()
