let express = require('express');
let cheerio = require('cheerio');
let superagent = require('superagent');
let fs = require('fs');
let xml2obj = require('xml2obj-stream');
let parseString = require('xml2js').parseString;


let app = express();

app.get('/cnodejs', function (req, res, next) {
    superagent.get('https://cnodejs.org')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                })
            });

            res.send(items);
        })
});


app.get('/woshimrf', function (req, res, next) {
    let index = req.query.pageIndex || 1;
    let size = req.query.pageSize || 5;

    let postcount = 0;
    let total = 0;
    let stats = new Map();

    superagent.get('http://wcf.open.cnblogs.com/blog/u/woshimrf/posts/' + index + '/' + size)
        .buffer(true)
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }

            let rs = sres.text;

            parseString(rs, { explicitArray: false, ignoreAttrs: true }, function (err, result) {
                if (err) {
                    return next(err);
                }

                postcount = result.postcount;
                let entries = result.entry;
                if (entries == undefined) {
                    return next("Done, entry is not exist.");
                }

                entries.forEach(function (entry, index) {
                    let {id, views} = entry;
                    if(stats.get(id)==undefined){
                        stats.set(id, entry);
                    }
                });

            });


        });

    res.send("done");

});

app.listen(3000, function () {
    console.log("app is running at http://localhost:3000");
})