export const useRouter = jest.fn(() => ({
  push: jest.fn(),
}));

let mockSearchParams = new URLSearchParams();

export const useSearchParams = jest.fn(() => mockSearchParams);

export const setMockSearchParams = (params: Record<string, string>) => {
  mockSearchParams = new URLSearchParams(params);
};
