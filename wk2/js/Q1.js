// 要求一：函式與流程控制
// 完成以下函式，在函式中使用迴圈計算最小值到最大值之間，固定間隔的整數總和。其中你可
// 以假設 max 一定大於 min 且為整數，step 為正整數。

function calculate(min, max, step){
    let tot=0;
    for(var i=min;i<=max;i+=step){
        tot+=i;
    }
    console.log(tot);
}
calculate(1, 3, 1); // 你的程式要能夠計算 1+2+3，最後印出 6
calculate(4, 8, 2); // 你的程式要能夠計算 4+6+8，最後印出 18
calculate(-1, 2, 2); // 你的程式要能夠計算 -1+1，最後印出 0