import * as jwt from 'jsonwebtoken';

export function generateToken({email,name}:{email: string, name: string}) {
  return jwt.sign(
    {
      email,
      name
    },
    process.env.JWT_SECRET,
  );
}

export function verifyToken(token:string){
  return jwt.verify(token, process.env.JWT_SECRET!);
}