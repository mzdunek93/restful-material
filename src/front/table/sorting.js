let months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

let sanitizeForSorting = (key, a, b, fallback) => {
  a = a.get(key);
  b = b.get(key);
  if(a === undefined || a === null) a = fallback;
  if(b === undefined || b === null) b = fallback;

  return [a, b];
}

let sanitizeForSortingCurrency = (key, a, b) => {
  [a, b] = sanitizeForSorting(key, a, b, '0 PLN');
  let re = /^\s*(\d+[,.]?\d*)\s*[A-Z]{3}\s*$/;
  a = (a.match(re) || [])[1];
  b = (b.match(re) || [])[1];

  return [
    //in js "" evaluates to false
    parseFloat((a || '0').replace(/,/, ".")),
    parseFloat((b || '0').replace(/,/, "."))
  ];
}

let sanitizeForSortingMonth = (key, a, b) => {
  [a, b] = sanitizeForSorting(key, a, b, '');

  return [
    months.indexOf(a.toLowerCase()),
    months.indexOf(b.toLowerCase())
  ];
}

let sortStringAsc = (key, a, b) => {
  [a, b] = sanitizeForSorting(key, a, b, '');

  return a.toString().localeCompare(b.toString());
}

let sortStringDesc = (key, a, b) => {
  [a, b] = sanitizeForSorting(key, a, b, '');

  return b.toString().localeCompare(a.toString());
}

let sortDateAsc = (key, a, b) => {
  return a.get(key) - b.get(key);
}

let sortDateDesc = (key, a, b) => {
  return b.get(key) - a.get(key);
}

let sortMonthAsc = (key, a, b) => {
  [a, b] = sanitizeForSortingMonth(key, a, b);

  return a - b;
}

let sortMonthDesc = (key, a, b) => {
  [a, b] = sanitizeForSortingMonth(key, a, b);

  return b - a;
}

let sortIntegerAsc = (key, a, b) => {
  [a, b] = sanitizeForSorting(key, a, b, 0);

  return parseInt(a) - parseInt(b);
}

let sortIntegerDesc = (key, a, b) => {
  [a, b] = sanitizeForSorting(key, a, b, 0);

  return parseInt(b) - parseInt(a);
}

let sortCurrencyAsc = (key, a, b) => {
  [a, b] = sanitizeForSortingCurrency(key, a, b);

  return a - b;
}

let sortCurrencyDesc = (key, a, b) => {
  [a, b] = sanitizeForSortingCurrency(key, a, b);

  return b - a;
}

let determineSortingFns = (spec) => {
  switch(spec.type) {
  case "string":    return [sortStringAsc,   sortStringDesc];
  case "date":      return [sortDateAsc,     sortDateDesc];
  case "month":     return [sortMonthAsc,    sortMonthDesc];
  case "integer":   return [sortIntegerAsc,  sortIntegerDesc];
  case "currency":  return [sortCurrencyAsc, sortCurrencyDesc];
  default:
    throw `Unrecognized column type: ${spec.type}`
  }
}

module.exports = {
  determineSortingFns: determineSortingFns
}
