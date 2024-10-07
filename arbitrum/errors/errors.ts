import { BaseError } from 'viem';

// TODO: Implement Erorrs like below format.
export class SnippetNotFoundError extends BaseError {
  constructor() {
    super('Snippet not found.', { name: 'SnippetNotFoundError' });
  }
}
