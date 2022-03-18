// Libraries
import fetch from 'cross-fetch';
import { ElectronBlocker, fullLists } from '@cliqz/adblocker-electron';
import { BrowserWindow } from 'electron';

// Tracking and ads blocker
class AdBlocker {
  env: any;

  constructor(env: any) {
    // Define plugin enviornment within the class
    this.env = env;
  }

  async onReady(win: BrowserWindow) {
    const blocker = await ElectronBlocker.fromLists(fetch, fullLists, {
      enableCompression: true,
    });

    blocker.enableBlockingInSession(win.webContents.session);

    blocker.on('request-blocked', (request) => {
      console.log('blocked', request.tabId, request.url);
    });

    blocker.on('request-redirected', (request) => {
      console.log('redirected', request.tabId, request.url);
    });

    blocker.on('request-whitelisted', (request) => {
      console.log('whitelisted', request.tabId, request.url);
    });

    blocker.on('csp-injected', (request) => {
      console.log('csp', request.url);
    });

    blocker.on('script-injected', (script, url) => {
      console.log('script', script.length, url);
    });

    blocker.on('style-injected', (style, url) => {
      console.log('style', style.length, url);
    });
  }
}

export default AdBlocker;
