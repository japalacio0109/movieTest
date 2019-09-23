import { ID, PaginationResponse } from '@datorama/akita';
import { DataPaginate } from 'app/services/http_base.service';

export type Movie = DataPaginate<Movie_>;


export interface Movie_ {
    id: number;
    user_id?: number;
    name: string;
    author: string;
    description: string;
    image_url?: string;
    init_date: Date;
    end_date: Date;
    status: boolean;
    created_by?: string;
    image?: File;
    user: User;
}

export interface User {
    id: number;
    name: string;
    nickname: string;
    email: string;
}


export function createMovie({ ...data }: Partial<Movie>) {
    return {
        ...data,
    } as Movie;
}