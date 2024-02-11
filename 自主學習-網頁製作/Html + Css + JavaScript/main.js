document.addEventListener("DOMContentLoaded", function () {
    //輸入
    var inputElement = document.getElementById("number");
    var answerElement = document.getElementById("answer1");
    inputElement.addEventListener("input", function () {
        var inputNumber = inputElement.value;
        var ans=count_ans(Number(inputNumber));
        //更新
        if(inputNumber && ans!=0){
            answerElement.textContent = inputNumber + "=" + ans;
        }
        else {
            answerElement.textContent = "=";
        }
    });
});

function count_ans(num){
    num = Number(num);
    //回傳非整數值
    if(num%1!=0 || num<=0 || num>=Math.pow(10,31)) return 0;
    //判斷數字可以倒6的幾次方
    var ans=""; var series=1;
    while(num>Math.pow(6,series)){
        series++;
    }
    //生成解答
    for(var i=series-1;i>=0;i--){
        var temp=Number(Math.floor(num/Math.pow(6,i)));
        if(temp!=0 &&i!=series-1)ans+="+";
        if(i==0 && temp!=0)ans+=became_to_6(temp);
        if(i!=0 && temp!=0){
            if(temp!=1) ans+="("+became_to_6(temp)+")*"; 
            ans+="6";
            if(i>1){
                ans+="^";
                if(i<6) ans+="(";
                ans+=became_to_6(i);
                if(i<6) ans+=")";
            }
        }
        num%=Math.pow(6,i);
    }
    return ans;
}

//硬爆
function became_to_6(num){
    switch(num){
        case 1: return "6/6"; break;
        case 2: return "(6+6)/6"; break;
        case 3: return "6/(6+6)"; break;
        case 4: return "6-(6+6)/6"; break;
        case 5: return "6-6/6"; break;
        case 6: return "6"; break;
        case 7: return "(6+6/6)"; break;
        case 8: return "(6+(6+6)/6)"; break;
        case 9: return "(6+6/(6+6))"; break;
        case 10: return "(6+6-(6+6)/6)"; break;
        case 11: return "(6+6-6/6)"; break;
        case 12: return "(6+6)"; break;
        case 13: return "(6+6+6/6)"; break;
        case 14: return "(6+6+6/6+6/6)"; break;
        case 15: return "(6/(6+6)*(6-(6/6)))"; break;
        case 16: return "((6-(6+6)/6)*(6-6+6)/6)"; break;
        case 17: return "(6+6+6-6/6)"; break;
        case 18: return "(6+6+6)"; break;
        case 19: return "(6+6+6+6/6)"; break;
        case 20: return "((6-(6+6)/6)*(6-6/6))"; break;
        case 21: return "(((6/6)*6+6/6)*((6+6)/6))"; break;
        case 22: return "((6/6)*6+6-(6+6)/6+6+6)"; break;
        case 23: return "(6+6+6+6-6/6)"; break;
        case 24: return "(6*(6-(6+6)/6))"; break;
        case 25: return "((6-6/6)*(6-6/6))"; break;
        case 26: return "(6+6/(6+6)*(6/(6+6))-6/6)"; break;
        case 27: return "(6+6/(6+6)*(6/(6+6)))"; break;
        case 28: return "((6-(6+6)/6)*(6+6/6))"; break;
        case 29: return "(6*6-6-6/6)"; break;
        case 30: return "(6*6-6)"; break;
        case 31: return "(6+(6-6/6)*(6-6/6))"; break;
        case 32: return "(6*6-(6-(6+6)/6))"; break;
        case 33: return "(6*6-6/(6+6))"; break;
        case 34: return "(6*6-(6+6)/6)"; break;
        case 35: return "(6*6-6/6)"; break;
        case 36: return "(6*6)"; break;
        case 37: return "(6*6+6/6)"; break;
        case 38: return "(6*6+(6+6)/6)"; break;
        case 39: return "(6*6+(6-(6+6)/6))"; break;
        case 40: return "(6*6+6/(6+6))"; break;
    }
}