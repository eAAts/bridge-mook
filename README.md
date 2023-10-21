# BridgeMookup

The BridgeMookup is a bridge contract that facilitates the token transfer between different blockchains. Here is the information of the deployed contracts on different blockchains:

| Blockchain                     | BridgeMookup Address                       | USDC Address                               | ETH Address                                |
|--------------------------------|--------------------------------------------|--------------------------------------------|--------------------------------------------|
| **Polygon Mainnet**            | `0x145Bd494088163C70CCfCACdBA987C4477A90e7e` | `0x7269b8e1B0E82A62c20fc57526Bc6f47c9D1BaF8` | `0x2114871A29d2eC9351385D859B318AD8C227A597` |
| **Mantle Testnet**             | `0xAB5cFf6e5201d4F9d22D619BDfF42A817840C6AF`                                        | `0x0cA688EC98360DA3AB0527D30D64CA0182045e73`                                        | `0x405962ef0D4e48D5A2De715e7327e93b11e532C8`                                        |
| **Scroll Testnet**             | `0xeb2cb8dd7985173Ac79deE4e962BB72F2539De1e`                                        | `0x7D1d7fF79433ea4E477e8EC2EA0311aFC6DC390c`                                        | `0xD897f760026E426937fc5c49c79ab6C3339d1EBa`                                        |
| **Filecoin Testnet**           | `0x145Bd494088163C70CCfCACdBA987C4477A90e7e`                                        | `0x7269b8e1B0E82A62c20fc57526Bc6f47c9D1BaF8`                                        | `0x2114871A29d2eC9351385D859B318AD8C227A597`                                        |

These connections allow users to seamlessly transfer tokens across the supported blockchains, ensuring interoperability and expanded usability of the tokens.

## Methods

### sendTokens
```solidity
function sendTokens(
    address tokenAddress,
    address recipient,
    uint256 amount,
    uint256 targetChainId
) external payable
```
Sends tokens from one blockchain to another. The tokenAddress parameter specifies the token's contract address, recipient is the address of the receiver, amount is the number of tokens to be transferred, and targetChainId is the identifier of the target blockchain.

### receiveTokens
```solidity
function receiveTokens(
    address tokenAddress,
    address recipient,
    uint256 amount
) external onlyOwner
```
Receives tokens on the target blockchain. The parameters are the same as sendTokens.

## Prerequisites
- Node.js v14+ LTS and npm (comes with Node)
- Hardhat

## Installation
Clone the repository:

```bash
git clone https://github.com/eAAts/bridge-mook.git
```

Navigate to the project folder:
```bash
cd bridge-mook
```

Install dependencies:
```bash
npm install
```

## Set up configuration:
1. Review the `.example.env` file.
2. Create a `.env` file based on the example and adjust the values as needed.

For Linux or macOS:
```bash
cp .example.env .env
```

For Windows:
```bash
copy .example.env .env
```

## Compilation
Compile the smart contracts using Hardhat:
```bash
npx hardhat compile
```

## Quick Start Guide
### 1. Testing:
Run the following command to execute the contract tests. Make sure you've written the tests in your Hardhat project's `test` directory.
```bash
npx hardhat test
```

### 2. Deployment:
Run the following command to compile the contracts using the Solidity compiler and deploy the BridgeMookup to your chosen network.
```bash
npx hardhat run scripts/deploy.js --network [network name]
```

## Conclusion
If you would like to contribute to the project, please fork the repository, make your changes, and then submit a pull request. We appreciate all contributions and feedback!