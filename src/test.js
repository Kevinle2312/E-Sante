  let colors = {
  'dove-gray': {
    DEFAULT:  '#666666',
    50: '#C2C2C2',
    100: '#B8B8B8',
    200: '#A3A3A3',
    300: '#8F8F8F',
    400: '#7A7A7A',
    500: '#666666',
    600: '#4A4A4A',
    700: '#2E2E2E',
    800: '#121212',
  },

  'ebony': {
    DEFAULT: '#121B2B',
    50: '#486CAC',
    100: '#42639E',
    200: '#365181',
    300: '#2A3F65',
    400: '#1E2D48',
    500: '#121B2B',
    600: '#010203',
    700: '#000000',
    800: '#000000',
    900: '#000000'
  },

  'puerto-rico': {
    DEFAULT: '#4CCEAC',
    50: '#DCF5EF',
    100: '#CCF1E7',
    200: '#ACE8D9',
    300: '#8CE0CA',
    400: '#6CD7BB',
    500: '#4CCEAC',
    600: '#31B190',
    700: '#24856C',
    800: '#185948',
    900: '#0C2D25'
  },

  'valencia': {
    DEFAULT: '#DB4F4A',
    50: '#F9E4E3',
    100: '#F6D3D2',
    200: '#EFB2B0',
    300: '#E9918E',
    400: '#E2706C',
    500: '#DB4F4A',
    600: '#C62D27',
    700: '#97221E',
    800: '#681815',
    900: '#390D0B'
  },

  'cornflower-blue': {
    DEFAULT: '#6870FA',
    50: '#FFFFFF',
    100: '#FFFFFF',
    200: '#DEE0FE',
    300: '#B7BBFD',
    400: '#8F95FB',
    500: '#6870FA',
    600: '#323DF8',
    700: '#0814EA',
    800: '#060FB4',
    900: '#040B7D'
  }
};
  let invertedColorTokens = Object.entries(colors).reduce((acc, [name, color]) => {
    const invertedColor = {};
    Object.entries(color).forEach(([key, value]) => {
      if (key === 'DEFAULT') {
        invertedColor[key] = value;
      } else {
        const invertedKey = 1000 - parseInt(key);
        invertedColor[invertedKey] = value;
      }
    });
    acc[name] = invertedColor;
    return acc;
  }, {});
  console.log(invertedColorTokens);

