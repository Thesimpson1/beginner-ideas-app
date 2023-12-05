import moment from 'moment/moment';

import { CardItemI, ChangedDataItemI } from 'app/screens/Notes/types';

interface GetChangedDataI {
  data: Array<CardItemI>;
}
export const useGetChangedData = ({ data }: GetChangedDataI) => {
  const today = moment().format('YYYY-MM-DD');
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const monthAgo = moment().subtract(31, 'days').format('YYYY-MM-DD');
  const currentYear = moment().get('year');
  const newData: Array<ChangedDataItemI> = [];
  const dataTitles: Array<string> = [];
  const amountOfCards: Array<number> = [];

  data.forEach(({ date }) => {
    let title;
    let filteredData: Array<CardItemI> = [];

    switch (true) {
      case date === today: {
        filteredData = data.filter((item) => item.date === today);
        title = 'Today';
        break;
      }
      case date === yesterday: {
        filteredData = data.filter((item) => item.date === yesterday);
        title = 'Yesterday';
        break;
      }
      case date < yesterday && date >= monthAgo: {
        filteredData = data.filter(
          (item) => monthAgo <= item.date && item.date < yesterday
        );
        title = 'Last 30 Days';
        break;
      }
      case date < monthAgo &&
        date.slice(0, 4).toString() === currentYear.toString(): {
        filteredData = data.filter(
          (item) =>
            //less than 30 days
            item.date < monthAgo &&
            //current year
            item.date.slice(0, 4).toString() === currentYear.toString() &&
            //date from only one month
            item.date.slice(5, 7) === date.slice(5, 7)
        );
        title = moment()
          .month(+date.slice(5, 7) - 1)
          .format('MMMM');
        break;
      }
      default: {
        filteredData = data.filter(
          (item) => item.date.slice(0, 4).toString() !== currentYear.toString()
        );
        title = moment().year(+date.slice(0, 4)).format('YYYY');
      }
    }
    if (!dataTitles.includes(title)) {
      newData.push({ title, filteredData });
      dataTitles.push(title);
      amountOfCards.push(filteredData.length);
    }
  });

  return { newData, amountOfCards };
};
