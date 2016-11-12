var Jimp = require("../index.js");

var promises = [
    Jimp.loadFont(Jimp.FONT_SANS_8_BLACK),
    Jimp.loadFont(Jimp.FONT_SANS_16_BLACK),
    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK),
    Jimp.loadFont(Jimp.FONT_SANS_64_BLACK),
    Jimp.loadFont(Jimp.FONT_SANS_128_BLACK),
    Jimp.loadFont(Jimp.FONT_SANS_8_WHITE),
    Jimp.loadFont(Jimp.FONT_SANS_16_WHITE),
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE),
    Jimp.loadFont(Jimp.FONT_SANS_64_WHITE),
    Jimp.loadFont(Jimp.FONT_SANS_128_WHITE)
];

Promise.all(promises).then(function (fonts) {
    Jimp.read("lenna.png").then(lenna => {
        fonts.forEach(function(font, i) {
            lenna.clone().print(font, 10, 10, "This is Lenna.", lenna.bitmap.width).write("./output/lenna-text-" + i + ".png");
        });
        for (var i = 1; i < fonts.length; i++) {
            lenna.clone().print([fonts[i-1], fonts[i]], 10, 10, "This is Lenna.", lenna.bitmap.width).write("./output/lenna-text-"+(i-1)+"+"+i+".png");
        }
        lenna.clone().print(fonts, 10, 10, "This is Lenna.", lenna.bitmap.width).write("./output/lenna-text-all.png");
    });
}).catch(function (err) {
    console.log(err);
});
