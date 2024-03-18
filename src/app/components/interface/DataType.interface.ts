export interface DataType{
  filter(arg0: (item: any) => any): any[];
  avatar: string;
  name: string;
  username: string;
  gender: string;
  date_of_study: Date;
  block1: boolean;
  block2: boolean;
  status: string;
  password: string;
  age: number;
  date: string;
}