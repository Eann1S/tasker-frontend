import { columns, Task } from "@/components/tasks/columns";
import { DataTable } from "@/components/ui/data-table";

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}

const tasks: Task[] = [
  {
    id: '1',
    title: "title1",
    description: "desc1",
    status: "todo",
    priority: "low",
  },
  {
    id: '2',
    title: "title2",
    description: "desc2",
    status: "todo",
    priority: "low",
  },
  {
    id: '3',
    title: "title3",
    description: "desc3",
    status: "todo",
    priority: "low",
  },
];
