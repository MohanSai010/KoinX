import React from 'react';
import { TrendingCoin } from '../types/crypto';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TrendingCoinsProps {
  trendingCoins: TrendingCoin[];
}

export const TrendingCoins: React.FC<TrendingCoinsProps> = ({ trendingCoins }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Trending Coins (24h)</h2>
      <div className="space-y-4">
        {trendingCoins.slice(0, 3).map((coin) => {
          const priceChange = coin.item.data.price_change_percentage_24h?.usd || 0;
          const isPositive = priceChange >= 0;

          return (
            <div key={coin.item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={coin.item.small}
                  alt={coin.item.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">{coin.item.symbol.toUpperCase()}</span>
              </div>
              <div className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                <span>{Math.abs(priceChange).toFixed(2)}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};