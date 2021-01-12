function SHA256(s) {


    var chrsz = 8;


    var hexcase = 0;


    function safe_add(x, y) {


        var lsw = (x & 0xFFFF) + (y & 0xFFFF);


        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);


        return (msw << 16) | (lsw & 0xFFFF);


    }


    function S(X, n) {
        return (X >>> n) | (X << (32 - n));
    }


    function R(X, n) {
        return (X >>> n);
    }


    function Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
    }


    function Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
    }


    function Sigma0256(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
    }


    function Sigma1256(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
    }


    function Gamma0256(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
    }


    function Gamma1256(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
    }


    function core_sha256(m, l) {


        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);


        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);


        var W = new Array(64);


        var a, b, c, d, e, f, g, h, i, j;


        var T1, T2;


        m[l >> 5] |= 0x80 << (24 - l % 32);


        m[((l + 64 >> 9) << 4) + 15] = l;


        for (var i = 0; i < m.length; i += 16) {


            a = HASH[0];


            b = HASH[1];


            c = HASH[2];


            d = HASH[3];


            e = HASH[4];


            f = HASH[5];


            g = HASH[6];


            h = HASH[7];


            for (var j = 0; j < 64; j++) {


                if (j < 16) W[j] = m[j + i];


                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);


                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);


                T2 = safe_add(Sigma0256(a), Maj(a, b, c));


                h = g;


                g = f;


                f = e;


                e = safe_add(d, T1);


                d = c;


                c = b;


                b = a;


                a = safe_add(T1, T2);


            }


            HASH[0] = safe_add(a, HASH[0]);


            HASH[1] = safe_add(b, HASH[1]);


            HASH[2] = safe_add(c, HASH[2]);


            HASH[3] = safe_add(d, HASH[3]);


            HASH[4] = safe_add(e, HASH[4]);


            HASH[5] = safe_add(f, HASH[5]);


            HASH[6] = safe_add(g, HASH[6]);


            HASH[7] = safe_add(h, HASH[7]);


        }


        return HASH;


    }


    function str2binb(str) {


        var bin = Array();


        var mask = (1 << chrsz) - 1;


        for (var i = 0; i < str.length * chrsz; i += chrsz) {


            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);


        }


        return bin;


    }


    function Utf8Encode(string) {


        string = string.replace(/\r\n/g, "\n");


        var utftext = "";


        for (var n = 0; n < string.length; n++) {


            var c = string.charCodeAt(n);


            if (c < 128) {


                utftext += String.fromCharCode(c);


            } else if ((c > 127) && (c < 2048)) {


                utftext += String.fromCharCode((c >> 6) | 192);


                utftext += String.fromCharCode((c & 63) | 128);


            } else {


                utftext += String.fromCharCode((c >> 12) | 224);


                utftext += String.fromCharCode(((c >> 6) & 63) | 128);


                utftext += String.fromCharCode((c & 63) | 128);


            }


        }


        return utftext;


    }


    function binb2hex(binarray) {


        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";


        var str = "";


        for (var i = 0; i < binarray.length * 4; i++) {


            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +


                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);


        }


        return str;


    }


    s = Utf8Encode(s);


    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));


}

$("#internalPortalButton").click(function (x) {
    console.log("Go button clicked");
    var inputHashCode = SHA256($("#internalPortalInput").val());
    if (inputHashCode === "c917d6192b4fc773af45fbe0e42da0d0a5c021ba167b95ba8618f57f519d02e6") {
        console.log("correct");
        $("#internalPortalInput").removeClass("is-invalid");
        $("#internalPortalInput").addClass("is-valid");
        window.location.replace("internal.html?code=c917d6192b4fc773af45fbe0e42da0d0a5c021ba167b95ba8618f57f519d02e6");
    }
    else {
        console.log("wrong");
        $("#internalPortalInput").removeClass("is-valid");
        $("#internalPortalInput").addClass("is-invalid");
    }
});

$("#animationTrigger").click(function () {
   animateSCMUN();
});


//-------------
//Photo Gallery
//-------------


//!!!!
const max = 2055; //NO of the last photo
// const groupMax = 9; //Amount to add each group [legacy]
var filterName = "all"; //Default filter

const UNSCStart = 0;
const UNSCEnd = 0; //NO of last UNSC photo

const DISECStart = UNSCEnd + 1;
const DISECEnd = 0; //NO of last DISEC photo

const WHOStart = DISECEnd + 1;
const WHOEnd = 0; //NO of last WHO photo

const ECOSOCStart = WHOEnd + 1;
const ECOSOCEnd = 0; //NO of last ECOSOC photo

const SOCHUMStart = ECOSOCEnd + 1;
const SOCHUMEnd = 0; //NO of last SOCHUM photo

const UNICEFStart = SOCHUMEnd + 1;
const UNICEFEnd = 0; //NO of last UNICEF photo
//!!!!

//Load all
function loadAllPhotos() {
    addGroup(max - addedPhotos.length);
}

var addedPhotos = [];

//Add photo with given number
function addPhoto(i) {

    var length = i.toString().length;

    //Generate Image Serial
    if(length === 1) {
        console.log("add 000");
        var imageSerial = "000" + i.toString()
    }
    else if(length === 2) {
        console.log("add 00");
        var imageSerial = "00" + i.toString()
    }
    else if(length === 3) {
        console.log("add 0");
        var imageSerial = "0" + i.toString()
    }
    else if(length === 4) {
        console.log("add nothing");
        var imageSerial = "" + i.toString()
    }
    else {
        console.log("data length longer than 4 digits")
    }

    //Check catagory
    if (UNSCStart <= i && i <= UNSCEnd) {
        filterName = "UNSC";
    }
    else if (DISECStart <= i && i <= DISECEnd) {
        filterName = "DISEC"
    }
    else if (WHOStart <= i && i <= WHOEnd) {
        filterName = "WHO"
    }
    else if (ECOSOCStart <= i && i <= ECOSOCEnd) {
        filterName = "ECOSOC"
    }
    else if (SOCHUMStart <= i && i <= SOCHUMEnd) {
        filterName = "SOCHUM"
    }
    else if (UNICEFStart <= i && i <= UNICEFEnd) {
        filterName = "UNICEF"
    }
    else {
        console.log("Error finding catagory")
    }


    //Logging
    addedPhotos.push(i);
    console.log(addedPhotos);
    console.log("output file serial is " + imageSerial);
    console.log("the photo belongs to " + filterName);

    //Generate html element
    $("#largeGallery").append(
        "    <div class=\"col-md-4 pics animation all " + filterName + "\">\n" +
        "        <figure class=\"\">\n" +
        "          <a href=\"gallery/full/" + imageSerial + ".jpg\" data-size=\"3000x2000\">\n" +
        "            <img src=\"gallery/thumbnails/" + imageSerial + ".jpg\" class=\"img-fluid\">\n" +
        "          </a>\n" +
        "        </figure>" +
        "    </div>\n");
}

//Generate number between 1 and last available photo
function getRandomInt() {
    //Returns intiger from 0 to max - 1
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}

//Check Avalibility of generated number
function checkAvalibility() {
    var generated = getRandomInt();
    if (addedPhotos.includes(generated) === false) {
        return generated;
    }
    else {
        return false;
    }
}

//Add group of x number pf photos
function addGroup(x) {
    var i = 1;
    while (i <= x) {
        console.log("adding" + i + "th photo");
        var generatedNumber = checkAvalibility();
        if (generatedNumber === false) {

        }
        else {
            addPhoto(generatedNumber);
            i++
        }
    }
}

//Figure out how many to add [old]
function amountToAdd() {
    if (max - addedPhotos.length >= groupMax) {
        return groupMax
    }
    else {
        console.log("no more");
        $("#loadMoreButton").text("No More");
        $("#loadMoreButton").prop("disabled", true);
        return max - addedPhotos.length;
    }
}

//Load More detaction [old]
$("#loadMoreButton").click(function () {
    console.log("Load More Buttom Clicked");
    addGroup(amountToAdd());
});


//Filter Animation
$(function() {
    var selectedClass = "";
    $(".filter").change(function(){
        console.log("radio button click detected")
        if ($(this).is(':checked')) {
            selectedClass = $(this).attr("data-rel");
            $("#largeGallery").fadeTo(100, 0);
            $("#largeGallery div").not("."+selectedClass).fadeOut().removeClass('animation');
            setTimeout(function() {
                $("."+selectedClass).fadeIn().addClass('animation');
                $("#largeGallery").fadeTo(300, 1);
            }, 350);
        }
    });
});
// $(function() {
//     var selectedClass = "";
//     $(".filter").click(function(){
//         selectedClass = $(this).attr("data-rel");
//         $("#largeGallery").fadeTo(100, 0);
//         $("#largeGallery div").not("."+selectedClass).fadeOut().removeClass('animation');
//         setTimeout(function() {
//             $("."+selectedClass).fadeIn().addClass('animation');
//             $("#largeGallery").fadeTo(300, 1);
//         }, 350);
//     });
// });



//---------------
//Programming Art
//---------------

function printSCMUN() {
    console.log("" +
        " ________   ________    _______   ,         ,  __       ,           ,         _________________\n" +
        "(  _____ \\ (  _____ \\  / _   _ \\  |\\       /| |  \\     /|           |\\       / _   __   __   _/\n" +
        "| (     \\/ | (     \\/ | / | | \\ ) | )     ( | |   \\   ( |           | )     ( ( ) (  ) (  ) (  \n" +
        "| (______  | |        | | | | | | | |     | | | |\\ \\  | |           | |     | | | |  | |  | |  \n" +
        "(______  ) | |        | | | | | | | |     | | | | \\ \\ | |           ( |     | ) | |  | |  | |  \n" +
        "       ) | | |        | ( | | ) | | |     | | | |  \\ \\| |            \\ \\   / /  | |  | |  | |  \n" +
        "/\\_____/ | | (_____/\\ | ) | | ( | ( \\_____/ ) | )   \\   |             \\ \\_/ /  _) (__) (__) (_ \n" +
        "\\________) (________/ |/  )_(  \\|  \\_______/  |/     \\__|              \\___/  /_______________\\");

}

function printG() {
    console.log("" +
        " ________   _________    _______   ,         ,  __       ,\n" +
        "(  _____ \\ (  ______ \\  / _   _ \\  |\\       /| |  \\     /|\n" +
        "| (     \\/ | (      \\/ | / | | \\ ) | )     ( | |   \\   ( |\n" +
        "| (______  | |    __   | | | | | | | |     | | | |\\ \\  | |\n" +
        "(______  ) | |   (_  \\ | | | | | | | |     | | | | \\ \\ | |\n" +
        "       ) | | |     ) | | ( | | ) | | |     | | | |  \\ \\| |\n" +
        "/\\_____/ | | (_____) | | ) | | ( | ( \\_____/ ) | )   \\   |\n" +
        "\\________) (_________) |/  )_(  \\|  \\_______/  |/     \\__|\n");

}

function printE() {
    console.log("" +
        " ________   ________  |\\          _______   ,         ,  __       ,\n" +
        "(  _____ \\ (  _____ \\ | |__      / _   _ \\  |\\       /| |  \\     /|\n" +
        "| (     \\/ | (     \\/ |  _ \\    | / | | \\ ) | )     ( | |   \\   ( |\n" +
        "| (______  | |______  | ( \\ \\   | | | | | | | |     | | | |\\ \\  | |\n" +
        "(______  ) |  ______) | (__) )  | | | | | | | |     | | | | \\ \\ | |\n" +
        "       ) | | |        \\_____/   | ( | | ) | | |     | | | |  \\ \\| |\n" +
        "/\\_____/ | | (_____/\\           | ) | | ( | ( \\_____/ ) | )   \\   |\n" +
        "\\________) (________/           |/  )_(  \\|  \\_______/  |/     \\__|\n");

}

function printF() {
    console.log("" +
        " ________   ________    _______   ,         ,  __       ,\n" +
        "(  _____ \\ (  _____ \\  / _   _ \\  |\\       /| |  \\     /|\n" +
        "| (     \\/ | (     \\/ | / | | \\ ) | )     ( | |   \\   ( |\n" +
        "| (______  | |______  | | | | | | | |     | | | |\\ \\  | |\n" +
        "(______  ) |  ______) | | | | | | | |     | | | | \\ \\ | |\n" +
        "       ) | | |        | ( | | ) | | |     | | | |  \\ \\| |\n" +
        "/\\_____/ | | |        | ) | | ( | ( \\_____/ ) | )   \\   |\n" +
        "\\________) (_)        |/  )_(  \\|  \\_______/  |/     \\__|\n");

}

function printD() {
    console.log("" +
        " ________   _______,     _______   ,         ,  __       ,\n" +
        "(  _____ \\ (  ____, \\   / _   _ \\  |\\       /| |  \\     /|\n" +
        "| (     \\/ | (     \\ ) | / | | \\ ) | )     ( | |   \\   ( |\n" +
        "| (______  | |     | | | | | | | | | |     | | | |\\ \\  | |\n" +
        "(______  ) | |     | | | | | | | | | |     | | | | \\ \\ | |\n" +
        "       ) | | |     | | | ( | | ) | | |     | | | |  \\ \\| |\n" +
        "/\\_____/ | | (_____/ ) | ) | | ( | ( \\_____/ ) | )   \\   |\n" +
        "\\________) (________/  |/  )_(  \\|  \\_______/  |/     \\__|\n");

}

function printA() {
    console.log("" +
        " ________      ,_,     |\\          _______   ,         ,  __       ,\n" +
        "(  _____ \\    / _ \\    | |__      / _   _ \\  |\\       /| |  \\     /|\n" +
        "| (     \\/   / / \\ \\   |  _ \\    | / | | \\ ) | )     ( | |   \\   ( |\n" +
        "| (______   / /___\\ \\  | ( \\ \\   | | | | | | | |     | | | |\\ \\  | |\n" +
        "(______  ) (  _____  ) | (__) )  | | | | | | | |     | | | | \\ \\ | |\n" +
        "       ) | | |     | | \\_____/   | ( | | ) | | |     | | | |  \\ \\| |\n" +
        "/\\_____/ | | |     | |           | ) | | ( | ( \\_____/ ) | )   \\   |\n" +
        "\\________) |/       \\|           |/  )_(  \\|  \\_______/  |/     \\__|\n");

}

function printC() {
    console.log("" +
        " ________   ________    _______   ,         ,  __       ,\n" +
        "(  _____ \\ (  _____ \\  / _   _ \\  |\\       /| |  \\     /|\n" +
        "| (     \\/ | (     \\/ | / | | \\ ) | )     ( | |   \\   ( |\n" +
        "| (______  | |        | | | | | | | |     | | | |\\ \\  | |\n" +
        "(______  ) | |        | | | | | | | |     | | | | \\ \\ | |\n" +
        "       ) | | |        | ( | | ) | | |     | | | |  \\ \\| |\n" +
        "/\\_____/ | | (_____/\\ | ) | | ( | ( \\_____/ ) | )   \\   |\n" +
        "\\________) (________/ |/  )_(  \\|  \\_______/  |/     \\__|\n");

}


function animateSCMUN() {

    console.clear();

    // setTimeout(function(){
    //     console.log("" +
    //         "|  - - - - - -   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| - - - - - -   - - - - - -   - - - - - -   - - - - - -  |\n" +
    //         "|  - - - - - -   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| - - - - - -   - - - - - -   - - - - - -   - - - - - -  |\n" +
    //         "|  - - - - - -   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| - - - - - -   - - - - - -   - - - - - -   - - - - - -  |\n" +
    //         "|  - - - - - -   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| - - - - - -   - - - - - -   - - - - - -   - - - - - -  |\n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 400);
    // }, 0);
    // setTimeout(function(){
    //     console.log("" +
    //         "| ############   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| ############  - - - - - -   - - - - - -   - - - - - -  |\n" +
    //         "| ############   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| ############  - - - - - -   - - - - - -   - - - - - -  |\n" +
    //         "| ############   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| ############  - - - - - -   - - - - - -   - - - - - -  |\n" +
    //         "| ############   - - - - - -   - - - - - -   - - - - - - |\n" +
    //         "| ############  - - - - - -   - - - - - -   - - - - - -  |\n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 400);
    // }, 800);
    // setTimeout(function(){
    //     console.log("" +
    //         "| ############  ############   - - - - - -   - - - - - - |\n" +
    //         "| ############  ############  - - - - - -   - - - - - -  |\n" +
    //         "| ############  ############   - - - - - -   - - - - - - |\n" +
    //         "| ############  ############  - - - - - -   - - - - - -  |\n" +
    //         "| ############  ############   - - - - - -   - - - - - - |\n" +
    //         "| ############  ############  - - - - - -   - - - - - -  |\n" +
    //         "| ############  ############   - - - - - -   - - - - - - |\n" +
    //         "| ############  ############  - - - - - -   - - - - - -  |\n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 400);
    // }, 1600);
    // setTimeout(function(){
    //     console.log("" +
    //         "| ############  ############  ############   - - - - - - |\n" +
    //         "| ############  ############  ############  - - - - - -  |\n" +
    //         "| ############  ############  ############   - - - - - - |\n" +
    //         "| ############  ############  ############  - - - - - -  |\n" +
    //         "| ############  ############  ############   - - - - - - |\n" +
    //         "| ############  ############  ############  - - - - - -  |\n" +
    //         "| ############  ############  ############   - - - - - - |\n" +
    //         "| ############  ############  ############  - - - - - -  |\n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 400);
    // }, 2400);
    // setTimeout(function(){
    //     console.log("" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n" +
    //         "| ############  ############  ############  ############ |\n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 400);
    // }, 3200);
    //
    //
    //
    //
    // setTimeout(function(){
    //     console.log("" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "    ____________    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 4000);
    // setTimeout(function(){
    //     printG();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 4200);
    // setTimeout(function(){
    //     printG();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 4400);
    // setTimeout(function(){
    //     printG();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 4600);
    //
    //
    //
    //
    // setTimeout(function(){
    //     printE();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 1580);
    // }, 4800);
    //
    //
    //
    //
    // setTimeout(function(){
    //     console.log("" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "    ____________    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 6400);
    // setTimeout(function(){
    //     printF();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 6600);
    // setTimeout(function(){
    //     printF();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 6800);
    // setTimeout(function(){
    //     printF();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 7000);
    //
    //
    //
    //
    // setTimeout(function(){
    //     printD();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 1580);
    // }, 7200);
    //
    //
    //
    //
    // setTimeout(function(){
    //     console.log("" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "    ____________    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n" +
    //         "                    \n");
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 8800);
    // setTimeout(function(){
    //     printG();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 9000);
    // setTimeout(function(){
    //     printG();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 9200);
    // setTimeout(function(){
    //     printG();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 9400);
    //
    //
    //
    //
    // setTimeout(function(){
    //     printE();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 9600);
    // setTimeout(function(){
    //     printA();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 9800);
    // setTimeout(function(){
    //     printA();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 10000);
    // setTimeout(function(){
    //     printA();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 10200);
    //
    //
    //
    //
    // setTimeout(function(){
    //     printE();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 10400);
    // setTimeout(function(){
    //     printA();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 10600);
    // setTimeout(function(){
    //     printA();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 10800);
    // setTimeout(function(){
    //     printA();
    //     setTimeout(function(){
    //         console.clear();
    //     }, 180);
    // }, 11000);
    //
    //
    //
    //
    // setTimeout(function(){
    //     printSCMUN();
    //
    // }, 11200);






    setTimeout(function(){
        console.log("" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "    ____________    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n");
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 0);
    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 200);
    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 400);
    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 600);




    setTimeout(function(){
        printE();
        setTimeout(function(){
            console.clear();
        }, 1580);
    }, 800);




    setTimeout(function(){
        console.log("" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "    ____________    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n");
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 2400);
    setTimeout(function(){
        printF();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 2600);
    setTimeout(function(){
        printF();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 2800);
    setTimeout(function(){
        printF();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 3000);




    setTimeout(function(){
        printD();
        setTimeout(function(){
            console.clear();
        }, 1580);
    }, 3200);




    setTimeout(function(){
        console.log("" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "    ____________    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n" +
            "                    \n");
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 4800);
    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 5000);
    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 5200);
    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 5400);




    setTimeout(function(){
        printE();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 5600);
    setTimeout(function(){
        printA();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 5800);
    setTimeout(function(){
        printA();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 6000);
    setTimeout(function(){
        printA();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 6200);




    setTimeout(function(){
        printG();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 6400);
    setTimeout(function(){
        printE();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 6600);
    setTimeout(function(){
        printE();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 6800);
    setTimeout(function(){
        printE();
        setTimeout(function(){
            console.clear();
        }, 180);
    }, 7000);




    setTimeout(function(){
        printSCMUN();

    }, 7200);

    setTimeout(function(){
        console.log("hint: there's another easter egg somewhere else")
    }, 7201);


}


