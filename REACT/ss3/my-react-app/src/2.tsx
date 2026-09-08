import React from 'react';
import {useForm, type SubmitHandler} from 'react-hook-form'

interface BlogPostInputs {
  content: string;
}

export const BlogPostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogPostInputs>();

  const onSubmit: SubmitHandler<BlogPostInputs> = (data) => {
    alert('Đăng bài thành công:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: '20px 0' }}>
      <h3>2. Soạn Thảo Bài Viết Blog (Uncontrolled RHF)</h3>

      <div>
        <label>Nội dung bài viết:</label>
        <br />
        <textarea
          rows={6}
          cols={40}
          {...register('content', {
            required: 'Nội dung bài viết là bắt buộc',
            minLength: {
              value: 50,
              message: 'Nội dung bài viết quá ngắn (tối thiểu 50 ký tự)',
            },
          })}
        />
        {errors.content && (
          <p style={{ color: 'red' }}>{errors.content.message}</p>
        )}
      </div>

      <button type="submit" style={{ marginTop: 10 }}>Xuất bản bài viết</button>
    </form>
  );
};