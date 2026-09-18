// Generate a 6-character alphanumeric short code for the URLs
const generateCode = () => {
  const mainString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortCode = "";

  for (let i = 0; i < 6; i++) {
    shortCode += mainString.charAt(
      Math.floor(Math.random() * mainString.length),
    );
  }

  return shortCode;
};

export default generateCode;
