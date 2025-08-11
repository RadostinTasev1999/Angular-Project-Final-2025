export interface Comment {
    email: string,
    message: string,
    name: string,
    post?: string,
    owner?:string,
    created_at?: string,
    _id?: string
}