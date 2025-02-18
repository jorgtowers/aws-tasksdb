// ... (estructura similar, cambiando iRate a iCustomerAsignation, etc.)
import Image from "next/image";
import styles from "@/app/page.module.css";
import { iCustomerAsignation } from '@/interfaces/all'; // Importa la interfaz correcta
import Button from '@mui/material/Button';
import { K_API_PATH, K_PAGES_CUSTOMER_ASIGNATIONS_PATH } from '@/utils/settings'; // Ajusta la ruta
import { useRouter } from "next/router";
import { CustomerAsignationList } from "@/components/customer-asignations/List"; // Importa el componente de lista
import Navbar from "@/components/Navbar";

interface Props {
    customerAsignations: iCustomerAsignation[]
}

export default function CustomerAsignationsIndex({ customerAsignations }: Props) {
    const router = useRouter();

    return <>
        <Navbar />
        {customerAsignations.length === 0 ?
            (<div>
                <h1>no customer asignations yet</h1>
                <Button onClick={() => router.push(`${K_PAGES_CUSTOMER_ASIGNATIONS_PATH}/new`)}>Create one</Button>
            </div>) :
            <CustomerAsignationList items={customerAsignations} /> // Usa el componente CustomerAsignationList
        }
    </>

}

export const getServerSideProps = async () => {
    const res = await fetch(`${K_API_PATH}/customer-asignations`); // Ruta correcta
    const customerAsignations = await res.json();
    return {
        props: {
            customerAsignations: customerAsignations
        }
    }
}