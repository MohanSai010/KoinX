import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TradingViewChart } from './components/TradingViewChart';
import { TrendingCoins } from './components/TrendingCoins';
import { CoinCarousel } from './components/CoinCarousel';
import { CryptoPrice, TrendingCoin } from './types/crypto';
import { ArrowUp, ArrowDown, Bitcoin, Calculator, BookOpen, Wallet } from 'lucide-react';

function App() {
  const [prices, setPrices] = useState<CryptoPrice | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pricesRes, trendingRes] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr,usd&include_24hr_change=true'),
          axios.get('https://api.coingecko.com/api/v3/search/trending')
        ]);

        setPrices(pricesRes.data);
        setTrendingCoins(trendingRes.data.coins);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const priceChange = prices?.bitcoin.usd_24h_change || 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src="https://www.koinx.com/releases/_next/static/media/Logo.cdf70f30.svg"
              alt="KoinX"
              className="h-8"
            />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <Calculator className="w-4 h-4" />
              Crypto Taxes
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Free Tools
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
              <Wallet className="w-4 h-4" />
              Resource Center
            </a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 7.5h16.5M3.75 12h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Price Info */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bitcoin className="w-8 h-8" />
                <h1 className="text-3xl font-bold">Bitcoin</h1>
                <span className="text-gray-500 text-sm px-2 py-1 bg-gray-100 rounded">BTC</span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-2xl font-semibold">
                  ${prices?.bitcoin.usd.toLocaleString()}
                </span>
                <span
                  className={`flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}
                >
                  {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  {Math.abs(priceChange).toFixed(2)}%
                </span>
              </div>
              <div className="text-gray-500 mt-1">
                ₹{prices?.bitcoin.inr.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 mt-6 border-b">
          <button
            className={`pb-4 px-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'fundamentals' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('fundamentals')}
          >
            Fundamentals
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'news' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('news')}
          >
            News Insights
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'sentiments' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('sentiments')}
          >
            Sentiments
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'team' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'technicals' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('technicals')}
          >
            Technicals
          </button>
          <button
            className={`pb-4 px-2 ${activeTab === 'tokenomics' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tokenomics')}
          >
            Tokenomics
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg p-6">
              <TradingViewChart />
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Performance</h2>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Today's Low</span>
                    <span>Today's High</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
                  <div className="flex justify-between">
                    <span className="font-medium">$45,444</span>
                    <span className="font-medium">$49,343</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>52W Low</span>
                    <span>52W High</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full" />
                  <div className="flex justify-between">
                    <span className="font-medium">$16,930</span>
                    <span className="font-medium">$49,343</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center py-4 border-b">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-medium">$876,524,315,562</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b">
                  <span className="text-gray-600">Volume (24h)</span>
                  <span className="font-medium">$23,235,662,344</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-gray-600">Circulating Supply</span>
                  <span className="font-medium">19,000,000 BTC</span>
                </div>
              </div>
            </div>

            {/* Already Holding Bitcoin? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-lg text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Calculate your Profits</h3>
                    <p className="text-sm opacity-90 mb-4">Check how much you can earn</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium">
                      Check Now
                    </button>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=200"
                    alt="Profit calculator"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-lg text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Calculate your tax liability</h3>
                    <p className="text-sm opacity-90 mb-4">Track your crypto taxes</p>
                    <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium">
                      Check Now
                    </button>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200"
                    alt="Tax calculator"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Tokenomics */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Tokenomics</h2>
              <h3 className="text-lg font-semibold mb-4">Initial Distribution</h3>
              <div className="flex items-center gap-8 mb-6">
                <div className="w-48 h-48">
                  <div className="relative w-full h-full rounded-full bg-blue-500" style={{ background: 'conic-gradient(from 0deg, #3B82F6 80%, #EF4444 80%)' }}>
                    <div className="absolute inset-4 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>Crowdsale investors: 80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>Foundation: 20%</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
              </p>
            </div>

            {/* About Bitcoin */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About Bitcoin</h2>
              <h3 className="text-lg font-semibold mb-2">What is Bitcoin?</h3>
              <p className="text-gray-600 mb-4">
                Bitcoin's price today is US$16,951.82, with a 24-hour trading volume of $19.14 B. BTC is +0.36% in the last 24 hours. It is currently -7.70% from its 7-day all-time high of $18,366.66, and 3.40% from its 7-day all-time low of $16,394.75. BTC has a circulating supply of 19.24 M BTC and a max supply of 21 M BTC.
              </p>
              <h3 className="text-lg font-semibold mb-2">Lorem ipsum dolor sit amet</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus.
              </p>
              <p className="text-gray-600">
                Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis phasellus. Integer pellentesque enim convallis ultricies at.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <TrendingCoins trendingCoins={trendingCoins} />
          </div>
        </div>

        {/* Carousels */}
        <div className="space-y-8 mt-8">
          <CoinCarousel title="You May Also Like" coins={trendingCoins} />
          <CoinCarousel title="Trending Coins" coins={trendingCoins} />
        </div>
      </div>
    </div>
  );
}

export default App;