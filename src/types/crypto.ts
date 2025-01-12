export interface CryptoPrice {
  bitcoin: {
    inr: number;
    inr_24h_change: number;
    usd: number;
    usd_24h_change: number;
  };
}

export interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    sparkline: string;
    data: {
      price: string;
      price_change_percentage_24h: {
        [key: string]: number;
      };
    };
  };
}