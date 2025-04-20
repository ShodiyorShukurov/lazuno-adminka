import { Table, Button, Checkbox, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const ReviewsData = ({ openDeleteModal, handleDelete, data, setCurrentPage, currentPage }) => {

  const reviewData =
    data?.data?.length > 0
      ? data.data.map((review) => ({
          id: review.id,
          name: review.name,
          email: review.email,
          text: review.text,
          title: review.title,
          stars: review.stars,
        }))
      : [];

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Электронная почта',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Титул',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Текст',
      dataIndex: 'text',
      key: 'text',
      align: 'center',
    },

    {
      title: 'Звезды',
      key: 'stars',
      dataIndex: 'stars',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Удалить задачу"
          description="Вы уверены, что хотите удалить эту задачу?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openDeleteModal(record.id)}
          >
            Удалить
          </Button>
        </Popconfirm>
      ),
      align: 'center',
    },
  ];

  return (
    <div className="p-1">
      <Table
        columns={columns}
        dataSource={reviewData}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: data?.total,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

ReviewsData.propTypes = {
  openDeleteModal: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ReviewsData;
