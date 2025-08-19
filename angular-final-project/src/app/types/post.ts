export interface Post {
    theme: string,
    title:string,
    description: string,
    owner?: string,
    image: string,
    _id?: string,
    likedList: Array<Object>,
    created_at: string,
    message?: string
}

