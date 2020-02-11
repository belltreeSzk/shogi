'use strict';

var hohei   = "歩"; // 19～27,55～63
var kyousya = "香"; // 1,9,73,81
var keima   = "桂"; // 2,8,74,80
var gin     = "銀"; // 3,7,75,79
var kin     = "金"; // 4,6,76,78
var oh      = "王"; // 5,77
var hisya   = "飛"; // 11,71
var kaku    = "角"; // 17,65

var text = null;
var selectedPosition = null;
var transferPosition = null;

for (let i = 1; i < 82; i++) {
    // iは1から81まで
    const banmendiv = document.createElement('div');
    const komadiv   = document.createElement('div');
    
    // 駒を配置
    if (19 <= i && i <= 27) {
    // 後手
        komadiv.textContent = hohei;
        komadiv.classList.add('secondSide');
    } else if ( i == 1 || i == 9) {
        komadiv.textContent = kyousya;
        komadiv.classList.add('secondSide');
    } else if (i == 2 || i == 8) {
        komadiv.textContent = keima;
        komadiv.classList.add('secondSide');
    } else if (i == 3 || i == 7) {
        komadiv.textContent = gin;
        komadiv.classList.add('secondSide');
    } else if (i == 4 || i == 6) {
        komadiv.textContent = kin;
        komadiv.classList.add('secondSide');
    } else if (i == 5) {
        komadiv.textContent = oh;
        komadiv.classList.add('secondSide');
    } else if (i == 11) {
        komadiv.textContent = hisya;
        komadiv.classList.add('secondSide');
    } else if (i == 17) {
        komadiv.textContent = kaku;
        komadiv.classList.add('secondSide');
    } else if (55 <= i && i <= 63) {
    // 先手
        komadiv.textContent = hohei;
    } else if (i == 73 || i == 81) {
        komadiv.textContent = kyousya;
    } else if (i == 74 || i == 80) {
        komadiv.textContent = keima;
    } else if (i == 75 || i == 79) {
        komadiv.textContent = gin;
    } else if (i == 76 || i == 78) {
        komadiv.textContent = kin;
    } else if (i == 77) {
        komadiv.textContent = oh;
    } else if (i == 71) {
        komadiv.textContent = hisya;
    } else if (i == 65) {
        komadiv.textContent = kaku;
    }

    banmendiv.classList.add('box');
    banmendiv.setAttribute("id",i);
    banmendiv.appendChild(komadiv);

    document.getElementById('wholeWrapper').appendChild(banmendiv);

    // 
    banmendiv.addEventListener('click', () => {

        console.log("1" + this.text);
        console.log("2" + this.selectedPosition);
        console.log("3" + this.transferPosition);

        if (this.selectedPosition !== null) {
            this.transferPosition = banmendiv.getAttribute("id");
            console.log("4" + this.text);
            console.log("5" + this.selectedPosition);
            console.log("6" + this.transferPosition);
        }

        if (this.selectedPosition == null) {
            this.selectedPosition = banmendiv.getAttribute("id");
            this.text = banmendiv.firstElementChild.textContent;
            console.log("7" + this.text);
            console.log("8" + this.selectedPosition);
            console.log("9" + this.transferPosition);
        }

        if (this.transferPosition !== null) {

            document.getElementById(this.transferPosition).removeChild(document.getElementById(this.transferPosition).firstElementChild);

            const adddiv = document.createElement('div');
            adddiv.textContent = this.text;
            banmendiv.appendChild(adddiv);

            document.getElementById(this.selectedPosition).removeChild(document.getElementById(this.selectedPosition).firstElementChild);

            console.log("10" + this.text);
            console.log("11" + this.selectedPosition);
            console.log("12" + this.transferPosition);

            this.text = null;
            this.selectedPosition = null;
            this.transferPosition = null;

            

        }
    });


}