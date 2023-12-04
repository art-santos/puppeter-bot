const getPostFromWebhook = async (req) => {
  const { body } = req;

  console.log(body);
  // Create a new client using the provided authentication

  return body;
};

module.exports = getPostFromWebhook;
