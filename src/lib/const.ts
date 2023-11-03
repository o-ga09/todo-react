import { ViewTask } from "./view/tasks";

export const dammy_tasks = [
   new ViewTask(1,"task 1","pending","risa",DummyDate(),DummyDate()),
   new ViewTask(2,"task 2","pending","tarou",DummyDate(),DummyDate()),
   new ViewTask(3,"task 3","pending","saburou",DummyDate(),DummyDate()),
];

function DummyDate():Date {
    return new Date();
}