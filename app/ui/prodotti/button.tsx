import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProdotto } from '@/app/lib/actions';


export function CreateProdotto() {
  return (
    <Link
      href="/dashboard/prodotti/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crea Prodotto</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProdotto({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/prodotti/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProdotto({ id }: { id: string }) {
  const deleteProdottoWithId = deleteProdotto.bind(null, id);
  return (
    <>
     <form action={deleteProdottoWithId} className='flex m-auto mt-10'>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-6" />
      </button>
      </form>
    </>
  );
}
