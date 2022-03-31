import axios from 'axios';

export interface GithubUser {
  avatar: string;
  name: string;
  login: string;
  created: Date;
  bio: string;
  repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter: string;
  company: string;
}

export enum FetchError {
  NOT_FOUND = 'NOT_FOUND',
}

export const Octocat: GithubUser = {
  avatar: 'https://avatars.githubusercontent.com/u/583231?v=4',
  name: 'The Octocat',
  login: 'octocat',
  created: new Date('2011-01-25T18:44:36Z'),
  bio: 'This profile has no bio',
  repos: 8,
  followers: 5371,
  following: 9,
  location: 'San Francisco',
  blog: 'https://github.blog',
  twitter: 'Not Available',
  company: '@github',
};

export async function fetchUser(
  login: string
): Promise<GithubUser | FetchError> {
  const data = await axios
    .get(`https://api.github.com/users/${login}`)
    .then((response) => response.data)
    .catch(() => null);

  if (data === null) {
    return FetchError.NOT_FOUND;
  }

  const NotAvailable = 'Not Available';

  const user: GithubUser = {
    avatar: data.avatar_url ?? '',
    name: data.name ?? '',
    login: data.login,
    created: new Date(data.created_at),
    bio: data.bio ?? 'This profile has no bio',
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    location: data.location ?? NotAvailable,
    blog: data.blog ?? NotAvailable,
    twitter: data.twitter_username ?? NotAvailable,
    company: data.company ?? NotAvailable,
  };

  return user;
}
