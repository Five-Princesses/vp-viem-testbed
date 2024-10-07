import type { Transport, Chain, Account, Client, Address } from 'viem';

export type GetSecurityCouncilReturnType = {
  members: Address[];
};

// TODO: Implement legit tsdoc and {getSecurityCouncil} function
/**
 * Retrieves a valid Members of Security Council on an L2.
 *
 * @returns A valid dispute game. {@link GetSecurityCouncilReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet, arbitrum } from 'viem/chains'
 *
 * const publicClientL1 = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const members = await getGameSecurityCouncil(publicClientL1, {
 *   l2BlockNumber: 69420n,
 *   targetChain: arbitrum
 * })
 */
export async function getSecurityCouncil<
  chain extends Chain | undefined,
  account extends Account | undefined,
  chainOverride extends Chain | undefined = undefined,
>(
  client: Client<Transport, chain, account>
): Promise<GetSecurityCouncilReturnType> {
  // if (!game) throw new GameNotFoundError();
  return game;
}
