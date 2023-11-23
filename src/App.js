import './App.css';
import './css/Bootstrap.css';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './store/index';

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Employees from './components/Employees';
import Layout from './components/Layout';
import AddEmployee from './components/AddEmployee';
import EmployeesLayout from './components/EmployeesLayout';
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "employees",
        element: <EmployeesLayout />,
        children: [
          {
            path:"",
            element: <Employees />
          },
          {
          path:"add",
          element: <AddEmployee />
          },
          {
            path:"edit/:id",
            element: <AddEmployee />
          }
        ]
      }
    ]
  }
]);


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
