export interface iTask{
    id?:string;
    title:string;
    description:string;
    created_on?:string;
    completed?:string;
}

// interfaces/iRate.ts
export interface iRate {
    id?: string; // Si el ID es autogenerado, puede ser opcional
    description: string;
    vigency: string; // O Date si prefieres trabajar con objetos Date
    amount: number;
}

// interfaces/iCustomer.ts
export interface iCustomer {
    id?: string;
    customername: string;
    zone: string;
    contactname: string;
    contactphone: string;
}

// interfaces/iCustomerRate.ts
export interface iCustomerRate {
    id?: string;
    idCustomer: number; // O string si los IDs son cadenas
    idRate: number; // O string si los IDs son cadenas
    factor: number;
}

// interfaces/iCustomerAsignation.ts
export interface iCustomerAsignation {
    id?: string;
    idCustomer: number; // O string si los IDs son cadenas
    fecha: string; // O Date si prefieres objetos Date
    asignationTypeId: number; // O string si los IDs son cadenas
    quantity: number;
}

// interfaces/iAsignationType.ts
export interface iAsignationType {
    id?: string;
    description: string;
    factor: number;
}