import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CreditCardFormValues {
  fullName: string;
  identityCard: string;
  monthlyIncome: string;
}

const creditCardSchema = Yup.object().shape({
  fullName: Yup.string().required('Họ tên là bắt buộc').matches(/^[^0-9]*$/, 'Numbers are not allowed') ,
  identityCard: Yup.string()
    .matches(/^\d{12}$/, 'CCCD phải là chuỗi đúng 12 chữ số')
    .required('CCCD là bắt buộc'),
  monthlyIncome: Yup.number()
    .typeError('Thu nhập phải là định dạng số')
    .moreThan(5000000, 'Thu nhập phải lớn hơn 5.000.000 VNĐ')
    .required('Thu nhập là bắt buộc'),
});

export const CreditCardForm: React.FC = () => {
  const formik = useFormik<CreditCardFormValues>({
    initialValues: {
      fullName: '',
      identityCard: '',
      monthlyIncome: '',
    },
    validationSchema: creditCardSchema,
    onSubmit: (values) => {
      alert('Đăng ký mở thẻ thành công:\n' + JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ maxWidth: 400, margin: '20px 0' }}>
      <h3>1. Form Mở Thẻ Tín Dụng (Formik & Yup)</h3>
      
      <div>
        <label>Họ tên:</label>
        <input
          type="text"
          name="fullName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <p style={{ color: 'red' }}>{formik.errors.fullName}</p>
        )}
      </div>

      <div>
        <label>Số CCCD:</label>
        <input
          type="text"
          name="identityCard"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.identityCard}
        />
        {formik.touched.identityCard && formik.errors.identityCard && (
          <p style={{ color: 'red' }}>{formik.errors.identityCard}</p>
        )}
      </div>

      <div>
        <label>Thu nhập hàng tháng (VNĐ):</label>
        <input
          type="text"
          name="monthlyIncome"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.monthlyIncome}
        />
        {formik.touched.monthlyIncome && formik.errors.monthlyIncome && (
          <p style={{ color: 'red' }}>{formik.errors.monthlyIncome}</p>
        )}
      </div>

      <button type="submit" style={{ marginTop: 10 }}>Gửi yêu cầu</button>
    </form>
  );
};