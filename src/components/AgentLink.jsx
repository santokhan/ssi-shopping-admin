import { Link } from 'react-router-dom';

const AgentLink = ({ agent = '' }) => {
  if (agent?.id) {
    return (
      <Link
        to={'/agents/' + agent.id + '/'}
        className="hover:underline whitespace-nowrap"
      >
        {agent.display_name}
      </Link>
    );
  }
};

export default AgentLink;
