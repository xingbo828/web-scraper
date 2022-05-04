const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient()

module.exports = async ({ projectId, secretId, version }) => {
  const [secret] = await client.accessSecretVersion({
    name: `projects/${projectId}/secrets/${secretId}/versions/latest`
  })
  return secret.payload.data.toString()
}