'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Prodotto } from './definitions';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const ProdottoSchema = z.object({
  nome: z.string(),
  prezzo: z.number().positive(),
  categoria: z.string(),
  immagine_url: z.string(),
  visibile: z.boolean(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type ProductState = {
  errors?: {
    nome?: string[];
    prezzo?: string[];
    categoria?: string[];
    immagine_url?: string[];
    visibile?: string[];
  };
  message?: string | null;
};


const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });


export async function createInvoice(prevState: State, formData: FormData) {
  console.log('FETCH IS STARTING NOW...')
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  } catch (error) {
    return {
      message: `Database Error: ${error}`
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');

}


export async function createProdotto(prevState: ProductState, formData: FormData) {
  console.log("FETCH IS STARTINGG NOW")
  const validatedFields = ProdottoSchema.safeParse({
    nome: formData.get('nome'),
    prezzo: Number(formData.get('prezzo')),
    categoria: formData.get('categoria'),
    immagine_url: formData.get('immagine_url'),
    visibile: true,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campi mancanti. Impossibile creare il prodotto.',
    };
  }

  const { nome, prezzo, categoria, immagine_url, visibile } = validatedFields.data;

  try {
    await sql`
      INSERT INTO prodotti (nome, prezzo, categoria, immagine_url, visibile)
      VALUES (${nome}, ${prezzo}, ${categoria}, ${immagine_url}, ${visibile})
      RETURNING *;
    `;
  } catch (error) {
    return {
      message: `Database Error: ${error}`
    }
  }

  revalidatePath('/dashboard/prodotti');
  redirect('/dashboard/prodotti');
}


export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return {
      message: `Database Error: ${error}`
    }
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  //throw new Error('Failed to Delete Invoice'); prova per visualizzare il file error.tsx per gesitre l'errore, decommentare per fare la prova
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    return {
      message: `Database Error: ${error}`
    }
  }
}

export async function deleteProdotto(id: string) {
  //throw new Error('Failed to Delete Invoice'); prova per visualizzare il file error.tsx per gesitre l'errore, decommentare per fare la prova
  try {
    await sql`DELETE FROM prodotti WHERE id = ${id}`;
    revalidatePath('/dashboard/prodotti');
  } catch (error) {
    return {
      message: `Database Error: ${error}`
    }
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}