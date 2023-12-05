//i'm getting numbers in this format 5511997658395@c.us. Create a function to return the phone number in a format that can be used
//in the database

//document it receives a string and returns a string

export const trimPhone = (phone: string) => {
  const trimmed = phone.split("@")[0];
  return trimmed;
};
