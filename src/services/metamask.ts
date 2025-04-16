
/**
 * Represents the user's Ethereum account.
 */
export interface EthereumAccount {
  /**
   * The address of the Ethereum account.
   */
  address: string;
}

/**
 * Asynchronously connects to MetaMask and retrieves the user's Ethereum account.
 *
 * @returns A promise that resolves to an EthereumAccount object containing the user's address.
 */
export async function connectToMetaMask(): Promise<EthereumAccount | null> {
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask is not installed!');
    return null;
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
    if (accounts.length === 0) {
      console.log('No account found, please connect to MetaMask.');
      return null;
    }

    const account = accounts[0];
    console.log('Authorized account:', account);

    return { address: account };
  } catch (error: any) {
    console.error("Could not connect to MetaMask:", error);
    // Check if the error is because the user rejected the connection
    if (error.code === 4001) {
      console.log('User rejected connection to MetaMask');
    } else {
      console.error(error);
    }
    return null;
  }
}

/**
 * Represents a transaction hash.
 */
export interface TransactionResult {
  /**
   * The transaction hash.
   */
  hash: string;
}

/**
 * Asynchronously sends an Ethereum transaction.
 *
 * @param toAddress The recipient address.
 * @param amount The amount to send in Ether.
 * @returns A promise that resolves to a TransactionResult object containing the transaction hash.
 */
export async function sendTransaction(toAddress: string, amount: number): Promise<TransactionResult | null> {
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask is not installed!');
    return null;
  }

  try {
    // Convert amount to Wei (smallest unit of Ether)
    const amountInWei = `0x${(amount * 10**18).toString(16)}`;

    // Construct the transaction object
    const transactionParameters = {
      to: toAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      value: amountInWei, // Only send 0.0001 ETH
      gas: '0x76c0', // 30400,
      chainId: '0xaa36a7', // Sepolia chain ID
    };

    // Sign the transaction via Metamask
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    console.log('Transaction hash:', txHash);
    return { hash: txHash as string };
  } catch (error) {
    console.error("Could not send transaction:", error);
    return null;
  }
}
