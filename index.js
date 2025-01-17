// 14. Longest Common Prefix
//Write a function to find the longest common prefix string amongst an array of strings.
var longestCommonPrefix = function (strs) {
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];

        for (let j = 1; j < strs.length; j++) {
            if (i >= strs[j].length || strs[j][i] !== char) {
                return strs[0].slice(0, i);
            }
        }
    }
    return strs[0];
};
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // 'fl'
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ''

// 58. Length of Last Word
//Given a string s consisting of words and spaces, return the length of the last word in the string.

//1 ок
var lengthOfLastWord = function (s) {
    let arr = s.trim().split(" ");

    return arr[arr.length - 1].length;
};
console.log(lengthOfLastWord("   fly me   to   the moon  "));

//2 оптимален
var lengthOfLastWord = function (s) {
    let lastWordLength = 0;
    let i = s.length - 1;

    // Пропускаем пробелы в конце строки
    while (i >= 0 && s[i] === " ") {
        i--;
    }

    // Считаем длину последнего слова
    while (i >= 0 && s[i] !== " ") {
        lastWordLength++;
        i--;
    }

    return lastWordLength;
};

// 121. Best Time to Buy and Sell Stock
//You are given an array prices where prices[i] is the price of a given stock on the ith day.You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
//1 Код имеет временную сложность O(n^2)
var maxProfit = function (prices) {
    let profit = 0;
    let arr = [];
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            profit = prices[j] - prices[i];
            arr.push(profit);
        }
    }
    let max = Math.max.apply(null, arr);
    if (max > 0) {
        return max;
    } else {
        return 0;
    }
};
console.log(maxProfit([7, 1, 5, 3, 6, 4])); //6-1=5
console.log(maxProfit([7, 6, 4, 3, 1])); //0

//2 OK
var maxProfit = function (prices) {
    let minPrice = Infinity; //Инициализируем минимальную цену как бесконечность
    let maxProfit = 0;

    for (let price of prices) {
        minPrice = Math.min(minPrice, price); //Находим минимальную цену на данный момент
        maxProfit = Math.max(maxProfit, price - minPrice); //Обновляем максимальную прибыль
    }
    return maxProfit;
};

// 189. Rotate Array
//Given an integer array nums, rotate the array to the right by k steps
//1 не является оптимальным по производительности, особенно для больших массивов
var rotate = function (nums, k) {
    for (let i = 0; i < k; i++) {
        const pop = nums.pop();
        nums.unshift(pop); //эта операция требует сдвига всех элементов массива вправо
    }
    return nums;
};
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); //[5,6,7,1,2,3,4]
console.log(rotate([-1, -100, 3, 99], 2)); //[3,99,-1,-100]

//2 ОК
var rotate = function (nums, k) {
    const length = nums.length;
    k = k % length; // Если k > n, то делаем k = k % n, чтобы уменьшить число сдвигов, k = остаток деления
    nums.splice(0, 0, ...nums.splice(length - k));
    // Ничего не удаляем, Извлекаем последние k элементов из массива и Вставляем в начало массива (по индексу 0).
    return nums;
};

// 169. Majority Element
//Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.
//1
var majorityElement = function (nums) {
    let obj = {};
    for (let el of nums) {
        if (obj[el]) {
            obj[el]++;
        } else {
            obj[el] = 1;
        }
    }
    let maxKey = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
    return Number(maxKey);
};

//2
var majorityElement = function (nums) {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
};
console.log(removeDuplicates2([1, 1, 2, 1, 2, 3])); //1

// 80. Remove Duplicates from Sorted Array II
//Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.
var removeDuplicates2 = function (nums) {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[i + 2]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
};
console.log(removeDuplicates2([1, 1, 1, 2, 2, 3])); //[1,1,2,2,3] 5

// 26. Remove Duplicates from Sorted Array
//Удалите дубликаты на месте, чтобы каждый уникальный элемент отображался только один раз. Относительный порядок элементов должен оставаться неизменным. Затем верните количество уникальных элементов в nums.

var removeDuplicates = function (nums) {
    var k = 1;
    for (var i = 0; i < nums.length - 1; i++) {
        if (nums[i] !== nums[i + 1]) {
            nums[k] = nums[i + 1];
            k++;
        }
    }

    return k;
};
console.log(removeDuplicates([-3, -1, 0, 0, 0, 3, 3]));

// 27. Remove Element
//Измените массив nums таким образом, чтобы первые k элементов nums содержали элементы, которые не равны val. Остальные элементы nums не важны, так же как и размер nums. Верните k.

var removeElement = function (nums, val) {
    var k = 0;
    for (var i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k++] = nums[i];
        }
    }
    console.log(nums); //[0, 1, 3, 0, 4, 0, 4, 2]

    return k;
};
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)); //5

// 88. Merge Sorted Array
//Два отсортированных целочисленных массива nums1 и nums2, объедините num2 с nums 1 в один отсортированный массив.

let merge = function (nums1, m, nums2, n) {
    while (n) {
        if (nums1[m - 1] > nums2[n - 1]) {
            nums1[m + n - 1] = nums1[--m];
        } else {
            nums1[m + n - 1] = nums2[--n];
        }
    }
    return nums1;
};
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)); // [1, 2, 2, 3, 5, 6]
