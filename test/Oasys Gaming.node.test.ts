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

    it('should define 6 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(6);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(6);
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
describe('Account Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://rpc.mainnet.oasys.games' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  describe('getBalance operation', () => {
    it('should get account balance successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D9F5625b8d') 
        .mockReturnValueOnce('latest');

      const expectedResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x1bc16d674ec80000'
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(expectedResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json).toEqual(expectedResponse);
      expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://rpc.mainnet.oasys.games',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-key'
        },
        body: {
          jsonrpc: '2.0',
          method: 'eth_getBalance',
          params: ['0x742d35Cc6634C0532925a3b8D9F5625b8d', 'latest'],
          id: 1
        },
        json: true
      });
    });

    it('should handle errors in getBalance', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getBalance')
        .mockReturnValueOnce('invalid-address')
        .mockReturnValueOnce('latest');
      
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Invalid address'));

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result).toHaveLength(1);
      expect(result[0].json.error).toBe('Invalid address');
    });
  });

  describe('getTransactionCount operation', () => {
    it('should get transaction count successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getTransactionCount')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D9F5625b8d')
        .mockReturnValueOnce('latest');

      const expectedResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x1'
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(expectedResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json).toEqual(expectedResponse);
    });
  });

  describe('getCode operation', () => {
    it('should get contract code successfully', async () => {
      mockExecuteFunctions.getNodeParameter
        .mockReturnValueOnce('getCode')
        .mockReturnValueOnce('0x742d35Cc6634C0532925a3b8D9F5625b8d')
        .mockReturnValueOnce('latest');

      const expectedResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: '0x608060405234801561001057600080fd5b50'
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(expectedResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json).toEqual(expectedResponse);
    });
  });

  describe('listAccounts operation', () => {
    it('should list accounts successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('listAccounts');

      const expectedResponse = {
        jsonrpc: '2.0',
        id: 1,
        result: ['0x742d35Cc6634C0532925a3b8D9F5625b8d']
      };

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(expectedResponse);

      const result = await executeAccountOperations.call(mockExecuteFunctions, [{ json: {} }]);

      expect(result[0].json).toEqual(expectedResponse);
    });
  });
});

describe('Transaction Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://rpc.mainnet.oasys.games',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should send transaction successfully', async () => {
		const mockTransaction = {
			to: '0x742d35Cc0000000000000000000000000000000',
			value: '0x0',
			gas: '0x5208',
			gasPrice: '0x9184e72a000',
			data: '0x',
		};

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('sendTransaction')
			.mockReturnValueOnce(mockTransaction);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: '0x123abc',
		});

		const items = [{ json: {} }];
		const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://rpc.mainnet.oasys.games',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer test-key',
			},
			json: true,
			body: {
				jsonrpc: '2.0',
				method: 'eth_sendTransaction',
				params: [mockTransaction],
				id: 1,
			},
		});
	});

	it('should send raw transaction successfully', async () => {
		const mockRawTransaction = '0xf86c808504a817c8008252089...';

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('sendRawTransaction')
			.mockReturnValueOnce(mockRawTransaction);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: '0x456def',
		});

		const items = [{ json: {} }];
		const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://rpc.mainnet.oasys.games',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer test-key',
			},
			json: true,
			body: {
				jsonrpc: '2.0',
				method: 'eth_sendRawTransaction',
				params: [mockRawTransaction],
				id: 1,
			},
		});
	});

	it('should get transaction successfully', async () => {
		const mockTxHash = '0x123abc456def';

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getTransaction')
			.mockReturnValueOnce(mockTxHash);

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: {
				hash: mockTxHash,
				blockNumber: '0x1b4',
				from: '0x742d35Cc0000000000000000000000000000000',
				to: '0x742d35Cc0000000000000000000000000000001',
				value: '0x0',
			},
		});

		const items = [{ json: {} }];
		const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://rpc.mainnet.oasys.games',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer test-key',
			},
			json: true,
			body: {
				jsonrpc: '2.0',
				method: 'eth_getTransaction',
				params: [mockTxHash],
				id: 1,
			},
		});
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('sendTransaction');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));

		const items = [{ json: {} }];
		const result = await executeTransactionOperations.call(mockExecuteFunctions, items);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('Network error');
	});
});

describe('Block Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://rpc.mainnet.oasys.games' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { 
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn() 
      },
    };
  });

  it('should get block by number successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockByNumber')
      .mockReturnValueOnce('latest')
      .mockReturnValueOnce(false);

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: {
        number: '0x1b4',
        hash: '0x...',
        transactions: []
      }
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://rpc.mainnet.oasys.games',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-key'
      },
      body: {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: ['latest', false],
        id: 1
      },
      json: true
    });
  });

  it('should get block by hash successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockByHash')
      .mockReturnValueOnce('0xabcd1234')
      .mockReturnValueOnce(true);

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: {
        hash: '0xabcd1234',
        transactions: [{}]
      }
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should get current block number successfully', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getCurrentBlockNumber');

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0x1b4'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should get block transaction count successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getBlockTransactionCount')
      .mockReturnValueOnce('latest');

    const mockResponse = {
      jsonrpc: '2.0',
      id: 1,
      result: '0xa'
    };

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
  });

  it('should handle errors when continue on fail is enabled', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getCurrentBlockNumber');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });

  it('should throw error when continue on fail is disabled', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getCurrentBlockNumber');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(executeBlockOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});

describe('Staking Resource', () => {
  let mockExecuteFunctions: any;
  
  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({ 
        apiKey: 'test-key', 
        baseUrl: 'https://rpc.mainnet.oasys.games' 
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: { httpRequest: jest.fn(), requestWithAuthentication: jest.fn() },
    };
  });

  describe('getStakeInfo', () => {
    it('should get stake info successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getStakeInfo');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce({ to: '0x123', data: '0xabc' });
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('latest');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(
        JSON.stringify({ jsonrpc: '2.0', id: 1, result: '0x123' })
      );

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json.result).toBe('0x123');
    });

    it('should handle getStakeInfo error', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getStakeInfo');
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);
      mockExecuteFunctions.helpers.httpRequest.mockRejectedValueOnce(new Error('API Error'));

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result[0].json.error).toBe('API Error');
    });
  });

  describe('getValidatorInfo', () => {
    it('should get validator info successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getValidatorInfo');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce({ to: '0x456', data: '0xdef' });
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('latest');
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(
        JSON.stringify({ jsonrpc: '2.0', id: 1, result: { validator: '0x456' } })
      );

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json.result.validator).toBe('0x456');
    });
  });

  describe('delegateStake', () => {
    it('should delegate stake successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('delegateStake');
      mockExecuteFunctions.getNodeParameter.mockReturnValueOnce({ 
        from: '0x789', 
        to: '0xabc', 
        value: '0x1000' 
      });
      mockExecuteFunctions.helpers.httpRequest.mockResolvedValueOnce(
        JSON.stringify({ jsonrpc: '2.0', id: 1, result: '0xtxhash' })
      );

      const result = await executeStakingOperations.call(mockExecuteFunctions, [{ json: {} }]);
      
      expect(result).toHaveLength(1);
      expect(result[0].json.result).toBe('0xtxhash');
    });
  });
});

describe('Bridge Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-key',
        baseUrl: 'https://rpc.mainnet.oasys.games'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  describe('getBridgeStatus', () => {
    it('should get bridge status successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getBridgeStatus';
        if (param === 'contractCall') return { to: '0x123', data: '0xabc' };
        if (param === 'blockNumber') return 'latest';
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        jsonrpc: '2.0',
        result: '0x1',
        id: 1
      });

      const result = await executeBridgeOperations.call(mockExecuteFunctions, [{ json: {} }]);
      expect(result[0].json.result).toBe('0x1');
    });

    it('should handle bridge status error', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getBridgeStatus';
        if (param === 'contractCall') return { to: '0x123', data: '0xabc' };
        if (param === 'blockNumber') return 'latest';
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Network error'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeBridgeOperations.call(mockExecuteFunctions, [{ json: {} }]);
      expect(result[0].json.error).toBe('Network error');
    });
  });

  describe('depositToL2', () => {
    it('should deposit to L2 successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'depositToL2';
        if (param === 'transaction') return { from: '0x123', to: '0x456', value: '0x1' };
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        jsonrpc: '2.0',
        result: '0xabc123',
        id: 1
      });

      const result = await executeBridgeOperations.call(mockExecuteFunctions, [{ json: {} }]);
      expect(result[0].json.result).toBe('0xabc123');
    });

    it('should handle deposit error', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'depositToL2';
        if (param === 'transaction') return { from: '0x123', to: '0x456', value: '0x1' };
      });

      mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Transaction failed'));
      mockExecuteFunctions.continueOnFail.mockReturnValue(true);

      const result = await executeBridgeOperations.call(mockExecuteFunctions, [{ json: {} }]);
      expect(result[0].json.error).toBe('Transaction failed');
    });
  });

  describe('getBridgeEvents', () => {
    it('should get bridge events successfully', async () => {
      mockExecuteFunctions.getNodeParameter.mockImplementation((param: string) => {
        if (param === 'operation') return 'getBridgeEvents';
        if (param === 'filter') return { fromBlock: '0x1', toBlock: '0x10' };
      });

      mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
        jsonrpc: '2.0',
        result: [{ address: '0x123', topics: ['0xabc'] }],
        id: 1
      });

      const result = await executeBridgeOperations.call(mockExecuteFunctions, [{ json: {} }]);
      expect(result[0].json.result).toHaveLength(1);
    });
  });
});

describe('VerseLayer Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://rpc.mainnet.oasys.games',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get chain ID successfully', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getChainId');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: '0x248',
		});

		const items = [{ json: {} }];
		const result = await executeVerseLayerOperations.call(mockExecuteFunctions, items);

		expect(result[0].json).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: '0x248',
		});
	});

	it('should handle get chain ID error', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValue('getChainId');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Chain ID request failed'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const items = [{ json: {} }];
		const result = await executeVerseLayerOperations.call(mockExecuteFunctions, items);

		expect(result[0].json).toEqual({
			error: 'Chain ID request failed',
		});
	});

	it('should get game assets successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getGameAssets')
			.mockReturnValueOnce({ to: '0x123', data: '0x456' })
			.mockReturnValueOnce('latest');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: '0x789',
		});

		const items = [{ json: {} }];
		const result = await executeVerseLayerOperations.call(mockExecuteFunctions, items);

		expect(result[0].json).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: '0x789',
		});
	});

	it('should transfer game asset successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('transferGameAsset')
			.mockReturnValueOnce({ to: '0x123', value: '0x1', data: '0x456' });
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: '0xabc123',
		});

		const items = [{ json: {} }];
		const result = await executeVerseLayerOperations.call(mockExecuteFunctions, items);

		expect(result[0].json).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: '0xabc123',
		});
	});

	it('should get game events successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getGameEvents')
			.mockReturnValueOnce({ 
				address: '0x123',
				topics: ['0x456'],
				fromBlock: '0x0',
				toBlock: 'latest'
			});
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: [{ address: '0x123', topics: ['0x456'] }],
		});

		const items = [{ json: {} }];
		const result = await executeVerseLayerOperations.call(mockExecuteFunctions, items);

		expect(result[0].json).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: [{ address: '0x123', topics: ['0x456'] }],
		});
	});

	it('should get verse info successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getVerseInfo')
			.mockReturnValueOnce({ to: '0x456', data: '0x789' })
			.mockReturnValueOnce('latest');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			jsonrpc: '2.0',
			id: 1,
			result: '0xdef456',
		});

		const items = [{ json: {} }];
		const result = await executeVerseLayerOperations.call(mockExecuteFunctions, items);

		expect(result[0].json).toEqual({
			jsonrpc: '2.0',
			id: 1,
			result: '0xdef456',
		});
	});
});
});
