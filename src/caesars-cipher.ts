function rot13(str: string) {
  return str
    .split('')
    .map((char) => {
      const charCode = char.charCodeAt(0);
      return charCode >= 65 && charCode <= 90
        ? String.fromCharCode(((charCode - 52) % 26) + 65)
        : char;
    })
    .join('');
}

export default rot13;
