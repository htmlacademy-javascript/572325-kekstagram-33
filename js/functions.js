// проверка длины строки

const checkStrLength = (str, maxLength) => !(str.length > maxLength);
checkStrLength('йцукен', 6);

//проверка на палиндром

const isPalindrome = (str) => {
  const strReady = str.replaceAll(' ', '').toLowerCase();
  let strReverse = '';
  for (let i = strReady.length - 1; i >= 0; i--) {
    strReverse += strReady[i];
  }
  return (strReverse === strReady);
};
isPalindrome('Лёша на полке клопа нашёл');
