import { useState } from 'react';

export interface FaqItemType {
  question: string;
  answer: string;
}

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
      <h4 onClick={onToggle} style={{ cursor: 'pointer' }}>{question}</h4>
      {isOpen && <p>{answer}</p>}
    </div>
  );
}

interface FaqListProps {
  faqs: FaqItemType[];
}

export default function FaqList({ faqs }: FaqListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {faqs.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={activeIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}