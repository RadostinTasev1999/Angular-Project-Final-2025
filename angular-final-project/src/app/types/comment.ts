export interface Comment {
    email: string,
    message: string,
    name: string,
    post?: string,
    owner?:string,
    created_at?: string,
    likedList?: [],
    _id?: string
}