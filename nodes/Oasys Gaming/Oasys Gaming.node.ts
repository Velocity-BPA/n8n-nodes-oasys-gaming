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
      // Resource selector
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
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
        default: 'stakingOperations',
      },
      // Operation dropdowns per resource
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
      // Parameter definitions
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

async function executeStakingOperationsOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;
      const network = this.getNodeParameter('network', i) as string;
      const baseUrl = network === 'mainnet' 
        ? 'https://rpc.mainnet.oasys.games' 
        : 'https://rpc.testnet.oasys.games';

      switch (operation) {
        case 'delegateStake': {
          const validatorAddress = this.getNodeParameter('validatorAddress', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const gasPrice = this.getNodeParameter('gasPrice', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const transactionData: any = {
            to: validatorAddress,
            value: amount,
            data: '0x',
          };

          if (gasPrice) {
            transactionData.gasPrice = gasPrice;
          }

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [transactionData],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getStakedAmount': {
          const delegatorAddress = this.getNodeParameter('delegatorAddress', i) as string;
          const validatorAddress = this.getNodeParameter('validatorAddress', i) as string;

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: validatorAddress,
                data: encodeStakedAmountCall(delegatorAddress),
              }, 'latest'],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getValidatorInfo': {
          const validatorAddress = this.getNodeParameter('validatorAddress', i) as string;

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: validatorAddress,
                data: '0x', // Contract method to get validator info
              }, 'latest'],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'undelegateStake': {
          const validatorAddress = this.getNodeParameter('validatorAddress', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const transactionData: any = {
            to: validatorAddress,
            value: '0x0',
            data: encodeUndelegateCall(amount),
          };

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [transactionData],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPendingRewards': {
          const delegatorAddress = this.getNodeParameter('delegatorAddress', i) as string;

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: '0x0000000000000000000000000000000000001001', // Staking contract address
                data: encodePendingRewardsCall(delegatorAddress),
              }, 'latest'],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'claimRewards': {
          const delegatorAddress = this.getNodeParameter('delegatorAddress', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const transactionData: any = {
            to: '0x0000000000000000000000000000000000001001', // Staking contract address
            value: '0x0',
            data: encodeClaimRewardsCall(delegatorAddress),
          };

          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [transactionData],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAllValidators': {
          const options: any = {
            method: 'POST',
            url: baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: '0x0000000000000000000000000000000000001001', // Staking contract address
                data: '0x', // Contract method to get all validators
              }, 'latest'],
              id: 1,
            },
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
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}

function encodeStakedAmountCall(delegatorAddress: string): string {
  // This would encode the contract call to get staked amount
  // For simplicity, returning placeholder
  return '0x' + Buffer.from(`getStakedAmount(${delegatorAddress})`).toString('hex');
}

function encodeUndelegateCall(amount: string): string {
  // This would encode the contract call to undelegate
  // For simplicity, returning placeholder
  return '0x' + Buffer.from(`undelegate(${amount})`).toString('hex');
}

function encodePendingRewardsCall(delegatorAddress: string): string {
  // This would encode the contract call to get pending rewards
  // For simplicity, returning placeholder
  return '0x' + Buffer.from(`getPendingRewards(${delegatorAddress})`).toString('hex');
}

function encodeClaimRewardsCall(delegatorAddress: string): string {
  // This would encode the contract call to claim rewards
  // For simplicity, returning placeholder
  return '0x' + Buffer.from(`claimRewards(${delegatorAddress})`).toString('hex');
}

async function executeVerseLayerManagementOperations(
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
        case 'getVerseInfo': {
          const verseId = this.getNodeParameter('verseId', i) as string;
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
              {
                to: verseId,
                data: '0x' // ABI encoded method call for getting verse info
              },
              'latest'
            ],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcPayload),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deployVerse': {
          const verseConfig = this.getNodeParameter('verseConfig', i) as any;
          const initialValidators = this.getNodeParameter('initialValidators', i) as any;
          
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [{
              from: credentials.walletAddress,
              to: credentials.verseFactoryContract,
              data: '0x' + this.encodeVerseDeployment(verseConfig, initialValidators),
              gas: '0x' + (500000).toString(16),
            }],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcPayload),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getVerseValidators': {
          const verseId = this.getNodeParameter('verseId', i) as string;
          
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
              {
                to: verseId,
                data: '0x' + this.encodeValidatorsQuery()
              },
              'latest'
            ],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcPayload),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateVerseConfig': {
          const verseId = this.getNodeParameter('verseId', i) as string;
          const newConfig = this.getNodeParameter('newConfig', i) as any;
          
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_sendTransaction',
            params: [{
              from: credentials.walletAddress,
              to: verseId,
              data: '0x' + this.encodeConfigUpdate(newConfig),
              gas: '0x' + (200000).toString(16),
            }],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcPayload),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getVerseStats': {
          const verseId = this.getNodeParameter('verseId', i) as string;
          const timeRange = this.getNodeParameter('timeRange', i) as any;
          
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
              {
                to: verseId,
                data: '0x' + this.encodeStatsQuery(timeRange)
              },
              'latest'
            ],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcPayload),
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'listAllVerses': {
          const rpcPayload = {
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [
              {
                to: credentials.verseRegistryContract,
                data: '0x' + this.encodeListVersesQuery()
              },
              'latest'
            ],
            id: 1
          };

          const options: any = {
            method: 'POST',
            url: credentials.rpcUrl || 'https://rpc.mainnet.oasys.games',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcPayload),
            json: true,
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
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}

function encodeVerseDeployment(this: any, verseConfig: any, initialValidators: any[]): string {
  // Simplified ABI encoding for verse deployment
  // In real implementation, would use proper ABI encoding library
  return 'deadbeef' + JSON.stringify({ verseConfig, initialValidators }).length.toString(16);
}

function encodeValidatorsQuery(this: any): string {
  // Method signature for getValidators()
  return 'b7ab4db5';
}

function encodeConfigUpdate(this: any, newConfig: any): string {
  // Simplified ABI encoding for config update
  return 'abc12345' + JSON.stringify(newConfig).length.toString(16);
}

function encodeStatsQuery(this: any, timeRange: any): string {
  // Method signature for getStats with time range
  return 'fed12345' + JSON.stringify(timeRange).length.toString(16);
}

function encodeListVersesQuery(this: any): string {
  // Method signature for listAllVerses()
  return 'c4d66de8';
}

async function executeCrossLayerBridgingOperations(
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
        case 'initiateDeposit': {
          const verseId = this.getNodeParameter('verseId', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const recipient = this.getNodeParameter('recipient', i) as string;
          const fromAddress = this.getNodeParameter('fromAddress', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = {
            from: fromAddress,
            to: '0x0000000000000000000000000000000000000000', // Bridge contract address
            value: amount,
            data: `0x${Buffer.from(JSON.stringify({
              verseId,
              recipient,
            })).toString('hex')}`,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [txData],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'initiateWithdrawal': {
          const verseId = this.getNodeParameter('verseId', i) as string;
          const amount = this.getNodeParameter('amount', i) as string;
          const recipient = this.getNodeParameter('recipient', i) as string;
          const fromAddress = this.getNodeParameter('fromAddress', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = {
            from: fromAddress,
            to: '0x0000000000000000000000000000000000000000', // L2 Bridge contract address
            value: '0',
            data: `0x${Buffer.from(JSON.stringify({
              verseId,
              amount,
              recipient,
            })).toString('hex')}`,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl.replace('mainnet', verseId),
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [txData],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBridgeStatus': {
          const transactionHash = this.getNodeParameter('transactionHash', i) as string;
          const direction = this.getNodeParameter('direction', i) as string;

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [
                {
                  to: '0x0000000000000000000000000000000000000000', // Bridge status contract
                  data: `0x${Buffer.from(JSON.stringify({
                    transactionHash,
                    direction,
                  })).toString('hex')}`,
                },
                'latest',
              ],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'finalizeWithdrawal': {
          const withdrawalId = this.getNodeParameter('withdrawalId', i) as string;
          const merkleProof = this.getNodeParameter('merkleProof', i) as string;
          const fromAddress = this.getNodeParameter('fromAddress', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = {
            from: fromAddress,
            to: '0x0000000000000000000000000000000000000000', // Bridge finalize contract
            value: '0',
            data: `0x${Buffer.from(JSON.stringify({
              withdrawalId,
              merkleProof,
            })).toString('hex')}`,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [txData],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getBridgeBalance': {
          const userAddress = this.getNodeParameter('userAddress', i) as string;
          const verseId = this.getNodeParameter('verseId', i) as string;

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [
                {
                  to: '0x0000000000000000000000000000000000000000', // Bridge balance contract
                  data: `0x${Buffer.from(JSON.stringify({
                    userAddress,
                    verseId,
                  })).toString('hex')}`,
                },
                'latest',
              ],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getPendingWithdrawals': {
          const userAddress = this.getNodeParameter('userAddress', i) as string;
          const verseId = this.getNodeParameter('verseId', i) as string;

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [
                {
                  to: '0x0000000000000000000000000000000000000000', // Withdrawal tracking contract
                  data: `0x${Buffer.from(JSON.stringify({
                    userAddress,
                    verseId,
                  })).toString('hex')}`,
                },
                'latest',
              ],
              id: 1,
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'claimBridgedTokens': {
          const claimId = this.getNodeParameter('claimId', i) as string;
          const signature = this.getNodeParameter('signature', i) as string;
          const fromAddress = this.getNodeParameter('fromAddress', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = {
            from: fromAddress,
            to: '0x0000000000000000000000000000000000000000', // Token claim contract
            value: '0',
            data: `0x${Buffer.from(JSON.stringify({
              claimId,
              signature,
            })).toString('hex')}`,
          };

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [txData],
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
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}

function generateTransactionId(): string {
  return Math.floor(Math.random() * 1000000).toString();
}

function encodeContractCall(method: string, params: any[]): string {
  return '0x' + Buffer.from(JSON.stringify({ method, params })).toString('hex');
}

async function executeGameAssetManagementOperations(
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
        case 'mintGameAsset': {
          const contractAddress = this.getNodeParameter('contractAddress', i) as string;
          const recipient = this.getNodeParameter('recipient', i) as string;
          const tokenData = this.getNodeParameter('tokenData', i) as any;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = encodeContractCall('mint', [recipient, tokenData]);
          
          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [{
                to: contractAddress,
                data: txData,
                gas: '0x76c0',
                gasPrice: '0x9184e72a000',
              }],
              id: generateTransactionId(),
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAssetMetadata': {
          const contractAddress = this.getNodeParameter('contractAddress', i) as string;
          const tokenId = this.getNodeParameter('tokenId', i) as string;

          const callData = encodeContractCall('tokenURI', [tokenId]);

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                to: contractAddress,
                data: callData,
              }, 'latest'],
              id: generateTransactionId(),
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          
          if (result.result) {
            try {
              const metadataUri = Buffer.from(result.result.replace('0x', ''), 'hex').toString();
              if (metadataUri.startsWith('http')) {
                const metadataOptions: any = {
                  method: 'GET',
                  url: metadataUri,
                  json: true,
                };
                const metadata = await this.helpers.httpRequest(metadataOptions) as any;
                result.metadata = metadata;
              }
            } catch (error: any) {
              result.metadata = { error: 'Failed to fetch metadata' };
            }
          }
          break;
        }

        case 'transferAsset': {
          const contractAddress = this.getNodeParameter('contractAddress', i) as string;
          const tokenId = this.getNodeParameter('tokenId', i) as string;
          const recipient = this.getNodeParameter('recipient', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = encodeContractCall('transferFrom', [privateKey, recipient, tokenId]);

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [{
                to: contractAddress,
                data: txData,
                gas: '0x5208',
                gasPrice: '0x9184e72a000',
              }],
              id: generateTransactionId(),
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getUserAssets': {
          const userAddress = this.getNodeParameter('userAddress', i) as string;
          const verseId = this.getNodeParameter('verseId', i) as string;

          let rpcUrl = credentials.baseUrl;
          if (verseId) {
            rpcUrl = rpcUrl.replace('mainnet', `verse-${verseId}`);
          }

          const callData = encodeContractCall('balanceOf', [userAddress]);

          const options: any = {
            method: 'POST',
            url: rpcUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [{
                data: callData,
              }, 'latest'],
              id: generateTransactionId(),
            },
          };

          result = await this.helpers.httpRequest(options) as any;

          if (result.result) {
            const balance = parseInt(result.result, 16);
            result.assetCount = balance;
            result.userAddress = userAddress;
            result.verseId = verseId || 'mainnet';
          }
          break;
        }

        case 'burnAsset': {
          const contractAddress = this.getNodeParameter('contractAddress', i) as string;
          const tokenId = this.getNodeParameter('tokenId', i) as string;
          const privateKey = this.getNodeParameter('privateKey', i) as string;

          const txData = encodeContractCall('burn', [tokenId]);

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_sendTransaction',
              params: [{
                to: contractAddress,
                data: txData,
                gas: '0x5208',
                gasPrice: '0x9184e72a000',
              }],
              id: generateTransactionId(),
            },
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAssetHistory': {
          const contractAddress = this.getNodeParameter('contractAddress', i) as string;
          const tokenId = this.getNodeParameter('tokenId', i) as string;

          const options: any = {
            method: 'POST',
            url: credentials.baseUrl,
            headers: {
              'Content-Type': 'application/json',
            },
            json: true,
            body: {
              jsonrpc: '2.0',
              method: 'eth_getLogs',
              params: [{
                address: contractAddress,
                topics: [
                  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                  null,
                  null,
                  '0x' + parseInt(tokenId).toString(16).padStart(64, '0')
                ],
                fromBlock: '0x0',
                toBlock: 'latest'
              }],
              id: generateTransactionId(),
            },
          };

          result = await this.helpers.httpRequest(options) as any;

          if (result.result) {
            result.transferHistory = result.result.map((log: any) => ({
              transactionHash: log.transactionHash,
              blockNumber: parseInt(log.blockNumber, 16),
              from: '0x' + log.topics[1].slice(26),
              to: '0x' + log.topics[2].slice(26),
              tokenId: tokenId
            }));
          }
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ 
          json: { error: error.message }, 
          pairedItem: { item: i } 
        });
      } else {
        throw new NodeApiError(this.getNode(), error);
      }
    }
  }

  return returnData;
}
