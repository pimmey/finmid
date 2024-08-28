const LOCALE = 'de-DE';

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

export function formatTimestamp(timestamp?: string) {
  if (!timestamp) {
    return 'Date unknown';
  }

  return new Intl.DateTimeFormat(LOCALE, {
    ...DATE_FORMAT,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

type FormatCurrencyProps = {
  amount?: string;
  currency?: string;
};
export function formatCurrency({ amount, currency }: FormatCurrencyProps) {
  if (!amount || !currency) {
    return 'Malformed data';
  }

  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
  }).format(Number(amount));
}

export function formatDate(date?: string) {
  if (!date) {
    return 'Date unknown';
  }

  return new Intl.DateTimeFormat(LOCALE, DATE_FORMAT).format(new Date(date));
}
