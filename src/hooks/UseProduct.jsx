import React from 'react';
import Api from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const UseProduct = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleOpenModal = (item) => {
    setSelectItem(item);
    setIsOpenEdit(true);
  };

  const handleCancel = () => {
    setSelectItem({});
    setIsOpenEdit(false);
  };

  const getCategory = async () => {
    try {
      const res = await Api.get(`/products/list?take=10&page=${currentPage}`);

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
      const res = await Api.delete('/products/' + id);
      if (res.data) {
        message.success('Продукт успешно удален!');
        queryClient.invalidateQueries({ queryKey: ['productData'] });
      }
    } catch (error) {
      console.log(error);
      message.error('Произошла неизвестная ошибка при удалении продукта.');
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['productData', currentPage],
    queryFn: getCategory,
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
    setIsOpen,
    isOpenEdit
  };
};

export default UseProduct;
