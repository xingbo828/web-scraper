module.exports = (client) => (product, user) => {
  return client.messages.create({
    body: `US site: ${product.name} \n ${product.link}`,
    from: '+15075754050',
    to: user.phoneNumber,
  });
};
