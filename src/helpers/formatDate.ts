/* eslint-disable prettier/prettier */
export type Settings = {
  weekday: 'long' | 'short' | 'narrow' | undefined;
  year: 'numeric' | '2-digit' | undefined;
  month: 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined;
  day: 'numeric' | '2-digit' | undefined;
};

export const formatDate = ({dateValue}: {dateValue: Date}) => {
  const newDate = new Date(dateValue);
  const settings: Settings = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return newDate.toLocaleDateString('eu-EU', settings);
};
