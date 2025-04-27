import React from 'react';
import Api from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const UseCategory = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleOpenModal = (item) => {
    setSelectItem(item);
    setIsOpen(true);
  };

  const handleCancel = () => {
    setSelectItem({});
    setIsOpen(false);
  };

  const getCategory = async () => {
    try {
      const res = await Api.get(`/categories/list?take=5&page=${currentPage}`);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getPopularCategories = async () => {
    const res = await Api.get(`/categories/filter?lang=`);
    return res.data;
  };

  const queryClient = useQueryClient();

  const openDeleteModal = (id) => {
    setId(id);
  };

  const handleDelete = async () => {
    try {
      const res = await Api.delete('/categories/' + id);
      if (res.data) {
        message.success('Категория успешно удалена!');
        queryClient.invalidateQueries({ queryKey: ['categoryData'] });
      }
    } catch (error) {
      console.log(error);
      message.error('Произошла неизвестная ошибка при удалении категории.');
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['categoryData', currentPage],
    queryFn: getCategory,
  });

  const { data: popularData, isLoading: popularLoading } = useQuery({
    queryKey: ['popularCategoryData'],
    queryFn: getPopularCategories,
  });


  return {
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
    popularData
  };
};

export default UseCategory;
