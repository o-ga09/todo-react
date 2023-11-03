export class ViewTask {
    constructor(
        readonly id:number,
        readonly name:string,
        readonly status:string,
        readonly assign:string,
        readonly created_at:Date,
        readonly updated_at:Date
    ){}
}