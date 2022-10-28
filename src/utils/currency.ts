const formatter = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
})

export const formatCurrency = (price: number) => {
  return formatter.format(price)
}
