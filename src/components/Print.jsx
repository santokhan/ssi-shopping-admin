const Print = ({ data }) => {
  return <pre className="">{JSON.stringify(data, null, 2)}</pre>;
};
export default Print;
