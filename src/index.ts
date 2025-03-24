import axios from 'axios';
import { format } from 'date-fns';

interface StockNews {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  ticker_sentiment?: {
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: string;
  }[];
}

interface Config {
  apiKey: string;
  tickers?: string[];
  topics?: string[];
  limit?: number;
}

export async function getStockNews(config: Config): Promise<StockNews[]> {
  const { apiKey, tickers = [], topics = [], limit = 10 } = config;
  
  try {
    const params = new URLSearchParams({
      function: 'NEWS_SENTIMENT',
      apikey: apiKey,
      limit: limit.toString(),
    });

    if (tickers.length > 0) {
      params.append('tickers', tickers.join(','));
    }

    if (topics.length > 0) {
      params.append('topics', topics.join(','));
    }

    const response = await axios.get(`https://www.alphavantage.co/query?${params.toString()}`);
    
    if (response.data.feed) {
      return response.data.feed.map((item: any) => ({
        title: item.title,
        url: item.url,
        time_published: format(new Date(item.time_published), 'yyyy-MM-dd HH:mm:ss'),
        summary: item.summary,
        source: item.source,
        ticker_sentiment: item.ticker_sentiment,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching stock news:', error);
    throw error;
  }
}

export async function getTopStockNews(config: Config): Promise<StockNews[]> {
  const news = await getStockNews(config);
  return news.sort((a, b) => {
    const aScore = a.ticker_sentiment?.[0]?.ticker_sentiment_score || '0';
    const bScore = b.ticker_sentiment?.[0]?.ticker_sentiment_score || '0';
    return parseFloat(bScore) - parseFloat(aScore);
  });
}

export const defaultTopics = [
  'earnings',
  'ipo',
  'mergers_and_acquisitions',
  'financial_markets',
  'economy_fiscal',
  'economy_monetary',
  'economy_macro',
  'energy_transportation',
  'finance',
  'life_sciences',
  'manufacturing',
  'real_estate',
  'retail_wholesale',
  'technology'
];