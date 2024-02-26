// src/types/requestContext.ts
export interface RequestContext {
  headers: {
    [key: string]: string | undefined;
  };
  set: any; 
  body: any;
  jwt: {
    sign: (payload: object) => Promise<string>;
    verify: (token: string) => Promise<any>
  };
}
