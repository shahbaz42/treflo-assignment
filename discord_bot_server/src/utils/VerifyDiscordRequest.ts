import { verifyKey } from 'discord-interactions'; // Make sure to import the correct types

const VerifyDiscordRequest= (clientKey: string) => {
  return function (req:any, res:any, buf:any, encoding:any) {
    const signature = req.get('X-Signature-Ed25519');
    const timestamp = req.get('X-Signature-Timestamp');

    const isValidRequest = verifyKey(
      buf,
      signature as any,
      timestamp as any,
      clientKey
    );
    if (!isValidRequest) {
      res.status(401).send('Bad request signature');
      throw new Error('Bad request signature');
    }
  };
};

export { VerifyDiscordRequest };


