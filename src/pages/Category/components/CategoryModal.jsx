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
  setIsOpen
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', values.title_ru);
    formData.append('lang', 'ru');
    formData.append('image', fileList[0].originFileObj);

    try {
      const response = await Api.post('/categories', formData);

      if (response.data) {
        onFinish2(values.title_en, values.title_uz);
      }
    } catch (error) {
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  const onFinish2 = async (values1, values2) => {
    const formData = new FormData();
    formData.append('title', values1);
    formData.append('lang', 'en');
    formData.append('image', fileList[0].originFileObj);

    try {
      const response = await Api.post('/categories', formData);

      if (response.data) {
        onFinish3(values2);
      }
    } catch (error) {
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  const onFinish3 = async (values) => {
    const formData = new FormData();
    formData.append('title', values);
    formData.append('lang', 'uz');
    formData.append('image', fileList[0].originFileObj);
    try {
      const response = await Api.post('/categories', formData);

      if (response.data) {
        setIsLoading(false);
        message.success('Данные успешно добавлены!');
      }
      setFileList([]);
      setIsOpen(false);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['categoryData'] });
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
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Добавить категорию
      </Button>

      <Modal
        title="Добавить категорию"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
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
            label="Название (Русский)"
            name="title_ru"
            rules={[
              { required: true, message: 'Пожалуйста, введите название!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Название (Английский)"
            name="title_en"
            rules={[
              { required: true, message: 'Пожалуйста, введите название!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Название (Узбекский)"
            name="title_uz"
            rules={[
              { required: true, message: 'Пожалуйста, введите название!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Изображение"
            name="attachment"
            rules={[
              {
                required: true,
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
              <Button type="primary" danger onClick={() => setIsOpen(false)}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


export default CategoryModal;
