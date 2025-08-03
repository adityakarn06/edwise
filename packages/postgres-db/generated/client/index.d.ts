
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UploadedDocs
 * 
 */
export type UploadedDocs = $Result.DefaultSelection<Prisma.$UploadedDocsPayload>
/**
 * Model AiChatHistory
 * 
 */
export type AiChatHistory = $Result.DefaultSelection<Prisma.$AiChatHistoryPayload>
/**
 * Model MCQSet
 * 
 */
export type MCQSet = $Result.DefaultSelection<Prisma.$MCQSetPayload>
/**
 * Model MCQ
 * 
 */
export type MCQ = $Result.DefaultSelection<Prisma.$MCQPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadedDocs`: Exposes CRUD operations for the **UploadedDocs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadedDocs
    * const uploadedDocs = await prisma.uploadedDocs.findMany()
    * ```
    */
  get uploadedDocs(): Prisma.UploadedDocsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiChatHistory`: Exposes CRUD operations for the **AiChatHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiChatHistories
    * const aiChatHistories = await prisma.aiChatHistory.findMany()
    * ```
    */
  get aiChatHistory(): Prisma.AiChatHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mCQSet`: Exposes CRUD operations for the **MCQSet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MCQSets
    * const mCQSets = await prisma.mCQSet.findMany()
    * ```
    */
  get mCQSet(): Prisma.MCQSetDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mCQ`: Exposes CRUD operations for the **MCQ** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MCQS
    * const mCQS = await prisma.mCQ.findMany()
    * ```
    */
  get mCQ(): Prisma.MCQDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UploadedDocs: 'UploadedDocs',
    AiChatHistory: 'AiChatHistory',
    MCQSet: 'MCQSet',
    MCQ: 'MCQ'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "uploadedDocs" | "aiChatHistory" | "mCQSet" | "mCQ"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UploadedDocs: {
        payload: Prisma.$UploadedDocsPayload<ExtArgs>
        fields: Prisma.UploadedDocsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadedDocsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadedDocsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>
          }
          findFirst: {
            args: Prisma.UploadedDocsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadedDocsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>
          }
          findMany: {
            args: Prisma.UploadedDocsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>[]
          }
          create: {
            args: Prisma.UploadedDocsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>
          }
          createMany: {
            args: Prisma.UploadedDocsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadedDocsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>[]
          }
          delete: {
            args: Prisma.UploadedDocsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>
          }
          update: {
            args: Prisma.UploadedDocsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>
          }
          deleteMany: {
            args: Prisma.UploadedDocsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadedDocsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadedDocsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>[]
          }
          upsert: {
            args: Prisma.UploadedDocsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedDocsPayload>
          }
          aggregate: {
            args: Prisma.UploadedDocsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadedDocs>
          }
          groupBy: {
            args: Prisma.UploadedDocsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadedDocsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadedDocsCountArgs<ExtArgs>
            result: $Utils.Optional<UploadedDocsCountAggregateOutputType> | number
          }
        }
      }
      AiChatHistory: {
        payload: Prisma.$AiChatHistoryPayload<ExtArgs>
        fields: Prisma.AiChatHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiChatHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiChatHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          findFirst: {
            args: Prisma.AiChatHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiChatHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          findMany: {
            args: Prisma.AiChatHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>[]
          }
          create: {
            args: Prisma.AiChatHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          createMany: {
            args: Prisma.AiChatHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiChatHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>[]
          }
          delete: {
            args: Prisma.AiChatHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          update: {
            args: Prisma.AiChatHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          deleteMany: {
            args: Prisma.AiChatHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiChatHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiChatHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>[]
          }
          upsert: {
            args: Prisma.AiChatHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiChatHistoryPayload>
          }
          aggregate: {
            args: Prisma.AiChatHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiChatHistory>
          }
          groupBy: {
            args: Prisma.AiChatHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiChatHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiChatHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<AiChatHistoryCountAggregateOutputType> | number
          }
        }
      }
      MCQSet: {
        payload: Prisma.$MCQSetPayload<ExtArgs>
        fields: Prisma.MCQSetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MCQSetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MCQSetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>
          }
          findFirst: {
            args: Prisma.MCQSetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MCQSetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>
          }
          findMany: {
            args: Prisma.MCQSetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>[]
          }
          create: {
            args: Prisma.MCQSetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>
          }
          createMany: {
            args: Prisma.MCQSetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MCQSetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>[]
          }
          delete: {
            args: Prisma.MCQSetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>
          }
          update: {
            args: Prisma.MCQSetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>
          }
          deleteMany: {
            args: Prisma.MCQSetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MCQSetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MCQSetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>[]
          }
          upsert: {
            args: Prisma.MCQSetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQSetPayload>
          }
          aggregate: {
            args: Prisma.MCQSetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMCQSet>
          }
          groupBy: {
            args: Prisma.MCQSetGroupByArgs<ExtArgs>
            result: $Utils.Optional<MCQSetGroupByOutputType>[]
          }
          count: {
            args: Prisma.MCQSetCountArgs<ExtArgs>
            result: $Utils.Optional<MCQSetCountAggregateOutputType> | number
          }
        }
      }
      MCQ: {
        payload: Prisma.$MCQPayload<ExtArgs>
        fields: Prisma.MCQFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MCQFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MCQFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>
          }
          findFirst: {
            args: Prisma.MCQFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MCQFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>
          }
          findMany: {
            args: Prisma.MCQFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>[]
          }
          create: {
            args: Prisma.MCQCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>
          }
          createMany: {
            args: Prisma.MCQCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MCQCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>[]
          }
          delete: {
            args: Prisma.MCQDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>
          }
          update: {
            args: Prisma.MCQUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>
          }
          deleteMany: {
            args: Prisma.MCQDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MCQUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MCQUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>[]
          }
          upsert: {
            args: Prisma.MCQUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MCQPayload>
          }
          aggregate: {
            args: Prisma.MCQAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMCQ>
          }
          groupBy: {
            args: Prisma.MCQGroupByArgs<ExtArgs>
            result: $Utils.Optional<MCQGroupByOutputType>[]
          }
          count: {
            args: Prisma.MCQCountArgs<ExtArgs>
            result: $Utils.Optional<MCQCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    uploadedDocs?: UploadedDocsOmit
    aiChatHistory?: AiChatHistoryOmit
    mCQSet?: MCQSetOmit
    mCQ?: MCQOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    uploadedDocs: number
    aiChatHistories: number
    mcqSets: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedDocs?: boolean | UserCountOutputTypeCountUploadedDocsArgs
    aiChatHistories?: boolean | UserCountOutputTypeCountAiChatHistoriesArgs
    mcqSets?: boolean | UserCountOutputTypeCountMcqSetsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadedDocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedDocsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiChatHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMcqSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCQSetWhereInput
  }


  /**
   * Count Type UploadedDocsCountOutputType
   */

  export type UploadedDocsCountOutputType = {
    aiChatHistories: number
  }

  export type UploadedDocsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    aiChatHistories?: boolean | UploadedDocsCountOutputTypeCountAiChatHistoriesArgs
  }

  // Custom InputTypes
  /**
   * UploadedDocsCountOutputType without action
   */
  export type UploadedDocsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocsCountOutputType
     */
    select?: UploadedDocsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UploadedDocsCountOutputType without action
   */
  export type UploadedDocsCountOutputTypeCountAiChatHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatHistoryWhereInput
  }


  /**
   * Count Type MCQSetCountOutputType
   */

  export type MCQSetCountOutputType = {
    mcqs: number
  }

  export type MCQSetCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mcqs?: boolean | MCQSetCountOutputTypeCountMcqsArgs
  }

  // Custom InputTypes
  /**
   * MCQSetCountOutputType without action
   */
  export type MCQSetCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSetCountOutputType
     */
    select?: MCQSetCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MCQSetCountOutputType without action
   */
  export type MCQSetCountOutputTypeCountMcqsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCQWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    avatarUrl: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    name: string | null
    password: string | null
    avatarUrl: string | null
    role: $Enums.UserRole
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    uploadedDocs?: boolean | User$uploadedDocsArgs<ExtArgs>
    aiChatHistories?: boolean | User$aiChatHistoriesArgs<ExtArgs>
    mcqSets?: boolean | User$mcqSetsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "avatarUrl" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedDocs?: boolean | User$uploadedDocsArgs<ExtArgs>
    aiChatHistories?: boolean | User$aiChatHistoriesArgs<ExtArgs>
    mcqSets?: boolean | User$mcqSetsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      uploadedDocs: Prisma.$UploadedDocsPayload<ExtArgs>[]
      aiChatHistories: Prisma.$AiChatHistoryPayload<ExtArgs>[]
      mcqSets: Prisma.$MCQSetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      name: string | null
      password: string | null
      avatarUrl: string | null
      role: $Enums.UserRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadedDocs<T extends User$uploadedDocsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadedDocsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    aiChatHistories<T extends User$aiChatHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$aiChatHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mcqSets<T extends User$mcqSetsArgs<ExtArgs> = {}>(args?: Subset<T, User$mcqSetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.uploadedDocs
   */
  export type User$uploadedDocsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    where?: UploadedDocsWhereInput
    orderBy?: UploadedDocsOrderByWithRelationInput | UploadedDocsOrderByWithRelationInput[]
    cursor?: UploadedDocsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadedDocsScalarFieldEnum | UploadedDocsScalarFieldEnum[]
  }

  /**
   * User.aiChatHistories
   */
  export type User$aiChatHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    where?: AiChatHistoryWhereInput
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    cursor?: AiChatHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * User.mcqSets
   */
  export type User$mcqSetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    where?: MCQSetWhereInput
    orderBy?: MCQSetOrderByWithRelationInput | MCQSetOrderByWithRelationInput[]
    cursor?: MCQSetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MCQSetScalarFieldEnum | MCQSetScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UploadedDocs
   */

  export type AggregateUploadedDocs = {
    _count: UploadedDocsCountAggregateOutputType | null
    _avg: UploadedDocsAvgAggregateOutputType | null
    _sum: UploadedDocsSumAggregateOutputType | null
    _min: UploadedDocsMinAggregateOutputType | null
    _max: UploadedDocsMaxAggregateOutputType | null
  }

  export type UploadedDocsAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type UploadedDocsSumAggregateOutputType = {
    fileSize: number | null
  }

  export type UploadedDocsMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileUrl: string | null
    fileSize: number | null
    fileType: string | null
    uploadedById: string | null
    topic: string | null
    createdAt: Date | null
  }

  export type UploadedDocsMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileUrl: string | null
    fileSize: number | null
    fileType: string | null
    uploadedById: string | null
    topic: string | null
    createdAt: Date | null
  }

  export type UploadedDocsCountAggregateOutputType = {
    id: number
    fileName: number
    fileUrl: number
    fileSize: number
    fileType: number
    uploadedById: number
    topic: number
    createdAt: number
    _all: number
  }


  export type UploadedDocsAvgAggregateInputType = {
    fileSize?: true
  }

  export type UploadedDocsSumAggregateInputType = {
    fileSize?: true
  }

  export type UploadedDocsMinAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    fileType?: true
    uploadedById?: true
    topic?: true
    createdAt?: true
  }

  export type UploadedDocsMaxAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    fileType?: true
    uploadedById?: true
    topic?: true
    createdAt?: true
  }

  export type UploadedDocsCountAggregateInputType = {
    id?: true
    fileName?: true
    fileUrl?: true
    fileSize?: true
    fileType?: true
    uploadedById?: true
    topic?: true
    createdAt?: true
    _all?: true
  }

  export type UploadedDocsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedDocs to aggregate.
     */
    where?: UploadedDocsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedDocs to fetch.
     */
    orderBy?: UploadedDocsOrderByWithRelationInput | UploadedDocsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadedDocsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadedDocs
    **/
    _count?: true | UploadedDocsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadedDocsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadedDocsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadedDocsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadedDocsMaxAggregateInputType
  }

  export type GetUploadedDocsAggregateType<T extends UploadedDocsAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadedDocs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadedDocs[P]>
      : GetScalarType<T[P], AggregateUploadedDocs[P]>
  }




  export type UploadedDocsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedDocsWhereInput
    orderBy?: UploadedDocsOrderByWithAggregationInput | UploadedDocsOrderByWithAggregationInput[]
    by: UploadedDocsScalarFieldEnum[] | UploadedDocsScalarFieldEnum
    having?: UploadedDocsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadedDocsCountAggregateInputType | true
    _avg?: UploadedDocsAvgAggregateInputType
    _sum?: UploadedDocsSumAggregateInputType
    _min?: UploadedDocsMinAggregateInputType
    _max?: UploadedDocsMaxAggregateInputType
  }

  export type UploadedDocsGroupByOutputType = {
    id: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    uploadedById: string
    topic: string | null
    createdAt: Date
    _count: UploadedDocsCountAggregateOutputType | null
    _avg: UploadedDocsAvgAggregateOutputType | null
    _sum: UploadedDocsSumAggregateOutputType | null
    _min: UploadedDocsMinAggregateOutputType | null
    _max: UploadedDocsMaxAggregateOutputType | null
  }

  type GetUploadedDocsGroupByPayload<T extends UploadedDocsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadedDocsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadedDocsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadedDocsGroupByOutputType[P]>
            : GetScalarType<T[P], UploadedDocsGroupByOutputType[P]>
        }
      >
    >


  export type UploadedDocsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadedById?: boolean
    topic?: boolean
    createdAt?: boolean
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
    aiChatHistories?: boolean | UploadedDocs$aiChatHistoriesArgs<ExtArgs>
    _count?: boolean | UploadedDocsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedDocs"]>

  export type UploadedDocsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadedById?: boolean
    topic?: boolean
    createdAt?: boolean
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedDocs"]>

  export type UploadedDocsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadedById?: boolean
    topic?: boolean
    createdAt?: boolean
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedDocs"]>

  export type UploadedDocsSelectScalar = {
    id?: boolean
    fileName?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    fileType?: boolean
    uploadedById?: boolean
    topic?: boolean
    createdAt?: boolean
  }

  export type UploadedDocsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileName" | "fileUrl" | "fileSize" | "fileType" | "uploadedById" | "topic" | "createdAt", ExtArgs["result"]["uploadedDocs"]>
  export type UploadedDocsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
    aiChatHistories?: boolean | UploadedDocs$aiChatHistoriesArgs<ExtArgs>
    _count?: boolean | UploadedDocsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UploadedDocsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UploadedDocsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UploadedDocsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadedDocs"
    objects: {
      uploadedBy: Prisma.$UserPayload<ExtArgs>
      aiChatHistories: Prisma.$AiChatHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      fileUrl: string
      fileSize: number
      fileType: string
      uploadedById: string
      topic: string | null
      createdAt: Date
    }, ExtArgs["result"]["uploadedDocs"]>
    composites: {}
  }

  type UploadedDocsGetPayload<S extends boolean | null | undefined | UploadedDocsDefaultArgs> = $Result.GetResult<Prisma.$UploadedDocsPayload, S>

  type UploadedDocsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadedDocsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadedDocsCountAggregateInputType | true
    }

  export interface UploadedDocsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadedDocs'], meta: { name: 'UploadedDocs' } }
    /**
     * Find zero or one UploadedDocs that matches the filter.
     * @param {UploadedDocsFindUniqueArgs} args - Arguments to find a UploadedDocs
     * @example
     * // Get one UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadedDocsFindUniqueArgs>(args: SelectSubset<T, UploadedDocsFindUniqueArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadedDocs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadedDocsFindUniqueOrThrowArgs} args - Arguments to find a UploadedDocs
     * @example
     * // Get one UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadedDocsFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadedDocsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsFindFirstArgs} args - Arguments to find a UploadedDocs
     * @example
     * // Get one UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadedDocsFindFirstArgs>(args?: SelectSubset<T, UploadedDocsFindFirstArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedDocs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsFindFirstOrThrowArgs} args - Arguments to find a UploadedDocs
     * @example
     * // Get one UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadedDocsFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadedDocsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadedDocs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.findMany()
     * 
     * // Get first 10 UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadedDocsWithIdOnly = await prisma.uploadedDocs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadedDocsFindManyArgs>(args?: SelectSubset<T, UploadedDocsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadedDocs.
     * @param {UploadedDocsCreateArgs} args - Arguments to create a UploadedDocs.
     * @example
     * // Create one UploadedDocs
     * const UploadedDocs = await prisma.uploadedDocs.create({
     *   data: {
     *     // ... data to create a UploadedDocs
     *   }
     * })
     * 
     */
    create<T extends UploadedDocsCreateArgs>(args: SelectSubset<T, UploadedDocsCreateArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadedDocs.
     * @param {UploadedDocsCreateManyArgs} args - Arguments to create many UploadedDocs.
     * @example
     * // Create many UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadedDocsCreateManyArgs>(args?: SelectSubset<T, UploadedDocsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadedDocs and returns the data saved in the database.
     * @param {UploadedDocsCreateManyAndReturnArgs} args - Arguments to create many UploadedDocs.
     * @example
     * // Create many UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadedDocs and only return the `id`
     * const uploadedDocsWithIdOnly = await prisma.uploadedDocs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadedDocsCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadedDocsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadedDocs.
     * @param {UploadedDocsDeleteArgs} args - Arguments to delete one UploadedDocs.
     * @example
     * // Delete one UploadedDocs
     * const UploadedDocs = await prisma.uploadedDocs.delete({
     *   where: {
     *     // ... filter to delete one UploadedDocs
     *   }
     * })
     * 
     */
    delete<T extends UploadedDocsDeleteArgs>(args: SelectSubset<T, UploadedDocsDeleteArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadedDocs.
     * @param {UploadedDocsUpdateArgs} args - Arguments to update one UploadedDocs.
     * @example
     * // Update one UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadedDocsUpdateArgs>(args: SelectSubset<T, UploadedDocsUpdateArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadedDocs.
     * @param {UploadedDocsDeleteManyArgs} args - Arguments to filter UploadedDocs to delete.
     * @example
     * // Delete a few UploadedDocs
     * const { count } = await prisma.uploadedDocs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadedDocsDeleteManyArgs>(args?: SelectSubset<T, UploadedDocsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadedDocsUpdateManyArgs>(args: SelectSubset<T, UploadedDocsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedDocs and returns the data updated in the database.
     * @param {UploadedDocsUpdateManyAndReturnArgs} args - Arguments to update many UploadedDocs.
     * @example
     * // Update many UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadedDocs and only return the `id`
     * const uploadedDocsWithIdOnly = await prisma.uploadedDocs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UploadedDocsUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadedDocsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadedDocs.
     * @param {UploadedDocsUpsertArgs} args - Arguments to update or create a UploadedDocs.
     * @example
     * // Update or create a UploadedDocs
     * const uploadedDocs = await prisma.uploadedDocs.upsert({
     *   create: {
     *     // ... data to create a UploadedDocs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadedDocs we want to update
     *   }
     * })
     */
    upsert<T extends UploadedDocsUpsertArgs>(args: SelectSubset<T, UploadedDocsUpsertArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadedDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsCountArgs} args - Arguments to filter UploadedDocs to count.
     * @example
     * // Count the number of UploadedDocs
     * const count = await prisma.uploadedDocs.count({
     *   where: {
     *     // ... the filter for the UploadedDocs we want to count
     *   }
     * })
    **/
    count<T extends UploadedDocsCountArgs>(
      args?: Subset<T, UploadedDocsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadedDocsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadedDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UploadedDocsAggregateArgs>(args: Subset<T, UploadedDocsAggregateArgs>): Prisma.PrismaPromise<GetUploadedDocsAggregateType<T>>

    /**
     * Group by UploadedDocs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedDocsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UploadedDocsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadedDocsGroupByArgs['orderBy'] }
        : { orderBy?: UploadedDocsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UploadedDocsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadedDocsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadedDocs model
   */
  readonly fields: UploadedDocsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadedDocs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadedDocsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aiChatHistories<T extends UploadedDocs$aiChatHistoriesArgs<ExtArgs> = {}>(args?: Subset<T, UploadedDocs$aiChatHistoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UploadedDocs model
   */
  interface UploadedDocsFieldRefs {
    readonly id: FieldRef<"UploadedDocs", 'String'>
    readonly fileName: FieldRef<"UploadedDocs", 'String'>
    readonly fileUrl: FieldRef<"UploadedDocs", 'String'>
    readonly fileSize: FieldRef<"UploadedDocs", 'Int'>
    readonly fileType: FieldRef<"UploadedDocs", 'String'>
    readonly uploadedById: FieldRef<"UploadedDocs", 'String'>
    readonly topic: FieldRef<"UploadedDocs", 'String'>
    readonly createdAt: FieldRef<"UploadedDocs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadedDocs findUnique
   */
  export type UploadedDocsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * Filter, which UploadedDocs to fetch.
     */
    where: UploadedDocsWhereUniqueInput
  }

  /**
   * UploadedDocs findUniqueOrThrow
   */
  export type UploadedDocsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * Filter, which UploadedDocs to fetch.
     */
    where: UploadedDocsWhereUniqueInput
  }

  /**
   * UploadedDocs findFirst
   */
  export type UploadedDocsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * Filter, which UploadedDocs to fetch.
     */
    where?: UploadedDocsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedDocs to fetch.
     */
    orderBy?: UploadedDocsOrderByWithRelationInput | UploadedDocsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedDocs.
     */
    cursor?: UploadedDocsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedDocs.
     */
    distinct?: UploadedDocsScalarFieldEnum | UploadedDocsScalarFieldEnum[]
  }

  /**
   * UploadedDocs findFirstOrThrow
   */
  export type UploadedDocsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * Filter, which UploadedDocs to fetch.
     */
    where?: UploadedDocsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedDocs to fetch.
     */
    orderBy?: UploadedDocsOrderByWithRelationInput | UploadedDocsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedDocs.
     */
    cursor?: UploadedDocsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedDocs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedDocs.
     */
    distinct?: UploadedDocsScalarFieldEnum | UploadedDocsScalarFieldEnum[]
  }

  /**
   * UploadedDocs findMany
   */
  export type UploadedDocsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * Filter, which UploadedDocs to fetch.
     */
    where?: UploadedDocsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedDocs to fetch.
     */
    orderBy?: UploadedDocsOrderByWithRelationInput | UploadedDocsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadedDocs.
     */
    cursor?: UploadedDocsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedDocs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedDocs.
     */
    skip?: number
    distinct?: UploadedDocsScalarFieldEnum | UploadedDocsScalarFieldEnum[]
  }

  /**
   * UploadedDocs create
   */
  export type UploadedDocsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadedDocs.
     */
    data: XOR<UploadedDocsCreateInput, UploadedDocsUncheckedCreateInput>
  }

  /**
   * UploadedDocs createMany
   */
  export type UploadedDocsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadedDocs.
     */
    data: UploadedDocsCreateManyInput | UploadedDocsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadedDocs createManyAndReturn
   */
  export type UploadedDocsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * The data used to create many UploadedDocs.
     */
    data: UploadedDocsCreateManyInput | UploadedDocsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedDocs update
   */
  export type UploadedDocsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadedDocs.
     */
    data: XOR<UploadedDocsUpdateInput, UploadedDocsUncheckedUpdateInput>
    /**
     * Choose, which UploadedDocs to update.
     */
    where: UploadedDocsWhereUniqueInput
  }

  /**
   * UploadedDocs updateMany
   */
  export type UploadedDocsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadedDocs.
     */
    data: XOR<UploadedDocsUpdateManyMutationInput, UploadedDocsUncheckedUpdateManyInput>
    /**
     * Filter which UploadedDocs to update
     */
    where?: UploadedDocsWhereInput
    /**
     * Limit how many UploadedDocs to update.
     */
    limit?: number
  }

  /**
   * UploadedDocs updateManyAndReturn
   */
  export type UploadedDocsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * The data used to update UploadedDocs.
     */
    data: XOR<UploadedDocsUpdateManyMutationInput, UploadedDocsUncheckedUpdateManyInput>
    /**
     * Filter which UploadedDocs to update
     */
    where?: UploadedDocsWhereInput
    /**
     * Limit how many UploadedDocs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadedDocs upsert
   */
  export type UploadedDocsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadedDocs to update in case it exists.
     */
    where: UploadedDocsWhereUniqueInput
    /**
     * In case the UploadedDocs found by the `where` argument doesn't exist, create a new UploadedDocs with this data.
     */
    create: XOR<UploadedDocsCreateInput, UploadedDocsUncheckedCreateInput>
    /**
     * In case the UploadedDocs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadedDocsUpdateInput, UploadedDocsUncheckedUpdateInput>
  }

  /**
   * UploadedDocs delete
   */
  export type UploadedDocsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    /**
     * Filter which UploadedDocs to delete.
     */
    where: UploadedDocsWhereUniqueInput
  }

  /**
   * UploadedDocs deleteMany
   */
  export type UploadedDocsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedDocs to delete
     */
    where?: UploadedDocsWhereInput
    /**
     * Limit how many UploadedDocs to delete.
     */
    limit?: number
  }

  /**
   * UploadedDocs.aiChatHistories
   */
  export type UploadedDocs$aiChatHistoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    where?: AiChatHistoryWhereInput
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    cursor?: AiChatHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * UploadedDocs without action
   */
  export type UploadedDocsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
  }


  /**
   * Model AiChatHistory
   */

  export type AggregateAiChatHistory = {
    _count: AiChatHistoryCountAggregateOutputType | null
    _avg: AiChatHistoryAvgAggregateOutputType | null
    _sum: AiChatHistorySumAggregateOutputType | null
    _min: AiChatHistoryMinAggregateOutputType | null
    _max: AiChatHistoryMaxAggregateOutputType | null
  }

  export type AiChatHistoryAvgAggregateOutputType = {
    id: number | null
  }

  export type AiChatHistorySumAggregateOutputType = {
    id: number | null
  }

  export type AiChatHistoryMinAggregateOutputType = {
    id: number | null
    userId: string | null
    resourceId: string | null
    userQuery: string | null
    response: string | null
    timestamp: Date | null
  }

  export type AiChatHistoryMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    resourceId: string | null
    userQuery: string | null
    response: string | null
    timestamp: Date | null
  }

  export type AiChatHistoryCountAggregateOutputType = {
    id: number
    userId: number
    resourceId: number
    userQuery: number
    response: number
    sources: number
    timestamp: number
    _all: number
  }


  export type AiChatHistoryAvgAggregateInputType = {
    id?: true
  }

  export type AiChatHistorySumAggregateInputType = {
    id?: true
  }

  export type AiChatHistoryMinAggregateInputType = {
    id?: true
    userId?: true
    resourceId?: true
    userQuery?: true
    response?: true
    timestamp?: true
  }

  export type AiChatHistoryMaxAggregateInputType = {
    id?: true
    userId?: true
    resourceId?: true
    userQuery?: true
    response?: true
    timestamp?: true
  }

  export type AiChatHistoryCountAggregateInputType = {
    id?: true
    userId?: true
    resourceId?: true
    userQuery?: true
    response?: true
    sources?: true
    timestamp?: true
    _all?: true
  }

  export type AiChatHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatHistory to aggregate.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiChatHistories
    **/
    _count?: true | AiChatHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiChatHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiChatHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiChatHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiChatHistoryMaxAggregateInputType
  }

  export type GetAiChatHistoryAggregateType<T extends AiChatHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAiChatHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiChatHistory[P]>
      : GetScalarType<T[P], AggregateAiChatHistory[P]>
  }




  export type AiChatHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiChatHistoryWhereInput
    orderBy?: AiChatHistoryOrderByWithAggregationInput | AiChatHistoryOrderByWithAggregationInput[]
    by: AiChatHistoryScalarFieldEnum[] | AiChatHistoryScalarFieldEnum
    having?: AiChatHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiChatHistoryCountAggregateInputType | true
    _avg?: AiChatHistoryAvgAggregateInputType
    _sum?: AiChatHistorySumAggregateInputType
    _min?: AiChatHistoryMinAggregateInputType
    _max?: AiChatHistoryMaxAggregateInputType
  }

  export type AiChatHistoryGroupByOutputType = {
    id: number
    userId: string
    resourceId: string | null
    userQuery: string
    response: string
    sources: string[]
    timestamp: Date
    _count: AiChatHistoryCountAggregateOutputType | null
    _avg: AiChatHistoryAvgAggregateOutputType | null
    _sum: AiChatHistorySumAggregateOutputType | null
    _min: AiChatHistoryMinAggregateOutputType | null
    _max: AiChatHistoryMaxAggregateOutputType | null
  }

  type GetAiChatHistoryGroupByPayload<T extends AiChatHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiChatHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiChatHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiChatHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], AiChatHistoryGroupByOutputType[P]>
        }
      >
    >


  export type AiChatHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    userQuery?: boolean
    response?: boolean
    sources?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | AiChatHistory$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatHistory"]>

  export type AiChatHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    userQuery?: boolean
    response?: boolean
    sources?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | AiChatHistory$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatHistory"]>

  export type AiChatHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    userQuery?: boolean
    response?: boolean
    sources?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | AiChatHistory$resourceArgs<ExtArgs>
  }, ExtArgs["result"]["aiChatHistory"]>

  export type AiChatHistorySelectScalar = {
    id?: boolean
    userId?: boolean
    resourceId?: boolean
    userQuery?: boolean
    response?: boolean
    sources?: boolean
    timestamp?: boolean
  }

  export type AiChatHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "resourceId" | "userQuery" | "response" | "sources" | "timestamp", ExtArgs["result"]["aiChatHistory"]>
  export type AiChatHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | AiChatHistory$resourceArgs<ExtArgs>
  }
  export type AiChatHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | AiChatHistory$resourceArgs<ExtArgs>
  }
  export type AiChatHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    resource?: boolean | AiChatHistory$resourceArgs<ExtArgs>
  }

  export type $AiChatHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiChatHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      resource: Prisma.$UploadedDocsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      resourceId: string | null
      userQuery: string
      response: string
      sources: string[]
      timestamp: Date
    }, ExtArgs["result"]["aiChatHistory"]>
    composites: {}
  }

  type AiChatHistoryGetPayload<S extends boolean | null | undefined | AiChatHistoryDefaultArgs> = $Result.GetResult<Prisma.$AiChatHistoryPayload, S>

  type AiChatHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiChatHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiChatHistoryCountAggregateInputType | true
    }

  export interface AiChatHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiChatHistory'], meta: { name: 'AiChatHistory' } }
    /**
     * Find zero or one AiChatHistory that matches the filter.
     * @param {AiChatHistoryFindUniqueArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiChatHistoryFindUniqueArgs>(args: SelectSubset<T, AiChatHistoryFindUniqueArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiChatHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiChatHistoryFindUniqueOrThrowArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiChatHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AiChatHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiChatHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryFindFirstArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiChatHistoryFindFirstArgs>(args?: SelectSubset<T, AiChatHistoryFindFirstArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiChatHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryFindFirstOrThrowArgs} args - Arguments to find a AiChatHistory
     * @example
     * // Get one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiChatHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AiChatHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiChatHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiChatHistories
     * const aiChatHistories = await prisma.aiChatHistory.findMany()
     * 
     * // Get first 10 AiChatHistories
     * const aiChatHistories = await prisma.aiChatHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiChatHistoryWithIdOnly = await prisma.aiChatHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiChatHistoryFindManyArgs>(args?: SelectSubset<T, AiChatHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiChatHistory.
     * @param {AiChatHistoryCreateArgs} args - Arguments to create a AiChatHistory.
     * @example
     * // Create one AiChatHistory
     * const AiChatHistory = await prisma.aiChatHistory.create({
     *   data: {
     *     // ... data to create a AiChatHistory
     *   }
     * })
     * 
     */
    create<T extends AiChatHistoryCreateArgs>(args: SelectSubset<T, AiChatHistoryCreateArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiChatHistories.
     * @param {AiChatHistoryCreateManyArgs} args - Arguments to create many AiChatHistories.
     * @example
     * // Create many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiChatHistoryCreateManyArgs>(args?: SelectSubset<T, AiChatHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiChatHistories and returns the data saved in the database.
     * @param {AiChatHistoryCreateManyAndReturnArgs} args - Arguments to create many AiChatHistories.
     * @example
     * // Create many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiChatHistories and only return the `id`
     * const aiChatHistoryWithIdOnly = await prisma.aiChatHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiChatHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AiChatHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiChatHistory.
     * @param {AiChatHistoryDeleteArgs} args - Arguments to delete one AiChatHistory.
     * @example
     * // Delete one AiChatHistory
     * const AiChatHistory = await prisma.aiChatHistory.delete({
     *   where: {
     *     // ... filter to delete one AiChatHistory
     *   }
     * })
     * 
     */
    delete<T extends AiChatHistoryDeleteArgs>(args: SelectSubset<T, AiChatHistoryDeleteArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiChatHistory.
     * @param {AiChatHistoryUpdateArgs} args - Arguments to update one AiChatHistory.
     * @example
     * // Update one AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiChatHistoryUpdateArgs>(args: SelectSubset<T, AiChatHistoryUpdateArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiChatHistories.
     * @param {AiChatHistoryDeleteManyArgs} args - Arguments to filter AiChatHistories to delete.
     * @example
     * // Delete a few AiChatHistories
     * const { count } = await prisma.aiChatHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiChatHistoryDeleteManyArgs>(args?: SelectSubset<T, AiChatHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiChatHistoryUpdateManyArgs>(args: SelectSubset<T, AiChatHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiChatHistories and returns the data updated in the database.
     * @param {AiChatHistoryUpdateManyAndReturnArgs} args - Arguments to update many AiChatHistories.
     * @example
     * // Update many AiChatHistories
     * const aiChatHistory = await prisma.aiChatHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiChatHistories and only return the `id`
     * const aiChatHistoryWithIdOnly = await prisma.aiChatHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiChatHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AiChatHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiChatHistory.
     * @param {AiChatHistoryUpsertArgs} args - Arguments to update or create a AiChatHistory.
     * @example
     * // Update or create a AiChatHistory
     * const aiChatHistory = await prisma.aiChatHistory.upsert({
     *   create: {
     *     // ... data to create a AiChatHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiChatHistory we want to update
     *   }
     * })
     */
    upsert<T extends AiChatHistoryUpsertArgs>(args: SelectSubset<T, AiChatHistoryUpsertArgs<ExtArgs>>): Prisma__AiChatHistoryClient<$Result.GetResult<Prisma.$AiChatHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiChatHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryCountArgs} args - Arguments to filter AiChatHistories to count.
     * @example
     * // Count the number of AiChatHistories
     * const count = await prisma.aiChatHistory.count({
     *   where: {
     *     // ... the filter for the AiChatHistories we want to count
     *   }
     * })
    **/
    count<T extends AiChatHistoryCountArgs>(
      args?: Subset<T, AiChatHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiChatHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiChatHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiChatHistoryAggregateArgs>(args: Subset<T, AiChatHistoryAggregateArgs>): Prisma.PrismaPromise<GetAiChatHistoryAggregateType<T>>

    /**
     * Group by AiChatHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiChatHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiChatHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiChatHistoryGroupByArgs['orderBy'] }
        : { orderBy?: AiChatHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiChatHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiChatHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiChatHistory model
   */
  readonly fields: AiChatHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiChatHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiChatHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    resource<T extends AiChatHistory$resourceArgs<ExtArgs> = {}>(args?: Subset<T, AiChatHistory$resourceArgs<ExtArgs>>): Prisma__UploadedDocsClient<$Result.GetResult<Prisma.$UploadedDocsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiChatHistory model
   */
  interface AiChatHistoryFieldRefs {
    readonly id: FieldRef<"AiChatHistory", 'Int'>
    readonly userId: FieldRef<"AiChatHistory", 'String'>
    readonly resourceId: FieldRef<"AiChatHistory", 'String'>
    readonly userQuery: FieldRef<"AiChatHistory", 'String'>
    readonly response: FieldRef<"AiChatHistory", 'String'>
    readonly sources: FieldRef<"AiChatHistory", 'String[]'>
    readonly timestamp: FieldRef<"AiChatHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiChatHistory findUnique
   */
  export type AiChatHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory findUniqueOrThrow
   */
  export type AiChatHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory findFirst
   */
  export type AiChatHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatHistories.
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatHistories.
     */
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * AiChatHistory findFirstOrThrow
   */
  export type AiChatHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AiChatHistory to fetch.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiChatHistories.
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiChatHistories.
     */
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * AiChatHistory findMany
   */
  export type AiChatHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AiChatHistories to fetch.
     */
    where?: AiChatHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiChatHistories to fetch.
     */
    orderBy?: AiChatHistoryOrderByWithRelationInput | AiChatHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiChatHistories.
     */
    cursor?: AiChatHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiChatHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiChatHistories.
     */
    skip?: number
    distinct?: AiChatHistoryScalarFieldEnum | AiChatHistoryScalarFieldEnum[]
  }

  /**
   * AiChatHistory create
   */
  export type AiChatHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a AiChatHistory.
     */
    data: XOR<AiChatHistoryCreateInput, AiChatHistoryUncheckedCreateInput>
  }

  /**
   * AiChatHistory createMany
   */
  export type AiChatHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiChatHistories.
     */
    data: AiChatHistoryCreateManyInput | AiChatHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiChatHistory createManyAndReturn
   */
  export type AiChatHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many AiChatHistories.
     */
    data: AiChatHistoryCreateManyInput | AiChatHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiChatHistory update
   */
  export type AiChatHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a AiChatHistory.
     */
    data: XOR<AiChatHistoryUpdateInput, AiChatHistoryUncheckedUpdateInput>
    /**
     * Choose, which AiChatHistory to update.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory updateMany
   */
  export type AiChatHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiChatHistories.
     */
    data: XOR<AiChatHistoryUpdateManyMutationInput, AiChatHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AiChatHistories to update
     */
    where?: AiChatHistoryWhereInput
    /**
     * Limit how many AiChatHistories to update.
     */
    limit?: number
  }

  /**
   * AiChatHistory updateManyAndReturn
   */
  export type AiChatHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * The data used to update AiChatHistories.
     */
    data: XOR<AiChatHistoryUpdateManyMutationInput, AiChatHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AiChatHistories to update
     */
    where?: AiChatHistoryWhereInput
    /**
     * Limit how many AiChatHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiChatHistory upsert
   */
  export type AiChatHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the AiChatHistory to update in case it exists.
     */
    where: AiChatHistoryWhereUniqueInput
    /**
     * In case the AiChatHistory found by the `where` argument doesn't exist, create a new AiChatHistory with this data.
     */
    create: XOR<AiChatHistoryCreateInput, AiChatHistoryUncheckedCreateInput>
    /**
     * In case the AiChatHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiChatHistoryUpdateInput, AiChatHistoryUncheckedUpdateInput>
  }

  /**
   * AiChatHistory delete
   */
  export type AiChatHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
    /**
     * Filter which AiChatHistory to delete.
     */
    where: AiChatHistoryWhereUniqueInput
  }

  /**
   * AiChatHistory deleteMany
   */
  export type AiChatHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiChatHistories to delete
     */
    where?: AiChatHistoryWhereInput
    /**
     * Limit how many AiChatHistories to delete.
     */
    limit?: number
  }

  /**
   * AiChatHistory.resource
   */
  export type AiChatHistory$resourceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedDocs
     */
    select?: UploadedDocsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedDocs
     */
    omit?: UploadedDocsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedDocsInclude<ExtArgs> | null
    where?: UploadedDocsWhereInput
  }

  /**
   * AiChatHistory without action
   */
  export type AiChatHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiChatHistory
     */
    select?: AiChatHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiChatHistory
     */
    omit?: AiChatHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiChatHistoryInclude<ExtArgs> | null
  }


  /**
   * Model MCQSet
   */

  export type AggregateMCQSet = {
    _count: MCQSetCountAggregateOutputType | null
    _min: MCQSetMinAggregateOutputType | null
    _max: MCQSetMaxAggregateOutputType | null
  }

  export type MCQSetMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type MCQSetMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fileUrl: string | null
    createdAt: Date | null
  }

  export type MCQSetCountAggregateOutputType = {
    id: number
    userId: number
    fileUrl: number
    createdAt: number
    _all: number
  }


  export type MCQSetMinAggregateInputType = {
    id?: true
    userId?: true
    fileUrl?: true
    createdAt?: true
  }

  export type MCQSetMaxAggregateInputType = {
    id?: true
    userId?: true
    fileUrl?: true
    createdAt?: true
  }

  export type MCQSetCountAggregateInputType = {
    id?: true
    userId?: true
    fileUrl?: true
    createdAt?: true
    _all?: true
  }

  export type MCQSetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCQSet to aggregate.
     */
    where?: MCQSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQSets to fetch.
     */
    orderBy?: MCQSetOrderByWithRelationInput | MCQSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MCQSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MCQSets
    **/
    _count?: true | MCQSetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MCQSetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MCQSetMaxAggregateInputType
  }

  export type GetMCQSetAggregateType<T extends MCQSetAggregateArgs> = {
        [P in keyof T & keyof AggregateMCQSet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMCQSet[P]>
      : GetScalarType<T[P], AggregateMCQSet[P]>
  }




  export type MCQSetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCQSetWhereInput
    orderBy?: MCQSetOrderByWithAggregationInput | MCQSetOrderByWithAggregationInput[]
    by: MCQSetScalarFieldEnum[] | MCQSetScalarFieldEnum
    having?: MCQSetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MCQSetCountAggregateInputType | true
    _min?: MCQSetMinAggregateInputType
    _max?: MCQSetMaxAggregateInputType
  }

  export type MCQSetGroupByOutputType = {
    id: string
    userId: string
    fileUrl: string
    createdAt: Date
    _count: MCQSetCountAggregateOutputType | null
    _min: MCQSetMinAggregateOutputType | null
    _max: MCQSetMaxAggregateOutputType | null
  }

  type GetMCQSetGroupByPayload<T extends MCQSetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MCQSetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MCQSetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MCQSetGroupByOutputType[P]>
            : GetScalarType<T[P], MCQSetGroupByOutputType[P]>
        }
      >
    >


  export type MCQSetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mcqs?: boolean | MCQSet$mcqsArgs<ExtArgs>
    _count?: boolean | MCQSetCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCQSet"]>

  export type MCQSetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCQSet"]>

  export type MCQSetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileUrl?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCQSet"]>

  export type MCQSetSelectScalar = {
    id?: boolean
    userId?: boolean
    fileUrl?: boolean
    createdAt?: boolean
  }

  export type MCQSetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fileUrl" | "createdAt", ExtArgs["result"]["mCQSet"]>
  export type MCQSetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mcqs?: boolean | MCQSet$mcqsArgs<ExtArgs>
    _count?: boolean | MCQSetCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MCQSetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MCQSetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MCQSetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MCQSet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mcqs: Prisma.$MCQPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fileUrl: string
      createdAt: Date
    }, ExtArgs["result"]["mCQSet"]>
    composites: {}
  }

  type MCQSetGetPayload<S extends boolean | null | undefined | MCQSetDefaultArgs> = $Result.GetResult<Prisma.$MCQSetPayload, S>

  type MCQSetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MCQSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MCQSetCountAggregateInputType | true
    }

  export interface MCQSetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MCQSet'], meta: { name: 'MCQSet' } }
    /**
     * Find zero or one MCQSet that matches the filter.
     * @param {MCQSetFindUniqueArgs} args - Arguments to find a MCQSet
     * @example
     * // Get one MCQSet
     * const mCQSet = await prisma.mCQSet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MCQSetFindUniqueArgs>(args: SelectSubset<T, MCQSetFindUniqueArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MCQSet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MCQSetFindUniqueOrThrowArgs} args - Arguments to find a MCQSet
     * @example
     * // Get one MCQSet
     * const mCQSet = await prisma.mCQSet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MCQSetFindUniqueOrThrowArgs>(args: SelectSubset<T, MCQSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCQSet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetFindFirstArgs} args - Arguments to find a MCQSet
     * @example
     * // Get one MCQSet
     * const mCQSet = await prisma.mCQSet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MCQSetFindFirstArgs>(args?: SelectSubset<T, MCQSetFindFirstArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCQSet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetFindFirstOrThrowArgs} args - Arguments to find a MCQSet
     * @example
     * // Get one MCQSet
     * const mCQSet = await prisma.mCQSet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MCQSetFindFirstOrThrowArgs>(args?: SelectSubset<T, MCQSetFindFirstOrThrowArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MCQSets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MCQSets
     * const mCQSets = await prisma.mCQSet.findMany()
     * 
     * // Get first 10 MCQSets
     * const mCQSets = await prisma.mCQSet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mCQSetWithIdOnly = await prisma.mCQSet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MCQSetFindManyArgs>(args?: SelectSubset<T, MCQSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MCQSet.
     * @param {MCQSetCreateArgs} args - Arguments to create a MCQSet.
     * @example
     * // Create one MCQSet
     * const MCQSet = await prisma.mCQSet.create({
     *   data: {
     *     // ... data to create a MCQSet
     *   }
     * })
     * 
     */
    create<T extends MCQSetCreateArgs>(args: SelectSubset<T, MCQSetCreateArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MCQSets.
     * @param {MCQSetCreateManyArgs} args - Arguments to create many MCQSets.
     * @example
     * // Create many MCQSets
     * const mCQSet = await prisma.mCQSet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MCQSetCreateManyArgs>(args?: SelectSubset<T, MCQSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MCQSets and returns the data saved in the database.
     * @param {MCQSetCreateManyAndReturnArgs} args - Arguments to create many MCQSets.
     * @example
     * // Create many MCQSets
     * const mCQSet = await prisma.mCQSet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MCQSets and only return the `id`
     * const mCQSetWithIdOnly = await prisma.mCQSet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MCQSetCreateManyAndReturnArgs>(args?: SelectSubset<T, MCQSetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MCQSet.
     * @param {MCQSetDeleteArgs} args - Arguments to delete one MCQSet.
     * @example
     * // Delete one MCQSet
     * const MCQSet = await prisma.mCQSet.delete({
     *   where: {
     *     // ... filter to delete one MCQSet
     *   }
     * })
     * 
     */
    delete<T extends MCQSetDeleteArgs>(args: SelectSubset<T, MCQSetDeleteArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MCQSet.
     * @param {MCQSetUpdateArgs} args - Arguments to update one MCQSet.
     * @example
     * // Update one MCQSet
     * const mCQSet = await prisma.mCQSet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MCQSetUpdateArgs>(args: SelectSubset<T, MCQSetUpdateArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MCQSets.
     * @param {MCQSetDeleteManyArgs} args - Arguments to filter MCQSets to delete.
     * @example
     * // Delete a few MCQSets
     * const { count } = await prisma.mCQSet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MCQSetDeleteManyArgs>(args?: SelectSubset<T, MCQSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCQSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MCQSets
     * const mCQSet = await prisma.mCQSet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MCQSetUpdateManyArgs>(args: SelectSubset<T, MCQSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCQSets and returns the data updated in the database.
     * @param {MCQSetUpdateManyAndReturnArgs} args - Arguments to update many MCQSets.
     * @example
     * // Update many MCQSets
     * const mCQSet = await prisma.mCQSet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MCQSets and only return the `id`
     * const mCQSetWithIdOnly = await prisma.mCQSet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MCQSetUpdateManyAndReturnArgs>(args: SelectSubset<T, MCQSetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MCQSet.
     * @param {MCQSetUpsertArgs} args - Arguments to update or create a MCQSet.
     * @example
     * // Update or create a MCQSet
     * const mCQSet = await prisma.mCQSet.upsert({
     *   create: {
     *     // ... data to create a MCQSet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MCQSet we want to update
     *   }
     * })
     */
    upsert<T extends MCQSetUpsertArgs>(args: SelectSubset<T, MCQSetUpsertArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MCQSets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetCountArgs} args - Arguments to filter MCQSets to count.
     * @example
     * // Count the number of MCQSets
     * const count = await prisma.mCQSet.count({
     *   where: {
     *     // ... the filter for the MCQSets we want to count
     *   }
     * })
    **/
    count<T extends MCQSetCountArgs>(
      args?: Subset<T, MCQSetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MCQSetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MCQSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MCQSetAggregateArgs>(args: Subset<T, MCQSetAggregateArgs>): Prisma.PrismaPromise<GetMCQSetAggregateType<T>>

    /**
     * Group by MCQSet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQSetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MCQSetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MCQSetGroupByArgs['orderBy'] }
        : { orderBy?: MCQSetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MCQSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMCQSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MCQSet model
   */
  readonly fields: MCQSetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MCQSet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MCQSetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mcqs<T extends MCQSet$mcqsArgs<ExtArgs> = {}>(args?: Subset<T, MCQSet$mcqsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MCQSet model
   */
  interface MCQSetFieldRefs {
    readonly id: FieldRef<"MCQSet", 'String'>
    readonly userId: FieldRef<"MCQSet", 'String'>
    readonly fileUrl: FieldRef<"MCQSet", 'String'>
    readonly createdAt: FieldRef<"MCQSet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MCQSet findUnique
   */
  export type MCQSetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * Filter, which MCQSet to fetch.
     */
    where: MCQSetWhereUniqueInput
  }

  /**
   * MCQSet findUniqueOrThrow
   */
  export type MCQSetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * Filter, which MCQSet to fetch.
     */
    where: MCQSetWhereUniqueInput
  }

  /**
   * MCQSet findFirst
   */
  export type MCQSetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * Filter, which MCQSet to fetch.
     */
    where?: MCQSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQSets to fetch.
     */
    orderBy?: MCQSetOrderByWithRelationInput | MCQSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCQSets.
     */
    cursor?: MCQSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCQSets.
     */
    distinct?: MCQSetScalarFieldEnum | MCQSetScalarFieldEnum[]
  }

  /**
   * MCQSet findFirstOrThrow
   */
  export type MCQSetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * Filter, which MCQSet to fetch.
     */
    where?: MCQSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQSets to fetch.
     */
    orderBy?: MCQSetOrderByWithRelationInput | MCQSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCQSets.
     */
    cursor?: MCQSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQSets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCQSets.
     */
    distinct?: MCQSetScalarFieldEnum | MCQSetScalarFieldEnum[]
  }

  /**
   * MCQSet findMany
   */
  export type MCQSetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * Filter, which MCQSets to fetch.
     */
    where?: MCQSetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQSets to fetch.
     */
    orderBy?: MCQSetOrderByWithRelationInput | MCQSetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MCQSets.
     */
    cursor?: MCQSetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQSets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQSets.
     */
    skip?: number
    distinct?: MCQSetScalarFieldEnum | MCQSetScalarFieldEnum[]
  }

  /**
   * MCQSet create
   */
  export type MCQSetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * The data needed to create a MCQSet.
     */
    data: XOR<MCQSetCreateInput, MCQSetUncheckedCreateInput>
  }

  /**
   * MCQSet createMany
   */
  export type MCQSetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MCQSets.
     */
    data: MCQSetCreateManyInput | MCQSetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MCQSet createManyAndReturn
   */
  export type MCQSetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * The data used to create many MCQSets.
     */
    data: MCQSetCreateManyInput | MCQSetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCQSet update
   */
  export type MCQSetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * The data needed to update a MCQSet.
     */
    data: XOR<MCQSetUpdateInput, MCQSetUncheckedUpdateInput>
    /**
     * Choose, which MCQSet to update.
     */
    where: MCQSetWhereUniqueInput
  }

  /**
   * MCQSet updateMany
   */
  export type MCQSetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MCQSets.
     */
    data: XOR<MCQSetUpdateManyMutationInput, MCQSetUncheckedUpdateManyInput>
    /**
     * Filter which MCQSets to update
     */
    where?: MCQSetWhereInput
    /**
     * Limit how many MCQSets to update.
     */
    limit?: number
  }

  /**
   * MCQSet updateManyAndReturn
   */
  export type MCQSetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * The data used to update MCQSets.
     */
    data: XOR<MCQSetUpdateManyMutationInput, MCQSetUncheckedUpdateManyInput>
    /**
     * Filter which MCQSets to update
     */
    where?: MCQSetWhereInput
    /**
     * Limit how many MCQSets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCQSet upsert
   */
  export type MCQSetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * The filter to search for the MCQSet to update in case it exists.
     */
    where: MCQSetWhereUniqueInput
    /**
     * In case the MCQSet found by the `where` argument doesn't exist, create a new MCQSet with this data.
     */
    create: XOR<MCQSetCreateInput, MCQSetUncheckedCreateInput>
    /**
     * In case the MCQSet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MCQSetUpdateInput, MCQSetUncheckedUpdateInput>
  }

  /**
   * MCQSet delete
   */
  export type MCQSetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
    /**
     * Filter which MCQSet to delete.
     */
    where: MCQSetWhereUniqueInput
  }

  /**
   * MCQSet deleteMany
   */
  export type MCQSetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCQSets to delete
     */
    where?: MCQSetWhereInput
    /**
     * Limit how many MCQSets to delete.
     */
    limit?: number
  }

  /**
   * MCQSet.mcqs
   */
  export type MCQSet$mcqsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    where?: MCQWhereInput
    orderBy?: MCQOrderByWithRelationInput | MCQOrderByWithRelationInput[]
    cursor?: MCQWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MCQScalarFieldEnum | MCQScalarFieldEnum[]
  }

  /**
   * MCQSet without action
   */
  export type MCQSetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQSet
     */
    select?: MCQSetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQSet
     */
    omit?: MCQSetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQSetInclude<ExtArgs> | null
  }


  /**
   * Model MCQ
   */

  export type AggregateMCQ = {
    _count: MCQCountAggregateOutputType | null
    _min: MCQMinAggregateOutputType | null
    _max: MCQMaxAggregateOutputType | null
  }

  export type MCQMinAggregateOutputType = {
    id: string | null
    question: string | null
    answer: string | null
    mcqSetId: string | null
    createdAt: Date | null
  }

  export type MCQMaxAggregateOutputType = {
    id: string | null
    question: string | null
    answer: string | null
    mcqSetId: string | null
    createdAt: Date | null
  }

  export type MCQCountAggregateOutputType = {
    id: number
    question: number
    options: number
    answer: number
    mcqSetId: number
    createdAt: number
    _all: number
  }


  export type MCQMinAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    mcqSetId?: true
    createdAt?: true
  }

  export type MCQMaxAggregateInputType = {
    id?: true
    question?: true
    answer?: true
    mcqSetId?: true
    createdAt?: true
  }

  export type MCQCountAggregateInputType = {
    id?: true
    question?: true
    options?: true
    answer?: true
    mcqSetId?: true
    createdAt?: true
    _all?: true
  }

  export type MCQAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCQ to aggregate.
     */
    where?: MCQWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQS to fetch.
     */
    orderBy?: MCQOrderByWithRelationInput | MCQOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MCQWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MCQS
    **/
    _count?: true | MCQCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MCQMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MCQMaxAggregateInputType
  }

  export type GetMCQAggregateType<T extends MCQAggregateArgs> = {
        [P in keyof T & keyof AggregateMCQ]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMCQ[P]>
      : GetScalarType<T[P], AggregateMCQ[P]>
  }




  export type MCQGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MCQWhereInput
    orderBy?: MCQOrderByWithAggregationInput | MCQOrderByWithAggregationInput[]
    by: MCQScalarFieldEnum[] | MCQScalarFieldEnum
    having?: MCQScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MCQCountAggregateInputType | true
    _min?: MCQMinAggregateInputType
    _max?: MCQMaxAggregateInputType
  }

  export type MCQGroupByOutputType = {
    id: string
    question: string
    options: string[]
    answer: string
    mcqSetId: string
    createdAt: Date
    _count: MCQCountAggregateOutputType | null
    _min: MCQMinAggregateOutputType | null
    _max: MCQMaxAggregateOutputType | null
  }

  type GetMCQGroupByPayload<T extends MCQGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MCQGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MCQGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MCQGroupByOutputType[P]>
            : GetScalarType<T[P], MCQGroupByOutputType[P]>
        }
      >
    >


  export type MCQSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    mcqSetId?: boolean
    createdAt?: boolean
    mcqSet?: boolean | MCQSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCQ"]>

  export type MCQSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    mcqSetId?: boolean
    createdAt?: boolean
    mcqSet?: boolean | MCQSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCQ"]>

  export type MCQSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    mcqSetId?: boolean
    createdAt?: boolean
    mcqSet?: boolean | MCQSetDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mCQ"]>

  export type MCQSelectScalar = {
    id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    mcqSetId?: boolean
    createdAt?: boolean
  }

  export type MCQOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question" | "options" | "answer" | "mcqSetId" | "createdAt", ExtArgs["result"]["mCQ"]>
  export type MCQInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mcqSet?: boolean | MCQSetDefaultArgs<ExtArgs>
  }
  export type MCQIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mcqSet?: boolean | MCQSetDefaultArgs<ExtArgs>
  }
  export type MCQIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mcqSet?: boolean | MCQSetDefaultArgs<ExtArgs>
  }

  export type $MCQPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MCQ"
    objects: {
      mcqSet: Prisma.$MCQSetPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      question: string
      options: string[]
      answer: string
      mcqSetId: string
      createdAt: Date
    }, ExtArgs["result"]["mCQ"]>
    composites: {}
  }

  type MCQGetPayload<S extends boolean | null | undefined | MCQDefaultArgs> = $Result.GetResult<Prisma.$MCQPayload, S>

  type MCQCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MCQFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MCQCountAggregateInputType | true
    }

  export interface MCQDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MCQ'], meta: { name: 'MCQ' } }
    /**
     * Find zero or one MCQ that matches the filter.
     * @param {MCQFindUniqueArgs} args - Arguments to find a MCQ
     * @example
     * // Get one MCQ
     * const mCQ = await prisma.mCQ.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MCQFindUniqueArgs>(args: SelectSubset<T, MCQFindUniqueArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MCQ that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MCQFindUniqueOrThrowArgs} args - Arguments to find a MCQ
     * @example
     * // Get one MCQ
     * const mCQ = await prisma.mCQ.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MCQFindUniqueOrThrowArgs>(args: SelectSubset<T, MCQFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCQ that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQFindFirstArgs} args - Arguments to find a MCQ
     * @example
     * // Get one MCQ
     * const mCQ = await prisma.mCQ.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MCQFindFirstArgs>(args?: SelectSubset<T, MCQFindFirstArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MCQ that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQFindFirstOrThrowArgs} args - Arguments to find a MCQ
     * @example
     * // Get one MCQ
     * const mCQ = await prisma.mCQ.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MCQFindFirstOrThrowArgs>(args?: SelectSubset<T, MCQFindFirstOrThrowArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MCQS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MCQS
     * const mCQS = await prisma.mCQ.findMany()
     * 
     * // Get first 10 MCQS
     * const mCQS = await prisma.mCQ.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mCQWithIdOnly = await prisma.mCQ.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MCQFindManyArgs>(args?: SelectSubset<T, MCQFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MCQ.
     * @param {MCQCreateArgs} args - Arguments to create a MCQ.
     * @example
     * // Create one MCQ
     * const MCQ = await prisma.mCQ.create({
     *   data: {
     *     // ... data to create a MCQ
     *   }
     * })
     * 
     */
    create<T extends MCQCreateArgs>(args: SelectSubset<T, MCQCreateArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MCQS.
     * @param {MCQCreateManyArgs} args - Arguments to create many MCQS.
     * @example
     * // Create many MCQS
     * const mCQ = await prisma.mCQ.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MCQCreateManyArgs>(args?: SelectSubset<T, MCQCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MCQS and returns the data saved in the database.
     * @param {MCQCreateManyAndReturnArgs} args - Arguments to create many MCQS.
     * @example
     * // Create many MCQS
     * const mCQ = await prisma.mCQ.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MCQS and only return the `id`
     * const mCQWithIdOnly = await prisma.mCQ.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MCQCreateManyAndReturnArgs>(args?: SelectSubset<T, MCQCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MCQ.
     * @param {MCQDeleteArgs} args - Arguments to delete one MCQ.
     * @example
     * // Delete one MCQ
     * const MCQ = await prisma.mCQ.delete({
     *   where: {
     *     // ... filter to delete one MCQ
     *   }
     * })
     * 
     */
    delete<T extends MCQDeleteArgs>(args: SelectSubset<T, MCQDeleteArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MCQ.
     * @param {MCQUpdateArgs} args - Arguments to update one MCQ.
     * @example
     * // Update one MCQ
     * const mCQ = await prisma.mCQ.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MCQUpdateArgs>(args: SelectSubset<T, MCQUpdateArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MCQS.
     * @param {MCQDeleteManyArgs} args - Arguments to filter MCQS to delete.
     * @example
     * // Delete a few MCQS
     * const { count } = await prisma.mCQ.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MCQDeleteManyArgs>(args?: SelectSubset<T, MCQDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCQS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MCQS
     * const mCQ = await prisma.mCQ.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MCQUpdateManyArgs>(args: SelectSubset<T, MCQUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MCQS and returns the data updated in the database.
     * @param {MCQUpdateManyAndReturnArgs} args - Arguments to update many MCQS.
     * @example
     * // Update many MCQS
     * const mCQ = await prisma.mCQ.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MCQS and only return the `id`
     * const mCQWithIdOnly = await prisma.mCQ.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MCQUpdateManyAndReturnArgs>(args: SelectSubset<T, MCQUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MCQ.
     * @param {MCQUpsertArgs} args - Arguments to update or create a MCQ.
     * @example
     * // Update or create a MCQ
     * const mCQ = await prisma.mCQ.upsert({
     *   create: {
     *     // ... data to create a MCQ
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MCQ we want to update
     *   }
     * })
     */
    upsert<T extends MCQUpsertArgs>(args: SelectSubset<T, MCQUpsertArgs<ExtArgs>>): Prisma__MCQClient<$Result.GetResult<Prisma.$MCQPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MCQS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQCountArgs} args - Arguments to filter MCQS to count.
     * @example
     * // Count the number of MCQS
     * const count = await prisma.mCQ.count({
     *   where: {
     *     // ... the filter for the MCQS we want to count
     *   }
     * })
    **/
    count<T extends MCQCountArgs>(
      args?: Subset<T, MCQCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MCQCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MCQ.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MCQAggregateArgs>(args: Subset<T, MCQAggregateArgs>): Prisma.PrismaPromise<GetMCQAggregateType<T>>

    /**
     * Group by MCQ.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MCQGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MCQGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MCQGroupByArgs['orderBy'] }
        : { orderBy?: MCQGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MCQGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMCQGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MCQ model
   */
  readonly fields: MCQFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MCQ.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MCQClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mcqSet<T extends MCQSetDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MCQSetDefaultArgs<ExtArgs>>): Prisma__MCQSetClient<$Result.GetResult<Prisma.$MCQSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MCQ model
   */
  interface MCQFieldRefs {
    readonly id: FieldRef<"MCQ", 'String'>
    readonly question: FieldRef<"MCQ", 'String'>
    readonly options: FieldRef<"MCQ", 'String[]'>
    readonly answer: FieldRef<"MCQ", 'String'>
    readonly mcqSetId: FieldRef<"MCQ", 'String'>
    readonly createdAt: FieldRef<"MCQ", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MCQ findUnique
   */
  export type MCQFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * Filter, which MCQ to fetch.
     */
    where: MCQWhereUniqueInput
  }

  /**
   * MCQ findUniqueOrThrow
   */
  export type MCQFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * Filter, which MCQ to fetch.
     */
    where: MCQWhereUniqueInput
  }

  /**
   * MCQ findFirst
   */
  export type MCQFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * Filter, which MCQ to fetch.
     */
    where?: MCQWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQS to fetch.
     */
    orderBy?: MCQOrderByWithRelationInput | MCQOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCQS.
     */
    cursor?: MCQWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCQS.
     */
    distinct?: MCQScalarFieldEnum | MCQScalarFieldEnum[]
  }

  /**
   * MCQ findFirstOrThrow
   */
  export type MCQFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * Filter, which MCQ to fetch.
     */
    where?: MCQWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQS to fetch.
     */
    orderBy?: MCQOrderByWithRelationInput | MCQOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MCQS.
     */
    cursor?: MCQWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MCQS.
     */
    distinct?: MCQScalarFieldEnum | MCQScalarFieldEnum[]
  }

  /**
   * MCQ findMany
   */
  export type MCQFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * Filter, which MCQS to fetch.
     */
    where?: MCQWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MCQS to fetch.
     */
    orderBy?: MCQOrderByWithRelationInput | MCQOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MCQS.
     */
    cursor?: MCQWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MCQS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MCQS.
     */
    skip?: number
    distinct?: MCQScalarFieldEnum | MCQScalarFieldEnum[]
  }

  /**
   * MCQ create
   */
  export type MCQCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * The data needed to create a MCQ.
     */
    data: XOR<MCQCreateInput, MCQUncheckedCreateInput>
  }

  /**
   * MCQ createMany
   */
  export type MCQCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MCQS.
     */
    data: MCQCreateManyInput | MCQCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MCQ createManyAndReturn
   */
  export type MCQCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * The data used to create many MCQS.
     */
    data: MCQCreateManyInput | MCQCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCQ update
   */
  export type MCQUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * The data needed to update a MCQ.
     */
    data: XOR<MCQUpdateInput, MCQUncheckedUpdateInput>
    /**
     * Choose, which MCQ to update.
     */
    where: MCQWhereUniqueInput
  }

  /**
   * MCQ updateMany
   */
  export type MCQUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MCQS.
     */
    data: XOR<MCQUpdateManyMutationInput, MCQUncheckedUpdateManyInput>
    /**
     * Filter which MCQS to update
     */
    where?: MCQWhereInput
    /**
     * Limit how many MCQS to update.
     */
    limit?: number
  }

  /**
   * MCQ updateManyAndReturn
   */
  export type MCQUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * The data used to update MCQS.
     */
    data: XOR<MCQUpdateManyMutationInput, MCQUncheckedUpdateManyInput>
    /**
     * Filter which MCQS to update
     */
    where?: MCQWhereInput
    /**
     * Limit how many MCQS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MCQ upsert
   */
  export type MCQUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * The filter to search for the MCQ to update in case it exists.
     */
    where: MCQWhereUniqueInput
    /**
     * In case the MCQ found by the `where` argument doesn't exist, create a new MCQ with this data.
     */
    create: XOR<MCQCreateInput, MCQUncheckedCreateInput>
    /**
     * In case the MCQ was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MCQUpdateInput, MCQUncheckedUpdateInput>
  }

  /**
   * MCQ delete
   */
  export type MCQDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
    /**
     * Filter which MCQ to delete.
     */
    where: MCQWhereUniqueInput
  }

  /**
   * MCQ deleteMany
   */
  export type MCQDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MCQS to delete
     */
    where?: MCQWhereInput
    /**
     * Limit how many MCQS to delete.
     */
    limit?: number
  }

  /**
   * MCQ without action
   */
  export type MCQDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MCQ
     */
    select?: MCQSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MCQ
     */
    omit?: MCQOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MCQInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    avatarUrl: 'avatarUrl',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UploadedDocsScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    fileSize: 'fileSize',
    fileType: 'fileType',
    uploadedById: 'uploadedById',
    topic: 'topic',
    createdAt: 'createdAt'
  };

  export type UploadedDocsScalarFieldEnum = (typeof UploadedDocsScalarFieldEnum)[keyof typeof UploadedDocsScalarFieldEnum]


  export const AiChatHistoryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    resourceId: 'resourceId',
    userQuery: 'userQuery',
    response: 'response',
    sources: 'sources',
    timestamp: 'timestamp'
  };

  export type AiChatHistoryScalarFieldEnum = (typeof AiChatHistoryScalarFieldEnum)[keyof typeof AiChatHistoryScalarFieldEnum]


  export const MCQSetScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt'
  };

  export type MCQSetScalarFieldEnum = (typeof MCQSetScalarFieldEnum)[keyof typeof MCQSetScalarFieldEnum]


  export const MCQScalarFieldEnum: {
    id: 'id',
    question: 'question',
    options: 'options',
    answer: 'answer',
    mcqSetId: 'mcqSetId',
    createdAt: 'createdAt'
  };

  export type MCQScalarFieldEnum = (typeof MCQScalarFieldEnum)[keyof typeof MCQScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    uploadedDocs?: UploadedDocsListRelationFilter
    aiChatHistories?: AiChatHistoryListRelationFilter
    mcqSets?: MCQSetListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    uploadedDocs?: UploadedDocsOrderByRelationAggregateInput
    aiChatHistories?: AiChatHistoryOrderByRelationAggregateInput
    mcqSets?: MCQSetOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    uploadedDocs?: UploadedDocsListRelationFilter
    aiChatHistories?: AiChatHistoryListRelationFilter
    mcqSets?: MCQSetListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UploadedDocsWhereInput = {
    AND?: UploadedDocsWhereInput | UploadedDocsWhereInput[]
    OR?: UploadedDocsWhereInput[]
    NOT?: UploadedDocsWhereInput | UploadedDocsWhereInput[]
    id?: StringFilter<"UploadedDocs"> | string
    fileName?: StringFilter<"UploadedDocs"> | string
    fileUrl?: StringFilter<"UploadedDocs"> | string
    fileSize?: IntFilter<"UploadedDocs"> | number
    fileType?: StringFilter<"UploadedDocs"> | string
    uploadedById?: StringFilter<"UploadedDocs"> | string
    topic?: StringNullableFilter<"UploadedDocs"> | string | null
    createdAt?: DateTimeFilter<"UploadedDocs"> | Date | string
    uploadedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    aiChatHistories?: AiChatHistoryListRelationFilter
  }

  export type UploadedDocsOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadedById?: SortOrder
    topic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    uploadedBy?: UserOrderByWithRelationInput
    aiChatHistories?: AiChatHistoryOrderByRelationAggregateInput
  }

  export type UploadedDocsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadedDocsWhereInput | UploadedDocsWhereInput[]
    OR?: UploadedDocsWhereInput[]
    NOT?: UploadedDocsWhereInput | UploadedDocsWhereInput[]
    fileName?: StringFilter<"UploadedDocs"> | string
    fileUrl?: StringFilter<"UploadedDocs"> | string
    fileSize?: IntFilter<"UploadedDocs"> | number
    fileType?: StringFilter<"UploadedDocs"> | string
    uploadedById?: StringFilter<"UploadedDocs"> | string
    topic?: StringNullableFilter<"UploadedDocs"> | string | null
    createdAt?: DateTimeFilter<"UploadedDocs"> | Date | string
    uploadedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    aiChatHistories?: AiChatHistoryListRelationFilter
  }, "id">

  export type UploadedDocsOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadedById?: SortOrder
    topic?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UploadedDocsCountOrderByAggregateInput
    _avg?: UploadedDocsAvgOrderByAggregateInput
    _max?: UploadedDocsMaxOrderByAggregateInput
    _min?: UploadedDocsMinOrderByAggregateInput
    _sum?: UploadedDocsSumOrderByAggregateInput
  }

  export type UploadedDocsScalarWhereWithAggregatesInput = {
    AND?: UploadedDocsScalarWhereWithAggregatesInput | UploadedDocsScalarWhereWithAggregatesInput[]
    OR?: UploadedDocsScalarWhereWithAggregatesInput[]
    NOT?: UploadedDocsScalarWhereWithAggregatesInput | UploadedDocsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadedDocs"> | string
    fileName?: StringWithAggregatesFilter<"UploadedDocs"> | string
    fileUrl?: StringWithAggregatesFilter<"UploadedDocs"> | string
    fileSize?: IntWithAggregatesFilter<"UploadedDocs"> | number
    fileType?: StringWithAggregatesFilter<"UploadedDocs"> | string
    uploadedById?: StringWithAggregatesFilter<"UploadedDocs"> | string
    topic?: StringNullableWithAggregatesFilter<"UploadedDocs"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UploadedDocs"> | Date | string
  }

  export type AiChatHistoryWhereInput = {
    AND?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    OR?: AiChatHistoryWhereInput[]
    NOT?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    id?: IntFilter<"AiChatHistory"> | number
    userId?: StringFilter<"AiChatHistory"> | string
    resourceId?: StringNullableFilter<"AiChatHistory"> | string | null
    userQuery?: StringFilter<"AiChatHistory"> | string
    response?: StringFilter<"AiChatHistory"> | string
    sources?: StringNullableListFilter<"AiChatHistory">
    timestamp?: DateTimeFilter<"AiChatHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    resource?: XOR<UploadedDocsNullableScalarRelationFilter, UploadedDocsWhereInput> | null
  }

  export type AiChatHistoryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    userQuery?: SortOrder
    response?: SortOrder
    sources?: SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
    resource?: UploadedDocsOrderByWithRelationInput
  }

  export type AiChatHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    OR?: AiChatHistoryWhereInput[]
    NOT?: AiChatHistoryWhereInput | AiChatHistoryWhereInput[]
    userId?: StringFilter<"AiChatHistory"> | string
    resourceId?: StringNullableFilter<"AiChatHistory"> | string | null
    userQuery?: StringFilter<"AiChatHistory"> | string
    response?: StringFilter<"AiChatHistory"> | string
    sources?: StringNullableListFilter<"AiChatHistory">
    timestamp?: DateTimeFilter<"AiChatHistory"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    resource?: XOR<UploadedDocsNullableScalarRelationFilter, UploadedDocsWhereInput> | null
  }, "id">

  export type AiChatHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    userQuery?: SortOrder
    response?: SortOrder
    sources?: SortOrder
    timestamp?: SortOrder
    _count?: AiChatHistoryCountOrderByAggregateInput
    _avg?: AiChatHistoryAvgOrderByAggregateInput
    _max?: AiChatHistoryMaxOrderByAggregateInput
    _min?: AiChatHistoryMinOrderByAggregateInput
    _sum?: AiChatHistorySumOrderByAggregateInput
  }

  export type AiChatHistoryScalarWhereWithAggregatesInput = {
    AND?: AiChatHistoryScalarWhereWithAggregatesInput | AiChatHistoryScalarWhereWithAggregatesInput[]
    OR?: AiChatHistoryScalarWhereWithAggregatesInput[]
    NOT?: AiChatHistoryScalarWhereWithAggregatesInput | AiChatHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AiChatHistory"> | number
    userId?: StringWithAggregatesFilter<"AiChatHistory"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AiChatHistory"> | string | null
    userQuery?: StringWithAggregatesFilter<"AiChatHistory"> | string
    response?: StringWithAggregatesFilter<"AiChatHistory"> | string
    sources?: StringNullableListFilter<"AiChatHistory">
    timestamp?: DateTimeWithAggregatesFilter<"AiChatHistory"> | Date | string
  }

  export type MCQSetWhereInput = {
    AND?: MCQSetWhereInput | MCQSetWhereInput[]
    OR?: MCQSetWhereInput[]
    NOT?: MCQSetWhereInput | MCQSetWhereInput[]
    id?: StringFilter<"MCQSet"> | string
    userId?: StringFilter<"MCQSet"> | string
    fileUrl?: StringFilter<"MCQSet"> | string
    createdAt?: DateTimeFilter<"MCQSet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mcqs?: MCQListRelationFilter
  }

  export type MCQSetOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    mcqs?: MCQOrderByRelationAggregateInput
  }

  export type MCQSetWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MCQSetWhereInput | MCQSetWhereInput[]
    OR?: MCQSetWhereInput[]
    NOT?: MCQSetWhereInput | MCQSetWhereInput[]
    userId?: StringFilter<"MCQSet"> | string
    fileUrl?: StringFilter<"MCQSet"> | string
    createdAt?: DateTimeFilter<"MCQSet"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mcqs?: MCQListRelationFilter
  }, "id">

  export type MCQSetOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    _count?: MCQSetCountOrderByAggregateInput
    _max?: MCQSetMaxOrderByAggregateInput
    _min?: MCQSetMinOrderByAggregateInput
  }

  export type MCQSetScalarWhereWithAggregatesInput = {
    AND?: MCQSetScalarWhereWithAggregatesInput | MCQSetScalarWhereWithAggregatesInput[]
    OR?: MCQSetScalarWhereWithAggregatesInput[]
    NOT?: MCQSetScalarWhereWithAggregatesInput | MCQSetScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MCQSet"> | string
    userId?: StringWithAggregatesFilter<"MCQSet"> | string
    fileUrl?: StringWithAggregatesFilter<"MCQSet"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MCQSet"> | Date | string
  }

  export type MCQWhereInput = {
    AND?: MCQWhereInput | MCQWhereInput[]
    OR?: MCQWhereInput[]
    NOT?: MCQWhereInput | MCQWhereInput[]
    id?: StringFilter<"MCQ"> | string
    question?: StringFilter<"MCQ"> | string
    options?: StringNullableListFilter<"MCQ">
    answer?: StringFilter<"MCQ"> | string
    mcqSetId?: StringFilter<"MCQ"> | string
    createdAt?: DateTimeFilter<"MCQ"> | Date | string
    mcqSet?: XOR<MCQSetScalarRelationFilter, MCQSetWhereInput>
  }

  export type MCQOrderByWithRelationInput = {
    id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    mcqSetId?: SortOrder
    createdAt?: SortOrder
    mcqSet?: MCQSetOrderByWithRelationInput
  }

  export type MCQWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MCQWhereInput | MCQWhereInput[]
    OR?: MCQWhereInput[]
    NOT?: MCQWhereInput | MCQWhereInput[]
    question?: StringFilter<"MCQ"> | string
    options?: StringNullableListFilter<"MCQ">
    answer?: StringFilter<"MCQ"> | string
    mcqSetId?: StringFilter<"MCQ"> | string
    createdAt?: DateTimeFilter<"MCQ"> | Date | string
    mcqSet?: XOR<MCQSetScalarRelationFilter, MCQSetWhereInput>
  }, "id">

  export type MCQOrderByWithAggregationInput = {
    id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    mcqSetId?: SortOrder
    createdAt?: SortOrder
    _count?: MCQCountOrderByAggregateInput
    _max?: MCQMaxOrderByAggregateInput
    _min?: MCQMinOrderByAggregateInput
  }

  export type MCQScalarWhereWithAggregatesInput = {
    AND?: MCQScalarWhereWithAggregatesInput | MCQScalarWhereWithAggregatesInput[]
    OR?: MCQScalarWhereWithAggregatesInput[]
    NOT?: MCQScalarWhereWithAggregatesInput | MCQScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MCQ"> | string
    question?: StringWithAggregatesFilter<"MCQ"> | string
    options?: StringNullableListFilter<"MCQ">
    answer?: StringWithAggregatesFilter<"MCQ"> | string
    mcqSetId?: StringWithAggregatesFilter<"MCQ"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MCQ"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedDocs?: UploadedDocsCreateNestedManyWithoutUploadedByInput
    aiChatHistories?: AiChatHistoryCreateNestedManyWithoutUserInput
    mcqSets?: MCQSetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedDocs?: UploadedDocsUncheckedCreateNestedManyWithoutUploadedByInput
    aiChatHistories?: AiChatHistoryUncheckedCreateNestedManyWithoutUserInput
    mcqSets?: MCQSetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedDocs?: UploadedDocsUpdateManyWithoutUploadedByNestedInput
    aiChatHistories?: AiChatHistoryUpdateManyWithoutUserNestedInput
    mcqSets?: MCQSetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedDocs?: UploadedDocsUncheckedUpdateManyWithoutUploadedByNestedInput
    aiChatHistories?: AiChatHistoryUncheckedUpdateManyWithoutUserNestedInput
    mcqSets?: MCQSetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedDocsCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    topic?: string | null
    createdAt?: Date | string
    uploadedBy: UserCreateNestedOneWithoutUploadedDocsInput
    aiChatHistories?: AiChatHistoryCreateNestedManyWithoutResourceInput
  }

  export type UploadedDocsUncheckedCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    uploadedById: string
    topic?: string | null
    createdAt?: Date | string
    aiChatHistories?: AiChatHistoryUncheckedCreateNestedManyWithoutResourceInput
  }

  export type UploadedDocsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedDocsNestedInput
    aiChatHistories?: AiChatHistoryUpdateManyWithoutResourceNestedInput
  }

  export type UploadedDocsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatHistories?: AiChatHistoryUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type UploadedDocsCreateManyInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    uploadedById: string
    topic?: string | null
    createdAt?: Date | string
  }

  export type UploadedDocsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedDocsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryCreateInput = {
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAiChatHistoriesInput
    resource?: UploadedDocsCreateNestedOneWithoutAiChatHistoriesInput
  }

  export type AiChatHistoryUncheckedCreateInput = {
    id?: number
    userId: string
    resourceId?: string | null
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
  }

  export type AiChatHistoryUpdateInput = {
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiChatHistoriesNestedInput
    resource?: UploadedDocsUpdateOneWithoutAiChatHistoriesNestedInput
  }

  export type AiChatHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryCreateManyInput = {
    id?: number
    userId: string
    resourceId?: string | null
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
  }

  export type AiChatHistoryUpdateManyMutationInput = {
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQSetCreateInput = {
    id?: string
    fileUrl: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMcqSetsInput
    mcqs?: MCQCreateNestedManyWithoutMcqSetInput
  }

  export type MCQSetUncheckedCreateInput = {
    id?: string
    userId: string
    fileUrl: string
    createdAt?: Date | string
    mcqs?: MCQUncheckedCreateNestedManyWithoutMcqSetInput
  }

  export type MCQSetUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMcqSetsNestedInput
    mcqs?: MCQUpdateManyWithoutMcqSetNestedInput
  }

  export type MCQSetUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mcqs?: MCQUncheckedUpdateManyWithoutMcqSetNestedInput
  }

  export type MCQSetCreateManyInput = {
    id?: string
    userId: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MCQSetUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQSetUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQCreateInput = {
    id?: string
    question: string
    options?: MCQCreateoptionsInput | string[]
    answer: string
    createdAt?: Date | string
    mcqSet: MCQSetCreateNestedOneWithoutMcqsInput
  }

  export type MCQUncheckedCreateInput = {
    id?: string
    question: string
    options?: MCQCreateoptionsInput | string[]
    answer: string
    mcqSetId: string
    createdAt?: Date | string
  }

  export type MCQUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mcqSet?: MCQSetUpdateOneRequiredWithoutMcqsNestedInput
  }

  export type MCQUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    mcqSetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQCreateManyInput = {
    id?: string
    question: string
    options?: MCQCreateoptionsInput | string[]
    answer: string
    mcqSetId: string
    createdAt?: Date | string
  }

  export type MCQUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    mcqSetId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UploadedDocsListRelationFilter = {
    every?: UploadedDocsWhereInput
    some?: UploadedDocsWhereInput
    none?: UploadedDocsWhereInput
  }

  export type AiChatHistoryListRelationFilter = {
    every?: AiChatHistoryWhereInput
    some?: AiChatHistoryWhereInput
    none?: AiChatHistoryWhereInput
  }

  export type MCQSetListRelationFilter = {
    every?: MCQSetWhereInput
    some?: MCQSetWhereInput
    none?: MCQSetWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UploadedDocsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiChatHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MCQSetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UploadedDocsCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadedById?: SortOrder
    topic?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedDocsAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type UploadedDocsMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadedById?: SortOrder
    topic?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedDocsMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    fileType?: SortOrder
    uploadedById?: SortOrder
    topic?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedDocsSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UploadedDocsNullableScalarRelationFilter = {
    is?: UploadedDocsWhereInput | null
    isNot?: UploadedDocsWhereInput | null
  }

  export type AiChatHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    userQuery?: SortOrder
    response?: SortOrder
    sources?: SortOrder
    timestamp?: SortOrder
  }

  export type AiChatHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AiChatHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    userQuery?: SortOrder
    response?: SortOrder
    timestamp?: SortOrder
  }

  export type AiChatHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    resourceId?: SortOrder
    userQuery?: SortOrder
    response?: SortOrder
    timestamp?: SortOrder
  }

  export type AiChatHistorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MCQListRelationFilter = {
    every?: MCQWhereInput
    some?: MCQWhereInput
    none?: MCQWhereInput
  }

  export type MCQOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MCQSetCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MCQSetMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MCQSetMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type MCQSetScalarRelationFilter = {
    is?: MCQSetWhereInput
    isNot?: MCQSetWhereInput
  }

  export type MCQCountOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    mcqSetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MCQMaxOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    mcqSetId?: SortOrder
    createdAt?: SortOrder
  }

  export type MCQMinOrderByAggregateInput = {
    id?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    mcqSetId?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadedDocsCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<UploadedDocsCreateWithoutUploadedByInput, UploadedDocsUncheckedCreateWithoutUploadedByInput> | UploadedDocsCreateWithoutUploadedByInput[] | UploadedDocsUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedDocsCreateOrConnectWithoutUploadedByInput | UploadedDocsCreateOrConnectWithoutUploadedByInput[]
    createMany?: UploadedDocsCreateManyUploadedByInputEnvelope
    connect?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
  }

  export type AiChatHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<AiChatHistoryCreateWithoutUserInput, AiChatHistoryUncheckedCreateWithoutUserInput> | AiChatHistoryCreateWithoutUserInput[] | AiChatHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutUserInput | AiChatHistoryCreateOrConnectWithoutUserInput[]
    createMany?: AiChatHistoryCreateManyUserInputEnvelope
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
  }

  export type MCQSetCreateNestedManyWithoutUserInput = {
    create?: XOR<MCQSetCreateWithoutUserInput, MCQSetUncheckedCreateWithoutUserInput> | MCQSetCreateWithoutUserInput[] | MCQSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCQSetCreateOrConnectWithoutUserInput | MCQSetCreateOrConnectWithoutUserInput[]
    createMany?: MCQSetCreateManyUserInputEnvelope
    connect?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
  }

  export type UploadedDocsUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<UploadedDocsCreateWithoutUploadedByInput, UploadedDocsUncheckedCreateWithoutUploadedByInput> | UploadedDocsCreateWithoutUploadedByInput[] | UploadedDocsUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedDocsCreateOrConnectWithoutUploadedByInput | UploadedDocsCreateOrConnectWithoutUploadedByInput[]
    createMany?: UploadedDocsCreateManyUploadedByInputEnvelope
    connect?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
  }

  export type AiChatHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AiChatHistoryCreateWithoutUserInput, AiChatHistoryUncheckedCreateWithoutUserInput> | AiChatHistoryCreateWithoutUserInput[] | AiChatHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutUserInput | AiChatHistoryCreateOrConnectWithoutUserInput[]
    createMany?: AiChatHistoryCreateManyUserInputEnvelope
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
  }

  export type MCQSetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MCQSetCreateWithoutUserInput, MCQSetUncheckedCreateWithoutUserInput> | MCQSetCreateWithoutUserInput[] | MCQSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCQSetCreateOrConnectWithoutUserInput | MCQSetCreateOrConnectWithoutUserInput[]
    createMany?: MCQSetCreateManyUserInputEnvelope
    connect?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UploadedDocsUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<UploadedDocsCreateWithoutUploadedByInput, UploadedDocsUncheckedCreateWithoutUploadedByInput> | UploadedDocsCreateWithoutUploadedByInput[] | UploadedDocsUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedDocsCreateOrConnectWithoutUploadedByInput | UploadedDocsCreateOrConnectWithoutUploadedByInput[]
    upsert?: UploadedDocsUpsertWithWhereUniqueWithoutUploadedByInput | UploadedDocsUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: UploadedDocsCreateManyUploadedByInputEnvelope
    set?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    disconnect?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    delete?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    connect?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    update?: UploadedDocsUpdateWithWhereUniqueWithoutUploadedByInput | UploadedDocsUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: UploadedDocsUpdateManyWithWhereWithoutUploadedByInput | UploadedDocsUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: UploadedDocsScalarWhereInput | UploadedDocsScalarWhereInput[]
  }

  export type AiChatHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiChatHistoryCreateWithoutUserInput, AiChatHistoryUncheckedCreateWithoutUserInput> | AiChatHistoryCreateWithoutUserInput[] | AiChatHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutUserInput | AiChatHistoryCreateOrConnectWithoutUserInput[]
    upsert?: AiChatHistoryUpsertWithWhereUniqueWithoutUserInput | AiChatHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiChatHistoryCreateManyUserInputEnvelope
    set?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    disconnect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    delete?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    update?: AiChatHistoryUpdateWithWhereUniqueWithoutUserInput | AiChatHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiChatHistoryUpdateManyWithWhereWithoutUserInput | AiChatHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiChatHistoryScalarWhereInput | AiChatHistoryScalarWhereInput[]
  }

  export type MCQSetUpdateManyWithoutUserNestedInput = {
    create?: XOR<MCQSetCreateWithoutUserInput, MCQSetUncheckedCreateWithoutUserInput> | MCQSetCreateWithoutUserInput[] | MCQSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCQSetCreateOrConnectWithoutUserInput | MCQSetCreateOrConnectWithoutUserInput[]
    upsert?: MCQSetUpsertWithWhereUniqueWithoutUserInput | MCQSetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MCQSetCreateManyUserInputEnvelope
    set?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    disconnect?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    delete?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    connect?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    update?: MCQSetUpdateWithWhereUniqueWithoutUserInput | MCQSetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MCQSetUpdateManyWithWhereWithoutUserInput | MCQSetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MCQSetScalarWhereInput | MCQSetScalarWhereInput[]
  }

  export type UploadedDocsUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<UploadedDocsCreateWithoutUploadedByInput, UploadedDocsUncheckedCreateWithoutUploadedByInput> | UploadedDocsCreateWithoutUploadedByInput[] | UploadedDocsUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedDocsCreateOrConnectWithoutUploadedByInput | UploadedDocsCreateOrConnectWithoutUploadedByInput[]
    upsert?: UploadedDocsUpsertWithWhereUniqueWithoutUploadedByInput | UploadedDocsUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: UploadedDocsCreateManyUploadedByInputEnvelope
    set?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    disconnect?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    delete?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    connect?: UploadedDocsWhereUniqueInput | UploadedDocsWhereUniqueInput[]
    update?: UploadedDocsUpdateWithWhereUniqueWithoutUploadedByInput | UploadedDocsUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: UploadedDocsUpdateManyWithWhereWithoutUploadedByInput | UploadedDocsUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: UploadedDocsScalarWhereInput | UploadedDocsScalarWhereInput[]
  }

  export type AiChatHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiChatHistoryCreateWithoutUserInput, AiChatHistoryUncheckedCreateWithoutUserInput> | AiChatHistoryCreateWithoutUserInput[] | AiChatHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutUserInput | AiChatHistoryCreateOrConnectWithoutUserInput[]
    upsert?: AiChatHistoryUpsertWithWhereUniqueWithoutUserInput | AiChatHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiChatHistoryCreateManyUserInputEnvelope
    set?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    disconnect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    delete?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    update?: AiChatHistoryUpdateWithWhereUniqueWithoutUserInput | AiChatHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiChatHistoryUpdateManyWithWhereWithoutUserInput | AiChatHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiChatHistoryScalarWhereInput | AiChatHistoryScalarWhereInput[]
  }

  export type MCQSetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MCQSetCreateWithoutUserInput, MCQSetUncheckedCreateWithoutUserInput> | MCQSetCreateWithoutUserInput[] | MCQSetUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MCQSetCreateOrConnectWithoutUserInput | MCQSetCreateOrConnectWithoutUserInput[]
    upsert?: MCQSetUpsertWithWhereUniqueWithoutUserInput | MCQSetUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MCQSetCreateManyUserInputEnvelope
    set?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    disconnect?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    delete?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    connect?: MCQSetWhereUniqueInput | MCQSetWhereUniqueInput[]
    update?: MCQSetUpdateWithWhereUniqueWithoutUserInput | MCQSetUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MCQSetUpdateManyWithWhereWithoutUserInput | MCQSetUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MCQSetScalarWhereInput | MCQSetScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUploadedDocsInput = {
    create?: XOR<UserCreateWithoutUploadedDocsInput, UserUncheckedCreateWithoutUploadedDocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedDocsInput
    connect?: UserWhereUniqueInput
  }

  export type AiChatHistoryCreateNestedManyWithoutResourceInput = {
    create?: XOR<AiChatHistoryCreateWithoutResourceInput, AiChatHistoryUncheckedCreateWithoutResourceInput> | AiChatHistoryCreateWithoutResourceInput[] | AiChatHistoryUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutResourceInput | AiChatHistoryCreateOrConnectWithoutResourceInput[]
    createMany?: AiChatHistoryCreateManyResourceInputEnvelope
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
  }

  export type AiChatHistoryUncheckedCreateNestedManyWithoutResourceInput = {
    create?: XOR<AiChatHistoryCreateWithoutResourceInput, AiChatHistoryUncheckedCreateWithoutResourceInput> | AiChatHistoryCreateWithoutResourceInput[] | AiChatHistoryUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutResourceInput | AiChatHistoryCreateOrConnectWithoutResourceInput[]
    createMany?: AiChatHistoryCreateManyResourceInputEnvelope
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutUploadedDocsNestedInput = {
    create?: XOR<UserCreateWithoutUploadedDocsInput, UserUncheckedCreateWithoutUploadedDocsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadedDocsInput
    upsert?: UserUpsertWithoutUploadedDocsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadedDocsInput, UserUpdateWithoutUploadedDocsInput>, UserUncheckedUpdateWithoutUploadedDocsInput>
  }

  export type AiChatHistoryUpdateManyWithoutResourceNestedInput = {
    create?: XOR<AiChatHistoryCreateWithoutResourceInput, AiChatHistoryUncheckedCreateWithoutResourceInput> | AiChatHistoryCreateWithoutResourceInput[] | AiChatHistoryUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutResourceInput | AiChatHistoryCreateOrConnectWithoutResourceInput[]
    upsert?: AiChatHistoryUpsertWithWhereUniqueWithoutResourceInput | AiChatHistoryUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: AiChatHistoryCreateManyResourceInputEnvelope
    set?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    disconnect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    delete?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    update?: AiChatHistoryUpdateWithWhereUniqueWithoutResourceInput | AiChatHistoryUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: AiChatHistoryUpdateManyWithWhereWithoutResourceInput | AiChatHistoryUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: AiChatHistoryScalarWhereInput | AiChatHistoryScalarWhereInput[]
  }

  export type AiChatHistoryUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: XOR<AiChatHistoryCreateWithoutResourceInput, AiChatHistoryUncheckedCreateWithoutResourceInput> | AiChatHistoryCreateWithoutResourceInput[] | AiChatHistoryUncheckedCreateWithoutResourceInput[]
    connectOrCreate?: AiChatHistoryCreateOrConnectWithoutResourceInput | AiChatHistoryCreateOrConnectWithoutResourceInput[]
    upsert?: AiChatHistoryUpsertWithWhereUniqueWithoutResourceInput | AiChatHistoryUpsertWithWhereUniqueWithoutResourceInput[]
    createMany?: AiChatHistoryCreateManyResourceInputEnvelope
    set?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    disconnect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    delete?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    connect?: AiChatHistoryWhereUniqueInput | AiChatHistoryWhereUniqueInput[]
    update?: AiChatHistoryUpdateWithWhereUniqueWithoutResourceInput | AiChatHistoryUpdateWithWhereUniqueWithoutResourceInput[]
    updateMany?: AiChatHistoryUpdateManyWithWhereWithoutResourceInput | AiChatHistoryUpdateManyWithWhereWithoutResourceInput[]
    deleteMany?: AiChatHistoryScalarWhereInput | AiChatHistoryScalarWhereInput[]
  }

  export type AiChatHistoryCreatesourcesInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAiChatHistoriesInput = {
    create?: XOR<UserCreateWithoutAiChatHistoriesInput, UserUncheckedCreateWithoutAiChatHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiChatHistoriesInput
    connect?: UserWhereUniqueInput
  }

  export type UploadedDocsCreateNestedOneWithoutAiChatHistoriesInput = {
    create?: XOR<UploadedDocsCreateWithoutAiChatHistoriesInput, UploadedDocsUncheckedCreateWithoutAiChatHistoriesInput>
    connectOrCreate?: UploadedDocsCreateOrConnectWithoutAiChatHistoriesInput
    connect?: UploadedDocsWhereUniqueInput
  }

  export type AiChatHistoryUpdatesourcesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutAiChatHistoriesNestedInput = {
    create?: XOR<UserCreateWithoutAiChatHistoriesInput, UserUncheckedCreateWithoutAiChatHistoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiChatHistoriesInput
    upsert?: UserUpsertWithoutAiChatHistoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiChatHistoriesInput, UserUpdateWithoutAiChatHistoriesInput>, UserUncheckedUpdateWithoutAiChatHistoriesInput>
  }

  export type UploadedDocsUpdateOneWithoutAiChatHistoriesNestedInput = {
    create?: XOR<UploadedDocsCreateWithoutAiChatHistoriesInput, UploadedDocsUncheckedCreateWithoutAiChatHistoriesInput>
    connectOrCreate?: UploadedDocsCreateOrConnectWithoutAiChatHistoriesInput
    upsert?: UploadedDocsUpsertWithoutAiChatHistoriesInput
    disconnect?: UploadedDocsWhereInput | boolean
    delete?: UploadedDocsWhereInput | boolean
    connect?: UploadedDocsWhereUniqueInput
    update?: XOR<XOR<UploadedDocsUpdateToOneWithWhereWithoutAiChatHistoriesInput, UploadedDocsUpdateWithoutAiChatHistoriesInput>, UploadedDocsUncheckedUpdateWithoutAiChatHistoriesInput>
  }

  export type UserCreateNestedOneWithoutMcqSetsInput = {
    create?: XOR<UserCreateWithoutMcqSetsInput, UserUncheckedCreateWithoutMcqSetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMcqSetsInput
    connect?: UserWhereUniqueInput
  }

  export type MCQCreateNestedManyWithoutMcqSetInput = {
    create?: XOR<MCQCreateWithoutMcqSetInput, MCQUncheckedCreateWithoutMcqSetInput> | MCQCreateWithoutMcqSetInput[] | MCQUncheckedCreateWithoutMcqSetInput[]
    connectOrCreate?: MCQCreateOrConnectWithoutMcqSetInput | MCQCreateOrConnectWithoutMcqSetInput[]
    createMany?: MCQCreateManyMcqSetInputEnvelope
    connect?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
  }

  export type MCQUncheckedCreateNestedManyWithoutMcqSetInput = {
    create?: XOR<MCQCreateWithoutMcqSetInput, MCQUncheckedCreateWithoutMcqSetInput> | MCQCreateWithoutMcqSetInput[] | MCQUncheckedCreateWithoutMcqSetInput[]
    connectOrCreate?: MCQCreateOrConnectWithoutMcqSetInput | MCQCreateOrConnectWithoutMcqSetInput[]
    createMany?: MCQCreateManyMcqSetInputEnvelope
    connect?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMcqSetsNestedInput = {
    create?: XOR<UserCreateWithoutMcqSetsInput, UserUncheckedCreateWithoutMcqSetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMcqSetsInput
    upsert?: UserUpsertWithoutMcqSetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMcqSetsInput, UserUpdateWithoutMcqSetsInput>, UserUncheckedUpdateWithoutMcqSetsInput>
  }

  export type MCQUpdateManyWithoutMcqSetNestedInput = {
    create?: XOR<MCQCreateWithoutMcqSetInput, MCQUncheckedCreateWithoutMcqSetInput> | MCQCreateWithoutMcqSetInput[] | MCQUncheckedCreateWithoutMcqSetInput[]
    connectOrCreate?: MCQCreateOrConnectWithoutMcqSetInput | MCQCreateOrConnectWithoutMcqSetInput[]
    upsert?: MCQUpsertWithWhereUniqueWithoutMcqSetInput | MCQUpsertWithWhereUniqueWithoutMcqSetInput[]
    createMany?: MCQCreateManyMcqSetInputEnvelope
    set?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    disconnect?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    delete?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    connect?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    update?: MCQUpdateWithWhereUniqueWithoutMcqSetInput | MCQUpdateWithWhereUniqueWithoutMcqSetInput[]
    updateMany?: MCQUpdateManyWithWhereWithoutMcqSetInput | MCQUpdateManyWithWhereWithoutMcqSetInput[]
    deleteMany?: MCQScalarWhereInput | MCQScalarWhereInput[]
  }

  export type MCQUncheckedUpdateManyWithoutMcqSetNestedInput = {
    create?: XOR<MCQCreateWithoutMcqSetInput, MCQUncheckedCreateWithoutMcqSetInput> | MCQCreateWithoutMcqSetInput[] | MCQUncheckedCreateWithoutMcqSetInput[]
    connectOrCreate?: MCQCreateOrConnectWithoutMcqSetInput | MCQCreateOrConnectWithoutMcqSetInput[]
    upsert?: MCQUpsertWithWhereUniqueWithoutMcqSetInput | MCQUpsertWithWhereUniqueWithoutMcqSetInput[]
    createMany?: MCQCreateManyMcqSetInputEnvelope
    set?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    disconnect?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    delete?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    connect?: MCQWhereUniqueInput | MCQWhereUniqueInput[]
    update?: MCQUpdateWithWhereUniqueWithoutMcqSetInput | MCQUpdateWithWhereUniqueWithoutMcqSetInput[]
    updateMany?: MCQUpdateManyWithWhereWithoutMcqSetInput | MCQUpdateManyWithWhereWithoutMcqSetInput[]
    deleteMany?: MCQScalarWhereInput | MCQScalarWhereInput[]
  }

  export type MCQCreateoptionsInput = {
    set: string[]
  }

  export type MCQSetCreateNestedOneWithoutMcqsInput = {
    create?: XOR<MCQSetCreateWithoutMcqsInput, MCQSetUncheckedCreateWithoutMcqsInput>
    connectOrCreate?: MCQSetCreateOrConnectWithoutMcqsInput
    connect?: MCQSetWhereUniqueInput
  }

  export type MCQUpdateoptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MCQSetUpdateOneRequiredWithoutMcqsNestedInput = {
    create?: XOR<MCQSetCreateWithoutMcqsInput, MCQSetUncheckedCreateWithoutMcqsInput>
    connectOrCreate?: MCQSetCreateOrConnectWithoutMcqsInput
    upsert?: MCQSetUpsertWithoutMcqsInput
    connect?: MCQSetWhereUniqueInput
    update?: XOR<XOR<MCQSetUpdateToOneWithWhereWithoutMcqsInput, MCQSetUpdateWithoutMcqsInput>, MCQSetUncheckedUpdateWithoutMcqsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UploadedDocsCreateWithoutUploadedByInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    topic?: string | null
    createdAt?: Date | string
    aiChatHistories?: AiChatHistoryCreateNestedManyWithoutResourceInput
  }

  export type UploadedDocsUncheckedCreateWithoutUploadedByInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    topic?: string | null
    createdAt?: Date | string
    aiChatHistories?: AiChatHistoryUncheckedCreateNestedManyWithoutResourceInput
  }

  export type UploadedDocsCreateOrConnectWithoutUploadedByInput = {
    where: UploadedDocsWhereUniqueInput
    create: XOR<UploadedDocsCreateWithoutUploadedByInput, UploadedDocsUncheckedCreateWithoutUploadedByInput>
  }

  export type UploadedDocsCreateManyUploadedByInputEnvelope = {
    data: UploadedDocsCreateManyUploadedByInput | UploadedDocsCreateManyUploadedByInput[]
    skipDuplicates?: boolean
  }

  export type AiChatHistoryCreateWithoutUserInput = {
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
    resource?: UploadedDocsCreateNestedOneWithoutAiChatHistoriesInput
  }

  export type AiChatHistoryUncheckedCreateWithoutUserInput = {
    id?: number
    resourceId?: string | null
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
  }

  export type AiChatHistoryCreateOrConnectWithoutUserInput = {
    where: AiChatHistoryWhereUniqueInput
    create: XOR<AiChatHistoryCreateWithoutUserInput, AiChatHistoryUncheckedCreateWithoutUserInput>
  }

  export type AiChatHistoryCreateManyUserInputEnvelope = {
    data: AiChatHistoryCreateManyUserInput | AiChatHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MCQSetCreateWithoutUserInput = {
    id?: string
    fileUrl: string
    createdAt?: Date | string
    mcqs?: MCQCreateNestedManyWithoutMcqSetInput
  }

  export type MCQSetUncheckedCreateWithoutUserInput = {
    id?: string
    fileUrl: string
    createdAt?: Date | string
    mcqs?: MCQUncheckedCreateNestedManyWithoutMcqSetInput
  }

  export type MCQSetCreateOrConnectWithoutUserInput = {
    where: MCQSetWhereUniqueInput
    create: XOR<MCQSetCreateWithoutUserInput, MCQSetUncheckedCreateWithoutUserInput>
  }

  export type MCQSetCreateManyUserInputEnvelope = {
    data: MCQSetCreateManyUserInput | MCQSetCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UploadedDocsUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: UploadedDocsWhereUniqueInput
    update: XOR<UploadedDocsUpdateWithoutUploadedByInput, UploadedDocsUncheckedUpdateWithoutUploadedByInput>
    create: XOR<UploadedDocsCreateWithoutUploadedByInput, UploadedDocsUncheckedCreateWithoutUploadedByInput>
  }

  export type UploadedDocsUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: UploadedDocsWhereUniqueInput
    data: XOR<UploadedDocsUpdateWithoutUploadedByInput, UploadedDocsUncheckedUpdateWithoutUploadedByInput>
  }

  export type UploadedDocsUpdateManyWithWhereWithoutUploadedByInput = {
    where: UploadedDocsScalarWhereInput
    data: XOR<UploadedDocsUpdateManyMutationInput, UploadedDocsUncheckedUpdateManyWithoutUploadedByInput>
  }

  export type UploadedDocsScalarWhereInput = {
    AND?: UploadedDocsScalarWhereInput | UploadedDocsScalarWhereInput[]
    OR?: UploadedDocsScalarWhereInput[]
    NOT?: UploadedDocsScalarWhereInput | UploadedDocsScalarWhereInput[]
    id?: StringFilter<"UploadedDocs"> | string
    fileName?: StringFilter<"UploadedDocs"> | string
    fileUrl?: StringFilter<"UploadedDocs"> | string
    fileSize?: IntFilter<"UploadedDocs"> | number
    fileType?: StringFilter<"UploadedDocs"> | string
    uploadedById?: StringFilter<"UploadedDocs"> | string
    topic?: StringNullableFilter<"UploadedDocs"> | string | null
    createdAt?: DateTimeFilter<"UploadedDocs"> | Date | string
  }

  export type AiChatHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: AiChatHistoryWhereUniqueInput
    update: XOR<AiChatHistoryUpdateWithoutUserInput, AiChatHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<AiChatHistoryCreateWithoutUserInput, AiChatHistoryUncheckedCreateWithoutUserInput>
  }

  export type AiChatHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: AiChatHistoryWhereUniqueInput
    data: XOR<AiChatHistoryUpdateWithoutUserInput, AiChatHistoryUncheckedUpdateWithoutUserInput>
  }

  export type AiChatHistoryUpdateManyWithWhereWithoutUserInput = {
    where: AiChatHistoryScalarWhereInput
    data: XOR<AiChatHistoryUpdateManyMutationInput, AiChatHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type AiChatHistoryScalarWhereInput = {
    AND?: AiChatHistoryScalarWhereInput | AiChatHistoryScalarWhereInput[]
    OR?: AiChatHistoryScalarWhereInput[]
    NOT?: AiChatHistoryScalarWhereInput | AiChatHistoryScalarWhereInput[]
    id?: IntFilter<"AiChatHistory"> | number
    userId?: StringFilter<"AiChatHistory"> | string
    resourceId?: StringNullableFilter<"AiChatHistory"> | string | null
    userQuery?: StringFilter<"AiChatHistory"> | string
    response?: StringFilter<"AiChatHistory"> | string
    sources?: StringNullableListFilter<"AiChatHistory">
    timestamp?: DateTimeFilter<"AiChatHistory"> | Date | string
  }

  export type MCQSetUpsertWithWhereUniqueWithoutUserInput = {
    where: MCQSetWhereUniqueInput
    update: XOR<MCQSetUpdateWithoutUserInput, MCQSetUncheckedUpdateWithoutUserInput>
    create: XOR<MCQSetCreateWithoutUserInput, MCQSetUncheckedCreateWithoutUserInput>
  }

  export type MCQSetUpdateWithWhereUniqueWithoutUserInput = {
    where: MCQSetWhereUniqueInput
    data: XOR<MCQSetUpdateWithoutUserInput, MCQSetUncheckedUpdateWithoutUserInput>
  }

  export type MCQSetUpdateManyWithWhereWithoutUserInput = {
    where: MCQSetScalarWhereInput
    data: XOR<MCQSetUpdateManyMutationInput, MCQSetUncheckedUpdateManyWithoutUserInput>
  }

  export type MCQSetScalarWhereInput = {
    AND?: MCQSetScalarWhereInput | MCQSetScalarWhereInput[]
    OR?: MCQSetScalarWhereInput[]
    NOT?: MCQSetScalarWhereInput | MCQSetScalarWhereInput[]
    id?: StringFilter<"MCQSet"> | string
    userId?: StringFilter<"MCQSet"> | string
    fileUrl?: StringFilter<"MCQSet"> | string
    createdAt?: DateTimeFilter<"MCQSet"> | Date | string
  }

  export type UserCreateWithoutUploadedDocsInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    aiChatHistories?: AiChatHistoryCreateNestedManyWithoutUserInput
    mcqSets?: MCQSetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUploadedDocsInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    aiChatHistories?: AiChatHistoryUncheckedCreateNestedManyWithoutUserInput
    mcqSets?: MCQSetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUploadedDocsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadedDocsInput, UserUncheckedCreateWithoutUploadedDocsInput>
  }

  export type AiChatHistoryCreateWithoutResourceInput = {
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAiChatHistoriesInput
  }

  export type AiChatHistoryUncheckedCreateWithoutResourceInput = {
    id?: number
    userId: string
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
  }

  export type AiChatHistoryCreateOrConnectWithoutResourceInput = {
    where: AiChatHistoryWhereUniqueInput
    create: XOR<AiChatHistoryCreateWithoutResourceInput, AiChatHistoryUncheckedCreateWithoutResourceInput>
  }

  export type AiChatHistoryCreateManyResourceInputEnvelope = {
    data: AiChatHistoryCreateManyResourceInput | AiChatHistoryCreateManyResourceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutUploadedDocsInput = {
    update: XOR<UserUpdateWithoutUploadedDocsInput, UserUncheckedUpdateWithoutUploadedDocsInput>
    create: XOR<UserCreateWithoutUploadedDocsInput, UserUncheckedCreateWithoutUploadedDocsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadedDocsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadedDocsInput, UserUncheckedUpdateWithoutUploadedDocsInput>
  }

  export type UserUpdateWithoutUploadedDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatHistories?: AiChatHistoryUpdateManyWithoutUserNestedInput
    mcqSets?: MCQSetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadedDocsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatHistories?: AiChatHistoryUncheckedUpdateManyWithoutUserNestedInput
    mcqSets?: MCQSetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AiChatHistoryUpsertWithWhereUniqueWithoutResourceInput = {
    where: AiChatHistoryWhereUniqueInput
    update: XOR<AiChatHistoryUpdateWithoutResourceInput, AiChatHistoryUncheckedUpdateWithoutResourceInput>
    create: XOR<AiChatHistoryCreateWithoutResourceInput, AiChatHistoryUncheckedCreateWithoutResourceInput>
  }

  export type AiChatHistoryUpdateWithWhereUniqueWithoutResourceInput = {
    where: AiChatHistoryWhereUniqueInput
    data: XOR<AiChatHistoryUpdateWithoutResourceInput, AiChatHistoryUncheckedUpdateWithoutResourceInput>
  }

  export type AiChatHistoryUpdateManyWithWhereWithoutResourceInput = {
    where: AiChatHistoryScalarWhereInput
    data: XOR<AiChatHistoryUpdateManyMutationInput, AiChatHistoryUncheckedUpdateManyWithoutResourceInput>
  }

  export type UserCreateWithoutAiChatHistoriesInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedDocs?: UploadedDocsCreateNestedManyWithoutUploadedByInput
    mcqSets?: MCQSetCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiChatHistoriesInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedDocs?: UploadedDocsUncheckedCreateNestedManyWithoutUploadedByInput
    mcqSets?: MCQSetUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiChatHistoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiChatHistoriesInput, UserUncheckedCreateWithoutAiChatHistoriesInput>
  }

  export type UploadedDocsCreateWithoutAiChatHistoriesInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    topic?: string | null
    createdAt?: Date | string
    uploadedBy: UserCreateNestedOneWithoutUploadedDocsInput
  }

  export type UploadedDocsUncheckedCreateWithoutAiChatHistoriesInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    uploadedById: string
    topic?: string | null
    createdAt?: Date | string
  }

  export type UploadedDocsCreateOrConnectWithoutAiChatHistoriesInput = {
    where: UploadedDocsWhereUniqueInput
    create: XOR<UploadedDocsCreateWithoutAiChatHistoriesInput, UploadedDocsUncheckedCreateWithoutAiChatHistoriesInput>
  }

  export type UserUpsertWithoutAiChatHistoriesInput = {
    update: XOR<UserUpdateWithoutAiChatHistoriesInput, UserUncheckedUpdateWithoutAiChatHistoriesInput>
    create: XOR<UserCreateWithoutAiChatHistoriesInput, UserUncheckedCreateWithoutAiChatHistoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiChatHistoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiChatHistoriesInput, UserUncheckedUpdateWithoutAiChatHistoriesInput>
  }

  export type UserUpdateWithoutAiChatHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedDocs?: UploadedDocsUpdateManyWithoutUploadedByNestedInput
    mcqSets?: MCQSetUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiChatHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedDocs?: UploadedDocsUncheckedUpdateManyWithoutUploadedByNestedInput
    mcqSets?: MCQSetUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UploadedDocsUpsertWithoutAiChatHistoriesInput = {
    update: XOR<UploadedDocsUpdateWithoutAiChatHistoriesInput, UploadedDocsUncheckedUpdateWithoutAiChatHistoriesInput>
    create: XOR<UploadedDocsCreateWithoutAiChatHistoriesInput, UploadedDocsUncheckedCreateWithoutAiChatHistoriesInput>
    where?: UploadedDocsWhereInput
  }

  export type UploadedDocsUpdateToOneWithWhereWithoutAiChatHistoriesInput = {
    where?: UploadedDocsWhereInput
    data: XOR<UploadedDocsUpdateWithoutAiChatHistoriesInput, UploadedDocsUncheckedUpdateWithoutAiChatHistoriesInput>
  }

  export type UploadedDocsUpdateWithoutAiChatHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedBy?: UserUpdateOneRequiredWithoutUploadedDocsNestedInput
  }

  export type UploadedDocsUncheckedUpdateWithoutAiChatHistoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    uploadedById?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutMcqSetsInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedDocs?: UploadedDocsCreateNestedManyWithoutUploadedByInput
    aiChatHistories?: AiChatHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMcqSetsInput = {
    id?: string
    email?: string | null
    name?: string | null
    password?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    updatedAt?: Date | string
    uploadedDocs?: UploadedDocsUncheckedCreateNestedManyWithoutUploadedByInput
    aiChatHistories?: AiChatHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMcqSetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMcqSetsInput, UserUncheckedCreateWithoutMcqSetsInput>
  }

  export type MCQCreateWithoutMcqSetInput = {
    id?: string
    question: string
    options?: MCQCreateoptionsInput | string[]
    answer: string
    createdAt?: Date | string
  }

  export type MCQUncheckedCreateWithoutMcqSetInput = {
    id?: string
    question: string
    options?: MCQCreateoptionsInput | string[]
    answer: string
    createdAt?: Date | string
  }

  export type MCQCreateOrConnectWithoutMcqSetInput = {
    where: MCQWhereUniqueInput
    create: XOR<MCQCreateWithoutMcqSetInput, MCQUncheckedCreateWithoutMcqSetInput>
  }

  export type MCQCreateManyMcqSetInputEnvelope = {
    data: MCQCreateManyMcqSetInput | MCQCreateManyMcqSetInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMcqSetsInput = {
    update: XOR<UserUpdateWithoutMcqSetsInput, UserUncheckedUpdateWithoutMcqSetsInput>
    create: XOR<UserCreateWithoutMcqSetsInput, UserUncheckedCreateWithoutMcqSetsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMcqSetsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMcqSetsInput, UserUncheckedUpdateWithoutMcqSetsInput>
  }

  export type UserUpdateWithoutMcqSetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedDocs?: UploadedDocsUpdateManyWithoutUploadedByNestedInput
    aiChatHistories?: AiChatHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMcqSetsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    uploadedDocs?: UploadedDocsUncheckedUpdateManyWithoutUploadedByNestedInput
    aiChatHistories?: AiChatHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MCQUpsertWithWhereUniqueWithoutMcqSetInput = {
    where: MCQWhereUniqueInput
    update: XOR<MCQUpdateWithoutMcqSetInput, MCQUncheckedUpdateWithoutMcqSetInput>
    create: XOR<MCQCreateWithoutMcqSetInput, MCQUncheckedCreateWithoutMcqSetInput>
  }

  export type MCQUpdateWithWhereUniqueWithoutMcqSetInput = {
    where: MCQWhereUniqueInput
    data: XOR<MCQUpdateWithoutMcqSetInput, MCQUncheckedUpdateWithoutMcqSetInput>
  }

  export type MCQUpdateManyWithWhereWithoutMcqSetInput = {
    where: MCQScalarWhereInput
    data: XOR<MCQUpdateManyMutationInput, MCQUncheckedUpdateManyWithoutMcqSetInput>
  }

  export type MCQScalarWhereInput = {
    AND?: MCQScalarWhereInput | MCQScalarWhereInput[]
    OR?: MCQScalarWhereInput[]
    NOT?: MCQScalarWhereInput | MCQScalarWhereInput[]
    id?: StringFilter<"MCQ"> | string
    question?: StringFilter<"MCQ"> | string
    options?: StringNullableListFilter<"MCQ">
    answer?: StringFilter<"MCQ"> | string
    mcqSetId?: StringFilter<"MCQ"> | string
    createdAt?: DateTimeFilter<"MCQ"> | Date | string
  }

  export type MCQSetCreateWithoutMcqsInput = {
    id?: string
    fileUrl: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMcqSetsInput
  }

  export type MCQSetUncheckedCreateWithoutMcqsInput = {
    id?: string
    userId: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type MCQSetCreateOrConnectWithoutMcqsInput = {
    where: MCQSetWhereUniqueInput
    create: XOR<MCQSetCreateWithoutMcqsInput, MCQSetUncheckedCreateWithoutMcqsInput>
  }

  export type MCQSetUpsertWithoutMcqsInput = {
    update: XOR<MCQSetUpdateWithoutMcqsInput, MCQSetUncheckedUpdateWithoutMcqsInput>
    create: XOR<MCQSetCreateWithoutMcqsInput, MCQSetUncheckedCreateWithoutMcqsInput>
    where?: MCQSetWhereInput
  }

  export type MCQSetUpdateToOneWithWhereWithoutMcqsInput = {
    where?: MCQSetWhereInput
    data: XOR<MCQSetUpdateWithoutMcqsInput, MCQSetUncheckedUpdateWithoutMcqsInput>
  }

  export type MCQSetUpdateWithoutMcqsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMcqSetsNestedInput
  }

  export type MCQSetUncheckedUpdateWithoutMcqsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedDocsCreateManyUploadedByInput = {
    id?: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    topic?: string | null
    createdAt?: Date | string
  }

  export type AiChatHistoryCreateManyUserInput = {
    id?: number
    resourceId?: string | null
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
  }

  export type MCQSetCreateManyUserInput = {
    id?: string
    fileUrl: string
    createdAt?: Date | string
  }

  export type UploadedDocsUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatHistories?: AiChatHistoryUpdateManyWithoutResourceNestedInput
  }

  export type UploadedDocsUncheckedUpdateWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiChatHistories?: AiChatHistoryUncheckedUpdateManyWithoutResourceNestedInput
  }

  export type UploadedDocsUncheckedUpdateManyWithoutUploadedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    fileType?: StringFieldUpdateOperationsInput | string
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryUpdateWithoutUserInput = {
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    resource?: UploadedDocsUpdateOneWithoutAiChatHistoriesNestedInput
  }

  export type AiChatHistoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQSetUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mcqs?: MCQUpdateManyWithoutMcqSetNestedInput
  }

  export type MCQSetUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mcqs?: MCQUncheckedUpdateManyWithoutMcqSetNestedInput
  }

  export type MCQSetUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryCreateManyResourceInput = {
    id?: number
    userId: string
    userQuery: string
    response: string
    sources?: AiChatHistoryCreatesourcesInput | string[]
    timestamp?: Date | string
  }

  export type AiChatHistoryUpdateWithoutResourceInput = {
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiChatHistoriesNestedInput
  }

  export type AiChatHistoryUncheckedUpdateWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiChatHistoryUncheckedUpdateManyWithoutResourceInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    userQuery?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    sources?: AiChatHistoryUpdatesourcesInput | string[]
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQCreateManyMcqSetInput = {
    id?: string
    question: string
    options?: MCQCreateoptionsInput | string[]
    answer: string
    createdAt?: Date | string
  }

  export type MCQUpdateWithoutMcqSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQUncheckedUpdateWithoutMcqSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MCQUncheckedUpdateManyWithoutMcqSetInput = {
    id?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    options?: MCQUpdateoptionsInput | string[]
    answer?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}