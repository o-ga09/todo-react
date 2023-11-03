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

export class Tasks {
    tasks = [] as ViewTask[]
    setTasks(task: ViewTask){
        this.tasks.push(task);
    }
    editElement(id:number, task: ViewTask){
        this.tasks[id] = task;
    }
    removeElement(id:number) {
        const newTasks = this.tasks.filter(task => task.id !== id);
        this.tasks = newTasks;
    }
}