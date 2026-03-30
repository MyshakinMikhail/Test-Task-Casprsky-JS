import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';


createRoot(document.getElementById('root')!).render(<App />)
