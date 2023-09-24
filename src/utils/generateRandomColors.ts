const getRandomHexColor = (label: { [key: string]: string }): string => {
  // Generate a random number between 0 and 16777215 (decimal equivalent of FFFFFF in hex)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  
  // Pad the color code with leading zeros if it's shorter than 6 characters
  const paddedColor = randomColor.padStart(6, '0');

  if (label[paddedColor]) {
    return getRandomHexColor(label);
  }
  
  // Return the hex color code with a "#" prefix
  return `#${paddedColor}`;
};

export default getRandomHexColor;
