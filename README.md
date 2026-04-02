# n8n-nodes-oasys-gaming

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

An n8n community node for interacting with the Oasys blockchain gaming ecosystem. This node provides 6 comprehensive resources for managing gaming-focused blockchain operations including account management, transaction processing, block data retrieval, staking operations, cross-chain bridging, and verse layer interactions.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Oasys-green)
![Gaming](https://img.shields.io/badge/Gaming-Web3-purple)
![DeFi](https://img.shields.io/badge/DeFi-Staking-orange)

## Features

- **Account Management** - Create, retrieve, and manage Oasys gaming accounts with balance tracking and transaction history
- **Transaction Processing** - Send, receive, and monitor blockchain transactions with gaming-specific metadata handling
- **Block Data Access** - Query block information, transaction lists, and network statistics for analysis and monitoring
- **Staking Operations** - Manage validator staking, delegation, rewards claiming, and staking pool interactions
- **Bridge Functionality** - Execute cross-chain transfers between Oasys Hub Layer and various Verse Layers
- **Verse Layer Integration** - Interact with game-specific verse layers including smart contract deployment and execution
- **Real-time Monitoring** - Track network events, transaction confirmations, and validator activities
- **Gaming Analytics** - Access gaming-specific metrics, player statistics, and tokenomics data

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-oasys-gaming`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-oasys-gaming
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-oasys-gaming.git
cd n8n-nodes-oasys-gaming
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-oasys-gaming
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Oasys API key for authentication | Yes |
| Environment | Network environment (mainnet/testnet) | Yes |
| Endpoint URL | Custom RPC endpoint URL (optional) | No |

## Resources & Operations

### 1. Account

| Operation | Description |
|-----------|-------------|
| Get Account | Retrieve account information including balance and transaction count |
| Create Account | Generate new Oasys gaming account with private key management |
| Get Balance | Check OAS token balance for specific account |
| Get Transaction History | Fetch paginated transaction history for account |
| Get Nonce | Retrieve current nonce value for transaction signing |

### 2. Transaction

| Operation | Description |
|-----------|-------------|
| Send Transaction | Broadcast signed transaction to Oasys network |
| Get Transaction | Retrieve transaction details by hash |
| Get Transaction Receipt | Fetch transaction receipt with execution status |
| Estimate Gas | Calculate gas requirements for transaction execution |
| Sign Transaction | Create signed transaction without broadcasting |
| Get Pending Transactions | List pending transactions in mempool |

### 3. Block

| Operation | Description |
|-----------|-------------|
| Get Block | Retrieve block information by number or hash |
| Get Latest Block | Fetch most recent block data |
| Get Block Transactions | List all transactions in specific block |
| Get Block Range | Query multiple blocks within specified range |
| Get Network Stats | Retrieve network statistics and performance metrics |

### 4. Staking

| Operation | Description |
|-----------|-------------|
| Stake Tokens | Delegate OAS tokens to validator node |
| Unstake Tokens | Initiate token unstaking process |
| Claim Rewards | Collect accumulated staking rewards |
| Get Validator Info | Retrieve validator node details and statistics |
| Get Staking Balance | Check delegated stake amount and pending rewards |
| List Validators | Fetch all active validators with performance metrics |

### 5. Bridge

| Operation | Description |
|-----------|-------------|
| Bridge To Verse | Transfer tokens from Hub Layer to Verse Layer |
| Bridge To Hub | Transfer tokens from Verse Layer to Hub Layer |
| Get Bridge Status | Check status of cross-chain transfer |
| Get Bridge History | Retrieve bridge transaction history |
| Estimate Bridge Fee | Calculate fees for cross-chain transfers |

### 6. VerseLayer

| Operation | Description |
|-----------|-------------|
| Deploy Contract | Deploy smart contract to specific Verse Layer |
| Call Contract | Execute read operation on deployed contract |
| Send Contract Transaction | Execute write operation on deployed contract |
| Get Verse Info | Retrieve Verse Layer configuration and statistics |
| List Active Verses | Fetch all available Verse Layers |
| Get Game Metrics | Access game-specific analytics and player data |

## Usage Examples

```javascript
// Get account balance and transaction history
{
  "address": "0x742d35Cc6635C0532925a3b8D9b9EfE9C2C3e4D7",
  "includeHistory": true,
  "limit": 50
}
```

```javascript
// Send gaming transaction with metadata
{
  "to": "0x123abc...",
  "value": "1000000000000000000",
  "gameId": "racing-legends",
  "itemId": "legendary-car-nft",
  "metadata": {
    "action": "purchase",
    "rarity": "legendary"
  }
}
```

```javascript
// Stake tokens to validator
{
  "validatorAddress": "0x456def...",
  "amount": "5000000000000000000000",
  "duration": "30d"
}
```

```javascript
// Bridge tokens to verse layer
{
  "amount": "100000000000000000000",
  "verseId": "sandbox-verse-01",
  "recipient": "0x789ghi...",
  "gameContractAddress": "0xabc123..."
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key is correct and active |
| Insufficient Balance | Account lacks funds for transaction | Check account balance and add funds |
| Gas Limit Exceeded | Transaction requires more gas than specified | Increase gas limit or optimize transaction |
| Validator Not Found | Specified validator address doesn't exist | Use List Validators to find active validators |
| Bridge Limit Exceeded | Transfer amount exceeds bridge limits | Check bridge limits and split transfer |
| Verse Layer Unavailable | Target verse layer is offline or maintenance | Check verse status and retry later |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-oasys-gaming/issues)
- **Oasys Documentation**: [Oasys Developer Portal](https://docs.oasys.games)
- **Gaming Community**: [Oasys Discord](https://discord.gg/oasys)