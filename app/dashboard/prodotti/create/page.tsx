import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchProdotti } from '@/app/lib/data';
import { Metadata } from 'next';
import FormProdotti from '@/app/ui/invoices/create-form';

export const metadata: Metadata = {
  title: 'Create invoice',
};
 
export default async function Page() {
  const prodotti = await fetchProdotti();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'prodotti', href: '/dashboard/prodotti' },
          {
            label: 'Create Prodotti',
            href: '/dashboard/prodotti/create',
            active: true,
          },
        ]}
      />
      <FormProdotti customers={[]}  />
    </main>
  );
}
