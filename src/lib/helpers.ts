// const apiKey = process.env.NEXT_PUBLIC_MOCKAROO_API_KEY || '';
const FABIRCATE_TOKEN = process.env.NEXT_PUBLIC_FABRICATE_TOKEN || '';

export const getCommonHeaders = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${FABIRCATE_TOKEN}`
  };
};
