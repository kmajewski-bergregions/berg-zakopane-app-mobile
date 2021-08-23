/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const icons = {
  'cloudy.svg': [119],
  'fog.svg': [248, 143, 260],
  'freezingrain.svg': [377, 374, 350, 314, 311, 284, 281, 185],
  'heavyrain.svg': [308, 305],
  'heavyshower.svg': [356],
  'lightning.svg': [299, 296],
  'lightrain.svg': [176, 293],
  'lightshower.svg': [266, 263, 359],
  'lightsnow.svg': [227, 179],
  'mostlycloudy.svg': [122],
  'partlycloudy.svg': [116],
  'rain.svg': [21, 51, 52, 53, 58, 59, 60, 62, 63],
  'shower.svg': [353],
  'snow.svg': [395, 392, 338, 335, 332, 329, 230],
  'snowrain.svg': [320, 317],
  'snowshower.svg': [368, 323, 326, 371],
  'snowrainshower.svg': [365, 362, 182],
  'sunny.svg': [113],
  'thunderstorm.svg': [389, 386, 200],
  'wind.svg': [18, 19],
};

export function getIcon(code) {
  let result;
  for (const icon in icons) {
    for (let i = 0; i < icons[icon].length; i++) {
      if (code === icons[icon][i]) {
        result = icon;
      }
    }
  }
  return result || 'unknow.svg';
}

const directions = {
  N: 'północny (N)',
  NNE: 'północno-północno-wschodni (NNE)',
  NE: 'północno-wschodni (NE)',
  ENE: 'wschodnio-północno-wschodni (ENE)',
  E: 'wschodni (E)',
  ESE: 'wschodnio-południowo-wschodni (ESE)',
  SE: 'południowo-wschodni (SE)',
  SSE: 'południowo-południowo-wschodni (SSE)',
  S: 'południowy (S)',
  SSW: 'południowo-południowo-zachodni (SSW)',
  SW: 'południowo-zachodni (SW)',
  WSW: 'zachodnio-południowo-zachodni (WSW)',
  W: 'zachodni (W)',
  WNW: 'zachodnio-północno-zachodni (WNW)',
  NW: 'północno-zachodni (NW)',
  NNW: 'północno-północno-zachodni (NNW)',
};

export function getWind(code) {
  let result;
  for (const [key, value] of Object.entries(directions)) {
    if (code === key) {
      result = value;
    }
  }
  return result;
}
