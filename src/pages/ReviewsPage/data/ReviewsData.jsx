import { Table, Button, Checkbox, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const ReviewsData = ({ openDeleteModal, handleDelete, data }) => {
  console.log(data);
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
      align: 'center',
    },

    {
      title: 'Stars',
      key: 'stars',
      dataIndex: 'stars',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
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
            Delete
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
        pagination={false}
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
