import { Routes ,Route} from 'react-router-dom';
import './App.css';
import AppBar from './components/Header/AppBar';
import HomePage from './pages/HomePage';
import LoginPage from './components/LoginSection/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import IndexPage from './pages/IndexPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';






function App() {
  return (
    <div className="container-fluid">
      {/* <AppBar /> */}
      <Routes>
        <Route index element={<IndexPage />} />
        {/* <Route element={<AppBar/>}> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage title={"Home"} />} />
        </Route>
      
     
         <Route path="/login" element={<LoginPage title={"Login"} />} /> 
          <Route path="/register" element={<LoginPage title={"Register"} />} /> 
      </Routes>
    </div>
  );
}
{

}
export default App;
