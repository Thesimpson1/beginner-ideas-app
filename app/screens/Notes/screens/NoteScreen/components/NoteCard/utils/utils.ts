interface SetISChangeTitleI {
  text: string;
  item: string;
  index: number;
}

export const setIsChangeTitle = ({ text, item, index }: SetISChangeTitleI) => {
  switch (true) {
    case index > text.length - 1: {
      return false;
    }
    case text.length === 1: {
      return item.toLowerCase() === text.toLowerCase();
    }
    case text.length > 1: {
      return text.toLowerCase().includes(item.toLowerCase());
    }
    default: {
      return false;
    }
  }
};
