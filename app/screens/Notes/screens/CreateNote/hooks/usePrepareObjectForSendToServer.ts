import moment from 'moment';

interface UsePrepareObjectForSendToServerI {
  note: string;
  key: string;
}
export const usePrepareObjectForSendToServer = ({
  note,
  key,
}: UsePrepareObjectForSendToServerI) => {

  const date = moment().format('YYYY-MM-DD');
  let title = '';
  let subTitle = '';
  let currentKey = '';
  if (note) {
    note.split('\n').forEach((item) => {
      if (item) {
        if (title && subTitle) {
          return;
        } else {
          if (!title) {
            title = item;
            return;
          }
          if (!subTitle) {
            subTitle = item;
            return;
          }
        }
      }
    });
  }
  if (key) {
    currentKey = key;
  } else {
    currentKey = Math.round(Math.random() * 1000).toString();
  }
  return { date, note, title, subTitle, key: currentKey };
};
