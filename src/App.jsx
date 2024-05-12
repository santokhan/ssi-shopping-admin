import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notify = () => toast('Wow so easy!');

  return (
    <>
      <Outlet />
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </>
  );
}

export default App;
