export function formatViews(views: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(views);
}

export function formatDate(dateStr: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr));
}
