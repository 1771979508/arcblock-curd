import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
