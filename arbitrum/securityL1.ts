import type { Transport, Chain, Account, Client } from 'viem';

export type SecurityActionsL1<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = {};

/**
 * A suite of Security Concerend Actions for suited for development with Layer 2 (Arbitrum) chains.
 *
 *
 * @example
 * import { publicActionsL1 } from 'viem/op-stack'
 * import { mainnet } from 'viem/chains'
 *
 * export const opStackPublicClientL1 = createWalletClient({
 *   chain: mainnet,
 *   transport: http(),
 * }).extend(securityActionsL1())
 */
export function securityActionsL1() {
  return <
    transport extends Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
  >(
    client: Client<transport, chain, account>
  ): SecurityActionsL1<chain, account> => {
    return {};
  };
}
