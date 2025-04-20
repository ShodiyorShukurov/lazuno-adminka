import React from 'react';
import Admin from '../../components/Admin';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Api from '../../api';
import { Card, Tag, Image, Rate } from 'antd';

const { Meta } = Card;

const ProductMoreInfo = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => Api.get('/products/admin/' + id),
  });

  if (isPending) return 'Загрузка...';
  if (error) return 'Произошла ошибка: ' + error.message;

  const info = data.data.data;

  const {
    title,
    description,
    views,
    reviews = [],
    reviews_count,
    color,
    averageRating,
    create_post_at,
    image_url,
    category,
  } = info;

  return (
    <Admin>
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={
          <Image.PreviewGroup>
            <div className="flex flex-wrap gap-2 p-2">
              {(Array.isArray(image_url) ? image_url : [image_url]).map(
                (url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={title}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                )
              )}
            </div>
          </Image.PreviewGroup>
        }
      >
        <Meta title={title} description={description} />
        <div className="mt-2 space-y-2">
          {averageRating > 0 && (
            <div className="flex items-center gap-2">
              <Rate disabled defaultValue={averageRating} />
              <span>{averageRating.toFixed(1)} / 5</span>
            </div>
          )}

          <Tag color="blue">👁 {views} Просмотров</Tag>
          <Tag color="green">📝 {reviews.length} Отзывов</Tag>
          <Tag color={color}>🎨 {color}</Tag>
          <div className="text-sm text-gray-500">
            📅 {new Date(create_post_at).toLocaleDateString()}
          </div>

          {category && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-md font-semibold mb-2">Категория:</h4>
              <div className="flex items-center gap-4">
                <Image
                  src={category.image_url}
                  alt={category.title}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                />
                <div>
                  <p className="font-medium text-lg">Название: {category.title}</p>
                  <p className="font-medium text-lg">Язык: {category.lang}</p>
                  <p className="text-sm text-gray-500">
                    📅 {new Date(category.create_post_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {reviews.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <h4 className="text-md font-semibold mb-4">Отзывы:</h4>
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-md bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-semibold text-lg">{review.title}</div>
                    <span className="text-sm text-gray-400">
                      📅 {new Date(review.create_post_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Rate disabled defaultValue={review.stars} />
                  <p className="mt-2 text-gray-700">{review.text}</p>
                  <div className="text-sm text-gray-500 mt-2">
                    👤 {review.name} ({review.email})
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Admin>
  );
};

export default ProductMoreInfo;
