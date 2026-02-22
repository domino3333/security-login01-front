import './App.css';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './router/AppRouter'; // AppRouter에서 생성된 router 사용
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const router = AppRouter(); // AppRouter 훅 호출 -> router 객체 가져오기

  return <RouterProvider router={router} />;
}

export default App;