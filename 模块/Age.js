// 模块/AgeFans.js

// 定义模块的元数据，包括ID、标题、描述、作者、网站、版本等信息
var WidgetMetadata = {
  id: "agefans_widget",
  title: "AgeFans.la Widget",
  description: "获取 AGE 最新动漫列表和搜索动漫",
  author: "KH",
  site: "https://www.agefans.la",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "获取最新动漫列表",
      description: "抓取Age首页最新动漫",
      requiresWebView: false,
      functionName: "getAnimeList", // 主要功能：获取最新动漫
      sectionMode: false,
      params: []
    },
    {
      title: "搜索动漫",
      description: "在Age中搜索动漫",
      requiresWebView: false,
      functionName: "searchAnime", // 主要功能：搜索动漫
      params: [
        {
          name: "query",
          title: "搜索关键词",
          type: "input",
          description: "输入动漫名称",
          value: ""
        }
      ]
    }
  ]
};

// 获取最新动漫列表的函数
async function getAnimeList(params = {}) {
  try {
    const url = "https://www.agefans.la"; // 网站首页地址
    // 发送GET请求获取页面内容
    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (ForwardWidget)", // 模拟浏览器请求头
        "Referer": "https://www.agefans.la"
      }
    });
    // 解析返回的HTML内容，生成DOM树
    const docId = Widget.dom.parse(response.data);
    // 选择页面中最新动漫列表的元素（根据页面结构调整）
    const animeElements = Widget.dom.select(docId, ".video_list_box.recent_update .video_item");
    // 若没有找到对应元素，输出警告
    if (!animeElements || animeElements.length === 0) {
      console.warn("未找到任何列表项，请检查 selector");
      return [];
    }
    // 遍历每个动漫元素，提取信息
    return animeElements.map(el => {
      const linkEl = Widget.dom.selectFirst(el, "a"); // 链接元素
      const titleEl = Widget.dom.selectFirst(el, ".video_item-title"); // 标题元素
      const imgEl   = Widget.dom.selectFirst(el, ".video_item--image.position-relative
"); // 封面图片元素
      const href    = Widget.dom.attr(linkEl, "href") || ""; // 链接地址
      return {
        id: href, // 使用链接作为唯一ID
        type: "url",
        title: titleEl ? Widget.dom.text(titleEl).trim() : "未知标题", // 标题文本
        coverUrl: imgEl ? Widget.dom.attr(imgEl, "src") : "", // 封面图片地址
        description: "来自 AgeFans" // 描述
      };
    });
  } catch (error) {
    console.error("getAnimeList 失败：", error.message);
    throw error; // 出错时抛出异常
  }
}

// 搜索动漫的函数
async function searchAnime(params = {}) {
  try {
    const kw = params.query; // 获取搜索关键词
    if (!kw) throw new Error("缺少搜索关键词");
    // 构造搜索URL（根据实际网站搜索页面URL调整）
    const url = `https://www.agefans.la/search?query=${encodeURIComponent(kw)}`;
    // 发送GET请求获取搜索结果页面
    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (ForwardWidget)", // 模拟浏览器请求头
        "Referer": "https://www.agefans.la"
      }
    });
    // 解析返回的HTML内容
    const docId = Widget.dom.parse(response.data);
    // 选择搜索结果中的动漫卡片（根据页面结构调整）
    const animeElements = Widget.dom.select(docId, "#cata_video_list .card");
    if (!animeElements || animeElements.length === 0) {
      console.warn("搜索无结果，请检查 selector 或关键词");
      return [];
    }
    // 遍历每个搜索结果，提取信息
    return animeElements.map(el => {
      const linkEl = Widget.dom.selectFirst(el, "a"); // 链接元素
      const titleEl = Widget.dom.selectFirst(el, ".card-title"); // 标题元素
      const imgEl = Widget.dom.selectFirst(el, ".video_item--image.position-relative
"); // 封面图片元素
      const href    = Widget.dom.attr(linkEl, "href") || ""; // 链接地址
      return {
        id: href,
        type: "url",
        title: titleEl ? Widget.dom.text(titleEl).trim() : "未知标题",
        coverUrl: imgEl ? Widget.dom.attr(imgEl, "src") : "",
        description: "搜索结果 - AgeFans"
      };
    });
  } catch (error) {
    console.error("searchAnime 失败：", error.message);
    throw error;
  }
}
