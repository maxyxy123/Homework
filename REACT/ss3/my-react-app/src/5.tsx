import React from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface ExpenseItem {
  name: string;
  price: number | string;
}

interface ExpenseFormInputs {
  items: ExpenseItem[];
}

const expenseSchema = Yup.object().shape({
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Tên món đồ không được để trống'),
        price: Yup.number()
          .typeError('Giá trị phải là số')
          .positive('Giá tiền phải lớn hơn 0')
          .required('Nhập giá tiền'),
      })
    )
    .min(1, 'Danh sách phải có ít nhất 1 món đồ')
    .required(),
});

export const ExpensePlannerForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormInputs>({
    resolver: yupResolver(expenseSchema) as any,
    defaultValues: {
      items: [{ name: '', price: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit: SubmitHandler<ExpenseFormInputs> = (data) => {
    alert('Kế hoạch chi tiêu:\n' + JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 500, margin: '20px 0' }}>
      <h3>5. Lập Kế Hoạch Chi Tiêu (Dynamic Array Fields)</h3>

      {fields.map((field, index) => (
        <div key={field.id} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
          <div>
            <input
              placeholder="Tên món đồ"
              {...register(`items.${index}.name` as const)}
            />
            {errors.items?.[index]?.name && (
              <p style={{ color: 'red', margin: 0 }}>{errors.items[index]?.name?.message}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Giá tiền"
              type="text"
              {...register(`items.${index}.price` as const)}
            />
            {errors.items?.[index]?.price && (
              <p style={{ color: 'red', margin: 0 }}>{errors.items[index]?.price?.message}</p>
            )}
          </div>

          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)}>Xóa</button>
          )}
        </div>
      ))}

      {errors.items?.root && (
        <p style={{ color: 'red' }}>{errors.items.root.message}</p>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
        <button type="button" onClick={() => append({ name: '', price: '' })}>
          + Thêm món đồ
        </button>
        <button type="submit">Lưu kế hoạch</button>
      </div>
    </form>
  );
};