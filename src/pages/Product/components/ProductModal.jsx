import React, { lazy, useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Upload,
  Space,
  message,
  Input,
  Select,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';
import TextArea from 'antd/es/input/TextArea';

const ProductModal = ({
  isOpen,
  handleOpenModal,
  handleCancel,
  selectItem,
  popularData,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen && selectItem) {
      form.setFieldsValue({
        title: selectItem.title || '',
        description: selectItem.description || '',
        color: selectItem.color || '',
        category_id: selectItem.category_id || popularData[0]?.id,
        layout: selectItem?.layout || '',
      });
    }
  }, [isOpen, selectItem, form, popularData]);

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    fileList,
    multiple: true,
    onChange: (info) => {
      setFileList(info.fileList);
    },
  };

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    setIsLoading(true);
    const imageArr = fileList?.map((i) => i.originFileObj);
    const formData = new FormData();
    formData.append('color', values.color);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('layout', values.layout);
    formData.append('category_id', Number(values.category_id));
    imageArr.forEach((file) => {
      formData.append('files', file);
    });

    try {
      if (selectItem.id) {
        const response = await Api.put(`/products/${selectItem.id}`, formData);

        if (response.data) {
          setIsLoading(false);
          message.success('Данные успешно обновлены!');
        }
      } else {
        const response = await Api.post('/products', formData);

        if (response.data) {
          setIsLoading(false);
          message.success('Данные успешно добавлены!');
        }
      }
      setFileList([]);
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['productData'] });
    } catch (error) {
      setIsLoading(false);
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Добавить продукт
      </Button>

      <Modal
        title="Добавить продукт"
        open={isOpen}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            label="Название"
            name="title"
            rules={[
              {
                required: true,
                message: 'П RUSSIAN: Пожалуйста, введите название!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Описание"
            name="description"
            rules={[
              { required: true, message: 'Пожалуйста, введите описание!' },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Планировка"
            name="layout"
            rules={[
              { required: true, message: 'Пожалуйста, введите планировка!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Цвет"
            name="color"
            rules={[{ required: true, message: 'Пожалуйста, введите цвет!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Категория"
            name="category_id"
            rules={[
              { required: true, message: 'Пожалуйста, выберите категорию!' },
            ]}
          >
            <Select
              options={popularData?.map((item) => ({
                value: item?.id,
                label: item?.title,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Изображение"
            name="attachment"
            rules={[
              {
                required: selectItem?.image_url ? false : true,
                message: 'Пожалуйста, загрузите изображение!',
              },
            ]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Нажмите для загрузки</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space size="large">
              <Button htmlType="submit" type="primary" disabled={isLoading}>
                Отправить
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ProductModal;
