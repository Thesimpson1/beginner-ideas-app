export enum MenuDataTypes {
  MAIN_MENU_DATA = 'MAIN_MENU_DATA',
  SORT_ITEM_DATA = 'SORT_ITEM_DATA',
  DATE_SORT_ITEM_DATA = 'DATE_SORT_ITEM_DATA',
}
export interface CardItemI {
  date: string;
  title: string;
  subTitle: string;
  note: string;
}
export interface ChangedDataItemI {
  filteredData: Array<CardItemI>;
  title: string;
}
export interface RenderItemI {
  item: ChangedDataItemI;
  index: number;
}
