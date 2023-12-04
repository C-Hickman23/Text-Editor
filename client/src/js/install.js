const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
    window.defferedPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;
    if (!promptEvent){
        return;
    }
    promptEvent.prompt();
    window.defferedPrompt - null;
    butInstall.classList.toggle('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully!');
  window.defferedPrompt = null;
});