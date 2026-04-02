/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-oasysgaming/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class OasysGaming implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Oasys Gaming',
    name: 'oasysgaming',
    icon: 'file:oasysgaming.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Oasys Gaming API',
    defaults: {
      name: 'Oasys Gaming',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'oasysgamingApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Account',
            value: 'account',
          },
          {
            name: 'Transaction',
            value: 'transaction',
          },
          {
            name: 'Block',
            value: 'block',
          },
          {
            name: 'Staking',
            value: 'staking',
          },
          {
            name: 'Bridge',
            value: 'bridge',
          },
          {
            name: 'VerseLayer',
            value: 'verseLayer',
          },
          {
            name: 'StakingOperations',
            value: 'stakingOperations',
          },
          {
            name: 'VerseLayerManagement',
            value: 'verseLayerManagement',
          },
          {
            name: 'CrossLayerBridging',
            value: 'crossLayerBridging',
          },
          {
            name: 'GameAssetManagement',
            value: 'gameAssetManagement',
          }
        ],
        default: 'account',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['account'] } },
  options: [
    { name: 'Get Balance', value: 'getBalance', description: 'Get account balance in OAS tokens', action: 'Get balance' },
    { name: 'Get Transaction Count', value: 'getTransactionCount', description: 'Get account nonce/transaction count', action: 'Get transaction count' },
    { name: 'Get Code', value: 'getCode', description: 'Get contract code at address', action: 'Get code' },
    { name: 'List Accounts', value: 'listAccounts', description: 'List available accounts', action: 'List accounts' }
  ],
  default: 'getBalance',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['transaction'],
		},
	},
	options: [
		{
			name: 'Send Transaction',
			value: 'sendTransaction',
			description: 'Send a transaction to the Oasys blockchain',
			action: 'Send transaction',
		},
		{
			name: 'Send Raw Transaction',
			value: 'sendRawTransaction',
			description: 'Send a signed raw transaction to the Oasys blockchain',
			action: 'Send raw transaction',
		},
		{
			name: 'Get Transaction',
			value: 'getTransaction',
			description: 'Get transaction details by hash',
			action: 'Get transaction',
		},
		{
			name: 'Get Transaction Receipt',
			value: 'getTransactionReceipt',
			description: 'Get transaction receipt by hash',
			action: 'Get transaction receipt',
		},
		{
			name: 'Estimate Gas',
			value: 'estimateGas',
			description: 'Estimate gas required for a transaction',
			action: 'Estimate gas',
		},
	],
	default: 'sendTransaction',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['block'] } },
  options: [
    { name: 'Get Block By Number', value: 'getBlockByNumber', description: 'Get block information by block number', action: 'Get block by number' },
    { name: 'Get Block By Hash', value: 'getBlockByHash', description: 'Get block information by block hash', action: 'Get block by hash' },
    { name: 'Get Current Block Number', value: 'getCurrentBlockNumber', description: 'Get the current block number', action: 'Get current block number' },
    { name: 'Get Block Transaction Count', value: 'getBlockTransactionCount', description: 'Get transaction count in a block by block number', action: 'Get block transaction count' }
  ],
  default: 'getBlockByNumber',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['staking'] } },
  options: [
    { name: 'Get Stake Info', value: 'getStakeInfo', description: 'Get staking information for address', action: 'Get stake info' },
    { name: 'Get Validator Info', value: 'getValidatorInfo', description: 'Get validator details and status', action: 'Get validator info' },
    { name: 'Get Rewards', value: 'getRewards', description: 'Get staking rewards for delegator', action: 'Get rewards' },
    { name: 'Delegate Stake', value: 'delegateStake', description: 'Delegate OAS tokens to validator', action: 'Delegate stake' },
    { name: 'Undelegate Stake', value: 'undelegateStake', description: 'Undelegate staked OAS tokens', action: 'Undelegate stake' },
  ],
  default: 'getStakeInfo',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['bridge'] } },
  options: [
    { name: 'Get Bridge Status', value: 'getBridgeStatus', description: 'Check bridge transaction status', action: 'Get bridge status' },
    { name: 'Deposit To L2', value: 'depositToL2', description: 'Deposit assets from Hub to Verse L2', action: 'Deposit to L2' },
    { name: 'Withdraw From L2', value: 'withdrawFromL2', description: 'Withdraw assets from Verse L2 to Hub', action: 'Withdraw from L2' },
    { name: 'Get Bridge Events', value: 'getBridgeEvents', description: 'Get bridge-related events', action: 'Get bridge events' },
    { name: 'Get Bridge Fee', value: 'getBridgeFee', description: 'Get current bridging fees', action: 'Get bridge fee' }
  ],
  default: 'getBridgeStatus',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: { show: { resource: ['verseLayer'] } },
	options: [
		{ name: 'Get Chain ID', value: 'getChainId', description: 'Get Verse chain ID', action: 'Get chain ID' },
		{ name: 'Get Game Assets', value: 'getGameAssets', description: 'Query game asset information on Verse', action: 'Get game assets' },
		{ name: 'Transfer Game Asset', value: 'transferGameAsset', description: 'Transfer game assets on Verse', action: 'Transfer game asset' },
		{ name: 'Get Game Events', value: 'getGameEvents', description: 'Get game-related events', action: 'Get game events' },
		{ name: 'Get Verse Info', value: 'getVerseInfo', description: 'Get Verse L2 chain information', action: 'Get verse info' },
	],
	default: 'getChainId',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['stakingOperations'],
    },
  },
  options: [
    {
      name: 'Delegate Stake',
      value: 'delegateStake',
      description: 'Delegate OAS tokens to validator',
      action: 'Delegate stake to validator',
    },
    {
      name: 'Get Staked Amount',
      value: 'getStakedAmount',
      description: 'Get current staked amount for address',
      action: 'Get staked amount',
    },
    {
      name: 'Get Validator Info',
      value: 'getValidatorInfo',
      description: 'Get validator details and commission',
      action: 'Get validator information',
    },
    {
      name: 'Undelegate Stake',
      value: 'undelegateStake',
      description: 'Remove delegation from validator',
      action: 'Undelegate stake from validator',
    },
    {
      name: 'Get Pending Rewards',
      value: 'getPendingRewards',
      description: 'Get claimable staking rewards',
      action: 'Get pending rewards',
    },
    {
      name: 'Claim Rewards',
      value: 'claimRewards',
      description: 'Claim accumulated staking rewards',
      action: 'Claim staking rewards',
    },
    {
      name: 'Get All Validators',
      value: 'getAllValidators',
      description: 'Get list of all active validators',
      action: 'Get all validators',
    },
  ],
  default: 'delegateStake',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
    },
  },
  options: [
    {
      name: 'Get Verse Info',
      value: 'getVerseInfo',
      description: 'Get Verse L2 chain information',
      action: 'Get Verse information',
    },
    {
      name: 'Deploy Verse',
      value: 'deployVerse',
      description: 'Deploy new Verse L2 chain',
      action: 'Deploy new Verse',
    },
    {
      name: 'Get Verse Validators',
      value: 'getVerseValidators',
      description: 'Get validator set for specific Verse',
      action: 'Get Verse validators',
    },
    {
      name: 'Update Verse Config',
      value: 'updateVerseConfig',
      description: 'Update Verse chain parameters',
      action: 'Update Verse configuration',
    },
    {
      name: 'Get Verse Stats',
      value: 'getVerseStats',
      description: 'Get transaction and block statistics',
      action: 'Get Verse statistics',
    },
    {
      name: 'List All Verses',
      value: 'listAllVerses',
      description: 'Get all deployed Verse chains',
      action: 'List all Verses',
    },
  ],
  default: 'getVerseInfo',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
    },
  },
  options: [
    {
      name: 'Initiate Deposit',
      value: 'initiateDeposit',
      description: 'Start deposit from Hub to Verse L2',
      action: 'Initiate deposit from Hub to Verse L2',
    },
    {
      name: 'Initiate Withdrawal',
      value: 'initiateWithdrawal',
      description: 'Start withdrawal from Verse L2 to Hub',
      action: 'Initiate withdrawal from Verse L2 to Hub',
    },
    {
      name: 'Get Bridge Status',
      value: 'getBridgeStatus',
      description: 'Check status of bridge transaction',
      action: 'Get bridge transaction status',
    },
    {
      name: 'Finalize Withdrawal',
      value: 'finalizeWithdrawal',
      description: 'Complete L2 to L1 withdrawal',
      action: 'Finalize L2 to L1 withdrawal',
    },
    {
      name: 'Get Bridge Balance',
      value: 'getBridgeBalance',
      description: 'Get locked balance in bridge contract',
      action: 'Get bridge balance',
    },
    {
      name: 'Get Pending Withdrawals',
      value: 'getPendingWithdrawals',
      description: 'Get pending withdrawal requests',
      action: 'Get pending withdrawals',
    },
    {
      name: 'Claim Bridged Tokens',
      value: 'claimBridgedTokens',
      description: 'Claim tokens after bridge completion',
      action: 'Claim bridged tokens',
    },
  ],
  default: 'initiateDeposit',
},
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
    },
  },
  options: [
    {
      name: 'Mint Game Asset',
      value: 'mintGameAsset',
      description: 'Mint new gaming NFT or token',
      action: 'Mint game asset',
    },
    {
      name: 'Get Asset Metadata',
      value: 'getAssetMetadata',
      description: 'Get metadata for game asset',
      action: 'Get asset metadata',
    },
    {
      name: 'Transfer Asset',
      value: 'transferAsset',
      description: 'Transfer game asset between addresses',
      action: 'Transfer asset',
    },
    {
      name: 'Get User Assets',
      value: 'getUserAssets',
      description: 'Get all assets owned by user',
      action: 'Get user assets',
    },
    {
      name: 'Burn Asset',
      value: 'burnAsset',
      description: 'Burn/destroy game asset',
      action: 'Burn asset',
    },
    {
      name: 'Get Asset History',
      value: 'getAssetHistory',
      description: 'Get transfer history for asset',
      action: 'Get asset history',
    },
  ],
  default: 'mintGameAsset',
},
{
  displayName: 'Address',
  name: 'address',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getBalance', 'getTransactionCount', 'getCode']
    }
  },
  default: '',
  description: 'The Ethereum address to query',
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'options',
  options: [
    { name: 'Latest', value: 'latest' },
    { name: 'Earliest', value: 'earliest' },
    { name: 'Pending', value: 'pending' },
    { name: 'Custom', value: 'custom' }
  ],
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getBalance', 'getTransactionCount', 'getCode']
    }
  },
  default: 'latest',
  description: 'The block number to query at',
},
{
  displayName: 'Custom Block Number',
  name: 'customBlockNumber',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['account'],
      operation: ['getBalance', 'getTransactionCount', 'getCode'],
      blockNumber: ['custom']
    }
  },
  default: '',
  description: 'Custom block number in hex format (e.g., 0x1b4)',
},
{
	displayName: 'Transaction Object',
	name: 'transaction',
	type: 'json',
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['sendTransaction', 'estimateGas'],
		},
	},
	default: '{\n  "to": "0x...",\n  "value": "0x0",\n  "gas": "0x5208",\n  "gasPrice": "0x9184e72a000",\n  "data": "0x"\n}',
	description: 'The transaction object containing to, value, gas, gasPrice, and data fields',
	placeholder: 'Enter transaction object as JSON',
	required: true,
},
{
	displayName: 'Signed Transaction Data',
	name: 'signedTransactionData',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['sendRawTransaction'],
		},
	},
	default: '',
	description: 'The signed raw transaction data in hex format',
	placeholder: '0x...',
	required: true,
},
{
	displayName: 'Transaction Hash',
	name: 'transactionHash',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['transaction'],
			operation: ['getTransaction', 'getTransactionReceipt'],
		},
	},
	default: '',
	description: 'The transaction hash to look up',
	placeholder: '0x...',
	required: true,
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['block'],
      operation: ['getBlockByNumber', 'getBlockTransactionCount']
    }
  },
  default: 'latest',
  placeholder: 'latest, earliest, pending, or hex number (e.g., 0x1b4)',
  description: 'The block number in hex format, or "latest", "earliest", "pending"',
},
{
  displayName: 'Block Hash',
  name: 'blockHash',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['block'],
      operation: ['getBlockByHash']
    }
  },
  default: '',
  placeholder: '0x...',
  description: 'The hash of the block',
},
{
  displayName: 'Include Transactions',
  name: 'includeTransactions',
  type: 'boolean',
  displayOptions: {
    show: {
      resource: ['block'],
      operation: ['getBlockByNumber', 'getBlockByHash']
    }
  },
  default: false,
  description: 'Whether to include full transaction objects or just transaction hashes',
},
{
  displayName: 'Contract Call',
  name: 'contractCall',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getStakeInfo', 'getValidatorInfo', 'getRewards']
    }
  },
  default: '{}',
  description: 'The contract call data in JSON format'
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['getStakeInfo', 'getValidatorInfo', 'getRewards']
    }
  },
  default: 'latest',
  description: 'Block number to query (hex string or "latest")'
},
{
  displayName: 'Transaction',
  name: 'transaction',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['staking'],
      operation: ['delegateStake', 'undelegateStake']
    }
  },
  default: '{}',
  description: 'Transaction data in JSON format'
},
{
  displayName: 'Contract Call Data',
  name: 'contractCall',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['bridge'], operation: ['getBridgeStatus'] } },
  default: '{"to":"","data":""}',
  description: 'Contract call data for bridge status check'
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['bridge'], operation: ['getBridgeStatus'] } },
  default: 'latest',
  description: 'Block number for the call (latest, earliest, pending, or hex number)'
},
{
  displayName: 'Transaction Data',
  name: 'transaction',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['bridge'], operation: ['depositToL2', 'withdrawFromL2'] } },
  default: '{"from":"","to":"","value":"","data":"","gas":"","gasPrice":""}',
  description: 'Transaction data for deposit/withdrawal operation'
},
{
  displayName: 'Filter',
  name: 'filter',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['bridge'], operation: ['getBridgeEvents'] } },
  default: '{"fromBlock":"","toBlock":"","address":"","topics":[]}',
  description: 'Filter parameters for bridge events'
},
{
  displayName: 'Bridge Fee Contract Call',
  name: 'contractCall',
  type: 'json',
  required: true,
  displayOptions: { show: { resource: ['bridge'], operation: ['getBridgeFee'] } },
  default: '{"to":"","data":""}',
  description: 'Contract call data for bridge fee inquiry'
},
{
  displayName: 'Block Number',
  name: 'blockNumber',
  type: 'string',
  required: false,
  displayOptions: { show: { resource: ['bridge'], operation: ['getBridgeFee'] } },
  default: 'latest',
  description: 'Block number for the call (latest, earliest, pending, or hex number)'
},
{
	displayName: 'Contract Call',
	name: 'contractCall',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['verseLayer'],
			operation: ['getGameAssets', 'getVerseInfo'],
		},
	},
	default: '{}',
	description: 'Contract call parameters including to, data, and other fields',
},
{
	displayName: 'Block Number',
	name: 'blockNumber',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['verseLayer'],
			operation: ['getGameAssets', 'getVerseInfo'],
		},
	},
	default: 'latest',
	description: 'Block number to query (hex string or "latest")',
},
{
	displayName: 'Transaction',
	name: 'transaction',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['verseLayer'],
			operation: ['transferGameAsset'],
		},
	},
	default: '{}',
	description: 'Transaction object with to, value, data, and other fields',
},
{
	displayName: 'Filter',
	name: 'filter',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['verseLayer'],
			operation: ['getGameEvents'],
		},
	},
	default: '{}',
	description: 'Filter parameters for log queries including address, topics, fromBlock, toBlock',
},
{
  displayName: 'Network',
  name: 'network',
  type: 'options',
  options: [
    {
      name: 'Mainnet',
      value: 'mainnet',
    },
    {
      name: 'Testnet',
      value: 'testnet',
    },
  ],
  default: 'mainnet',
  description: 'The network to connect to',
},
{
  displayName: 'Validator Address',
  name: 'validatorAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['stakingOperations'],
      operation: ['delegateStake', 'getStakedAmount', 'getValidatorInfo', 'undelegateStake'],
    },
  },
  default: '',
  description: 'The validator address',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['stakingOperations'],
      operation: ['delegateStake', 'undelegateStake'],
    },
  },
  default: '',
  description: 'Amount in wei to delegate or undelegate',
},
{
  displayName: 'Gas Price',
  name: 'gasPrice',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['stakingOperations'],
      operation: ['delegateStake'],
    },
  },
  default: '',
  description: 'Gas price in wei (optional)',
},
{
  displayName: 'Delegator Address',
  name: 'delegatorAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['stakingOperations'],
      operation: ['getStakedAmount', 'getPendingRewards', 'claimRewards'],
    },
  },
  default: '',
  description: 'The delegator address',
},
{
  displayName: 'Private Key',
  name: 'privateKey',
  type: 'string',
  typeOptions: {
    password: true,
  },
  required: true,
  displayOptions: {
    show: {
      resource: ['stakingOperations'],
      operation: ['delegateStake', 'undelegateStake', 'claimRewards'],
    },
  },
  default: '',
  description: 'Private key for signing transactions',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['getVerseInfo'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'Verse Configuration',
  name: 'verseConfig',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['deployVerse'],
    },
  },
  default: '{}',
  description: 'Configuration object for the new Verse L2 chain',
},
{
  displayName: 'Initial Validators',
  name: 'initialValidators',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['deployVerse'],
    },
  },
  default: '[]',
  description: 'Array of initial validator addresses for the Verse',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['getVerseValidators'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['updateVerseConfig'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'New Configuration',
  name: 'newConfig',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['updateVerseConfig'],
    },
  },
  default: '{}',
  description: 'New configuration object for the Verse chain',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['getVerseStats'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'Time Range',
  name: 'timeRange',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['verseLayerManagement'],
      operation: ['getVerseStats'],
    },
  },
  default: '{}',
  description: 'Time range object for statistics query',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateDeposit'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateDeposit'],
    },
  },
  default: '',
  description: 'Amount to deposit (in Wei)',
},
{
  displayName: 'Recipient',
  name: 'recipient',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateDeposit'],
    },
  },
  default: '',
  description: 'Recipient address on Verse L2',
},
{
  displayName: 'From Address',
  name: 'fromAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateDeposit'],
    },
  },
  default: '',
  description: 'Sender address on Hub Layer',
},
{
  displayName: 'Private Key',
  name: 'privateKey',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateDeposit'],
    },
  },
  default: '',
  description: 'Private key for transaction signing',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateWithdrawal'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'Amount',
  name: 'amount',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateWithdrawal'],
    },
  },
  default: '',
  description: 'Amount to withdraw (in Wei)',
},
{
  displayName: 'Recipient',
  name: 'recipient',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateWithdrawal'],
    },
  },
  default: '',
  description: 'Recipient address on Hub Layer',
},
{
  displayName: 'From Address',
  name: 'fromAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateWithdrawal'],
    },
  },
  default: '',
  description: 'Sender address on Verse L2',
},
{
  displayName: 'Private Key',
  name: 'privateKey',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['initiateWithdrawal'],
    },
  },
  default: '',
  description: 'Private key for transaction signing',
},
{
  displayName: 'Transaction Hash',
  name: 'transactionHash',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['getBridgeStatus'],
    },
  },
  default: '',
  description: 'Hash of the bridge transaction',
},
{
  displayName: 'Direction',
  name: 'direction',
  type: 'options',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['getBridgeStatus'],
    },
  },
  options: [
    {
      name: 'Deposit',
      value: 'deposit',
    },
    {
      name: 'Withdrawal',
      value: 'withdrawal',
    },
  ],
  default: 'deposit',
  description: 'Direction of the bridge transaction',
},
{
  displayName: 'Withdrawal ID',
  name: 'withdrawalId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['finalizeWithdrawal'],
    },
  },
  default: '',
  description: 'ID of the withdrawal to finalize',
},
{
  displayName: 'Merkle Proof',
  name: 'merkleProof',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['finalizeWithdrawal'],
    },
  },
  default: '',
  description: 'Merkle proof for withdrawal validation',
},
{
  displayName: 'From Address',
  name: 'fromAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['finalizeWithdrawal'],
    },
  },
  default: '',
  description: 'Address finalizing the withdrawal',
},
{
  displayName: 'Private Key',
  name: 'privateKey',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['finalizeWithdrawal'],
    },
  },
  default: '',
  description: 'Private key for transaction signing',
},
{
  displayName: 'User Address',
  name: 'userAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['getBridgeBalance'],
    },
  },
  default: '',
  description: 'User address to check balance for',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['getBridgeBalance'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'User Address',
  name: 'userAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['getPendingWithdrawals'],
    },
  },
  default: '',
  description: 'User address to check pending withdrawals for',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['getPendingWithdrawals'],
    },
  },
  default: '',
  description: 'The Verse L2 chain identifier',
},
{
  displayName: 'Claim ID',
  name: 'claimId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['claimBridgedTokens'],
    },
  },
  default: '',
  description: 'ID of the tokens to claim',
},
{
  displayName: 'Signature',
  name: 'signature',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['claimBridgedTokens'],
    },
  },
  default: '',
  description: 'Signature for claim validation',
},
{
  displayName: 'From Address',
  name: 'fromAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['claimBridgedTokens'],
    },
  },
  default: '',
  description: 'Address claiming the tokens',
},
{
  displayName: 'Private Key',
  name: 'privateKey',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['crossLayerBridging'],
      operation: ['claimBridgedTokens'],
    },
  },
  default: '',
  description: 'Private key for transaction signing',
},
{
  displayName: 'Contract Address',
  name: 'contractAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['mintGameAsset'],
    },
  },
  default: '',
  description: 'The smart contract address for the game asset',
},
{
  displayName: 'Recipient Address',
  name: 'recipient',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['mintGameAsset'],
    },
  },
  default: '',
  description: 'The recipient address for the newly minted asset',
},
{
  displayName: 'Token Data',
  name: 'tokenData',
  type: 'json',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['mintGameAsset'],
    },
  },
  default: '{}',
  description: 'Token metadata and properties as JSON',
},
{
  displayName: 'Private Key',
  name: 'privateKey',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['mintGameAsset', 'transferAsset', 'burnAsset'],
    },
  },
  default: '',
  description: 'Private key for signing the transaction',
},
{
  displayName: 'Contract Address',
  name: 'contractAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['getAssetMetadata'],
    },
  },
  default: '',
  description: 'The smart contract address for the game asset',
},
{
  displayName: 'Token ID',
  name: 'tokenId',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['getAssetMetadata', 'transferAsset', 'burnAsset', 'getAssetHistory'],
    },
  },
  default: '',
  description: 'The unique identifier for the token',
},
{
  displayName: 'Contract Address',
  name: 'contractAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['transferAsset'],
    },
  },
  default: '',
  description: 'The smart contract address for the game asset',
},
{
  displayName: 'Recipient Address',
  name: 'recipient',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['transferAsset'],
    },
  },
  default: '',
  description: 'The recipient address for the asset transfer',
},
{
  displayName: 'User Address',
  name: 'userAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['getUserAssets'],
    },
  },
  default: '',
  description: 'The user address to query assets for',
},
{
  displayName: 'Verse ID',
  name: 'verseId',
  type: 'string',
  required: false,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['getUserAssets'],
    },
  },
  default: '',
  description: 'The Verse chain ID to query (optional)',
},
{
  displayName: 'Contract Address',
  name: 'contractAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['burnAsset'],
    },
  },
  default: '',
  description: 'The smart contract address for the game asset',
},
{
  displayName: 'Contract Address',
  name: 'contractAddress',
  type: 'string',
  required: true,
  displayOptions: {
    show: {
      resource: ['gameAssetManagement'],
      operation: ['getAssetHistory'],
    },
  },
  default: '',
  description: 'The smart contract address for the game asset',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'account':
        return [await executeAccountOperations.call(this, items)];
      case 'transaction':
        return [await executeTransactionOperations.call(this, items)];
      case 'block':
        return [await executeBlockOperations.call(this, items)];
      case 'staking':
        return [await executeStakingOperations.call(this, items)];
      case 'bridge':
        return [await executeBridgeOperations.call(this, items)];
      case 'verseLayer':
        return [await executeVerseLayerOperations.call(this, items)];
      case 'stakingOperations':
        return [await executeStakingOperationsOperations.call(this, items)];
      case 'verseLayerManagement':
        return [await executeVerseLayerManagementOperations.call(this, items)];
      case 'crossLayerBridging':
        return [await executeCrossLayerBridgingOperations.call(this, items)];
      case 'gameAssetManagement':
        return [await executeGameAssetManagementOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeAccountOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('oasysgamingApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getBalance': {
          const address = this.getNodeParameter('address', i) as string;
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          const customBlockNumber = this.getNodeParameter('customBlockNumber', i, '') as string;
          
          const block = blockNumber === 'custom' ? customBlockNumber : blockNumber;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, block],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: requestBody,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getTransactionCount': {
          const address = this.getNodeParameter('address', i) as string;
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          const customBlockNumber = this.getNodeParameter('customBlockNumber', i, '') as string;
          
          const block = blockNumber === 'custom' ? customBlockNumber : blockNumber;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getTransactionCount',
            params: [address, block],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: requestBody,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getCode': {
          const address = this.getNodeParameter('address', i) as string;
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          const customBlockNumber = this.getNodeParameter('customBlockNumber', i, '') as string;
          
          const block = blockNumber === 'custom' ? customBlockNumber : blockNumber;
          
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_getCode',
            params: [address, block],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: requestBody,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listAccounts': {
          const requestBody = {
            jsonrpc: '2.0',
            method: 'eth_accounts',
            params: [],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: requestBody,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({
        json: result,
        pairedItem: { item: i }
      });

    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error.message },
          pairedItem: { item: i }
        });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeTransactionOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('oasysgamingApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'sendTransaction': {
					const transaction = this.getNodeParameter('transaction', i) as object;
					
					const options: any = {
						method: 'POST',
						url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined,
						},
						json: true,
						body: {
							jsonrpc: '2.0',
							method: 'eth_sendTransaction',
							params: [transaction],
							id: 1,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'sendRawTransaction': {
					const signedTransactionData = this.getNodeParameter('signedTransactionData', i) as string;
					
					const options: any = {
						method: 'POST',
						url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined,
						},
						json: true,
						body: {
							jsonrpc: '2.0',
							method: 'eth_sendRawTransaction',
							params: [signedTransactionData],
							id: 1,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTransaction': {
					const transactionHash = this.getNodeParameter('transactionHash', i) as string;
					
					const options: any = {
						method: 'POST',
						url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined,
						},
						json: true,
						body: {
							jsonrpc: '2.0',
							method: 'eth_getTransaction',
							params: [transactionHash],
							id: 1,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTransactionReceipt': {
					const transactionHash = this.getNodeParameter('transactionHash', i) as string;
					
					const options: any = {
						method: 'POST',
						url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined,
						},
						json: true,
						body: {
							jsonrpc: '2.0',
							method: 'eth_getTransactionReceipt',
							params: [transactionHash],
							id: 1,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'estimateGas': {
					const transaction = this.getNodeParameter('transaction', i) as object;
					
					const options: any = {
						method: 'POST',
						url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined,
						},
						json: true,
						body: {
							jsonrpc: '2.0',
							method: 'eth_estimateGas',
							params: [transaction],
							id: 1,
						},
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeBlockOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('oasysgamingApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getBlockByNumber': {
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          const includeTransactions = this.getNodeParameter('includeTransactions', i) as boolean;

          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: [blockNumber, includeTransactions],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: rpcPayload,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlockByHash': {
          const blockHash = this.getNodeParameter('blockHash', i) as string;
          const includeTransactions = this.getNodeParameter('includeTransactions', i) as boolean;

          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_getBlockByHash',
            params: [blockHash, includeTransactions],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: rpcPayload,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getCurrentBlockNumber': {
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_blockNumber',
            params: [],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: rpcPayload,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBlockTransactionCount': {
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;

          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_getBlockTransactionCountByNumber',
            params: [blockNumber],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined
            },
            body: rpcPayload,
            json: true
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeStakingOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('oasysgamingApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'getStakeInfo': {
          const contractCall = this.getNodeParameter('contractCall', i) as any;
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          
          const body = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [contractCall, blockNumber],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials.apiKey ? `Bearer ${credentials.apiKey}` : undefined,
            },
            body: JSON.stringify(body),
            json: false,
          };

          const response = await this.helpers.httpRequest(options) as any;
          result = JSON.parse(response);
          break;
        }

        case 'getValidatorInfo': {
          const contractCall = this.getNodeParameter('contractCall', i) as any;
          const blockNumber = this.getNodeParameter('blockNumber', i) as string;
          
          const body = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [contractCall, blockNumber],
            id: 1,
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': credentials