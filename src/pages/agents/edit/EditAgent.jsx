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
          setAgent({
            display_name: data.display_name,
            email: data.email,
            phone: data.phone,
            first_name: data.first_name,
            last_name: data.last_name,
            whatsapp_number: data.whatsapp_number,
            speaks: data.speaks.split(',').map((item) => ({
              label: item.trim(),
              value: item.trim().toLowerCase(),
            })),
            location: data.location,
            years_of_expertise: data.years_of_expertise,
            category: data.category.map((c) => ({
              label: c.title,
              value: c.id,
            })),
            nationality: data.nationality,
            about: data.about || '',
            photo: '',
          });
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
