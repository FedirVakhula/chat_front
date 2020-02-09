export interface ITask {
    _id?: string;
    name: string;
    author?: string;
    comments: ITask[];
    like: number;
    dislike: number;
    date?: Date;
}
