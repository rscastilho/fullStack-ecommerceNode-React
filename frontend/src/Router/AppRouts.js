import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import About from '../pages/About/About';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Register from '../pages/Register/Register';
import GetAllUsers from '../pages/Users/GetAllUsers/GetAllUsers';
import UserDetails from '../pages/Users/UserDetails/UserDetails';
import GetAllSuppliers from './../pages/Suppliers/GetAllSuppliers/GetAllSuppliers';
import GetAllProducts from './../pages/Products/GetAllProducts/GetAllProducts';
import GetAllCategories from './../pages/Categories/GetAllCategories/GetAllCategories';
import Dashboard from '../pages/Dashboard/Dashboard';
import { AuthContext } from '../context/AuthContext';
import DetailsProducts from './../pages/Products/DetailsProducts/DetailsProducts';
import AdmProducts from './../pages/Products/AdmProducts/AdmProducts';
import Cart from './../pages/Cart/Cart';
import PurchaseOrderByUserId from '../pages/PurchaseOrders/PurchaseOrdersByUserId/PurchaseOrderByUserId';
import PurchaseOrderDetail from '../pages/PurchaseOrders/PurchaseOrderDetail/PurchaseOrderDetail';
import ProdutosPorCategoria from './../pages/Dashboard/ProdutosPorCategoria/ProdutosPorCategoria';
import ContarUsuarios from '../pages/Dashboard/ContarUsuarios/ContarUsuarios';
import PedidosPorUsuario from './../pages/Dashboard/PedidosPorUsuario/PedidosPorUsuario';
import ValorPedidosPorUsuario from '../pages/Dashboard/ValorPedidosPorUsuario/ValorCompradoPorUsuario';

const AppRouts = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<GetAllProducts />} />
        <Route path="/about" element={<About />} />

        <Route path="/user/details/:id" element={authenticated ? <UserDetails /> : <Navigate to="/login" />} />
        <Route path="/users/allusers" element={authenticated ? <GetAllUsers /> : <Navigate to="/login" />} />

        <Route path="/products/allproducts" element={<GetAllProducts />} />
        <Route path="/products/admproducts" element={authenticated ? <AdmProducts /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={<DetailsProducts />} />

        <Route path="/purchaseorders/:userId" element={<PurchaseOrderByUserId />} />
        <Route path="/purchaseorders/detail/:id" element={<PurchaseOrderDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/suppliers/allsuppliers" element={authenticated ? <GetAllSuppliers /> : <Navigate to="/login" />} />
        
        <Route path="/categories/allcategories" element={authenticated ? <GetAllCategories /> : <Navigate to="/login" />} />

        <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/produtosporcategoria" element={authenticated ? <ProdutosPorCategoria /> : <Navigate to="/login" />} />
        <Route path="/dashboard/contarusuarios" element={authenticated ? <ContarUsuarios /> : <Navigate to="/login" />} />
        <Route path="/dashboard/pedidosporusuario" element={authenticated ? <PedidosPorUsuario /> : <Navigate to="/login" />} />
        <Route path="/dashboard/valorcompradoporusuario" element={authenticated ? <ValorPedidosPorUsuario /> : <Navigate to="/login" />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRouts;
