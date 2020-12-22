export function comma(value) {
  return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}
