import { Button, Popconfirm, Table, Image } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AdminProduct = ({
  data,
  openDeleteModal,
  handleDelete,
  handleOpenModal,
  currentPage,
  setCurrentPage,
}) => {
  const dataSource = data?.data || [];
  const navigate = useNavigate();

  const columns = [
    {
      title: '№',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      render: (description) => (
        <span>
          {description?.length > 10 ? description?.slice(0, 10) : description}
        </span>
      ),
    },
    {
      title: 'Цвет',
      dataIndex: 'color',
      key: 'color',
      align: 'center',
    },
    {
      title: 'Просмотры',
      dataIndex: 'views',
      key: 'views',
      align: 'center',
    },
    {
      title: 'Layout',
      dataIndex: 'layout',
      key: 'layout',
      align: 'center',
      render: (layout) => (
        <span>{layout?.length > 10 ? layout?.slice(0, 10) : layout}</span>
      ),
    },
    {
      title: 'Изображение',
      dataIndex: 'image_url',
      key: 'image_url',
      align: 'center',
      render: (image_url) =>
        image_url.length > 0 ? (
          <Image width={100} height={100} src={image_url[0]} />
        ) : (
          'Изображение не найдено'
        ),
    },
    {
      title: 'Действия',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-4">
          <Button
            icon={<MoreOutlined />}
            color="pink"
            variant="link"
            onClick={() => navigate('/product/' + record.id)}
          >
            Подробнее
          </Button>
          <Button
            icon={<EditOutlined />}
            color="primary"
            variant="solid"
            onClick={() => handleOpenModal(record)}
          >
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить продукт"
            description="Вы уверены, что хотите удалить этот продукт?"
            onConfirm={handleDelete}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="solid"
              onClick={() => openDeleteModal(record.id)}
            >
              Удалить
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      className="pt-[20px]"
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: 10,
        total: data?.total,
        onChange: (page) => setCurrentPage(page),
      }}
    />
  );
};

export default AdminProduct;
