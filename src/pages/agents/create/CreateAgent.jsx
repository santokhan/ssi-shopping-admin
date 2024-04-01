import React from 'react';
import CreateAgentForm from '../../../blocks/form/AgentForm.jsx';

const CreateAgent = () => {
    return (
        <div className='space-y-4'>
            <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">All Agents</h2>
            <CreateAgentForm />
        </div>
    );
};

export default CreateAgent;
