type Item = {
  q: string;
  a: string;
};

type Props = {
  items: Item[];
};

export function FaqAccordion({ items }: Props) {
  return (
    <div className="faqList">
      {items.map((item) => (
        <details key={item.q} className="faqItem">
          <summary className="faqSummary">{item.q}</summary>
          <div className="faqAnswer">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

