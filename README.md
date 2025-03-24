# MCP Stock News API

这是一个用于获取股票市场新闻和信息的 MCP（Model-Controller-Provider）模块。它使用 Alpha Vantage API 来获取实时的股票新闻数据。

## 功能特点

- 获取实时股票新闻
- 支持按股票代码筛选新闻
- 支持按主题筛选新闻
- 新闻情感分析评分
- 支持自定义新闻数量限制

## 安装

```bash
npm install @steezy789/mcp-stock-news-api
```

## 使用方法

1. 首先，你需要获取一个 Alpha Vantage API key（可以在 https://www.alphavantage.co/support/#api-key 免费获取）

2. 基本使用示例：

```typescript
import { getStockNews, getTopStockNews, defaultTopics } from '@steezy789/mcp-stock-news-api';

// 获取所有新闻
const news = await getStockNews({
  apiKey: 'YOUR_API_KEY',
  limit: 10
});

// 获取特定股票的新闻
const teslaNews = await getStockNews({
  apiKey: 'YOUR_API_KEY',
  tickers: ['TSLA'],
  limit: 5
});

// 获取特定主题的新闻
const techNews = await getStockNews({
  apiKey: 'YOUR_API_KEY',
  topics: ['technology'],
  limit: 5
});

// 获取按情感分析评分排序的新闻
const topNews = await getTopStockNews({
  apiKey: 'YOUR_API_KEY',
  limit: 10
});
```

## 可用的主题

以下是所有可用的新闻主题：

- earnings (财报)
- ipo (首次公开募股)
- mergers_and_acquisitions (并购)
- financial_markets (金融市场)
- economy_fiscal (财政经济)
- economy_monetary (货币经济)
- economy_macro (宏观经济)
- energy_transportation (能源交通)
- finance (金融)
- life_sciences (生命科学)
- manufacturing (制造业)
- real_estate (房地产)
- retail_wholesale (零售批发)
- technology (科技)

## 返回数据格式

```typescript
interface StockNews {
  title: string;          // 新闻标题
  url: string;           // 新闻链接
  time_published: string; // 发布时间
  summary: string;       // 新闻摘要
  source: string;        // 新闻来源
  ticker_sentiment?: {    // 股票情感分析
    ticker: string;      // 股票代码
    relevance_score: string;  // 相关性评分
    ticker_sentiment_score: string;  // 情感评分
  }[];
}
```

## 注意事项

1. Alpha Vantage API 的免费版本有调用频率限制，请注意控制请求频率
2. 建议将 API key 存储在环境变量中，而不是直接写在代码里
3. 新闻数据默认按时间倒序排列，使用 getTopStockNews 可以按情感评分排序

## 许可证

MIT