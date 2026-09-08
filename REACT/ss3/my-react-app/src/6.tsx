import React, { useEffect } from 'react';
import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface ScoreItem {
  score: number | string;
}

interface LMSFormInputs {
  subjectCode: string;
  studentCount: number | string;
  scores: ScoreItem[];
}

const lmsSchema = Yup.object().shape({
  subjectCode: Yup.string()
    .required('Mã môn học là bắt buộc')
    .matches(/^[A-Z0-9]+$/, 'Mã môn học phải viết HOA không dấu và không chứa ký tự đặc biệt'),
  studentCount: Yup.number()
    .typeError('Sĩ số phải là số hợp lệ')
    .required('Vui lòng nhập sĩ số')
    .min(1, 'Sĩ số không hợp lệ (Phải lớn hơn 0)'),
  scores: Yup.array().of(
    Yup.object().shape({
      score: Yup.number()
        .typeError('Điểm phải là số')
        .required('Nhập điểm')
        .min(0.0, 'Điểm tối thiểu là 0.0')
        .max(10.0, 'Điểm tối đa là 10.0'),
    })
  ),
});

export const LMSGradeKiosk: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LMSFormInputs>({
    resolver: yupResolver(lmsSchema) as any,
    defaultValues: {
      subjectCode: '',
      studentCount: '',
      scores: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: 'scores',
  });

  const studentCount = watch('studentCount');

  useEffect(() => {
    const count = parseInt(String(studentCount), 10);
    if (!isNaN(count) && count > 0) {
      const newScores: ScoreItem[] = Array.from({ length: count }, () => ({ score: '' }));
      replace(newScores);
    } else {
      replace([]);
    }
  }, [studentCount, replace]);

  const onSubmit: SubmitHandler<LMSFormInputs> = (data) => {
    alert('Xác nhận bảng điểm thành công:\n' + JSON.stringify(data, null, 2));
  };

  const handleSubjectCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('subjectCode', e.target.value.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 500, margin: '20px 0' }}>
      <h3>6. Mini LMS Module: Kiosk Quản Lý Chấm Điểm</h3>

      <div>
        <label>Mã môn học (IN HOA):</label>
        <input
          type="text"
          {...register('subjectCode')}
          onChange={handleSubjectCodeChange}
        />
        {errors.subjectCode && (
          <p style={{ color: 'red' }}>{errors.subjectCode.message}</p>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Sĩ số sinh viên dự thi:</label>
        <input type="text" {...register('studentCount')} />
        {errors.studentCount && (
          <p style={{ color: 'red' }}>{errors.studentCount.message}</p>
        )}
      </div>

      <hr />

      {fields.length > 0 && (
        <div>
          <h4>Danh sách nhập điểm ({fields.length} sinh viên):</h4>
          {fields.map((field, index) => (
            <div key={field.id} style={{ marginBottom: 8 }}>
              <label>Sinh viên #{index + 1}: </label>
              <input
                type="text"
                placeholder="0.0 - 10.0"
                {...register(`scores.${index}.score` as const)}
              />
              {errors.scores?.[index]?.score && (
                <span style={{ color: 'red', marginLeft: 10 }}>
                  {errors.scores[index]?.score?.message}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <button type="submit" style={{ marginTop: 15 }} disabled={fields.length === 0}>
        Lưu bảng điểm
      </button>
    </form>
  );
};