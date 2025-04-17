import { Alert, Button } from 'antd';
import CarouselData from './data/AdminCategory';
import CategoryModal from './components/CategoryModal';
import Admin from '../../components/Admin';
import UseCategory from '../../hooks/UseCategory';
import { Pagination } from 'antd';

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
      <h2>All Categories ({data?.total})</h2>
      <CategoryModal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCancel={handleCancel}
        selectItem={selectItem}
      />

      <CarouselData
        data={data}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        handleOpenModal={handleOpenModal}
      />

      <Pagination
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
