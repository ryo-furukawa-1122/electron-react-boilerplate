import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;  // This is the original on Electron React Boilerplate
// const container = document.getElementById('root')!;  // According to the issue forum (Cannot read properties of undefined (reading 'ipcRenderer'))
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
