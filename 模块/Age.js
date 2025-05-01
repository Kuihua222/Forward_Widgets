var WidgetMetadata = {
    id: "agedm_widget",
    title: "AGE动漫 Widget",
    description: "与 AGE动漫 网站交互的 Widget，支持获取动漫列表和搜索动漫",
    author: "KH", 
    site: "https://m.agedm.org",
    version: "1.0.0",
    requiredVersion: "0.0.1",
    modules: [
        {
            title: "获取动漫列表",
            description: "从 AGE动漫 获取动漫列表",
            requiresWebView: false,
            functionName: "getAnimeList",
            sectionMode: false,
            params: []
        },
        {
            title: "搜索动漫",
            description: "在 AGE动漫 中搜索动漫",
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
        const url = "https://m.agedm.org";
        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://m.agedm.org"
            }
        });

        const docId = Widget.dom.parse(response.data);
        // Update selector based on actual website structure (e.g., '.anime-item' or '.list-item')
        // Open https://m.agedm.org in browser, inspect elements, and find the correct class
        const animeElements = Widget.dom.select(docId, ".list-item"); // Replace '.list-item' with actual class

        if (!animeElements || animeElements.length === 0) {
            console.warn("No anime elements found. Check selector or dynamic content.");
            return [];
        }

        return animeElements.map(element => {
            // Update selectors for title and cover image
            const titleElement = Widget.dom.selectFirst(element, ".anime-title"); // Replace with actual class
            const coverElement = Widget.dom.selectFirst(element, ".anime-poster"); // Replace with actual class
            const title = titleElement ? Widget.dom.text(titleElement).trim() : "未知标题";
            const coverUrl = coverElement ? Widget.dom.attr(coverElement, "src") : "";
            const id = Widget.dom.attr(element, "href") || "unknown_id"; // Use link as ID
            return {
                id: id,
                type: "url",
                title: title,
                coverUrl: coverUrl,
                description: "来自 AGE动漫"
            };
        });
    } catch (error) {
        console.error("获取动漫列表失败:", error.message);
        throw error;
    }
}

async function searchAnime(params = {}) {
    try {
        const query = params.query;
        if (!query) {
            throw new Error("缺少搜索关键词");
        }

        const url = `https://m.agedm.org/vodsearch/${encodeURIComponent(query)}.html`;
        const response = await Widget.http.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://m.agedm.org"
            }
        });

        const docId = Widget.dom.parse(response.data);
        // Update selector based on actual search results structure
        const animeElements = Widget.dom.select(docId, ".list-item"); // Replace '.list-item' with actual class

        if (!animeElements || animeElements.length === 0) {
            console.warn("No search results found. Check selector or dynamic content.");
            return [];
        }

        return animeElements.map(element => {
            // Update selectors for title and cover image
            const titleElement = Widget.dom.selectFirst(element, ".anime-title"); // Replace with actual class
            const coverElement = Widget.dom.selectFirst(element, ".anime-poster"); // Replace with actual class
            const title = titleElement ? Widget.dom.text(titleElement).trim() : "未知标题";
            const coverUrl = coverElement ? Widget.dom.attr(coverElement, "src") : "";
            const id = Widget.dom.attr(element, "href") || "unknown_id"; // Use link as ID
            return {
                id: id,
                type: "url",
                title: title,
                coverUrl: coverUrl,
                description: "搜索结果 - AGE动漫"
            };
        });
    } catch (error) {
        console.error("搜索动漫失败:", error.message);
        throw error;
    }
}
