import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login/Login/Login';
import Header from './Components/Shared/Header/Header';
import Signup from './Components/Login/Sign Up/Signup';
import AddProducts from './Components/Pages/Add Products/AddProducts';
import RequireAdmin from './Components/Shared/RequireAdmin/RequireAdmin';
import ManageProducts from './Components/Pages/Manage Products/ManageProducts';
import ManageIndividualProduct from './Components/Pages/Manage Individual Product/ManageIndividualProduct';
import Home from './Components/Pages/Home/Home';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import RequireAuth from './Components/Shared/RequiredAuth/RequiredAuth';
import AllProducts from './Components/Pages/All Products/AllProducts';
import Purchase from './Components/Pages/Purchase/Purchase';
import MyOrders from './Components/Pages/MyOrders/MyOrders';
import ManageOrders from './Components/Pages/ManageOrders/ManageOrders';
import Manage from './Components/Pages/Manage/Manage';
import UpdateProduct from './Components/Pages/Update Product/UpdateProduct';
import AddAdmin from './Components/Pages/AddAdmin/AddAdmin';
import AlreadyOrderedPayment from './Components/Pages/Already Ordered Payment/AlreadyOrderedPayment';
import AddReviews from './Components/Pages/Add Reviews/AddReviews';
import ManageReviews from './Components/Pages/Manage Reviews/ManageReviews';
import MyProfile from './Components/Pages/My Profile/MyProfile';
import MyReviews from './Components/Pages/My Reviews/MyReviews';
import Footer from './Components/Shared/Footer/Footer';
import MyPortfolio from './Components/Pages/My Portfolio/MyPortfolio';
import ErrorRoute from './Components/Pages/Error-Route/ErrorRoute';
import About from './Components/Pages/About/About';
import Blogs from './Components/Pages/Blogs/Blogs';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/allProducts' element={<RequireAuth>
          <AllProducts></AllProducts>
        </RequireAuth>}></Route>

        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard></Dashboard>
        </RequireAuth>}>

          <Route path='myOrders' element={
            <MyOrders></MyOrders>
          }></Route>

          <Route path='addReviews' element={
            <AddReviews></AddReviews>
          }></Route>

          <Route path='myReviews' element={
            <MyReviews></MyReviews>
          }></Route>

          <Route path='myProfile' element={
            <MyProfile></MyProfile>
          }></Route>

          <Route path='manage' element={<RequireAdmin>
            <Manage></Manage>
          </RequireAdmin>}></Route>
        </Route>


        <Route path='/purchase/:id' element={<RequireAuth>
          <Purchase></Purchase>
        </RequireAuth>}></Route>
        <Route path='/ordered/:id' element={<RequireAuth>
          <AlreadyOrderedPayment></AlreadyOrderedPayment>
        </RequireAuth>}></Route>
        <Route path='/updateProduct/:id' element={<RequireAdmin>
          <UpdateProduct></UpdateProduct>
        </RequireAdmin>}></Route>
        <Route path='/addProduct' element={<RequireAdmin>
          <AddProducts></AddProducts>
        </RequireAdmin>}></Route>
        <Route path='/manageProducts' element={<RequireAdmin>
          <ManageProducts></ManageProducts>
        </RequireAdmin>}></Route>
        <Route path='/manageOrders' element={<RequireAdmin>
          <ManageOrders></ManageOrders>
        </RequireAdmin>}></Route>
        <Route path='/addAdmin' element={<RequireAdmin>
          <AddAdmin></AddAdmin>
        </RequireAdmin>}></Route>
        <Route path='/manageReviews' element={<RequireAdmin>
          <ManageReviews></ManageReviews>
        </RequireAdmin>}></Route>
        <Route path='/manageIndividualProduct' element={<RequireAdmin>
          <ManageIndividualProduct></ManageIndividualProduct>
        </RequireAdmin>}></Route>
        <Route path='/myPortfolio' element={<MyPortfolio></MyPortfolio>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/blogs' element={<Blogs></Blogs>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='*' element={<ErrorRoute></ErrorRoute>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
