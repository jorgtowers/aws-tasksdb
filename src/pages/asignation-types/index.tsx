// ... (estructura similar, cambiando iRate a iAsignationType, etc.)
import Image from "next/image";
import styles from "@/app/page.module.css";
import { iAsignationType } from '@/interfaces/all'; // Importa la interfaz correcta
import Button from '@mui/material/Button';
import { K_API_PATH, K_PAGES_ASIGNATION_TYPES_PATH } from '@/utils/settings'; // Ajusta la ruta
import { useRouter } from "next/router";
import { AsignationTypeList } from "@/components/asignation-types/List"; // Importa el componente de lista
import Navbar from "@/components/Navbar";

interface Props {
    asignationTypes: iAsignationType[]
}

export default function AsignationTypesIndex({ asignationTypes }: Props) {
    const router = useRouter();

    return <>
        <Navbar />
        {asignationTypes.length === 0 ?
            (<div>
                <h1>no asignation types yet</h1>
                <Button onClick={() => router.push(`${K_PAGES_ASIGNATION_TYPES_PATH}/new`)}>Create one</Button>
            </div>) :
            <AsignationTypeList items={asignationTypes} /> // Usa el componente AsignationTypeList
        }
    </>

}

export const getServerSideProps = async () => {
    const res = await fetch(`${K_API_PATH}/asignation-types`); // Ruta correcta
    const asignationTypes = await res.json();
    return {
        props: {
            asignationTypes: asignationTypes
        }
    }
}