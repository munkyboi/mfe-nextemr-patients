import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const API_URL = process.env.NEXT_PUBLIC_API_URL as string; // Ensure it's treated as a string

const proxy = httpProxy.createProxyServer();

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: API_URL, changeOrigin: true }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
