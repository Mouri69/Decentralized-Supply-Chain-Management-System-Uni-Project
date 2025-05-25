import { ethers } from 'ethers';
import SupplyChainABI from '../contracts/SupplyChain.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

class ContractService {
  constructor() {
    this.contract = null;
    this.provider = null;
    this.signer = null;
  }

  async init(provider, signer) {
    this.provider = provider;
    this.signer = signer;
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      SupplyChainABI.abi,
      signer
    );
  }

  async addProduct(name, description) {
    if (!this.contract) throw new Error('Contract not initialized');
    const tx = await this.contract.addProduct(name, description);
    return await tx.wait();
  }

  async transferProduct(productId, toAddress, role) {
    if (!this.contract) throw new Error('Contract not initialized');
    const tx = await this.contract.transferProduct(productId, toAddress, role);
    return await tx.wait();
  }

  async getProduct(productId) {
    if (!this.contract) throw new Error('Contract not initialized');
    return await this.contract.getProduct(productId);
  }

  async getAllProducts() {
    if (!this.contract) throw new Error('Contract not initialized');
    return await this.contract.getAllProducts();
  }

  // Event listeners for real-time updates
  onProductAdded(callback) {
    if (!this.contract) throw new Error('Contract not initialized');
    this.contract.on('ProductAdded', (productId, name, description, manufacturer, event) => {
      callback({
        productId: productId.toString(),
        name,
        description,
        manufacturer,
        event
      });
    });
  }

  onProductTransferred(callback) {
    if (!this.contract) throw new Error('Contract not initialized');
    this.contract.on('ProductTransferred', (productId, from, to, role, event) => {
      callback({
        productId: productId.toString(),
        from,
        to,
        role,
        event
      });
    });
  }

  // Cleanup event listeners
  removeAllListeners() {
    if (!this.contract) return;
    this.contract.removeAllListeners();
  }
}

export default new ContractService(); 