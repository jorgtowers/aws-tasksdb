// ... (estructura similar al anterior, cambiando iRate a iCustomer, K_PAGES_RATES_PATH a K_PAGES_CUSTOMERS_PATH, RateList a CustomerList, y las rutas/nombres)
import Image from "next/image";
import styles from "@/app/page.module.css";
import { iCustomer } from '@/interfaces/all'; // Importa la interfaz correcta
import Button from '@mui/material/Button';
import { K_API_PATH, K_PAGES_CUSTOMERS_PATH } from '@/utils/settings'; // Ajusta la ruta
import { useRouter } from "next/router";
import { CustomerList } from "@/components/customers/List"; // Importa el componente de lista
import Navbar from "@/components/Navbar";

interface Props {
    customers: iCustomer[]
}

export default function CustomersIndex({ customers }: Props) {
    const router = useRouter();

    return <>
        <Navbar />
        {customers.length === 0 ?
            (<div>
                <h1>no customers yet</h1>
                <Button onClick={() => router.push(`${K_PAGES_CUSTOMERS_PATH}/new`)}>Create one</Button>
            </div>) :
            <CustomerList items={customers} /> // Usa el componente CustomerList
        }
    </>

}

export const getServerSideProps = async () => {
    const res = await fetch(`${K_API_PATH}/customers`); // Ruta correcta
    const customers = await res.json();
    return {
        props: {
            customers: customers
        }
    }
}