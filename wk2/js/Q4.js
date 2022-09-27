// 要求四：
// 找出至少包含兩筆整數的列表 (Python) 或陣列 (JavaScript) 中，兩兩數字相乘後的最大值。

function maxProduct(nums){
    var max=nums[0]*nums[1];
    for(var i=0;i<nums.length-1;i++){
        for(var j=i+1;j<nums.length;j++){
            if(nums[i]*nums[j]>max){
                max=nums[i]*nums[j];
                //console.log("max=",max,",i=",nums[i],",j=",nums[j]);
            }
        }
    }
    console.log(max);
}
maxProduct([5, 20, 2, 6]); // 得到 120
maxProduct([10, -20, 0, 3]); // 得到 30
maxProduct([10, -20, 0, -3]); // 得到 60
maxProduct([-1, 2]); // 得到 -2
maxProduct([-1, 0, 2]); // 得到 0 或 -0
maxProduct([5, -1, -2, 0]); // 得到 2
maxProduct([-5, -2]); // 得到 10



//沒看清楚題目多寫的排序法
//
// for(var i=0;i<nums.length;i++){
//     for(var j=i+1;j<nums.length;j++){
//         let k=nums[j-1];
//         if(nums[j]>nums[j-1]){
//             nums[j-1]=nums[j];
//             nums[j]=k;
//         }
//     }
// }
// console.log(nums[0]*nums[1]);