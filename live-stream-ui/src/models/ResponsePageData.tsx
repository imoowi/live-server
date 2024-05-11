export type Pages = {
  count: number;
  page: number;
  pageSize: number;
  totalPage: number;
};
export const NewDefaultPages = () => {
  return {
    count: 0,
    page: 1,
    pageSize: 20,
    totalPage: 0,
  };
};
export type ResponsePageData<T> = {
  data: Array<T>;
  pages: Pages;
};
