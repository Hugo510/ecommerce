import React from 'react';

interface SecurityLog {
  id: string;
  userId: string;
  action: string;
  createdAt: string;
}

function SecurityLogsTable() {
  // This would normally come from a store
  const logs: SecurityLog[] = [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Security Logs</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Log ID</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">User</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Action</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-zinc-500">Created At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-zinc-100">
                <td className="py-4 px-4">{log.id}</td>
                <td className="py-4 px-4">{log.userId}</td>
                <td className="py-4 px-4">
                  <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium"> {log.action}</span>
                </td>
                <td className="py-4 px-4 text-zinc-500">
                  {new Date(log.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SecurityLogsTable;