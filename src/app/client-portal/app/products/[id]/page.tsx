import { ProductAnalyticsView } from "@/components/client-portal-app/ProductAnalyticsView";
import { allHubProducts } from "@/data/portal/mock-data";

export function generateStaticParams() {
  return allHubProducts.map((p) => ({ id: p.id }));
}

export default async function ProductAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductAnalyticsView productId={id} />;
}
