// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});

async function register_worker() {
  if ('serviceWorker' in navigator) {
      try {
          var registered = await navigator.serviceWorker.register('/2048/sw.js', { scope: '/2048' });
          console.log('ServiceWorker registration succeeded. Scope is' + registered.scope);
      }
      catch (error) {
          console.log('ServiceWorker registration failed with' + error);
      }
  }
  else
  {
      console.log("ServiceWorker not avaiable");
  }    
}

register_worker();