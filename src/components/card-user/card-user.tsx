import { useQuery } from 'react-query';
import { Octocat, fetchUser, Constants } from '../../lib/user';
import type { GithubUser } from '../../lib/user';
import { useEffect, useState } from 'react';
import defaultAvatarURL from '../../assets/default_avatar.png';

function parseDate(dt: Date): string[] {
  let year = dt.getFullYear().toString();
  let month = ("0" + dt.getMonth() + 1).slice(-2);
  let day = dt.getDate().toString();
  const datetimeStr = [year, month, day].join('-');  
  let joinedAt: string | string[] = dt.toDateString().slice(4).split(' ');
  joinedAt = [joinedAt[1], joinedAt[0], joinedAt[2]].join(' ');
  return [datetimeStr, joinedAt];
}

interface Props {
  username: string;
  hasFound: (found: boolean) => void;
}

export default function CardUser({ username, hasFound }: Props) {
  const [user, setUser] = useState<GithubUser>(Octocat);
  const { data } = useQuery(['Github', username], () => fetchUser(username));

  useEffect(() => {
    hasFound(data !== Constants.NOT_FOUND);
  }, [data, hasFound]);

  if (
    data !== undefined &&
    data !== Constants.NOT_FOUND &&
    data.login !== user.login
  ) {
    setUser(data);
  }

  const [datetimeStr, joinedAt] = parseDate(user.created);

  return (
    <article className="nv-card-user">
      <img
        src={user.avatar ? user.avatar : defaultAvatarURL}
        alt=""
        className="avatar"
      />
      <h2 className="name">{user.name}</h2>
      <p className="login">{user.login}</p>
      <p className="joined">
        Joined <time dateTime={datetimeStr}>{joinedAt}</time>
      </p>
      <p className="bio">{user.bio}</p>

      <dl className="indicators">
        <dt className="description">Repos</dt>
        <dd className="value">{user.repos}</dd>
        <dt className="description">Followers</dt>
        <dd className="value">{user.followers}</dd>
        <dt className="description">Following</dt>
        <dd className="value">{user.following}</dd>
      </dl>
      <address className="contact">
        <p
          data-available={user.location !== Constants.NOT_AVAILABLE}
          className="location"
        >
          {user.location}
        </p>
        <a
          className="blog"
          href={user.blog !== Constants.NOT_AVAILABLE ? user.blog : ''}
          data-available={user.blog !== Constants.NOT_AVAILABLE}
        >
          {user.blog}
        </a>
        <p
          data-available={user.twitter !== Constants.NOT_AVAILABLE}
          className="twitter"
        >
          {user.twitter}
        </p>
        <p
          data-available={user.company !== Constants.NOT_AVAILABLE}
          className="company"
        >
          {user.company}
        </p>
      </address>
    </article>
  );
}
