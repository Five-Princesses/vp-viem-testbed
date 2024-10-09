import type { Transport, Chain, Account, Client } from 'viem';
import { getSecurityCouncil } from './actions/getSecurityCouncil';

export type SecurityActionsL1<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = {
  // TODO: write legit jsdoc
  /**
   * Prepares parameters for a [deposit transaction](https://github.com/ethereum-optimism/optimism/blob/develop/specs/deposits.md) to be initiated on an L1.
   *
   * - Docs: https://viem.sh/op-stack/actions/buildInitiateWithdrawal
   *
   * @param client - Client to use
   * @param parameters - {@link BuildInitiateWithdrawalParameters}
   * @returns Parameters for `depositTransaction`. {@link DepositTransactionReturnType}
   *
   * @example
   * import { createWalletClient, http, parseEther } from 'viem'
   * import { base } from 'viem/chains'
   * import { publicActionsL1 } from 'viem/op-stack'
   *
   * const client = createWalletClient({
   *   chain: base,
   *   transport: http(),
   * }).extend(publicActionsL1())
   *
   * const args = await client.buildInitiateWithdrawal({
   *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
   *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
   *   value: parseEther('1'),
   * })
   */
  getSecurityCouncil: <chainOverride extends Chain | undefined = undefined>(
    parameters: GetSecurityCouncilParameters<
      chain,
      account,
      chainOverride,
      accountOverride
    >
  ) => Promise<GetSecurityCouncilReturnType<account, accountOverride>>;
};

/**
 * A suite of Security Concerend Actions for suited for development with Layer 2 (Arbitrum) chains.
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
    return {
      getSecurityCouncil: args => getSecurityCouncil(client, args),
    };
  };
}
