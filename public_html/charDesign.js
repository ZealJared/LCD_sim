char = function(){
    this.contain = $("<div class='contain'></div>");
    this.hex = $("<div class='hex'>0</div>");
    this.el = $("<div class='char'></div>");
    this.contain.append(this.el);
    this.contain.append(this.hex);
    $("body").append(this.contain);
    // string of 40 0's that become 1's on click, showing hex value
    for(var i = 0; i < 40; i++){
        var pix = $("<span>□</span>");
        this.el.append(pix);
    }
    this.el.children("span").on("click", function(){
        console.log("Yup.");
        $(this).text($(this).text() === "□" ? "■" : "□");
        $(this).parents('.contain').children(".hex").text(parseInt($(this).parent().text().replace(/□/g, "0").replace(/■/g, "1"), 2).toString(16));
    });
};
