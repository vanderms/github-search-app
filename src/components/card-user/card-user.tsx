import axios from 'axios';
import { useQuery } from 'react-query';

function fetchUser(username: string) {
  return axios.get(`https://api.github.com/users/${username}`);
}

export default function CardUser({ username }: { username: string }) {
  const { isLoading, data, isError, error } = useQuery(
    ['Github', username],
    () => fetchUser(username)
  );

  console.log(data);
  

  return <article className="card-user">{JSON.stringify(data)}</article>;
}
