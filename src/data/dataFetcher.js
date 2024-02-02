const baseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const dexCount = 50;

function generateListOfRandomNumbers(count) {
  const nums = new Set();
  while (nums.size !== count) {
    nums.add(Math.floor(Math.random() * dexCount) + 1);
  }

  return [...nums];
}

export function getRandomImages(count) {
  let dataList = [];
  const randomNumbers = generateListOfRandomNumbers(count);

  for (const number of randomNumbers) {
    let image = baseUrl + `/${number}.png`;
    dataList.push({
      imageUrl: image,
      id: number,
    });
  }

  return dataList;
}
