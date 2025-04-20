import { Alert, Button, Pagination } from 'antd';
import CarouselData from './data/AdminCategory';
import CategoryModal from './components/CategoryModal';
import Admin from '../../components/Admin';
import UseCategory from '../../hooks/UseCategory';

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
        handleOpenModal={handleOpenModal}
        handleCancel={handleCancel}
        selectItem={selectItem}
        isLoading={isLoading}
      />

      <CarouselData
        data={data}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        handleOpenModal={handleOpenModal}
      />

      <Pagination
      style={{marginTop: "10px"}}
        align="end"
        pageSize={10}
        current={currentPage}
        defaultCurrent={1}
        total={data.total}
        onChange={(page) => setCurrentPage(page)}
      />
    </Admin>
  );
};

export default AdminCategory;