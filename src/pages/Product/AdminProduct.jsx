import AdminProductData from './data/AdminProduct';
import ProductModal from './components/ProductModal';
import Admin from '../../components/Admin';
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
        <p>Загрузка...</p>
      </Admin>
    );
  }

  return (
    <Admin>
      <h2>Все продукты ({data?.total})</h2>
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
};

export default AdminProduct;