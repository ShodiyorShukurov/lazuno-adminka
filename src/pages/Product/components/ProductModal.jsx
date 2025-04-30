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
import TextArea from 'antd/es/input/TextArea';

const ProductModal = ({
  isOpen,
  setIsOpen,
  popularDataRu,
  popularDataUz,
  popularDataEn,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

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
    formData.append('color', values.color_ru);
    formData.append('title', values.title_ru);
    formData.append('description', values.description_ru);
    formData.append('layout', values.layout_ru);
    formData.append('category_id', Number(values.category_id_ru));
    imageArr.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await Api.post('/products', formData);

      if (response.data) {
        onFinish2(values);
      }
    } catch (error) {
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  const onFinish2 = async (values) => {
    const imageArr = fileList?.map((i) => i.originFileObj);
    const formData = new FormData();
    formData.append('color', values.color_en);
    formData.append('title', values.title_en);
    formData.append('description', values.description_en);
    formData.append('layout', values.layout_en);
    formData.append('category_id', Number(values.category_id_en));
    imageArr.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await Api.post('/products', formData);

      if (response.data) {
        onFinish3(values);
      }
    } catch (error) {
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  const onFinish3 = async (values) => {
    const imageArr = fileList?.map((i) => i.originFileObj);
    const formData = new FormData();
    formData.append('color', values.color_uz);
    formData.append('title', values.title_uz);
    formData.append('description', values.description_uz);
    formData.append('layout', values.layout_uz);
    formData.append('category_id', Number(values.category_id_uz));
    imageArr.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await Api.post('/products', formData);

      if (response.data) {
        setIsLoading(false);
        message.success('Данные успешно добавлены!');
      }
      setFileList([]);
      setIsOpen(false);
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
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Добавить продукт
      </Button>

      <Modal
        title="Добавить продукт"
        open={isOpen}
        onCancel={()=>setIsOpen(false)}
        style={{ top: 20 }}
        footer={false}
        width={1000}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="on"
          initialValues={{
            category_id_en: popularDataEn?.[0]?.id,
            category_id_ru: popularDataRu?.[0]?.id,
            category_id_uz: popularDataUz?.[0]?.id,
          }}
        >
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Form.Item
                label="Название (Русский)"
                name="title_ru"
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
                label="Описание (Русский)"
                name="description_ru"
                rules={[
                  { required: true, message: 'Пожалуйста, введите описание!' },
                ]}
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label="Планировка (Русский)"
                name="layout_ru"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите планировка!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Цвет (Русский)"
                name="color_ru"
                rules={[
                  { required: true, message: 'Пожалуйста, введите цвет!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Категория (Русский)"
                name="category_id_ru"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, выберите категорию! ',
                  },
                ]}
              >
                <Select
                  options={popularDataRu?.map((item) => ({
                    value: item?.id,
                    label: item?.title,
                  }))}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Название"
                name="title_en"
                rules={[
                  {
                    required: true,
                    message:
                      'П RUSSIAN: Пожалуйста, введите название! (Английский)',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Описание (Английский)"
                name="description_en"
                rules={[
                  { required: true, message: 'Пожалуйста, введите описание!' },
                ]}
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label="Планировка (Английский)"
                name="layout_en"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите планировка!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Цвет (Английский)"
                name="color_en"
                rules={[
                  { required: true, message: 'Пожалуйста, введите цвет!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Категория (Английский)"
                name="category_id_en"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, выберите категорию!',
                  },
                ]}
              >
                <Select
                  options={popularDataEn?.map((item) => ({
                    value: item?.id,
                    label: item?.title,
                  }))}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Название (Узбекский)"
                name="title_uz"
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
                label="Описание (Узбекский)"
                name="description_uz"
                rules={[
                  { required: true, message: 'Пожалуйста, введите описание!' },
                ]}
              >
                <TextArea />
              </Form.Item>

              <Form.Item
                label="Планировка (Узбекский)"
                name="layout_uz"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, введите планировка!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Цвет (Узбекский)"
                name="color_uz"
                rules={[
                  { required: true, message: 'Пожалуйста, введите цвет!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Категория (Узбекский)"
                name="category_id_uz"
                rules={[
                  {
                    required: true,
                    message: 'Пожалуйста, выберите категорию!',
                  },
                ]}
              >
                <Select
                  options={popularDataUz?.map((item) => ({
                    value: item?.id,
                    label: item?.title,
                  }))}
                />
              </Form.Item>
            </div>
            <div>
              {' '}
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
                  <Button icon={<UploadOutlined />}>
                    Нажмите для загрузки
                  </Button>
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <Space size="large">
              <Button htmlType="submit" type="primary" disabled={isLoading}>
                Отправить
              </Button>
              <Button type="primary" danger onClick={()=>setIsOpen(false)}>
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};


export default ProductModal;
