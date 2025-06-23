export function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

export function formatNumber(number) {
    const formattedNumber = Number(number).toLocaleString();
    return formattedNumber;
  };
