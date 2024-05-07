import DeleteModal from '../DeleteModal';
import ActionEdit from './Edit';

const Box = ({ children }) => {
  return <div className="flex gap-3">{children}</div>;
};

const Actions = { Box, Edit: ActionEdit, Delete: DeleteModal };

export default Actions;
