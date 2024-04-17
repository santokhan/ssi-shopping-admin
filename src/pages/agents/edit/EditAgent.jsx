import React from 'react';
import EditAgentForm from '../../../blocks/form/agents/EditAgentForm';

const EditAgent = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
        Edit Agents
      </h2>
      <EditAgentForm />
    </div>
  );
};

export default EditAgent;
