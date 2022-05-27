const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type User {
          _id: ID!
          fullName: String!
          email: String!
          password: String
          address: String
          personalProfile: Profile
          businessProfile: Profile
          plan: Plan
          contactList:[Profile]
        }

        type Profile {
          _id: ID!
          bio:String
          profilePic:String
          coverPic:String
          phoneNumber:String
          instagram:String
          facebook:String
          linkedIn:String
          customLink:[String]
          snapshat:String
          whatsapp:String
          twitter:String
          discord:String 
          tinder:String
          youtube:String
          tiktok:String 
          user:User
          isSet: Boolean
        }

        type Plan {
          name:String
        }

        type Message{
          _id: ID!
          fullName: String!
          email: String!
          message: String!
          createdAt: String!
        }

        type Item{
          _id: ID!
          name: String!
          interestedPeople: [String!]
        }

        type Subscription{
          _id: ID!
          email: String!
          createdAt: String!
        }

        type AuthData{
          userId: ID!
          token: String!
          tokenExpiration: Int!
        }

        input UserInput {
          fullName: String!
          email: String!
          password: String!
        }

        input MessageInput {
          fullName: String!
          email: String!
          message: String!
        }

        input ProfileInfoInput{
          personalProfile:Boolean!
          businessProfile:Boolean!
          address:String
          bio:String
          profilePic:String
          phoneNumber:String
          instagram:String
          facebook:String
          linkedIn:String
          customLink:[String]
          snapshat:String
          whatsapp:String
          twitter:String
          discord:String
          youtube:String
          tiktok:String 
          tinder:String 
          isSet: Boolean
        }

        type RootQuery {
          items:[Item!]!
          messages:[Message!]!
          subscriptions:[Subscription!]!
          login(email: String!, password: String!): AuthData!
          getUserData: User
        }

        type RootMutation {
          createUser(userInput: UserInput): User
          login(email:String!, password:String!): AuthData
          
          getProfile(profileId: String): Profile
          updateProfile(profileInfoInput: ProfileInfoInput): User
          
          addContact(profileId: String): User
          removeContact(profileId: String): User

          createItem(name: String!): Item
          createSubscription(email: String!): Subscription
          createMessage(messageInput: MessageInput): Message
          addInterest(name: String!,email: String!): Item
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }

`);
