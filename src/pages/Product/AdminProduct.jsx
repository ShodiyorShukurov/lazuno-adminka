import AdminProductData from './data/AdminProduct';
import ProductModal from './components/ProductModal';
import Admin from '../../components/Admin';
import UseProduct from '../../hooks/UseProduct';
import UseCategory from '../../hooks/UseCategory';
import ProductEditModal from './components/ProductEditModal';

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
    setIsOpen,
    isOpenEdit,
  } = UseProduct();

  const { popularDataRu, popularDataUz, popularDataEn } = UseCategory();

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
        setIsOpen={setIsOpen}
        popularDataRu={popularDataRu}
        popularDataUz={popularDataUz}
        popularDataEn={popularDataEn}
      />

      <AdminProductData
        data={data}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        handleOpenModal={handleOpenModal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ProductEditModal
        isOpenEdit={isOpenEdit}
        handleOpenModal={handleOpenModal}
        handleCancel={handleCancel}
        selectItem={selectItem}
        popularDataRu={popularDataRu}
        popularDataUz={popularDataUz}
        popularDataEn={popularDataEn}
      />
    </Admin>
  );
};

export default AdminProduct;
