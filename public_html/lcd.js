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
        for(var i = 0; i < string.length && i < lcd.chars.length; i++){
            var char = string[i];
            lcd.activeChar.draw(char);
            lcd.activeChar = lcd.chars[lcd.activeChar.number + 1];
        }
        lcd.activeChar = lcd.chars[activeNumber];
    };
    lcd.clear = function(){
        lcd.home();
        var clearString = "";
        for(var i = 0; i < lcd.chars.length; i++){
            clearString += " ";
        }
        lcd.print(clearString);
    };
    lcd.home = function(){
        lcd.setCursor(0, 0);
    };
    lcd.home();
};

var fontChars = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

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
    ")": "4104211100",
    "*": "12aea9000",
    "+": "109f21000",
    ",": "3088",
    "-": "1f00000",
    ".": "3180",
    "/": "44444000",
    "0": "74675cc5c0",
    "1": "23084211c0",
    "2": "74422223e0",
    "3": "f88820c5c0",
    "4": "11952f8840",
    "5": "fc3c10c5c0",
    "6": "3221e8c5c0",
    "7": "fc44442100",
    "8": "7462e8c5c0",
    "9": "7462f08980",
    ":": "18c03180",
    ";": "18c03088",
    "<": "888820820",
    "=": "3e0f8000",
    ">": "8208222200",
    "?": "7442220080",
    "@": "7442dad5c0",
    "A": "74631fc620",
    "B": "f463e8c7c0",
    "C": "74610845c0",
    "D": "f46318c7c0",
    "E": "fc21e843e0",
    "F": "fc21e84200",
    "G": "746138c5e0",
    "H": "8c63f8c620",
    "I": "71084211c0",
    "J": "3884214980",
    "K": "8ca98a4a20",
    "L": "84210843e0",
    "M": "8eeb58c620",
    "N": "8c7359c620",
    "O": "746318c5c0",
    "P": "f463e84200",
    "Q": "74631ac9a0",
    "R": "f463ea4a20",
    "S": "7460e0c5c0",
    "T": "f908421080",
    "U": "8c6318c5c0",
    "V": "8c6318a880",
    "W": "8c635ad540",
    "X": "8c54454620",
    "Y": "8c62a21080",
    "Z": "f8444443e0",
    "[": "72108421c0",
    "\\": "410410400",
    "]": "70842109c0",
    "^": "22a2000000",
    "_": "1f",
    "`": "4104000000",
    "a": "1c17c5e0",
    "b": "842d98c7c0",
    "c": "1d0845c0",
    "d": "85b38c5e0",
    "e": "1d1fc1c0",
    "f": "3251c42100",
    "g": "1f1785c0",
    "h": "842d98c620",
    "i": "2008c211c0",
    "j": "100c214980",
    "k": "84254c5240",
    "l": "61084211c0",
    "m": "355ad6a0",
    "n": "2d98c620",
    "o": "1d18c5c0",
    "p": "3d1f4200",
    "q": "1b378420",
    "r": "2d984200",
    "s": "1d0707c0",
    "t": "42388424c0",
    "u": "2318cda0",
    "v": "2318a880",
    "w": "231ad540",
    "x": "22a22a20",
    "y": "231785c0",
    "z": "3e2223e0",
    "{": "1108821040",
    "|": "2108421080",
    "}": "4108221100",
    "~": "d90000"
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
