
import { Outlet } from 'react-router-dom';
import { MainLayout } from '@/widgets/Layout';
import './App.css'

function App() {

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );

}

export default App
