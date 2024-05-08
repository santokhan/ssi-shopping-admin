const MountListedIn = ({ listed_in }) => (
  <p className="capitalize">{listed_in == 1 ? 'sale' : 'rent'}</p>
);

export default MountListedIn;
