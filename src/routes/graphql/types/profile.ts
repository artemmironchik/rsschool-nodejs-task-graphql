import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql/type/index.js";
import { MemberType, memberTypeType } from "./member-type.js";
import { ContextType, User, userType } from "./user.js";
import { UUIDType } from "./uuid.js";

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  user: User;
  memberType: MemberType;
}

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () =>  ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: {
      type: userType as GraphQLObjectType,
      resolve: async (source, args, { prisma }: ContextType) => (
        await prisma.user.findUnique({
          where: {
            id: source.userId
          }
        })
      )
    },
    memberType: {
      type: memberTypeType,
      resolve: async (source, args, { prisma }: ContextType) => (
        await prisma.memberType.findUnique({
          where: {
            id: source.memberTypeId
          }
        })
      )
    }
  })
})
