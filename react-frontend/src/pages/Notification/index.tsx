import { useSearchParams } from 'react-router-dom';

const Notification = () => {
  const [searchParams] = useSearchParams(); 

  // Convert the URLSearchParams object to a plain object
  const paramsObject = {};
  searchParams.forEach((value, key) => {
    paramsObject[key] = value;
  });

  console.log(paramsObject);

  return (
    <>
      <div className="">
        Here is notification
      </div>
      <pre>{JSON.stringify(paramsObject, null, 2)}</pre>
    </>
  );
}

export default Notification;