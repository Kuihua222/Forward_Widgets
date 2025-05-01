// 模块/AgeFans.js

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
      functionName: "getAnimeList",
      sectionMode: false,
      params: []
    },
    {
      title: "搜索动漫",
      description: "在Age中搜索动漫",
      requiresWebView: false,
      functionName: "searchAnime",
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

async function getAnimeList(params = {}) {
  try {
    const url = "https://www.agefans.la";
    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (ForwardWidget)",
        "Referer": "https://www.agefans.la"
      }
    });
    const docId = Widget.dom.parse(response.data);
    // 请根据实际页面结构调整以下 selector
    const animeElements = Widget.dom.select(docId,  ".video_list_box.recent_update .video_item");
    if (!animeElements || animeElements.length === 0) {
      console.warn("未找到任何列表项，请检查 selector");
      return [];
    }
    return animeElements.map(el => {
      const linkEl = Widget.dom.selectFirst(el, "a");
      const titleEl = Widget.dom.selectFirst(el, ".video_item-title");
      const imgEl   = Widget.dom.selectFirst(el, "img");
      const href    = Widget.dom.attr(linkEl, "href") || "";
      return {
        id: href,
        type: "url",
        title: titleEl ? Widget.dom.text(titleEl).trim() : "未知标题",
        coverUrl: imgEl ? Widget.dom.attr(imgEl, "src") : "",
        description: "来自 AgeFans"
      };
    });
  } catch (error) {
    console.error("getAnimeList 失败：", error.message);
    throw error;
  }
}

async function searchAnime(params = {}) {
  try {
    const kw = params.query;
    if (!kw) throw new Error("缺少搜索关键词");
    // Age搜索URL
    const url = `https://www.agefans.la/search?query=${encodeURIComponent(kw)}`;
    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (ForwardWidget)",
        "Referer": "https://www.agefans.la"
      }
    });
    const docId = Widget.dom.parse(response.data);
    const animeElements = Widget.dom.select(docId, "#cata_video_list .card");
    if (!animeElements || animeElements.length === 0) {
      console.warn("搜索无结果，请检查 selector 或关键词");
      return [];
    }
    return animeElements.map(el => {
      const linkEl = Widget.dom.selectFirst(el, "a");
      const titleEl = Widget.dom.selectFirst(el, ".card-title");
      const imgEl = Widget.dom.selectFirst(el, "img");
      const href    = Widget.dom.attr(linkEl, "href") || "";
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
