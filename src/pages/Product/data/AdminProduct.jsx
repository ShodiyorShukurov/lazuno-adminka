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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Description',
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
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      align: 'center',
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      align: 'center',
    },
    {
      title: 'Image_url',
      dataIndex: 'image_url',
      key: 'image_url',
      align: 'center',
      render: (image_url) =>
        image_url.length > 0 ? (
          <Image width={100} src={image_url[0]} />
        ) : (
          'Image not found'
        ),
    },
    {
      title: 'Action',
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
            More Info
          </Button>
          <Button
            icon={<EditOutlined />}
            color="primary"
            variant="solid"
            onClick={() => handleOpenModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="solid"
              onClick={() => openDeleteModal(record.id)}
            >
              Delete
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
