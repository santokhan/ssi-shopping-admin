import React from 'react';
import CreateAgentForm from '../../../blocks/form/AgentForm.jsx';
import AgentFormHeader from '../../../blocks/form/agents/AgentsFormHeader.jsx';

const CreateAgent = () => {
  return (
    <div className="space-y-4">
      <AgentFormHeader />
      <CreateAgentForm />
    </div>
  );
};

export default CreateAgent;
