import { Alert, Button } from 'antd';
import AdminProductData from './data/AdminProduct';
import ProductModal from './components/ProductModal';
import Admin from '../../components/Admin';
import { Pagination } from 'antd';
import UseProduct from '../../hooks/UseProduct';

const AdminProduct = () => {
  const {
    data,
    isLoading,
    isOpen,
    handleOpenModal,
    handleCancel,
    openDeleteModal,
    handleDelete,
    selectItem,
    currentPage,
    setCurrentPage,
  } = UseProduct();

  if (isLoading) {
    return (
      <Admin>
        <p>Loading...</p>
      </Admin>
    );
  }

  // if (error) {
  // if (error.status === 404) {
  // return (
  // <Admin>
  //   <CarouselModal
  //     isModalVisible={isModalVisible}
  //     showModal={showModal}
  //     handleCancel={handleCancel}
  //     refreshData={refreshData}
  //   />
  // <h1>Data Not Found</h1>
  //  </Admin>
  //   );
  // } else {
  //   return (
  //     <Admin>
  //       <CarouselModal
  //         isModalVisible={isModalVisible}
  //         showModal={showModal}
  //         handleCancel={handleCancel}
  //         refreshData={refreshData}
  //       />
  //       <Alert
  //         message="An error occurred while loading images"
  //         type="error"
  //       />
  //     </Admin>
  //   );
  // }
  // }

  return (
    <Admin>
      <h2>All Products ({data?.total})</h2>
      <ProductModal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCancel={handleCancel}
        selectItem={selectItem}
      />

      <AdminProductData
        data={data}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        handleOpenModal={handleOpenModal}
        currentPage={currentPage}
    setCurrentPage={setCurrentPage}
      />
    </Admin>
  );
}

export default AdminProduct