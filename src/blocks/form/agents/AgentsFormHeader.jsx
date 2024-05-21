import { useParams } from 'react-router-dom';
import BackAnchor from '../../../components/BackAnchor';
import FormTitle from '../../../components/form/FormTitle';

const AgentFormHeader = () => {
  const { id } = useParams();

  return (
    <div className="flex items-center gap-2">
      <BackAnchor to="/agents" />
      <FormTitle>{id ? 'Edit Agents' : 'Create Agents'}</FormTitle>
    </div>
  );
};

export default AgentFormHeader;
