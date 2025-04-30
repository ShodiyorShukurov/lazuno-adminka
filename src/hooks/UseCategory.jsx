import React from 'react';
import Api from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const UseCategory = () => {
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
      const res = await Api.get(`/categories/list?take=5&page=${currentPage}`);

      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getPopularCategoriesRu = async () => {
    const res = await Api.get(`/categories/filter?lang=ru`);
    return res.data;
  };

  const getPopularCategoriesEn = async () => {
    const res = await Api.get(`/categories/filter?lang=en`);
    return res.data;
  };

  const getPopularCategoriesUz = async () => {
    const res = await Api.get(`/categories/filter?lang=uz`);
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

  const { data: popularDataRu, isLoading: popularLoadingRu } = useQuery({
    queryKey: ['popularCategoryDataRu'],
    queryFn: getPopularCategoriesRu,
  });

  const { data: popularDataEn, isLoading: popularLoadingEn } = useQuery({
    queryKey: ['popularCategoryDataEn'],
    queryFn: getPopularCategoriesEn,
  });

  const { data: popularDataUz, isLoading: popularLoadingUz } = useQuery({
    queryKey: ['popularCategoryDataUz'],
    queryFn: getPopularCategoriesUz,
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
    popularDataRu,
    popularDataUz,
    popularDataEn,
    isOpenEdit,
    setIsOpenEdit,
    setIsOpen,
  };
};

export default UseCategory;
