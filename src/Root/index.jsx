import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login.jsx';
import PrivateRoute from '../utils/PrivateRoute';
import AdminCategory from '../pages/Category/AdminCategory.jsx';
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage.jsx';
import AdminPage from '../pages/AdminPage/AdminPage.jsx';
import AdminProduct from '../pages/Product/AdminProduct.jsx';
import ProductMoreInfo from '../pages/ProductMoreInfo/ProductMoreInfo.jsx';

const Root = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/category" element={<AdminCategory />} />
          <Route path="/product" element={<AdminProduct />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/product/:id" element={<ProductMoreInfo />} />
        </Route>
      </Routes>
    </>
  );
};

export default Root;
