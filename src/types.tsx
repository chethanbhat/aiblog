export interface Keyword {
  _id: string;
  keyword: string;
}
export interface Category {
  _id: string;
  category: string;
}

export interface UserInterface {
  id: string;
  username: string;
  email: string;
  image: string;
}

export interface Topic {
  _id: string;
  title: string;
  category: Category;
  keywords: Keyword[];
}

export interface Blog {
  _id: string;
  article: string;
  imageUrl: string;
  topic: Topic;
  category: Category;
  keywords: Keyword[];
  createdBy: UserInterface;
}
