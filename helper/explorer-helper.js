import { explorerAddressUri } from '../config/path'

export const getExplorerAddressUri = pk => {
  return explorerAddressUri + pk
}
