import React from 'react';
import { CreditCardForm } from './1';
import { BlogPostForm } from './2';
import { EmploymentForm } from './3';
import { PerformanceReport } from './4';
import { ExpensePlannerForm } from './5';
import { LMSGradeKiosk } from './6';

const App: React.FC = () => {
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1 style={{fontSize : 20 }}>Bộ Bài Tập Form Validation Trong React (TypeScript)</h1>
      <CreditCardForm />
      <hr />
      <BlogPostForm />
      <hr />
      <EmploymentForm />
      <hr />
      <PerformanceReport />
      <hr />
      <ExpensePlannerForm />
      <hr />
      <LMSGradeKiosk />
    </div>
  );
};

export default App;