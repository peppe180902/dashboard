import { fetchProdotti } from "@/app/lib/data";
import ProdottiTable from "@/app/ui/prodotti/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Prodotti',
};

export default async function Page() {
  
    return (
        <>
         <ProdottiTable  />
        </>
    )
  } 