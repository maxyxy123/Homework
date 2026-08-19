import { useState } from 'react';
import { PricingCard } from './components/Exercise1_PricingCard';
import LoginForm from './components/Exercise2_LoginForm';
import WelcomeBanner from './components/Exercise3_WelcomeBanner';
import ScoreBoard from './components/Exercise4_ScoreBoard';
import Pomodoro from './components/Exercise5_Pomodoro';
import FaqList, { FaqItemType } from './components/Exercise6_FaqAccordion';

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(1);

  const sampleFaqs: FaqItemType[] = [
    { question: 'React là gì?', answer: 'Thư viện UI tạo giao diện dựa trên Component.' },
    { question: 'Props dùng để làm gì?', answer: 'Truyền dữ liệu từ Component cha xuống con.' }
  ];

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h2>Tổng hợp bài tập React (TypeScript)</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => setActiveTab(num)}
            style={{
              padding: '8px 16px',
              backgroundColor: activeTab === num ? '#007bff' : '#e0e0e0',
              color: activeTab === num ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Bài {num}
          </button>
        ))}
      </div>

      <hr />

      <div style={{ marginTop: '20px' }}>
        {activeTab === 1 && (
          <div style={{ display: 'flex', gap: '16px' }}>
            <PricingCard title="Basic" price={100000} borderColor="#ccc" />
            <PricingCard title="Pro" price={300000} borderColor="#007bff" />
            <PricingCard title="Enterprise" price={null} borderColor="#28a745" />
          </div>
        )}
        {activeTab === 2 && <LoginForm />}
        {activeTab === 3 && <WelcomeBanner  />}
        {activeTab === 4 && <ScoreBoard score={200} />}
        {activeTab === 5 && <Pomodoro />}
        {activeTab === 6 && <FaqList faqs={sampleFaqs} />}
      </div>
    </div>
  );
}