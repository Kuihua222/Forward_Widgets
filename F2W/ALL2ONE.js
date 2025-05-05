WidgetMetadata = {
    id: "ALL2ONE",
    title: "聚合内容",
    description: "聚合（豆瓣、TMDB、IMDB、Bangumi内容）",
    author: "gpt",
    version: "1.3.0",
    modules: [
        // ======================
        // 🌟 实时热门榜单
        // ======================
        {
            title: "豆瓣-电影实时热榜",
            functionName: "loadDoubanItemsFromApi",
            params: [
                { name: "start", title: "开始", type: "count" },
                { name: "limit", title: "数量", type: "constant", value: "20" },
                { name: "url", type: "constant", value: "https://m.douban.com/rexxar/api/v2/subject_collection/movie_real_time_hotest/items" },
                { name: "type", type: "constant", value: "movie" }
            ]
        },
        {
            title: "豆瓣-剧集实时热榜",
            functionName: "loadDoubanItemsFromApi",
            params: [
                { name: "start", title: "开始", type: "count" },
                { name: "limit", title: "数量", type: "constant", value: "20" },
                { name: "url", type: "constant", value: "https://m.douban.com/rexxar/api/v2/subject_collection/tv_real_time_hotest/items" },
                { name: "type", type: "constant", value: "tv" }
            ]
        },
        {
            title: "TMDB-实时趋势",
            description: "TMDB 今日/本周热门综合内容",
            functionName: "tmdbTrending",
            params: [
                { 
                    name: "time_window",
                    type: "enumeration",
                    enumOptions: [
                        { title: "本日趋势", value: "day" },
                        { title: "本周趋势", value: "week" }
                    ],
                    value: "day"
                },
                { name: "language", type: "constant", value: "zh-CN" },
                { name: "page", title: "页码", type: "page" }
            ]
        },

        // ======================
        // 🎬 电影专区
        // ======================
        {
            title: "电影-榜单",
            description: "经典电影榜单合集",
            modules: [
                {
                    title: "豆瓣-Top250",
                    functionName: "loadDoubanCardItems",
                    params: [
                        { name: "url", type: "constant", value: "https://m.douban.com/subject_collection/movie_top250" },
                        { name: "start", title: "开始", type: "count" },
                        { name: "limit", title: "数量", type: "constant", value: "20" }
                    ]
                },
                {
                    title: "IMDb-Top250",
                    functionName: "loadImdbCardItems",
                    params: [
                        { name: "url", type: "constant", value: "https://www.imdb.com/chart/top/?ref_=nv_mv_250" }
                    ]
                },
                {
                    title: "TMDB-热门电影",
                    functionName: "tmdbPopular",
                    params: [
                        { name: "type", type: "constant", value: "movie" },
                        { 
                            name: "watch_region", 
                            title: "地区", 
                            type: "enumeration", 
                            enumOptions: [
                                { title: "不查询", value: "" }, 
                                { title: "中国大陆", value: "CN" },
                                { title: "美国", value: "US" }
                            ] 
                        },
                        { name: "page", title: "页码", type: "page" }
                    ]
                }
            ]
        },
        {
            title: "电影-动态追踪",
            modules: [
                {
                    title: "TMDB-正在热映",
                    functionName: "tmdbNowPlaying",
                    params: [
                        { name: "type", type: "constant", value: "movie" },
                        { 
                            name: "watch_region", 
                            title: "地区", 
                            type: "enumeration", 
                            enumOptions: [
                                { title: "不查询", value: "" }, 
                                { title: "中国大陆", value: "CN" }
                            ] 
                        },
                        { name: "page", title: "页码", type: "page"  }
                    ]
                },
                {
                    title: "TMDB-即将上映",
                    functionName: "tmdbUpcomingMovies",
                    params: [
                        { name: "language", type: "constant", value: "zh-CN" },
                        { name: "page", title: "页码", type: "page" }
                    ]
                }
            ]
        },

        // ======================
        // 📺 剧集专区 
        // ======================
        {
            title: "剧集-榜单",
            modules: [
                {
                    title: "IMDb-Top剧集",
                    functionName: "loadImdbCardItems",
                    params: [
                        { name: "url", type: "constant", value: "https://www.imdb.com/chart/toptv/?ref_=nv_tvv_250" }
                    ]
                },
                {
                    title: "TMDB-热门剧集",
                    functionName: "tmdbPopular",
                    params: [
                        { name: "type", type: "constant", value: "tv" },
                        {name: "page", title: "页码", type: "page" }
                    ]
                }
            ]
        },
        {
            title: "剧集-放送追踪",
            modules: [
                {
                    title: "TMDB-正在播出",
                    functionName: "tmdbNowPlaying",
                    params: [
                        { name: "type", type: "constant", value: "tv" },
                        { name: "page", title: "页码", type: "page" }
                    ]
                }
            ]
        },

        // ======================
        // 🌸 动漫专区
        // ======================
        {
            title: "Bangumi-总排行",
            functionName: "loadBangumiRankings",
            params: [
                { name: "page", title: "页码", type: "page"  }
            ]
        },
        {
            title: "动漫-日历",
            functionName: "loadBangumiCalendarUnified",
            params: [
                {
                    name: "viewType",
                    type: "enumeration",
                    enumOptions: [
                        { title: "周视图", value: "weekly" },
                        { title: "日视图", value: "daily" }
                    ],
                    value: "weekly"
                }
            ]
        },
        {
            title: "动漫-筛选",
            functionName: "loadBangumiBrowser",
            params: [
                { name: "tag", title: "标签", type: "input" },
                { 
                    name: "genre_tag", 
                    type: "enumeration",
                    enumOptions: [
                        { title: "全部", value: "" }, 
                        { title: "科幻", value: "科幻" },
                        { title: "校园", value: "校园" }
                    ]
                }
            ]
        },

        // ======================
        // 🛠️ 工具与发现
        // ======================
        {
            title: "搜索-多平台",
            modules: [
                {
                    title: "搜索-演员/导演",
                    functionName: "findPersonAndCredits",
                    params: [
                        { name: "name", title: "👤 名称", type: "input" },
                        { name: "language", type: "constant", value: "zh-CN" }
                    ]
                },
                {
                    title: "推荐-随机影视",
                    functionName: "getRandomPick",
                    params: [
                        { 
                            name: "type", 
                            type: "enumeration",
                            enumOptions: [
                                { title: "电影", value: "movie" },
                                { title: "剧集", value: "tv" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: "榜单-自定义",
            modules: [
                {
                    title: "豆瓣-自定义片单",
                    functionName: "loadDoubanCardItems",
                    params: [
                        {
                            name: "url", 
                            title: "列表地址", 
                            type: "input",
                            placeholders: [
                                { title: "豆瓣片单", value: "https://www.douban.com/doulist/155718871/" }
                            ]
                        }
                    ]
                },
                {
                    title: "IMDB-自定义榜单",
                    functionName: "loadImdbCardItems",
                    params: [
                        {
                            name: "url",
                            title: "榜单地址",
                            type: "input",
                            placeholders: [
                                { title: "IMDB热门电影", value: "https://www.imdb.com/chart/moviemeter/" }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
