import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractService from '../services/contractService';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask to use this application');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();
      const signer = await provider.getSigner();

      setAccount(accounts[0]);
      setChainId(network.chainId);
      setProvider(provider);

      // Initialize contract service
      await contractService.init(provider, signer);

      // Listen for account changes
      window.ethereum.on('accountsChanged', async (accounts) => {
        setAccount(accounts[0]);
        const signer = await provider.getSigner();
        await contractService.init(provider, signer);
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', (chainId) => {
        setChainId(chainId);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setProvider(null);
    contractService.removeAllListeners();
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      const checkConnection = async () => {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const network = await provider.getNetwork();
            const signer = await provider.getSigner();
            setAccount(accounts[0]);
            setChainId(network.chainId);
            setProvider(provider);
            await contractService.init(provider, signer);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      };
      checkConnection();
    }
  }, []);

  const value = {
    account,
    chainId,
    provider,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}; 