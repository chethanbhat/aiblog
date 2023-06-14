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
