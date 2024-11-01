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

//проверка времени встречи

const checkWorkTimeToMeet = (startWork, endWork, beginMeet, meetDuration) => {
  [startWork, endWork, beginMeet] = [startWork, endWork, beginMeet].map((v) => Number(v.split(':')[0]) + (Number(v.split(':')[1])) / 60);
  return (beginMeet >= startWork && beginMeet <= endWork) && ((beginMeet + meetDuration / 60) <= endWork);
};
checkWorkTimeToMeet('8:00', '17:30', '08:00', 90); //true
checkWorkTimeToMeet('8:00', '17:30', '08:00', 900); //false
