import React, { useEffect, useState } from 'react';
import AgentForm from '../../../blocks/form/AgentForm';
import { useParams } from 'react-router-dom';
import useAxios from '../../../context/useAxios';

const EditAgent = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState({});
  const { api } = useAxios();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`agents/${id}/`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setAgent(data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
        Edit Agents
      </h2>
      {loading ? 'Loading...' : <AgentForm agent={agent} />}
    </div>
  );
};

export default EditAgent;
