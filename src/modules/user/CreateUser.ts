import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field,
  UseMiddleware,
  MiddlewareFn
} from "type-graphql";
import { RegisterInput } from "./register/RegisterInput";
import { User } from "../../entity/User";
import { Product } from "../../entity/Product";

function createResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: MiddlewareFn<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);
export const CreateProductResolver = createResolver(
  "Product",
  Product,
  ProductInput,
  Product
);
