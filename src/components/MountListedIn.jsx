const MountListedIn = ({ listed_in }) => (
  <span className="capitalize">{listed_in == 'sale' ? 'sale' : 'rent'}</span>
);

export default MountListedIn;
