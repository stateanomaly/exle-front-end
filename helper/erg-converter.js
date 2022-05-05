const OneErg = 1000 * 1000 * 1000
export const ergsToNanoErgs = (erg) => {
  return erg * OneErg
}

export const nanoErgsToErgs = (nanoErgs) => {
  return nanoErgs / OneErg
}

// Ergo-Raffle
const deadlineString = (deadline, currentHeight) => {
  if (deadline > currentHeight && deadline - currentHeight < 30)
    return `Block ${deadline}, about ${(deadline - currentHeight) * 2} minutes`
  else if (deadline > currentHeight && deadline - currentHeight < 60)
    return `Block ${deadline}, about an hour`
  else if (deadline > currentHeight && deadline - currentHeight < 720)
    return `Block ${deadline}, about ${Math.round(
      (deadline - currentHeight) / 30
    )} hours`
  else if (deadline > currentHeight)
    return `Block ${deadline}, about ${Math.round(
      (deadline - currentHeight) / 720
    )} days`
  else return `Ended`
}

export const compiledWalletString = (ergoWalletAddress) => {
  let frontWalletString = ergoWalletAddress.slice(0, 4)
  let endWalletString = ergoWalletAddress.slice(-5)
  let compiledWalletString = frontWalletString + '...' + endWalletString
  return compiledWalletString
}
