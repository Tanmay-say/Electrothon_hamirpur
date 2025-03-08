import { useState, useEffect, useRef } from 'react';
import { WalletBuilder } from '@midnight-ntwrk/wallet';

// Use CommonJS require syntax for zswap
const zswap = require('@midnight-ntwrk/zswap');

const walletConfig = {
  indexerUrl: 'https://indexer.testnet-02.midnight.network/api/v1/graphql',
  indexerWsUrl: 'wss://indexer.testnet-02.midnight.network/api/v1/graphql',
  provingServerUrl: 'http://localhost:6300',
  nodeUrl: 'https://rpc.testnet-02.midnight.network',
  networkId: zswap.NetworkId.TestNet
};

export default function App() {
  const [balance, setBalance] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const walletRef = useRef<any>(null);

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const newWallet = await WalletBuilder.build(
          walletConfig.indexerUrl,
          walletConfig.indexerWsUrl,
          walletConfig.provingServerUrl,
          walletConfig.nodeUrl,
          walletConfig.networkId
        );
        newWallet.start();
        walletRef.current = newWallet;
      } catch (err) {
        setError('Failed to initialize wallet');
        console.error(err);
      }
    };

    initializeWallet();

    return () => {
      if (walletRef.current) {
        walletRef.current.close();
      }
    };
  }, []);

  const handleGetBalance = async () => {
    if (!walletRef.current) return;

    setIsLoading(true);
    try {
      const subscription = walletRef.current.state().subscribe((state: any) => {
        try {
          const nativeBalance = state.balances.get(zswap.nativeToken());
          setBalance(nativeBalance?.toString() || '0');
          subscription.unsubscribe();
        } catch (err) {
          setError('Error reading balance');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      });
    } catch (err) {
      setError('Failed to fetch balance');
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Midnight Wallet Connector</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <button 
        onClick={handleGetBalance}
        disabled={!walletRef.current || isLoading}
        style={{ margin: '20px 0', padding: '10px 20px' }}
      >
        {isLoading ? 'Loading...' : 'Show Native Token Balance'}
      </button>
      
      {balance && (
        <div>
          <h2>Native Token (tDUST) Balance:</h2>
          <p>{balance}</p>
        </div>
      )}
    </div>
  );
}