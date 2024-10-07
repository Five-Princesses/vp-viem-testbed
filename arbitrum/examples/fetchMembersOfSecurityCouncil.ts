import { ReadContractErrorType } from 'viem';
import { mainnetPublicClient } from '../../clients/publicClient';

const abi = [
  {
    inputs: [],
    name: 'getOwners',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export default async function fetchMembersOfSecurityCouncil() {
  try {
    const members = await mainnetPublicClient.readContract({
      address: '0xF06E95eF589D9c38af242a8AAee8375f14023F85',
      abi,
      functionName: 'getOwners',
    });

    console.log(members);
  } catch (e) {
    const error = e as ReadContractErrorType;

    console.log(error.name);
  }
}
