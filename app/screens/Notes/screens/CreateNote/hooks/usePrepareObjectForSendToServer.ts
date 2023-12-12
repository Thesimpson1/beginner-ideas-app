import moment from 'moment';

interface UsePrepareObjectForSendToServerI {
  note: string;
}
export const usePrepareObjectForSendToServer = ({
  note,
}: UsePrepareObjectForSendToServerI) => {
  const date = moment().format('YYYY-MM-DD');
  let title = '';
  let subTitle = '';
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
  return { date, note, title, subTitle };
};
