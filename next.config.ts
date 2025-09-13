/**
 * 概要: Next.js設定ファイル - Vercelデプロイ対応
 * 機能: 
 * - 本番環境での最適化設定
 * - 静的リソースの最適化
 * - TypeScript strict設定
 * 
 * TODO:
 * - 必要に応じてSWC最適化設定を追加
 * - 画像最適化設定を検討
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // 静的ファイル最適化
  compress: true,
  
  // ESLint設定
  eslint: {
    dirs: ['pages', 'components', 'types'],
  },
  
  // TypeScript設定
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
