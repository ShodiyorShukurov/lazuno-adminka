import React from 'react';
import Admin from '../../components/Admin';
import UseAdmin from '../../hooks/UseAdmin';
import AdminModal from './components/AdminModal';
import AdminData from './data/AdminData';

const AdminPage = () => {
  const {
    data,
    isLoading,
    isOpen,
    handleOpenModal,
    handleCancel,
    openDeleteModal,
    handleDelete,
    selectItem,
    setCurrentPage,
    currentPage,
  } = UseAdmin();

  if (isLoading) {
    return (
      <Admin>
        <p>Загрузка...</p>
      </Admin>
    );
  }

  return (
    <Admin>
      <AdminModal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCancel={handleCancel}
        selectItem={selectItem}
      />
      <AdminData
        data={data}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        openDeleteModal={openDeleteModal}
        handleDelete={handleDelete}
        handleOpenModal={handleOpenModal}
      />
    </Admin>
  );
};

export default AdminPage;