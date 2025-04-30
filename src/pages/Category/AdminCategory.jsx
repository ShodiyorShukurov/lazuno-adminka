import { Alert, Button, Pagination } from 'antd';
import CarouselData from './data/AdminCategory';
import CategoryModal from './components/CategoryModal';
import Admin from '../../components/Admin';
import UseCategory from '../../hooks/UseCategory';
import CategoryModalEdit from './components/CategoryModalEdit';

const AdminCategory = () => {
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
    isOpenEdit,
    setIsOpenEdit,
    setIsOpen,
  } = UseCategory();

  if (isLoading) {
    return (
      <Admin>
        <p>Загрузка...</p>
      </Admin>
    );
  }

  return (
    <Admin>
      <h2>Все категории ({data?.total})</h2>
      <CategoryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectItem={selectItem}
        isLoading={isLoading}
      />

      <CarouselData
        data={data}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        handleOpenModal={handleOpenModal}
      />

      <CategoryModalEdit
        isOpenEdit={isOpenEdit}
        setIsOpenEdit={setIsOpenEdit}
        handleCancel={handleCancel}
        selectItem={selectItem}
      />

      <Pagination
        style={{ marginTop: '10px' }}
        align="end"
        pageSize={5}
        current={currentPage}
        defaultCurrent={1}
        total={data.total}
        onChange={(page) => setCurrentPage(page)}
      />
    </Admin>
  );
};

export default AdminCategory;
