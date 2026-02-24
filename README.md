# n8n-nodes-oasys-gaming

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This community node provides comprehensive integration with the Oasys Gaming blockchain ecosystem through n8n. It includes 4 resources with extensive operations for managing staking, verse layers, cross-layer bridging, and game assets within the Oasys network.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Oasys](https://img.shields.io/badge/Oasys-Gaming%20Blockchain-green)
![Web3](https://img.shields.io/badge/Web3-Gaming-purple)
![Layer2](https://img.shields.io/badge/Layer2-Scalable-orange)

## Features

- **Staking Management** - Complete staking operations including delegation, rewards claiming, and validator management
- **Verse Layer Operations** - Deploy and manage custom gaming verse layers with configurable parameters
- **Cross-Layer Bridging** - Seamless asset transfers between Hub Layer and Verse Layers with transaction tracking
- **Game Asset Management** - Mint, transfer, and manage NFTs and fungible tokens for gaming applications
- **Multi-Network Support** - Works with Oasys mainnet and testnet environments
- **Real-time Monitoring** - Track transaction status, staking rewards, and bridge operations
- **Batch Operations** - Perform multiple operations efficiently with built-in error handling
- **Gas Optimization** - Smart gas estimation and fee management for cost-effective transactions

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
| API Key | Your Oasys Gaming API key for authentication | Yes |
| Network | Network environment (mainnet, testnet) | Yes |
| Private Key | Wallet private key for transaction signing | Yes |
| RPC Endpoint | Custom RPC endpoint (optional, uses default if not provided) | No |

## Resources & Operations

### 1. Staking Operations

| Operation | Description |
|-----------|-------------|
| Delegate Tokens | Delegate OAS tokens to a validator |
| Undelegate Tokens | Remove delegated tokens from a validator |
| Claim Rewards | Claim accumulated staking rewards |
| Get Staking Info | Retrieve current staking status and rewards |
| List Validators | Get list of available validators with performance metrics |
| Get Validator Details | Retrieve detailed information about a specific validator |
| Check Delegation Status | Verify delegation status and amounts |
| Calculate Rewards | Estimate potential staking rewards |

### 2. Verse Layer Management

| Operation | Description |
|-----------|-------------|
| Deploy Verse | Deploy a new verse layer with custom configuration |
| Update Verse Config | Modify verse layer parameters and settings |
| Get Verse Info | Retrieve verse layer details and status |
| List Verses | Get all deployed verse layers |
| Pause Verse | Temporarily pause verse layer operations |
| Resume Verse | Resume paused verse layer operations |
| Delete Verse | Permanently remove a verse layer |
| Monitor Verse Health | Check verse layer performance metrics |

### 3. Cross Layer Bridging

| Operation | Description |
|-----------|-------------|
| Bridge To Verse | Transfer assets from Hub Layer to Verse Layer |
| Bridge To Hub | Transfer assets from Verse Layer to Hub Layer |
| Get Bridge Status | Check status of bridge transactions |
| List Bridge History | Retrieve bridge transaction history |
| Estimate Bridge Fees | Calculate bridge transaction costs |
| Cancel Bridge | Cancel pending bridge transaction |
| Fast Bridge | Perform expedited bridge transfer |
| Batch Bridge | Bridge multiple assets in a single transaction |

### 4. Game Asset Management

| Operation | Description |
|-----------|-------------|
| Mint NFT | Create new NFTs for games |
| Transfer NFT | Transfer NFT between addresses |
| Mint Tokens | Create fungible game tokens |
| Transfer Tokens | Transfer fungible tokens |
| Get Asset Info | Retrieve asset metadata and ownership |
| List Assets | Get assets owned by an address |
| Burn Asset | Permanently destroy an asset |
| Set Asset Metadata | Update NFT metadata |
| Approve Asset | Approve asset transfers for marketplace |
| Get Asset History | Retrieve asset transaction history |

## Usage Examples

```javascript
// Delegate tokens to a validator
{
  "operation": "delegateTokens",
  "validatorAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "amount": "1000",
  "network": "mainnet"
}
```

```javascript
// Deploy a new verse layer for a game
{
  "operation": "deployVerse",
  "verseName": "MyGameVerse",
  "gameContract": "0xabcdef1234567890abcdef1234567890abcdef12",
  "stakingAmount": "10000",
  "validators": 5
}
```

```javascript
// Bridge game tokens to verse layer
{
  "operation": "bridgeToVerse",
  "tokenAddress": "0x9876543210fedcba9876543210fedcba98765432",
  "amount": "500",
  "verseId": "verse_12345",
  "recipient": "0xfedcba0987654321fedcba0987654321fedcba09"
}
```

```javascript
// Mint gaming NFTs
{
  "operation": "mintNFT",
  "contractAddress": "0x5555666677778888999900001111222233334444",
  "recipient": "0x1111222233334444555566667777888899990000",
  "tokenURI": "https://mygame.com/nft/metadata/123",
  "attributes": {
    "rarity": "legendary",
    "power": 95
  }
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| INVALID_API_KEY | API key is missing or invalid | Verify API key in credentials configuration |
| INSUFFICIENT_BALANCE | Wallet has insufficient funds for transaction | Check wallet balance and ensure adequate OAS tokens |
| NETWORK_ERROR | Connection to Oasys network failed | Check network status and RPC endpoint configuration |
| TRANSACTION_FAILED | Blockchain transaction was rejected | Verify transaction parameters and gas settings |
| BRIDGE_TIMEOUT | Bridge operation exceeded timeout limit | Check bridge status and retry if necessary |
| VERSE_NOT_FOUND | Specified verse layer does not exist | Verify verse ID and deployment status |

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
- **Oasys Documentation**: [Oasys Developer Docs](https://docs.oasys.games)
- **Oasys Discord**: [Oasys Gaming Community](https://discord.gg/oasys)