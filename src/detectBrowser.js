var browser = function() {
  // Return cached result if avalible, else get result then cache it.
  if (browser.prototype._cachedResult)
      return browser.prototype._cachedResult;

  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;

  // Blink engine detection
  var isBlink = (isChrome) && !!window.CSS;

  return browser.prototype._cachedResult =
      isFirefox ? 'Firefox' :
      isChrome ? 'Chrome' :
      isIE ? 'IE' :
      isEdge ? 'Edge' :
      isBlink ? 'Blink' :
      "Don't know";
};

console.log(browser());

export default browser;