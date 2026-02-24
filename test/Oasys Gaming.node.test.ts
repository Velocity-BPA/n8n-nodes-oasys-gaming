/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { OasysGaming } from '../nodes/Oasys Gaming/Oasys Gaming.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('OasysGaming Node', () => {
  let node: OasysGaming;

  beforeAll(() => {
    node = new OasysGaming();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Oasys Gaming');
      expect(node.description.name).toBe('oasysgaming');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 4 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(4);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(4);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('StakingOperations Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://rpc.mainnet.oasys.games',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('should delegate stake successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'delegateStake';
        case 'network': return 'mainnet';
        case 'validatorAddress': return '0x1234567890123456789012345678901234567890';
        case 'amount': return '1000000000000000000';
        case 'gasPrice': return '20000000000';
        case 'privateKey': return 'test-private-key';
        default: return '';
      }
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0xabc123...',
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: 'https://rpc.mainnet.oasys.games',
        body: expect.objectContaining({
          method: 'eth_sendTransaction',
        }),
      })
    );
  });

  test('should get staked amount successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getStakedAmount';
        case 'network': return 'mainnet';
        case 'delegatorAddress': return '0x1234567890123456789012345678901234567890';
        case 'validatorAddress': return '0x0987654321098765432109876543210987654321';
        default: return '';
      }
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x16345785d8a0000',
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        body: expect.objectContaining({
          method: 'eth_call',
        }),
      })
    );
  });

  test('should handle errors correctly', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'delegateStake';
        case 'network': return 'mainnet';
        default: return '';
      }
    });

    const error = new Error('Network error');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(error);
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const result = await executeStakingOperationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Network error');
  });

  test('should get all validators successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getAllValidators';
        case 'network': return 'testnet';
        default: return '';
      }
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: ['0x1234...', '0x5678...', '0x9abc...'],
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeStakingOperationsOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://rpc.testnet.oasys.games',
      })
    );
  });
});

describe('VerseLayerManagement Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        rpcUrl: 'https://rpc.mainnet.oasys.games',
        walletAddress: '0x123...',
        verseFactoryContract: '0xabc...',
        verseRegistryContract: '0xdef...',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should get verse info successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getVerseInfo';
      if (param === 'verseId') return '0x123...';
      return null;
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000047465737400000000000000000000000000000000000000000000000000000000'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeVerseLayerManagementOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should deploy verse successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'deployVerse';
      if (param === 'verseConfig') return { name: 'TestVerse', chainId: 123 };
      if (param === 'initialValidators') return ['0xval1...', '0xval2...'];
      return null;
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x1234567890abcdef...'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeVerseLayerManagementOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get verse validators successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getVerseValidators';
      if (param === 'verseId') return '0x123...';
      return null;
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x000000000000000000000000val1000000000000000000000000val2'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeVerseLayerManagementOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should handle errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getVerseInfo';
      if (param === 'verseId') return '0x123...';
      return null;
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const items = [{ json: {} }];
    const result = await executeVerseLayerManagementOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({ error: 'Network error' });
  });

  it('should get verse stats successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'getVerseStats';
      if (param === 'verseId') return '0x123...';
      if (param === 'timeRange') return { from: '2024-01-01', to: '2024-01-31' };
      return null;
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x00000000000000000000000000000000000000000000000000000000000001f4'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeVerseLayerManagementOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should list all verses successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      if (param === 'operation') return 'listAllVerses';
      return null;
    });

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000012300000000000000000000000000000000000000000000000000000000000004560000000000000000000000000000000000000'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const items = [{ json: {} }];
    const result = await executeVerseLayerManagementOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });
});

describe('CrossLayerBridging Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://rpc.mainnet.oasys.games',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  test('should initiate deposit successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'initiateDeposit',
        verseId: 'verse1',
        amount: '1000000000000000000',
        recipient: '0xRecipientAddress',
        fromAddress: '0xFromAddress',
        privateKey: 'private-key',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: 1,
      result: '0xTransactionHash',
    });

    const items = [{ json: {} }];
    const result = await executeCrossLayerBridgingOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0xTransactionHash');
  });

  test('should get bridge status successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'getBridgeStatus',
        transactionHash: '0xTxHash',
        direction: 'deposit',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: 1,
      result: { status: 'completed', confirmations: 12 },
    });

    const items = [{ json: {} }];
    const result = await executeCrossLayerBridgingOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result.status).toBe('completed');
  });

  test('should handle API errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'getBridgeBalance',
        userAddress: '0xUserAddress',
        verseId: 'verse1',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);

    const items = [{ json: {} }];
    const result = await executeCrossLayerBridgingOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  test('should finalize withdrawal successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      const params: any = {
        operation: 'finalizeWithdrawal',
        withdrawalId: 'withdrawal123',
        merkleProof: '0xMerkleProof',
        fromAddress: '0xFromAddress',
        privateKey: 'private-key',
      };
      return params[param];
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: 1,
      result: '0xFinalizeTxHash',
    });

    const items = [{ json: {} }];
    const result = await executeCrossLayerBridgingOperations.call(mockExecuteFunctions, items);

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0xFinalizeTxHash');
  });
});

describe('GameAssetManagement Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://rpc.testnet.oasys.games',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should mint game asset successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'mintGameAsset';
        case 'contractAddress': return '0x1234567890123456789012345678901234567890';
        case 'recipient': return '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
        case 'tokenData': return { name: 'Test NFT', description: 'Test gaming asset' };
        case 'privateKey': return '0xprivatekey123';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: '123',
      result: '0xtransactionhash123'
    });

    const result = await executeGameAssetManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0xtransactionhash123');
  });

  it('should get asset metadata successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getAssetMetadata';
        case 'contractAddress': return '0x1234567890123456789012345678901234567890';
        case 'tokenId': return '1';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: '123',
      result: '0x' + Buffer.from('https://metadata.example.com/1').toString('hex')
    });

    const result = await executeGameAssetManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBeDefined();
  });

  it('should transfer asset successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'transferAsset';
        case 'contractAddress': return '0x1234567890123456789012345678901234567890';
        case 'tokenId': return '1';
        case 'recipient': return '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
        case 'privateKey': return '0xprivatekey123';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: '123',
      result: '0xtransactionhash456'
    });

    const result = await executeGameAssetManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.result).toBe('0xtransactionhash456');
  });

  it('should get user assets successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'getUserAssets';
        case 'userAddress': return '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
        case 'verseId': return '';
        default: return '';
      }
    });

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      jsonrpc: '2.0',
      id: '123',
      result: '0x5'
    });

    const result = await executeGameAssetManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.assetCount).toBe(5);
    expect(result[0].json.userAddress).toBe('0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef');
  });

  it('should handle errors gracefully', async () => {
    mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
      switch (param) {
        case 'operation': return 'mintGameAsset';
        case 'contractAddress': return '0x1234567890123456789012345678901234567890';
        case 'recipient': return '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef';
        case 'tokenData': return { name: 'Test NFT' };
        case 'privateKey': return '0xprivatekey123';
        default: return '';
      }
    });

    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));

    const result = await executeGameAssetManagementOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('Network error');
  });
});
});
