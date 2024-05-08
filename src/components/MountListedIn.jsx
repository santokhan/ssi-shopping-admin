const MountListedIn = ({ listed_in }) => (
  <span className="capitalize">{listed_in == 1 ? 'sale' : 'rent'}</span>
);

export default MountListedIn;
