import { Pagination } from 'antd';
import ReviewsData from './data/ReviewsData';
import Admin from '../../components/Admin';
import useReviews from '../../hooks/UseReviews';

const ReviewsPage = () => {
  const {
    data,
    isLoading,
    openDeleteModal,
    handleDelete,
    handleEdit,
    setCurrentPage,
    currentPage,
  } = useReviews();

  if (isLoading) {
    return (
      <Admin>
        <p>Загрузка...</p>
      </Admin>
    );
  }

  return (
    <Admin>
      <ReviewsData
        openDeleteModal={openDeleteModal}
        handleEdit={handleEdit}
        data={data}
        handleDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Admin>
  );
};

export default ReviewsPage;