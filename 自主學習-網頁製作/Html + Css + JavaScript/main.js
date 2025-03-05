const VeryBig = 999999999999999999999999999999999999999999999999999999999999999999999999999n;

document.addEventListener("DOMContentLoaded", function () {
    var inputElement = document.getElementById("number");
    var answerElement = document.getElementById("answer1");
    inputElement.addEventListener("input", function () {
        var inputNumber = inputElement.value;
        if(Number(inputNumber) > VeryBig) inputElement.value = VeryBig;
        var ans= count_ans(inputNumber);
        // 更新
        if(ans !== "Nah" && inputNumber){
            answerElement.textContent = inputNumber + " = " + ans;
        }
        else {
            answerElement.textContent = inputNumber + " = ";
        }
    });
});

function count_ans(num) {
    num = Number(num);
    if (num > VeryBig) return "Nah";
    if (num == 0) return "(6 - 6)";

    let pow_6 = [];
    for (var i = 1; i <= VeryBig; i *= 6) {
        pow_6.push(i);
    }

    var ans = "", plus = false, minus = false;
    if (num < 0) {
        ans += "-(";
        num *= -1;
        minus = true;
    }

    for (var i = pow_6.length - 1; i >= 0; i--) {
        let coefficient = Math.floor(num / pow_6[i]); // 取得該次方的係數
        if (coefficient > 0) {
            if (plus) ans += " + ";
            else plus = true;
            ans += became_to_6(coefficient); // 轉換係數為 6 表示
            if (i > 1) ans += "*(6^" + became_to_6(i) + ")";
            else if (i == 1) ans += "*6";
            num %= pow_6[i]; // 更新剩餘值
        }
    }

    if (minus) ans += ")";
    return ans;
}

// 轉換數字為純 6 表示
function became_to_6(num) {
    let expr = {
        0: "(6-6)",
        1: "(6/6)",
        2: "((6+6)/6)",
        3: "(6/((6+6)/6))",
        4: "(6-(6+6)/6)",
        5: "(6-6/6)",
        6: "6"
    };

    if (num in expr) return expr[num];

    // 若 num 大於 6，則使用遞迴拆分成純 6 表達式
    let closest = 6 * Math.floor(num / 6);
    let remainder = num % 6;
    if (remainder === 0) {
        return "(" + became_to_6(closest / 6) + "*6)";
    } else {
        return "(" + became_to_6(closest / 6) + "*6 + " + became_to_6(remainder) + ")";
    }
}
