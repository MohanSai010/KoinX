import React from 'react';
import { TrendingCoin } from '../types/crypto';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface CoinCarouselProps {
  title: string;
  coins: TrendingCoin[];
}

export const CoinCarousel: React.FC<CoinCarouselProps> = ({ title, coins }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {coins.map((coin) => {
          const priceChange = coin.item.data.price_change_percentage_24h?.usd || 0;
          const isPositive = priceChange >= 0;

          return (
            <div
              key={coin.item.id}
              className="min-w-[300px] bg-white rounded-lg p-4 flex flex-col gap-2"
            >
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
              {coin.item.sparkline && (
                <div className="relative h-16">
                  <img
                    src={coin.item.sparkline}
                    alt={`${coin.item.name} price graph`}
                    className={`w-full h-full object-cover ${isPositive ? 'text-green-500' : 'text-red-500'}`}
                  />
                  <div 
                    className={`absolute inset-0 opacity-50 ${
                      isPositive ? 'bg-gradient-to-t from-green-100' : 'bg-gradient-to-t from-red-100'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};