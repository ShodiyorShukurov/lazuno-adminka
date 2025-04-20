import React, { useState } from 'react';
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

const CategoryModal = ({
  isOpen,
  handleOpenModal,
  handleCancel,
  selectItem,
  isLoading,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isOpen && selectItem) {
      form.setFieldsValue({
        title: selectItem.title || '',
        lang: selectItem.lang || 'ru', // Default to Russian for consistency
      });
    }
  }, [isOpen, selectItem, form]);

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      if (fileList.length >= 1) {
        message.error('Можно загрузить только один файл!');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    onChange: (info) => {
      setFileList(info.fileList);
    },
  };

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('lang', values.lang);
    formData.append(
      'image',
      selectItem?.image_url ? '' : fileList[0].originFileObj
    );

    try {
      if (selectItem.id) {
        const response = await Api.put(
          `/categories/${selectItem.id}`,
          formData
        );

        if (response.data) {
          message.success('Данные успешно обновлены!');
        }
      } else {
        const response = await Api.post('/categories', formData);

        if (response.data) {
          message.success('Данные успешно добавлены!');
        }
      }
      setFileList([]);
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['categoryData'] });
    } catch (error) {
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Добавить категорию
      </Button>

      <Modal
        title="Добавить категорию"
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
            rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Язык"
            name="lang"
            rules={[{ required: true, message: 'Пожалуйста, выберите язык!' }]}
          >
            <Select
              options={[
                { value: 'en', label: 'Английский' },
                { value: 'ru', label: 'Русский' },
                { value: 'uz', label: 'Узбекский' },
              ]}
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

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default CategoryModal;