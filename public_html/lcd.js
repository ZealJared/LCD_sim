lcd = {};
lcd.charSize = {
    x: 5,
    y: 8
};
lcd.begin = function (cols, rows) {
    lcd.blankPix = "&#9633;";
    lcd.pix = "&#9632;";
    lcd.blankChar = "";
    for(var i = 0; i < 40; i++){
        lcd.blankChar += lcd.blankPix;
    }
    lcd.cols = cols;
    lcd.rows = rows;
    lcd.element = $("<div class='lcd'></div>");
    $("body").append(lcd.element);
    var charCount = cols * rows;
    for(var i = 0; i < charCount; i++){
        var newChar = lcd.char();
        lcd.element.append(newChar);
    }
    lcd.chars = $(".lcd > .char");
    lcd.element.width(cols * lcd.chars.outerWidth());
    lcd.setCursor = function (col, row) {
        var charNumber = lcd.cols * row + col;
        lcd.activeChar = lcd.chars[charNumber];
    };
    lcd.home = function(){
        lcd.setCursor(0, 0);
    };
};

lcd.char = function(){
    var char = $("<div class='char'></div>");
    char.html(lcd.blankChar);
    return char;
};
