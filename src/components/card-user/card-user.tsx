import { useQuery } from 'react-query';
import { Octocat, fetchUser, FetchError } from '../../lib/user';
import type { GithubUser } from '../../lib/user';
import { useEffect, useState } from 'react';
import defaultAvatarURL from '../../assets/default_avatar.png';

function parseDate(dt: Date): string[] {
  const datetimeStr = [dt.getFullYear(), dt.getMonth(), dt.getDay()].join('-');
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
    hasFound(data !== FetchError.NOT_FOUND);
  }, [data, hasFound]);

  if (
    data !== undefined &&
    data !== FetchError.NOT_FOUND &&
    data.login !== user.login
  ) {
    setUser(data);
  }

  const [datetimeStr, joinedAt] = parseDate(user.created);

  return (
    <article className="card-user">
      <div className="image-container">
        <img
          src={user.avatar ? user.avatar : defaultAvatarURL}
          alt=""
          className="avatar"
        />
      </div>
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
      <address className="user-contact-data">
        <p className="location">{user.location}</p>
        <p className="twitter">{user.twitter}</p>
        <a
          className="blog"
          href={user.blog !== 'Not Available' ? user.blog : ''}
        >
          {user.blog}
        </a>
        <p className="company">{user.company}</p>
      </address>
    </article>
  );
}
