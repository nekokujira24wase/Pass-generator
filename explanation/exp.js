const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "", // 使えるcharacterを追加する変数
        randomPassword = "", // staticPasswordの中からランダムで取り出して、文字を入れる変数
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            // ==は型が違くても値が同じならtrueを返す
            // ===は型と値が同じじゃないとtrueを返さない
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            // 三項演算子
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    passwordInput.value = randomPassword;

}

const updatePassIndicator = () => {
    // 三項演算子を入れ子にしている
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    // .pass-length spanは.pass-lengthの中のspanタグを指定している
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
// 最初にこの関数を呼び出す
updateSlider();

const copyPassword = () => {
    // navigator.clipboardはクリップボードへのアクセスを許可するWebAPI
    // .writeText()はclipboardオブジェクトのメソッドで引数をクリップボードに記録できる
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check"; // テキスト変更する→googleiconが変化する仕組み
    copyIcon.style.color = "#4285f4";
    // 指定した時間（ミリ秒）後に実行されるsetTimeout関数を定義
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

// クリック/インプットイベントを設定しイベント発生時に関数が実行されるようにしている
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);