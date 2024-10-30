
var creative = {};

/**
 * Window onload handler.
 */
function preInit() {
  setupDom();
  if (Enabler.isInitialized()) {
    init();
  } else {
    Enabler.addEventListener(
      studio.events.StudioEvent.INIT,
      init
    );
  }
}

/**
 * Initializes the ad components
 */
function setupDom() {
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.exit = document.getElementById('exit');
  //creative.dom.image0 = document.getElementById( 'contenedor' );
}

/**
 * Ad initialisation.
 */
function init() {

  //addListeners();

  // Polite loading
  if (Enabler.isVisible()) {
    show();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, show);
  }
}

/**
 * Adds appropriate listeners at initialization time
 */
/*
function addListeners() {
  creative.dom.exit.addEventListener('click', exitClickHandler);
}
*/
/**
 *  Shows the ad.
 */
function show() {
  creative.dom.exit.style.display = "block";
  //creative.dom.image0.style.visibility  = 'visible';
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------
/*
function exitClickHandler() {
  Enabler.exit('BackgroundExit');
}
*/
function bgExitHandler(e) {
  Enabler.exitOverride('Cta Exit', '');
}

document.getElementById('exit').addEventListener('click', bgExitHandler, false);

/**
 *  Main onload handler
 */
window.addEventListener('load', preInit);