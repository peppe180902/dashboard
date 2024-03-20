'use client'
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import { createProdotto } from '@/app/lib/actions';

export default function FormProdotti() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProdotto, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Nome Prodotto
          </label>
          <div className="relative">
            <input
              id="nome"
              name="nome"
              type="input"
              placeholder="Inserisci il nome"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="customer-error-amount"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Prezzo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="prezzo"
                name="prezzo"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error-amount"
              />

              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="customer-error-amount" aria-live="polite" aria-atomic="true">
            {/*             {state.errors?.prezzo &&
              state.errors.prezzo.map((error: number) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>
        {/* Categoria prodotto  */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Categoria
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="categoria"
                name="categoria"
                type="input"
                placeholder="inserisci categoria"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error-amount"
              />

              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="customer-error-amount" aria-live="polite" aria-atomic="true">
            {/*             {state.errors?.categoria &&
              state.errors.categoria.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))} */}
          </div>
        </div>
        <div>
          <label htmlFor="img" className="mb-2 block text-sm font-medium">
            Inserisci l'immagine
          </label>
          {/*  <MyDropzone /> */}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="immagine_url"
                name="immagine_url"
                type="input"
                placeholder="inserisci URL immagine"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error-amount"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/prodotti"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Prodotto</Button>
      </div>
    </form>
  );
}


/*   const MyDropzone: React.FC = () => {
    const [uploadStatus, setUploadStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0]; // Prendiamo il primo file per semplicità
    
      if (!file) return;
    
      const formData = new FormData();
      formData.append('file', file);
    
      setUploadStatus('PENDING');
    
      fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setUploadStatus('SUCCESS');
          // Aggiungi qui la logica per gestire l'URL dell'immagine
          console.log('URL dell\'immagine:', data.url);
        })
        .catch(error => {
          console.error('Error uploading the file:', error);
          setUploadStatus('ERROR');
        });
    }, []);
    
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-gray-50'
        } border-dashed border-2 rounded-md p-6 text-center cursor-pointer transition-colors duration-300 ease-in-out`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-green-500">Rilascia il file qui...</p>
        ) : (
          <p>Trascina qui il file o clicca per selezionarlo.</p>
        )}
      </div>
    );
  };
 */