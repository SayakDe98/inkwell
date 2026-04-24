export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  articles: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  author: Author;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  claps: number;
  comments: number;
  featured: boolean;
  responses?: Response[];
}

export interface Response {
  id: string;
  author: Author;
  content: string;
  publishedAt: string;
  claps: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  count: number;
  description: string;
}
