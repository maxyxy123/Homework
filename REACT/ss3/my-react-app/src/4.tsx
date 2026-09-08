import React from 'react';
import { useFormik } from 'formik';
import { useForm } from 'react-hook-form';

interface PerfFields {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
}

export const FormikPerformanceForm: React.FC = () => {
  console.log('[PERF LOG] Rendered FormikForm (Controlled)');

  const formik = useFormik<PerfFields>({
    initialValues: { field1: '', field2: '', field3: '', field4: '', field5: '' },
    onSubmit: (values) => console.log(values),
  });

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      <h4>Formik Form (Controlled)</h4>
      {([1, 2, 3, 4, 5] as const).map((num) => {
        const fieldName = `field${num}` as keyof PerfFields;
        return (
          <div key={num}>
            <input
              name={fieldName}
              onChange={formik.handleChange}
              value={formik.values[fieldName]}
              placeholder={`Field ${num}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export const RHFPerformanceForm: React.FC = () => {
  console.log('[PERF LOG] Rendered RHFForm (Uncontrolled)');

  const { register } = useForm<PerfFields>();

  return (
    <div style={{ border: '1px solid #ccc', padding: 10 }}>
      <h4>React Hook Form (Uncontrolled)</h4>
      {([1, 2, 3, 4, 5] as const).map((num) => (
        <div key={num}>
          <input {...register(`field${num}` as keyof PerfFields)} placeholder={`Field ${num}`} />
        </div>
      ))}
    </div>
  );
};

export const PerformanceReport: React.FC = () => {
  return (
    <div style={{ maxWidth: 500, margin: '20px 0' }}>
      <h3>4. Báo cáo Hiệu năng (Mở Console Log để xem)</h3>
      <FormikPerformanceForm />
      <RHFPerformanceForm />
    </div>
  );
};