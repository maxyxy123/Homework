interface PricingCardProps {
  title: string;
  price: number | null;
  borderColor: string;
}

export function PricingCard({ title, price, borderColor }: PricingCardProps) {
  const renderPrice = (!price || price === 0) ? "Liên hệ" : `${price.toLocaleString()} VND`;

  return (
    <div style={{ border: `2px solid ${borderColor}`, padding: '16px', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <p>Giá: {renderPrice}</p>
    </div>
  );
}