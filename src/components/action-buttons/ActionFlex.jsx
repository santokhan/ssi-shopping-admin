import ActionDelete from './Delete';
import ActionEdit from './Edit';

const Box = ({ children }) => {
  return <div className="flex gap-3">{children}</div>;
};

const Actions = { Box, Edit: ActionEdit, Delete: ActionDelete };

export default Actions;
