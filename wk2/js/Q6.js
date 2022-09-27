// 要求六 ( Optional )：
// 給定只會包含 0 或 1 兩種數字的列表 (Python) 或陣列 (JavaScript)，計算連續出現 0 的最大
// 長度。

function maxZeros(nums){
    //計算0出現的位子
    let arr=[];
    for(var i=0;i<nums.length;i++){
        if(nums[i]==0){
            arr.push(i);
        }
    }
    //console.log(arr);

    //計算每次0出現的長度
    let max=[];
    let k=0;
    if(arr.length!=0){
        max.push(1);
    }else{
        max.push(0);
    }
    for(var i=0;i<arr.length-1;i++){
        if(arr[i+1]-arr[i]==1){
            max[k]+=1;
        }else{
            max.push(1);
            k+=1;
        }
    }
    //console.log(max)

    //比較最大長度
    let maxLen=0;
    for(var i=0;i<max.length;i++){
        if(max[i]>maxLen){
            maxLen=max[i];
        }
    }
    console.log(maxLen);
}

maxZeros([0, 1, 0, 0]); // 得到 2
maxZeros([1, 0, 0, 0, 0, 1, 0, 1, 0, 0]); // 得到 4
maxZeros([1, 1, 1, 1, 1]); // 得到 0
maxZeros([0, 0, 0, 1, 1]); // 得到 3