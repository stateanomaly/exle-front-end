const OneErg = 1000 * 1000 * 1000
export const ergsToNanoErgs = erg => {
  return erg * OneErg
}

export const nanoErgsToErgs = nanoErgs => {
  return nanoErgs / OneErg
}
