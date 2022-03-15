import { Address } from '@ergolabs/ergo-sdk'
import { from, map, zip } from 'rxjs'

const getUsedAddresses = () => {
  from(ergo.get_used_addresses())
}

const getUnusedAddresses = () => {
  from(ergo.get_unused_addresses())
}

export const getAddresses = () => {
  zip(getUsedAddresses(), getUnusedAddresses()).pipe(
    map(([usedAddrs, unusedAddrs]) => unusedAddrs.concat(usedAddrs))
  )
}
