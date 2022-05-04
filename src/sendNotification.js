module.exports = (client, country) => (product, user) => {
  return client.messages.create({
    body: `${country} site: ${product.name} \n ${product.link}`,
    from: '+15075754050',
    to: user.phoneNumber,
  });
};
