import './App.css';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter'; // AppRouter에서 생성된 router 사용
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <AppRouter />;
}

export default App;