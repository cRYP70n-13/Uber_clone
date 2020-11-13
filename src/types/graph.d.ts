export const typeDefs = ["type Query {\n  sayBey: String!\n  sayHello(name: String!): SayHelloResponse!\n}\n\ntype SayHelloResponse {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBey: string;
  sayHello: SayHelloResponse;
}

export interface SayHelloQueryArgs {
  name: string;
}

export interface SayHelloResponse {
  text: string;
  error: boolean;
}
