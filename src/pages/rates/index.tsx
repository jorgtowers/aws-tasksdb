import Image from "next/image";
import styles from "@/app/page.module.css";
import { iRate } from '@/interfaces/all'; // Importa la interfaz correcta
import Button from '@mui/material/Button';
import { K_API_PATH, K_PAGES_RATES_PATH } from '@/utils/settings'; // Ajusta la ruta
import { useRouter } from "next/router";
import { RateList } from "@/components/rates/List"; // Importa el componente de lista
import Navbar from "@/components/Navbar";

interface Props {
    rates: iRate[]
}

export default function RatesIndex({ rates }: Props) {
    const router = useRouter();

    return <>
        <Navbar />
        {rates.length === 0 ?
            (<div>
                <h1>no rates yet</h1>
                <Button onClick={() => router.push(`${K_PAGES_RATES_PATH}/new`)}>Create one</Button>
            </div>) :
            <RateList items={rates} /> // Usa el componente RateList
        }
    </>

}

export const getServerSideProps = async () => {
    const res = await fetch(`${K_API_PATH}/rates`); // Ruta correcta
    const rates = await res.json();
    return {
        props: {
            rates: rates
        }
    }
}