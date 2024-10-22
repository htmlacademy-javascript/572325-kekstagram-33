// проверка длины строки

const checkStrLength = (str, maxLength) => ((str.length <= maxLength));
console.log(checkStrLength('asdfgh', 5)); //false

//проверка на палиндром

const isPalindrome = (str) => {
  const strReady = str.replaceAll(' ', '').toLowerCase();
  let strReverse = '';
  for (let i = strReady.length - 1; i >= 0; i--) {
    strReverse += strReady[i];
  }
  return (strReverse === strReady);
};
console.log(isPalindrome('Лёша на полке клопа нашёл')); //true
console.log(isPalindrome('Лёша на полке клопа не нашёл')); //false
