export interface User {
  userName: string;
  displayName: string;
  role: string;
}

export interface Note {
  id: number;
  text: string;
  author: string;
  client: string;
  createdAt: string;
}
