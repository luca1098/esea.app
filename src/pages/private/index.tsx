const index = () => {
  return <></>;
};

export default index;

export async function getServerSideProps() {
  return {
    redirect: {
      permanent: true,
      destination: '/private/dashboard',
    },
  };
}
