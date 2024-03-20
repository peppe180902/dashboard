import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import FormProdotti from '@/app/ui/prodotti/create-form';

export const metadata: Metadata = {
  title: 'Create prodotti',
};
 
export default async function Page() {

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
      <FormProdotti  />
    </main>
  );
}
