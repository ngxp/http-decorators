export interface User {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  export interface List<T> {
    page: number;
    per_page: number;
    total:number;
    total_pages: number;
    data: T;
  }