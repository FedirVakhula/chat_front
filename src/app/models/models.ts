export interface ITask {
    _id?: number;
    name: string;
    author: string;
    comments: string[];
    like: number;
    dislike: number;
}
