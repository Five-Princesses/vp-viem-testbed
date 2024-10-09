import type { Transport, Chain, Account, Client, Abi } from 'viem';
import type {
  ContractFunctionName,
  ContractFunctionArgs,
  ReadContractParameters,
  ReadContractReturnType,
} from 'viem';
import { readContract } from './actions/readContract';
import { getSecurityCouncil } from './actions/getSecurityCouncil';

export type SecurityActionsL1<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
> = {
  /**
   * Calls a read-only function on a contract, and returns the response.
   *
   * - Docs: https://viem.sh/docs/contract/readContract
   * - Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts/reading-contracts
   *
   * @remarks
   * A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.
   *
   * Internally, uses a [Public Client](https://viem.sh/docs/clients/public) to call the [`call` action](https://viem.sh/docs/actions/public/call) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).
   *
   * @param args - {@link ReadContractParameters}
   * @returns The response from the contract. Type is inferred. {@link ReadContractReturnType}
   *
   * @example
   * import { createPublicClient, http, parseAbi } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { readContract } from 'viem/contract'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const result = await client.readContract({
   *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
   *   abi: parseAbi(['function balanceOf(address) view returns (uint256)']),
   *   functionName: 'balanceOf',
   *   args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'],
   * })
   * // 424122n
   */
  readContract: <
    const abi extends Abi | readonly unknown[],
    functionName extends ContractFunctionName<abi, 'pure' | 'view'>,
    args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>,
  >(
    args: ReadContractParameters<abi, functionName, args>
  ) => Promise<ReadContractReturnType<abi, functionName, args>>;
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
      readContract: args => readContract(client, args),
      getSecurityCouncil: args => getSecurityCouncil(client, args),
    };
  };
}
