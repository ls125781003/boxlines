// 注入全局方法 (仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0)
// 注入全局方法 (仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0)
// 注入全局方法 (仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0)
globalThis.getHeaders= function(input){
    let t = new Date().getTime().toString();
	let headers = {
        'version_name': '1.0.6',
        'version_code': '6',
        'package_name': 'com.app.nanguatv',
        'sign': md5('c431ea542cee9679#uBFszdEM0oL0JRn@' + t).toUpperCase(),
        'imei': 'c431ea542cee9679',
        'timeMillis': t,
        'User-Agent': 'okhttp/4.6.0'
	};
	return headers
}
	
var rule = {
	title:'南瓜影视',
	host:'http://ys.changmengyun.com',
	homeUrl:'/api.php/provide/vod_rank?app=ylys&sort_type=month&imei=c431ea542cee9679&id=2&page=1',
    url:'/api.php/provide/vod_list?app=ylys&id=fyclassfyfilter&page=fypage&imei=c431ea542cee9679',
    detailUrl:'/api.php/provide/vod_detail?app=ylys&imei=c431ea542cee9679&id=fyid',
    searchUrl:'/api.php/provide/search_result_more?app=ylys&video_name=**&pageSize=20&tid=0&imei=c431ea542cee9679&page=fypage',
	searchable:2,
	quickSearch:0,
	filterable:1,
	filter_url:'&area={{fl.area}}&year={{fl.year}}&type={{fl.class}}&total={{fl.total or "状态"}}&order={{fl.by or "新上线"}}',
    filter:'H4sIAAAAAAAAA+2X0XLSQBSG3yXXXARoKfRVnF5EhyuxzrTVGabDTCtSC21B6wxai9WOLcGxlKC1QjDty2Q38BYmJHvOWZwJdoxe5Y7vPz+bZXf/s2FTSSrL9zaVh/misqw8KGjr60pCWdUe5V10+iN2sufyU63wJD/1rboyq3Qm5Y4no6eUCGq1jm21nOqLoIwMjmaLVXXiABYOZ7fPyxV0IINDf8WGI+IAFg6+/ZJvNdGBDPOo6tJTkGGM3be2WSVjAIOjXOPP3hEHcGnF8/irqq3lNVxU1jLYvhm+qIEHpnpQH/e6ouaDqE3aR3zQw0FnJViymzo7tsR6+QA/40LnV1/Fb/ABxv/wGb8XAHzvzTlvXYjv+QBzbhh8eCPNS5JgjG8Gjh/AXcdgBwYz27A+U4Ba5ZpdlkXNB7o5xby2RjZneGWPrDmb43vEA1JqaiGoTD8SPY16muop1FNUT6KepLqKukr0ZA509yPRs6hnqb6E+hLVM6hnqL6I+iLoSXW6AJ+CGqCoq3Jdna3n5Hputp6V64B00+4Xcct4/ZCZjd+2zCl3+WGXt1viyAPDyTi3xr3n6ECGs9k07EHNMW/F8QR2J7OSUFLRts5jyzZ1tw2J+QDDfNxUNwx0IEfbbnYqriJqPty13cyNbhzBOIIRRDAdbQTP9MnRjpiMD3L4pOTRi9C9GvEi9IBcru51i5erB/8trpFOOr5R4ziHxnleWBf+wX3Jf36R7kuP5VOMDmQ5A8QBLCeIOIAjDbE96Lrzl/qPJP3JK3foq3oc6DjQ0QYaHrXxeEMrkCjXrvnW9pwo+x7xnPHtydgSJzcAOJ2X+87otThYPgTtJBNpP/GzT96ugeUQEQcwOL7/YGdN4gCOtFuEJV2a4ez0QrpH2B/x8V4fawGQM8JqH9n7UzwjAZP+Yo+a2F88iPtL3F/+/v2/9AsqovmovxQAAA==',
	headers:{
		"User-Agent":"okhttp/4.6.0"
	},
	timeout:5000,
	class_name:'电视剧&电影&动漫&综艺&海外精选', // /api.php/provide/home_nav
	class_url:'2&1&4&3&46',
	limit:20,
	play_parse:true,
tab_remove:['NG快播-1'],
    
lazy: $js.toString(() => {
        try {
            function getvideo(url) {
                let jData = JSON.parse(request(url, {
                    headers: getHeaders(url)
                }));
                if (jData.code == 1) {
                    
                    return jData.data.url
                } else {
                    return 'http://43.154.104.152:1234/jhapi/cs.php?url=' + url.split('=')[1]
                }
            }
            if (/,/.test(input)) {
                let mjurl = input.split(',')[0]
                let videoUrl = getvideo(mjurl);
                input = {
                    jx: 0,
                    url: videoUrl,
                    parse: 0,
                    header: JSON.stringify({
                        'user-agent': 'Lavf/58.12.100'
                    })
                }
            } else {
                let videoUrl = getvideo(input);
                
                if (/jhapi/.test(videoUrl)) {
                    videoUrl = getvideo(videoUrl);
                    input = {
                        jx: 0,
                        url: videoUrl,
                        parse: 0,
                        header: JSON.stringify({
                            'user-agent': 'Lavf/58.12.100'
                        })
                    }
                } else {
                    
                    input = {
                        jx: 0,
                        url: videoUrl,
                        parse: 0
                    }
                }
            }
        } catch (e) {
            log(e.toString())
        }
	}),
	推荐:$js.toString(() => {
        var d = [];
        let html = request(input, {
            headers: getHeaders(input)
        });
        html = JSON.parse(html);
        html.forEach(function(it) {
            d.push({
                title: it.name,
                img: it.img,
                desc: it.remarks,
                url: it.id
            })
        });
        setResult(d);
    }),
	一级:$js.toString(() => {
		var d = [];
		let html = request(input, {
			headers: getHeaders(input)
		});
		html = JSON.parse(html);
		html.list.forEach(function(it) {
			d.push({
				title: it.name,
				img: it.img,
				desc: it.msg,
				url: it.id
			})
		});
		setResult(d);
	}),
	二级:$js.toString(() => {
        var d = [];
        VOD = {
            vod_id: input.split('id=')[1]
        };
        try {
            let html = request(input, {
                headers: getHeaders(input)
            });
            html = JSON.parse(html);
            let node = html.data;
            VOD = {
                vod_name: node['name'],
                vod_pic: node['img'],
                type_name: node['type'],
                vod_year: node['year'],
                vod_remarks: '更新至: ' + node['msg'] + ' / 评分: ' + node['score'],
                vod_content: node['info'].strip()
            };
            let episodes = node.player_info;
            let playMap = {};
            if (typeof play_url === 'undefined') {
                var play_url = ''
            }
            episodes.forEach(function(ep) {
                let playurls = ep['video_info'];
                playurls.forEach(function(playurl) {
                    let source = ep['show'];
                    if (!playMap.hasOwnProperty(source)) {
                        playMap[source] = []
                    }
                    playMap[source].append(playurl['name'].strip() + '$' +  
                     //play_url + urlencode(playurl['url'][0])
                     play_url + playurl['url'][0]
                     )})
            });
            let playFrom = [];
            let playList = [];
            Object.keys(playMap)
                .forEach(function(key) {
                    playFrom.append(key);
                    playList.append(playMap[key].join('#'))
                });
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url
        } catch (e) {
            log('获取二级详情页发生错误:' + e.message)
        }
	}),
	搜索:$js.toString(() => {
        var d = [];
        let html = request(input, {
            headers: getHeaders(input)
        });
        html = JSON.parse(html);
        html.data.forEach(function(it) {
            d.push({
                title: it.video_name,
                img: it.img,
                desc: it.qingxidu + '/' + it.category,
                url: it.id,
                content: it.blurb
            })
        });
        setResult(d);
    }),
}