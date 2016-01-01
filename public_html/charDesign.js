var char = {};
char.init = function(){
    char.hex = $("<div>0</div>");
    char.el = $("<div class='char'></div>");
    $("body").append(char.el);
    $("body").append(char.hex);
    // string of 40 0's that become 1's on click, showing hex value
    for(var i = 0; i < 40; i++){
        var pix = $("<span>□</span>");
        char.el.append(pix);
    }
    $(".char > span").on("click", function(){
        $(this).text($(this).text() === "□" ? "■" : "□");
        char.hex.text(parseInt($(this).parent().text().replace(/□/g, "0").replace(/■/g, "1"), 2).toString(16));
    });
};
