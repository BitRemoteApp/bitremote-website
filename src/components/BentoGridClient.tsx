import { BentoCard } from '@/components/BentoCard';

type BenefitItem = {
  id: string;
  title: string;
  subtitle: string;
};

type Props = {
  items: BenefitItem[];
};

export function BentoGridClient({ items }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {items.map((item) => (
        <BentoCard key={item.id} title={item.title} body={item.subtitle} />
      ))}
    </div>
  );
}
