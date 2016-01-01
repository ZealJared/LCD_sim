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
    lcd.chars = [];
    for(var i = 0; i < charCount; i++){
        var newChar = lcd.char();
        newChar.number = i;
        lcd.element.append(newChar);
        lcd.chars.push(newChar);
    }
    lcd.element.width(cols * lcd.chars[0].outerWidth());
    lcd.setCursor = function (col, row) {
        var charNumber = lcd.cols * row + col;
        lcd.activeChar = lcd.chars[charNumber];
    };
    lcd.print = function(string){
        var activeNumber = lcd.activeChar.number;
        for(var i = 0; i < string.length; i++){
            var char = string[i];
            lcd.activeChar.draw(char);
            lcd.activeChar = lcd.chars[lcd.activeChar.number + 1];
        }
        lcd.activeChar = lcd.chars[activeNumber];
    };
    lcd.home = function(){
        lcd.setCursor(0, 0);
    };
    lcd.home();
};

lcd.font = {
    " ": 0,
    "!": "2108420080",
    '"': "5294000000",
    "#": "52beafa940",
    "$": "23e8e2f880",
    "%": "c644444c60",
    "&": "64a88ac9a0",
    "'": "2100000000",
    "(": "1110841040",
    ")": "4104211100"
};

lcd.char = function(){
    var char = $("<div class='char'></div>");
    char.html(lcd.blankChar);
    char.draw = function(char){
        if(typeof char !== "number" && char.length === 1){
            this.draw(lcd.font[char]);
        } else {
            var pix = parseInt(char, 16).toString(2).replace(/1/g, lcd.pix).replace(/0/g, lcd.blankPix);
            var pad = lcd.blankChar.substr(pix.length);
            this.html(pad + pix);
        }
    };
    return char;
};
