// ... (estructura similar, cambiando iRate a iCustomerRate, etc.)
import Image from "next/image";
import styles from "@/app/page.module.css";
import { iCustomerRate } from '@/interfaces/all'; // Importa la interfaz correcta
import Button from '@mui/material/Button';
import { K_API_PATH, K_PAGES_CUSTOMER_RATES_PATH } from '@/utils/settings'; // Ajusta la ruta
import { useRouter } from "next/router";
import { CustomerRateList } from "@/components/customer-rates/List"; // Importa el componente de lista
import Navbar from "@/components/Navbar";

interface Props {
    customerRates: iCustomerRate[]
}

export default function CustomerRatesIndex({ customerRates }: Props) {
    const router = useRouter();

    return <>
        <Navbar />
        {customerRates.length === 0 ?
            (<div>
                <h1>no customer rates yet</h1>
                <Button onClick={() => router.push(`${K_PAGES_CUSTOMER_RATES_PATH}/new`)}>Create one</Button>
            </div>) :
            <CustomerRateList items={customerRates} /> // Usa el componente CustomerRateList
        }
    </>

}

export const getServerSideProps = async () => {
    const res = await fetch(`${K_API_PATH}/customer-rates`); // Ruta correcta
    const customerRates = await res.json();
    return {
        props: {
            customerRates: customerRates
        }
    }
}