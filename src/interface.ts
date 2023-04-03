export interface IData {
  title: string;
  divider?: boolean;
  description?: string;
  link?: {
    caption?: string;
    url?: string;
  };
  img?: string;
  imageUrl?: string;
}

export interface IConfig {
  columnsPerRow?: number;
  title?: string;
  description?: string;
  divider?: boolean;
  data?: IData[];
}
