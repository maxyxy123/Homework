import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface EmploymentFormInputs {
  employmentStatus: 'unemployed' | 'employed';
  currentCompany?: string;
}

const employmentSchema = Yup.object().shape({
  employmentStatus: Yup.string()
    .oneOf(['unemployed', 'employed'])
    .required('Vui lòng chọn trạng thái việc làm'),
  currentCompany: Yup.string().when('employmentStatus', {
    is: 'employed',
    then: (schema) => schema.required('Vui lòng nhập tên công ty hiện tại'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const EmploymentForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmploymentFormInputs>({
    resolver: yupResolver(employmentSchema) as any,
    defaultValues: {
      employmentStatus: 'unemployed',
      currentCompany: '',
    },
  });

  const currentStatus = watch('employmentStatus');

  const onSubmit: SubmitHandler<EmploymentFormInputs> = (data) => {
    alert('Dữ liệu ứng tuyển:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, margin: '20px 0' }}>
      <h3>3. Logic Schema Phụ thuộc (Employment Status)</h3>

      <div>
        <label>Trạng thái việc làm:</label>
        <select {...register('employmentStatus')}>
          <option value="unemployed">Đang tìm việc</option>
          <option value="employed">Đã có việc</option>
        </select>
        {errors.employmentStatus && (
          <p style={{ color: 'red' }}>{errors.employmentStatus.message}</p>
        )}
      </div>

      {currentStatus === 'employed' && (
        <div style={{ marginTop: 10 }}>
          <label>Công ty hiện tại:</label>
          <input type="text" {...register('currentCompany')} />
          {errors.currentCompany && (
            <p style={{ color: 'red' }}>{errors.currentCompany.message}</p>
          )}
        </div>
      )}

      <button type="submit" style={{ marginTop: 10 }}>Lưu hồ sơ</button>
    </form>
  );
};