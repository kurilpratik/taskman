import CreateTask from '@/components/CreateTask';
import Search from '@/components/Search';
import TasksList from '@/components/TasksList';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  return (
    <div className="">
      <CreateTask />
      <Tabs defaultValue="all" className="mx-auto w-xl">
        <div className="flex">
          <TabsList variant="line">
            <TabsTrigger value="all">Pending Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Search />
        </div>
        <TabsContent value="all">
          <TasksList filter="all" />
        </TabsContent>
        <TabsContent value="pending">
          <TasksList filter="pending" />
        </TabsContent>
        <TabsContent value="completed">
          <TasksList filter="completed" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
