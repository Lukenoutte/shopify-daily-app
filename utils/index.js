export const objectToQueryString = (params) => {
  return Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]),
    )
    .join("&");
};

export const columnProducts = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "vendor",
    label: "Vendor",
  },
  {
    key: "publishedAt",
    label: "Published At",
  },
  {
    key: "updatedAt",
    label: "Updated At",
  },
];

export const columnVariants = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "priceCurrency",
    label: "Currency",
  },
  {
    key: "weight",
    label: "Weight",
  },
  {
    key: "taxable",
    label: "Taxable",
  },
  {
    key: "requiresShipping",
    label: "Requires Shipping",
  },
];

export const prices = [
  {
    name: "$ 5",
    value: "5",
  },
  {
    name: "$ 10",
    value: "10",
  },
  {
    name: "$ 20",
    value: "20",
  },
  {
    name: "$ 100",
    value: "100",
  },
  {
    name: "$ 200",
    value: "200",
  },
  {
    name: "$ 500",
    value: "500",
  },
  {
    name: "$ 1.000",
    value: "1000",
  },
  {
    name: "$ 10.000",
    value: "10000",
  },
];
