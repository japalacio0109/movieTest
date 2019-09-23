import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs';
import { RequestOptionsArgs } from '@angular/http';

@Injectable({
    providedIn: 'root'
})
export class HttpBaseService {

    baseUrl = environment.token_auth_config.apiBase;
    constructor(private http: HttpClient, private authService: Angular2TokenService) { }

    

    getAllData<T>(url: string, params: string) {
        url = (params ? `${url}?${params}` : url);
        return this.authService.get(url).pipe(map(it => <DataPaginate<T>>it.json()), shareReplay(1));
    }

    getDataById<T>(url: string, id: number) {
        url = `${url}/${id}`;
        return <Observable<T>>this.authService.get(url).pipe(map(it => it.json()), shareReplay(1));
    }

    saveData<T>(url: string, data: T) {
        return <Observable<T>>this.authService.post(url, data).pipe(map(it => it.json()), shareReplay(1));
    }

    savewithFiles<T>(url: string, data: T) {
        const formData: FormData = new FormData();
        const options: RequestOptionsArgs = <RequestOptionsArgs>{ headers: this.authService.currentAuthHeaders};
        options.headers.append('Accept', 'application/json');
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
            
        });
        return <Observable<T>>this.authService.post(url, formData, options).pipe(map(it => it.json()), shareReplay(1));
    }

    updateData<T>(url: string, data: T, id: number | any) {
        url = `${url}/${id}`;
        return <Observable<T>>this.authService.put(url, data).pipe(map(it => it.json()), shareReplay(1));
    }

    updateWithFiles<T>(url: string, data: T, id: number | any) {
        url = `${url}/${id}`;
        const formData: FormData = new FormData();
        const options: RequestOptionsArgs = <RequestOptionsArgs>{ headers: this.authService.currentAuthHeaders };
        options.headers.append('Accept', 'application/json');
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        return <Observable<T>>this.authService.put(url, formData, options).pipe(map(it => it.json()), shareReplay(1));
    }

    deleteData<T>(url: string, id: number) {
        url = `${url}/${id}`;
        return <Observable<T>>this.authService.delete(url).pipe(map(it => it.json()), shareReplay(1));
    }

    getUrlParams(filters?: dataFilter): string {
        if (!filters) { return ''; }
        const filt = Object.keys(filters).filter(key => (typeof filters[key] !== 'undefined') && filters[key]);
        return (filt.map(key => filters[key] ? key + '=' + filters[key] : '').join('&'));
    }
}

export interface dataFilter {
    [name: string]: any;
    page: number;
}

export interface DataPaginate<T> {
    data: T[];
    meta: Paginator;
}

export interface Paginator {
    current_page: number;
    next_page?: number;
    prev_page?: number;
    total_pages: number; 
    total_count: number;
    per_page: number;
}
