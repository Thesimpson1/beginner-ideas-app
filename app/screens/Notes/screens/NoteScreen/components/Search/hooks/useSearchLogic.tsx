import { CardItemI } from 'app/screens/Notes/types';

interface useGetAnimatedStylesI {
  text: string;
  data: Array<CardItemI>;
}
export const useSearchLogic = ({ text, data }: useGetAnimatedStylesI) => {
  const dataAfterSearch = data.filter((item) => {
    const titleText = item.title.toLowerCase();
    const searchText = text.toLowerCase();

    if (searchText === '' || searchText[0] === titleText[0]) {
      return titleText.includes(searchText);
    } else {
      return false;
    }
  });
  return { dataAfterSearch };
};
