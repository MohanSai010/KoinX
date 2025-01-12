import React, { useEffect } from 'react';

interface TradingViewChartProps {
  symbol?: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol = 'BTCUSD' }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          width: '100%',
          height: 500,
          symbol: `BINANCE:${symbol}`,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_chart'
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [symbol]);

  return <div id="tradingview_chart" className="w-full h-[500px]" />;
};