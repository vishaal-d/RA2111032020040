const express = require('express');
const app = express();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

function generateFibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.slice(0, n + 1);
}

function generateEven(n) {
  const evens = [];
  for (let i = 2; i <= n; i += 2) {
    evens.push(i);
  }
  return evens;
}

function calculateAverage(arr) {
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return sum / arr.length;
}

app.get('/numbers/:type/:number', (req, res) => {
  const { type, number } = req.params;
  let result = [];

  switch (type) {
    case 'r': 
      for (let i = 0; i < number; i++) {
        result.push(getRandomInt(1, 100)); 
      }
      break;
    case 'e': 
      result = generateEven(parseInt(number));
      break;
    case 'f': 
      result = generateFibonacci(parseInt(number));
      break;
    case 'p': 
      let count = 0;
      let num = 2;
      while (count < number) {
        if (isPrime(num)) {
          result.push(num);
          count++;
        }
        num++;
      }
      break;
    case 'a': 
      result = req.query.numbers.split(',').map(Number); 
      break;
    default:
      res.status(400).json({ error: 'Invalid type' });
      return;
  }

  if (type === 'a') {
    const average = calculateAverage(result);
    res.json({ numbers: result, average });
  } else {
    res.json({ numbers: result });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
