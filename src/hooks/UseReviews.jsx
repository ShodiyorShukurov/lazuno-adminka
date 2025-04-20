import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Api from '../api';
import { AxiosError } from 'axios';

const useReviews = () => {
  const [id, setId] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchReviews = async () => {
    try {
      const res = await Api.get(`/reviews/list?take=10&page=${currentPage}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const queryClient = useQueryClient();

  const openDeleteModal = (id) => {
    setId(id);
  };

  const handleDelete = async () => {
    try {
      const res = await Api.delete('/reviews/' + id);
      if (res.data) {
        message.success('Отзыв успешно удален!');
        queryClient.invalidateQueries({ queryKey: ['reviews'] });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Ошибка Axios:', error.message);
        message.error(
          error.response?.data?.message || 'Произошла ошибка при удалении отзыва.'
        );
      }
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['reviews', currentPage],
    queryFn: fetchReviews,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return {
    data,
    isLoading,
    error,
    openDeleteModal,
    handleDelete,
    setCurrentPage,
    currentPage,
  };
};

export default useReviews;
