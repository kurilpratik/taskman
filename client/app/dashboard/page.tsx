'use client';

import { useState } from 'react';
import CreateTask from '@/components/CreateTask';
import Search from '@/components/Search';
import TasksList from '@/components/TasksList';
import ProtectedRoute from '@/components/ProtectedRoute';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');

  const getStatusParam = (): 'completed' | 'pending' | undefined => {
    if (statusFilter === 'all') return undefined;
    return statusFilter;
  };

  const handleSearch = () => {
    setAppliedSearch(searchTerm);                // apply current text
    setRefreshKey((prev) => prev + 1);          // force reload of tasks
  };

  return (
    <ProtectedRoute>
    <div className="px-4 pb-6 pt-0 sm:pt-2 sm:px-6 lg:px-0">
      <CreateTask onCreate={() => setRefreshKey((prev) => prev + 1)} />
      <Tabs 
        defaultValue="pending" 
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
        onValueChange={(value) => setStatusFilter(value as 'all' | 'completed' | 'pending')}
      >
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <TabsList variant="line" className="w-full sm:w-auto">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <Search
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
       <TabsContent value="pending">
          <TasksList
            refreshKey={refreshKey}
            status={getStatusParam()}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
            search={appliedSearch}     // <-- pass search
          />
        </TabsContent>
        <TabsContent value="completed">
          <TasksList
            refreshKey={refreshKey}
            status={getStatusParam()}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
            search={appliedSearch}
          />
        </TabsContent>
        <TabsContent value="all">
          <TasksList
            refreshKey={refreshKey}
            status={getStatusParam()}
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
            search={appliedSearch}
          />
        </TabsContent>

      </Tabs>
    </div>
    </ProtectedRoute>
  );
};

export default Dashboard;