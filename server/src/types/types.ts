export interface IUser {
    id: string;
    email: string;
}


export interface IIncidentFilters {
    fromDate?: Date; 
    toDate?: Date; 
    severity?: string; 
    status?: string;
    workerIds?: number[];  
}