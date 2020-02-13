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
var selectedClass = null; // 0 or 1, 0 is firstSide and 1 is secondSide
var whichturn = 0;

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
        komadiv.classList.add('firstSide');
    } else if (i == 73 || i == 81) {
        komadiv.textContent = kyousya;
        komadiv.classList.add('firstSide');
    } else if (i == 74 || i == 80) {
        komadiv.textContent = keima;
        komadiv.classList.add('firstSide');
    } else if (i == 75 || i == 79) {
        komadiv.textContent = gin;
        komadiv.classList.add('firstSide');
    } else if (i == 76 || i == 78) {
        komadiv.textContent = kin;
        komadiv.classList.add('firstSide');
    } else if (i == 77) {
        komadiv.textContent = oh;
        komadiv.classList.add('firstSide');
    } else if (i == 71) {
        komadiv.textContent = hisya;
        komadiv.classList.add('firstSide');
    } else if (i == 65) {
        komadiv.textContent = kaku;
        komadiv.classList.add('firstSide');
    }

    banmendiv.classList.add('box');
    banmendiv.setAttribute("id",i);
    banmendiv.appendChild(komadiv);

    document.getElementById('center').appendChild(banmendiv);

    banmendiv.addEventListener('click', () => {

        // 逆手番の駒は選択できない
        if (this.selectedClass === null) {
            if ((this.whichturn == 0 && banmendiv.firstElementChild.className === "secondSide") || (this.whichturn == 1 && banmendiv.firstElementChild.className === "firstSide") ) {
                return;
            }
        }
            

        // 移動元の駒が選択されていないとき
        if (this.selectedClass === null) {
            // 盤面の子要素のクラスで操作を判定
            if (banmendiv.firstElementChild.className === "firstSide") {
                // 先手番の駒をクリックしたら
                this.selectedClass = 0;
                banmendiv.classList.toggle('onCatch');
            } else if (banmendiv.firstElementChild.className === "secondSide") {
                // 後手番の駒をクリックしたら
                this.selectedClass = 1;
                banmendiv.classList.toggle('onCatch');
            } else {
                // 空白の盤面をクリックしtら
                return;
            }
        }
            
        // 移動元の駒が既に選択されているとき移動先のid取得
        if (this.selectedPosition !== null) {
            this.transferPosition = banmendiv.getAttribute("id");
            
        }

        // 移動元の駒が選択されていないとき移動元のid取得
        if (this.selectedPosition == null) {
            this.selectedPosition = banmendiv.getAttribute("id");
            this.text = banmendiv.firstElementChild.textContent;
        }

        // 移動元と移動先が同じ時はエラーが起きないようにする
        if (this.selectedPosition == this.transferPosition) {
            this.transferPosition = null;
            return;
        }

        if (this.transferPosition !== null) {

            // 移動先にdivがあったら削除
            const deletediv = document.getElementById(this.transferPosition).firstElementChild;
            if (deletediv !== null) {
                document.getElementById(this.transferPosition).removeChild(document.getElementById(this.transferPosition).firstElementChild);
            }

            // 持ち駒作成
            if (deletediv.className === 'secondSide') {
                const mochigomaadddiv = document.createElement('div');
                mochigomaadddiv.textContent = deletediv.textContent;
                mochigomaadddiv.classList.add('mochigomafirstside');
                document.getElementById('right').appendChild(mochigomaadddiv);
            } else if (deletediv.className === 'firstSide')  {
                const mochigomaadddiv = document.createElement('div');
                mochigomaadddiv.textContent = deletediv.textContent;
                mochigomaadddiv.classList.add('mochigomasecondside');
                document.getElementById('left').appendChild(mochigomaadddiv);
            }
            
            // 移動先に追加するdiv要素を作成
            const adddiv = document.createElement('div');
            adddiv.textContent = this.text;

            if (this.selectedClass == 0) {
                adddiv.classList.add('firstSide');
            } else if (this.selectedClass == 1) {
                adddiv.classList.add('secondSide');
            }
            
            banmendiv.appendChild(adddiv);

            // 移動元のdivを削除
            document.getElementById(this.selectedPosition).removeChild(document.getElementById(this.selectedPosition).firstElementChild);
            document.getElementById(this.selectedPosition).classList.toggle('onCatch');

            // クラス変数の初期化
            this.selectedClass = null;
            this.text = null;
            this.selectedPosition = null;
            this.transferPosition = null;

            // 手番の変更
            if (this.whichturn == 0) {
                this.whichturn = 1;
            } else {
                this.whichturn = 0;
            }

            

        }
    });


}