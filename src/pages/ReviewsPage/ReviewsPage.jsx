import { Alert, Pagination } from 'antd';
import ReviewsData from './data/ReviewsData';
import Admin from '../../components/Admin';
import useReviews from '../../hooks/UseReviews';

const ReviewsPage = () => {
  const {
    data,
    error,
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
        <p>Loading...</p>
      </Admin>
    );
  }

  if (error) {
    return (
      <Admin>
        <Alert message="Data not found" type="error" />
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

export default ReviewsPage;
