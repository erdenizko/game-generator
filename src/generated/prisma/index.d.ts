
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
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model GameSession
 * 
 */
export type GameSession = $Result.DefaultSelection<Prisma.$GameSessionPayload>
/**
 * Model AnalyticsEvent
 * 
 */
export type AnalyticsEvent = $Result.DefaultSelection<Prisma.$AnalyticsEventPayload>
/**
 * Model EmbedToken
 * 
 */
export type EmbedToken = $Result.DefaultSelection<Prisma.$EmbedTokenPayload>
/**
 * Model GameAction
 * 
 */
export type GameAction = $Result.DefaultSelection<Prisma.$GameActionPayload>
/**
 * Model GameConfig
 * 
 */
export type GameConfig = $Result.DefaultSelection<Prisma.$GameConfigPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Partners
 * const partners = await prisma.partner.findMany()
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
   * // Fetch zero or more Partners
   * const partners = await prisma.partner.findMany()
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
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameSession`: Exposes CRUD operations for the **GameSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameSessions
    * const gameSessions = await prisma.gameSession.findMany()
    * ```
    */
  get gameSession(): Prisma.GameSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.analyticsEvent`: Exposes CRUD operations for the **AnalyticsEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsEvents
    * const analyticsEvents = await prisma.analyticsEvent.findMany()
    * ```
    */
  get analyticsEvent(): Prisma.AnalyticsEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.embedToken`: Exposes CRUD operations for the **EmbedToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EmbedTokens
    * const embedTokens = await prisma.embedToken.findMany()
    * ```
    */
  get embedToken(): Prisma.EmbedTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameAction`: Exposes CRUD operations for the **GameAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameActions
    * const gameActions = await prisma.gameAction.findMany()
    * ```
    */
  get gameAction(): Prisma.GameActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameConfig`: Exposes CRUD operations for the **GameConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameConfigs
    * const gameConfigs = await prisma.gameConfig.findMany()
    * ```
    */
  get gameConfig(): Prisma.GameConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
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
    Partner: 'Partner',
    GameSession: 'GameSession',
    AnalyticsEvent: 'AnalyticsEvent',
    EmbedToken: 'EmbedToken',
    GameAction: 'GameAction',
    GameConfig: 'GameConfig',
    Admin: 'Admin'
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
      modelProps: "partner" | "gameSession" | "analyticsEvent" | "embedToken" | "gameAction" | "gameConfig" | "admin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      GameSession: {
        payload: Prisma.$GameSessionPayload<ExtArgs>
        fields: Prisma.GameSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          findFirst: {
            args: Prisma.GameSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          findMany: {
            args: Prisma.GameSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>[]
          }
          create: {
            args: Prisma.GameSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          createMany: {
            args: Prisma.GameSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>[]
          }
          delete: {
            args: Prisma.GameSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          update: {
            args: Prisma.GameSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          deleteMany: {
            args: Prisma.GameSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>[]
          }
          upsert: {
            args: Prisma.GameSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameSessionPayload>
          }
          aggregate: {
            args: Prisma.GameSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameSession>
          }
          groupBy: {
            args: Prisma.GameSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameSessionCountArgs<ExtArgs>
            result: $Utils.Optional<GameSessionCountAggregateOutputType> | number
          }
        }
      }
      AnalyticsEvent: {
        payload: Prisma.$AnalyticsEventPayload<ExtArgs>
        fields: Prisma.AnalyticsEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findMany: {
            args: Prisma.AnalyticsEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          create: {
            args: Prisma.AnalyticsEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          createMany: {
            args: Prisma.AnalyticsEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          update: {
            args: Prisma.AnalyticsEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          upsert: {
            args: Prisma.AnalyticsEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsEvent>
          }
          groupBy: {
            args: Prisma.AnalyticsEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsEventCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventCountAggregateOutputType> | number
          }
        }
      }
      EmbedToken: {
        payload: Prisma.$EmbedTokenPayload<ExtArgs>
        fields: Prisma.EmbedTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmbedTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmbedTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>
          }
          findFirst: {
            args: Prisma.EmbedTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmbedTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>
          }
          findMany: {
            args: Prisma.EmbedTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>[]
          }
          create: {
            args: Prisma.EmbedTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>
          }
          createMany: {
            args: Prisma.EmbedTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmbedTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>[]
          }
          delete: {
            args: Prisma.EmbedTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>
          }
          update: {
            args: Prisma.EmbedTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>
          }
          deleteMany: {
            args: Prisma.EmbedTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmbedTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmbedTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>[]
          }
          upsert: {
            args: Prisma.EmbedTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmbedTokenPayload>
          }
          aggregate: {
            args: Prisma.EmbedTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmbedToken>
          }
          groupBy: {
            args: Prisma.EmbedTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmbedTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmbedTokenCountArgs<ExtArgs>
            result: $Utils.Optional<EmbedTokenCountAggregateOutputType> | number
          }
        }
      }
      GameAction: {
        payload: Prisma.$GameActionPayload<ExtArgs>
        fields: Prisma.GameActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>
          }
          findFirst: {
            args: Prisma.GameActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>
          }
          findMany: {
            args: Prisma.GameActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>[]
          }
          create: {
            args: Prisma.GameActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>
          }
          createMany: {
            args: Prisma.GameActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>[]
          }
          delete: {
            args: Prisma.GameActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>
          }
          update: {
            args: Prisma.GameActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>
          }
          deleteMany: {
            args: Prisma.GameActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>[]
          }
          upsert: {
            args: Prisma.GameActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameActionPayload>
          }
          aggregate: {
            args: Prisma.GameActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameAction>
          }
          groupBy: {
            args: Prisma.GameActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameActionCountArgs<ExtArgs>
            result: $Utils.Optional<GameActionCountAggregateOutputType> | number
          }
        }
      }
      GameConfig: {
        payload: Prisma.$GameConfigPayload<ExtArgs>
        fields: Prisma.GameConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>
          }
          findFirst: {
            args: Prisma.GameConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>
          }
          findMany: {
            args: Prisma.GameConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>[]
          }
          create: {
            args: Prisma.GameConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>
          }
          createMany: {
            args: Prisma.GameConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>[]
          }
          delete: {
            args: Prisma.GameConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>
          }
          update: {
            args: Prisma.GameConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>
          }
          deleteMany: {
            args: Prisma.GameConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>[]
          }
          upsert: {
            args: Prisma.GameConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameConfigPayload>
          }
          aggregate: {
            args: Prisma.GameConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameConfig>
          }
          groupBy: {
            args: Prisma.GameConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameConfigCountArgs<ExtArgs>
            result: $Utils.Optional<GameConfigCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
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
    partner?: PartnerOmit
    gameSession?: GameSessionOmit
    analyticsEvent?: AnalyticsEventOmit
    embedToken?: EmbedTokenOmit
    gameAction?: GameActionOmit
    gameConfig?: GameConfigOmit
    admin?: AdminOmit
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
   * Count Type PartnerCountOutputType
   */

  export type PartnerCountOutputType = {
    EmbedToken: number
    GameConfig: number
  }

  export type PartnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    EmbedToken?: boolean | PartnerCountOutputTypeCountEmbedTokenArgs
    GameConfig?: boolean | PartnerCountOutputTypeCountGameConfigArgs
  }

  // Custom InputTypes
  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerCountOutputType
     */
    select?: PartnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountEmbedTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbedTokenWhereInput
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountGameConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameConfigWhereInput
  }


  /**
   * Count Type GameSessionCountOutputType
   */

  export type GameSessionCountOutputType = {
    AnalyticsEvent: number
    GameAction: number
  }

  export type GameSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    AnalyticsEvent?: boolean | GameSessionCountOutputTypeCountAnalyticsEventArgs
    GameAction?: boolean | GameSessionCountOutputTypeCountGameActionArgs
  }

  // Custom InputTypes
  /**
   * GameSessionCountOutputType without action
   */
  export type GameSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSessionCountOutputType
     */
    select?: GameSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameSessionCountOutputType without action
   */
  export type GameSessionCountOutputTypeCountAnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
  }

  /**
   * GameSessionCountOutputType without action
   */
  export type GameSessionCountOutputTypeCountGameActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameActionWhereInput
  }


  /**
   * Count Type GameConfigCountOutputType
   */

  export type GameConfigCountOutputType = {
    GameSession: number
  }

  export type GameConfigCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameConfigCountOutputTypeCountGameSessionArgs
  }

  // Custom InputTypes
  /**
   * GameConfigCountOutputType without action
   */
  export type GameConfigCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfigCountOutputType
     */
    select?: GameConfigCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameConfigCountOutputType without action
   */
  export type GameConfigCountOutputTypeCountGameSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: PartnerCountAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    EmbedToken?: boolean | Partner$EmbedTokenArgs<ExtArgs>
    GameConfig?: boolean | Partner$GameConfigArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["partner"]>
  export type PartnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    EmbedToken?: boolean | Partner$EmbedTokenArgs<ExtArgs>
    GameConfig?: boolean | Partner$GameConfigArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PartnerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {
      EmbedToken: Prisma.$EmbedTokenPayload<ExtArgs>[]
      GameConfig: Prisma.$GameConfigPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partners and returns the data saved in the database.
     * @param {PartnerCreateManyAndReturnArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners and returns the data updated in the database.
     * @param {PartnerUpdateManyAndReturnArgs} args - Arguments to update many Partners.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.updateManyAndReturn({
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
    updateManyAndReturn<T extends PartnerUpdateManyAndReturnArgs>(args: SelectSubset<T, PartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
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
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    EmbedToken<T extends Partner$EmbedTokenArgs<ExtArgs> = {}>(args?: Subset<T, Partner$EmbedTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    GameConfig<T extends Partner$GameConfigArgs<ExtArgs> = {}>(args?: Subset<T, Partner$GameConfigArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Partner model
   */
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'String'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly createdAt: FieldRef<"Partner", 'DateTime'>
    readonly updatedAt: FieldRef<"Partner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner createManyAndReturn
   */
  export type PartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner updateManyAndReturn
   */
  export type PartnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to delete.
     */
    limit?: number
  }

  /**
   * Partner.EmbedToken
   */
  export type Partner$EmbedTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    where?: EmbedTokenWhereInput
    orderBy?: EmbedTokenOrderByWithRelationInput | EmbedTokenOrderByWithRelationInput[]
    cursor?: EmbedTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EmbedTokenScalarFieldEnum | EmbedTokenScalarFieldEnum[]
  }

  /**
   * Partner.GameConfig
   */
  export type Partner$GameConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    where?: GameConfigWhereInput
    orderBy?: GameConfigOrderByWithRelationInput | GameConfigOrderByWithRelationInput[]
    cursor?: GameConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameConfigScalarFieldEnum | GameConfigScalarFieldEnum[]
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
  }


  /**
   * Model GameSession
   */

  export type AggregateGameSession = {
    _count: GameSessionCountAggregateOutputType | null
    _min: GameSessionMinAggregateOutputType | null
    _max: GameSessionMaxAggregateOutputType | null
  }

  export type GameSessionMinAggregateOutputType = {
    id: string | null
    playerIdentifier: string | null
    gameConfigId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameSessionMaxAggregateOutputType = {
    id: string | null
    playerIdentifier: string | null
    gameConfigId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GameSessionCountAggregateOutputType = {
    id: number
    playerIdentifier: number
    gameConfigId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GameSessionMinAggregateInputType = {
    id?: true
    playerIdentifier?: true
    gameConfigId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameSessionMaxAggregateInputType = {
    id?: true
    playerIdentifier?: true
    gameConfigId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GameSessionCountAggregateInputType = {
    id?: true
    playerIdentifier?: true
    gameConfigId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GameSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameSession to aggregate.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameSessions
    **/
    _count?: true | GameSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameSessionMaxAggregateInputType
  }

  export type GetGameSessionAggregateType<T extends GameSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateGameSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameSession[P]>
      : GetScalarType<T[P], AggregateGameSession[P]>
  }




  export type GameSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameSessionWhereInput
    orderBy?: GameSessionOrderByWithAggregationInput | GameSessionOrderByWithAggregationInput[]
    by: GameSessionScalarFieldEnum[] | GameSessionScalarFieldEnum
    having?: GameSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameSessionCountAggregateInputType | true
    _min?: GameSessionMinAggregateInputType
    _max?: GameSessionMaxAggregateInputType
  }

  export type GameSessionGroupByOutputType = {
    id: string
    playerIdentifier: string
    gameConfigId: string
    createdAt: Date
    updatedAt: Date
    _count: GameSessionCountAggregateOutputType | null
    _min: GameSessionMinAggregateOutputType | null
    _max: GameSessionMaxAggregateOutputType | null
  }

  type GetGameSessionGroupByPayload<T extends GameSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameSessionGroupByOutputType[P]>
            : GetScalarType<T[P], GameSessionGroupByOutputType[P]>
        }
      >
    >


  export type GameSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerIdentifier?: boolean
    gameConfigId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    AnalyticsEvent?: boolean | GameSession$AnalyticsEventArgs<ExtArgs>
    GameAction?: boolean | GameSession$GameActionArgs<ExtArgs>
    GameConfig?: boolean | GameConfigDefaultArgs<ExtArgs>
    _count?: boolean | GameSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameSession"]>

  export type GameSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerIdentifier?: boolean
    gameConfigId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    GameConfig?: boolean | GameConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameSession"]>

  export type GameSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerIdentifier?: boolean
    gameConfigId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    GameConfig?: boolean | GameConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameSession"]>

  export type GameSessionSelectScalar = {
    id?: boolean
    playerIdentifier?: boolean
    gameConfigId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GameSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "playerIdentifier" | "gameConfigId" | "createdAt" | "updatedAt", ExtArgs["result"]["gameSession"]>
  export type GameSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    AnalyticsEvent?: boolean | GameSession$AnalyticsEventArgs<ExtArgs>
    GameAction?: boolean | GameSession$GameActionArgs<ExtArgs>
    GameConfig?: boolean | GameConfigDefaultArgs<ExtArgs>
    _count?: boolean | GameSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameConfig?: boolean | GameConfigDefaultArgs<ExtArgs>
  }
  export type GameSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameConfig?: boolean | GameConfigDefaultArgs<ExtArgs>
  }

  export type $GameSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameSession"
    objects: {
      AnalyticsEvent: Prisma.$AnalyticsEventPayload<ExtArgs>[]
      GameAction: Prisma.$GameActionPayload<ExtArgs>[]
      GameConfig: Prisma.$GameConfigPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playerIdentifier: string
      gameConfigId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gameSession"]>
    composites: {}
  }

  type GameSessionGetPayload<S extends boolean | null | undefined | GameSessionDefaultArgs> = $Result.GetResult<Prisma.$GameSessionPayload, S>

  type GameSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameSessionCountAggregateInputType | true
    }

  export interface GameSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameSession'], meta: { name: 'GameSession' } }
    /**
     * Find zero or one GameSession that matches the filter.
     * @param {GameSessionFindUniqueArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameSessionFindUniqueArgs>(args: SelectSubset<T, GameSessionFindUniqueArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameSessionFindUniqueOrThrowArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, GameSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionFindFirstArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameSessionFindFirstArgs>(args?: SelectSubset<T, GameSessionFindFirstArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionFindFirstOrThrowArgs} args - Arguments to find a GameSession
     * @example
     * // Get one GameSession
     * const gameSession = await prisma.gameSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, GameSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameSessions
     * const gameSessions = await prisma.gameSession.findMany()
     * 
     * // Get first 10 GameSessions
     * const gameSessions = await prisma.gameSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameSessionWithIdOnly = await prisma.gameSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameSessionFindManyArgs>(args?: SelectSubset<T, GameSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameSession.
     * @param {GameSessionCreateArgs} args - Arguments to create a GameSession.
     * @example
     * // Create one GameSession
     * const GameSession = await prisma.gameSession.create({
     *   data: {
     *     // ... data to create a GameSession
     *   }
     * })
     * 
     */
    create<T extends GameSessionCreateArgs>(args: SelectSubset<T, GameSessionCreateArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameSessions.
     * @param {GameSessionCreateManyArgs} args - Arguments to create many GameSessions.
     * @example
     * // Create many GameSessions
     * const gameSession = await prisma.gameSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameSessionCreateManyArgs>(args?: SelectSubset<T, GameSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameSessions and returns the data saved in the database.
     * @param {GameSessionCreateManyAndReturnArgs} args - Arguments to create many GameSessions.
     * @example
     * // Create many GameSessions
     * const gameSession = await prisma.gameSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameSessions and only return the `id`
     * const gameSessionWithIdOnly = await prisma.gameSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, GameSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameSession.
     * @param {GameSessionDeleteArgs} args - Arguments to delete one GameSession.
     * @example
     * // Delete one GameSession
     * const GameSession = await prisma.gameSession.delete({
     *   where: {
     *     // ... filter to delete one GameSession
     *   }
     * })
     * 
     */
    delete<T extends GameSessionDeleteArgs>(args: SelectSubset<T, GameSessionDeleteArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameSession.
     * @param {GameSessionUpdateArgs} args - Arguments to update one GameSession.
     * @example
     * // Update one GameSession
     * const gameSession = await prisma.gameSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameSessionUpdateArgs>(args: SelectSubset<T, GameSessionUpdateArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameSessions.
     * @param {GameSessionDeleteManyArgs} args - Arguments to filter GameSessions to delete.
     * @example
     * // Delete a few GameSessions
     * const { count } = await prisma.gameSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameSessionDeleteManyArgs>(args?: SelectSubset<T, GameSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameSessions
     * const gameSession = await prisma.gameSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameSessionUpdateManyArgs>(args: SelectSubset<T, GameSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameSessions and returns the data updated in the database.
     * @param {GameSessionUpdateManyAndReturnArgs} args - Arguments to update many GameSessions.
     * @example
     * // Update many GameSessions
     * const gameSession = await prisma.gameSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameSessions and only return the `id`
     * const gameSessionWithIdOnly = await prisma.gameSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends GameSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, GameSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameSession.
     * @param {GameSessionUpsertArgs} args - Arguments to update or create a GameSession.
     * @example
     * // Update or create a GameSession
     * const gameSession = await prisma.gameSession.upsert({
     *   create: {
     *     // ... data to create a GameSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameSession we want to update
     *   }
     * })
     */
    upsert<T extends GameSessionUpsertArgs>(args: SelectSubset<T, GameSessionUpsertArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionCountArgs} args - Arguments to filter GameSessions to count.
     * @example
     * // Count the number of GameSessions
     * const count = await prisma.gameSession.count({
     *   where: {
     *     // ... the filter for the GameSessions we want to count
     *   }
     * })
    **/
    count<T extends GameSessionCountArgs>(
      args?: Subset<T, GameSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameSessionAggregateArgs>(args: Subset<T, GameSessionAggregateArgs>): Prisma.PrismaPromise<GetGameSessionAggregateType<T>>

    /**
     * Group by GameSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameSessionGroupByArgs} args - Group by arguments.
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
      T extends GameSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameSessionGroupByArgs['orderBy'] }
        : { orderBy?: GameSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GameSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameSession model
   */
  readonly fields: GameSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    AnalyticsEvent<T extends GameSession$AnalyticsEventArgs<ExtArgs> = {}>(args?: Subset<T, GameSession$AnalyticsEventArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    GameAction<T extends GameSession$GameActionArgs<ExtArgs> = {}>(args?: Subset<T, GameSession$GameActionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    GameConfig<T extends GameConfigDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameConfigDefaultArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the GameSession model
   */
  interface GameSessionFieldRefs {
    readonly id: FieldRef<"GameSession", 'String'>
    readonly playerIdentifier: FieldRef<"GameSession", 'String'>
    readonly gameConfigId: FieldRef<"GameSession", 'String'>
    readonly createdAt: FieldRef<"GameSession", 'DateTime'>
    readonly updatedAt: FieldRef<"GameSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameSession findUnique
   */
  export type GameSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where: GameSessionWhereUniqueInput
  }

  /**
   * GameSession findUniqueOrThrow
   */
  export type GameSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where: GameSessionWhereUniqueInput
  }

  /**
   * GameSession findFirst
   */
  export type GameSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameSessions.
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameSessions.
     */
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }

  /**
   * GameSession findFirstOrThrow
   */
  export type GameSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSession to fetch.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameSessions.
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameSessions.
     */
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }

  /**
   * GameSession findMany
   */
  export type GameSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter, which GameSessions to fetch.
     */
    where?: GameSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameSessions to fetch.
     */
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameSessions.
     */
    cursor?: GameSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameSessions.
     */
    skip?: number
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }

  /**
   * GameSession create
   */
  export type GameSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a GameSession.
     */
    data: XOR<GameSessionCreateInput, GameSessionUncheckedCreateInput>
  }

  /**
   * GameSession createMany
   */
  export type GameSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameSessions.
     */
    data: GameSessionCreateManyInput | GameSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameSession createManyAndReturn
   */
  export type GameSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * The data used to create many GameSessions.
     */
    data: GameSessionCreateManyInput | GameSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameSession update
   */
  export type GameSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a GameSession.
     */
    data: XOR<GameSessionUpdateInput, GameSessionUncheckedUpdateInput>
    /**
     * Choose, which GameSession to update.
     */
    where: GameSessionWhereUniqueInput
  }

  /**
   * GameSession updateMany
   */
  export type GameSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameSessions.
     */
    data: XOR<GameSessionUpdateManyMutationInput, GameSessionUncheckedUpdateManyInput>
    /**
     * Filter which GameSessions to update
     */
    where?: GameSessionWhereInput
    /**
     * Limit how many GameSessions to update.
     */
    limit?: number
  }

  /**
   * GameSession updateManyAndReturn
   */
  export type GameSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * The data used to update GameSessions.
     */
    data: XOR<GameSessionUpdateManyMutationInput, GameSessionUncheckedUpdateManyInput>
    /**
     * Filter which GameSessions to update
     */
    where?: GameSessionWhereInput
    /**
     * Limit how many GameSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameSession upsert
   */
  export type GameSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the GameSession to update in case it exists.
     */
    where: GameSessionWhereUniqueInput
    /**
     * In case the GameSession found by the `where` argument doesn't exist, create a new GameSession with this data.
     */
    create: XOR<GameSessionCreateInput, GameSessionUncheckedCreateInput>
    /**
     * In case the GameSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameSessionUpdateInput, GameSessionUncheckedUpdateInput>
  }

  /**
   * GameSession delete
   */
  export type GameSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    /**
     * Filter which GameSession to delete.
     */
    where: GameSessionWhereUniqueInput
  }

  /**
   * GameSession deleteMany
   */
  export type GameSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameSessions to delete
     */
    where?: GameSessionWhereInput
    /**
     * Limit how many GameSessions to delete.
     */
    limit?: number
  }

  /**
   * GameSession.AnalyticsEvent
   */
  export type GameSession$AnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    cursor?: AnalyticsEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * GameSession.GameAction
   */
  export type GameSession$GameActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    where?: GameActionWhereInput
    orderBy?: GameActionOrderByWithRelationInput | GameActionOrderByWithRelationInput[]
    cursor?: GameActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameActionScalarFieldEnum | GameActionScalarFieldEnum[]
  }

  /**
   * GameSession without action
   */
  export type GameSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
  }


  /**
   * Model AnalyticsEvent
   */

  export type AggregateAnalyticsEvent = {
    _count: AnalyticsEventCountAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  export type AnalyticsEventMinAggregateOutputType = {
    id: string | null
    gameSessionId: string | null
    eventType: string | null
    createdAt: Date | null
  }

  export type AnalyticsEventMaxAggregateOutputType = {
    id: string | null
    gameSessionId: string | null
    eventType: string | null
    createdAt: Date | null
  }

  export type AnalyticsEventCountAggregateOutputType = {
    id: number
    gameSessionId: number
    eventType: number
    payload: number
    createdAt: number
    _all: number
  }


  export type AnalyticsEventMinAggregateInputType = {
    id?: true
    gameSessionId?: true
    eventType?: true
    createdAt?: true
  }

  export type AnalyticsEventMaxAggregateInputType = {
    id?: true
    gameSessionId?: true
    eventType?: true
    createdAt?: true
  }

  export type AnalyticsEventCountAggregateInputType = {
    id?: true
    gameSessionId?: true
    eventType?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type AnalyticsEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvent to aggregate.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsEvents
    **/
    _count?: true | AnalyticsEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type GetAnalyticsEventAggregateType<T extends AnalyticsEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
      : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
  }




  export type AnalyticsEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithAggregationInput | AnalyticsEventOrderByWithAggregationInput[]
    by: AnalyticsEventScalarFieldEnum[] | AnalyticsEventScalarFieldEnum
    having?: AnalyticsEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsEventCountAggregateInputType | true
    _min?: AnalyticsEventMinAggregateInputType
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type AnalyticsEventGroupByOutputType = {
    id: string
    gameSessionId: string
    eventType: string
    payload: JsonValue
    createdAt: Date
    _count: AnalyticsEventCountAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  type GetAnalyticsEventGroupByPayload<T extends AnalyticsEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameSessionId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameSessionId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameSessionId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectScalar = {
    id?: boolean
    gameSessionId?: boolean
    eventType?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type AnalyticsEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameSessionId" | "eventType" | "payload" | "createdAt", ExtArgs["result"]["analyticsEvent"]>
  export type AnalyticsEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }
  export type AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }

  export type $AnalyticsEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsEvent"
    objects: {
      GameSession: Prisma.$GameSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameSessionId: string
      eventType: string
      payload: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["analyticsEvent"]>
    composites: {}
  }

  type AnalyticsEventGetPayload<S extends boolean | null | undefined | AnalyticsEventDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsEventPayload, S>

  type AnalyticsEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnalyticsEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnalyticsEventCountAggregateInputType | true
    }

  export interface AnalyticsEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsEvent'], meta: { name: 'AnalyticsEvent' } }
    /**
     * Find zero or one AnalyticsEvent that matches the filter.
     * @param {AnalyticsEventFindUniqueArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsEventFindUniqueArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnalyticsEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnalyticsEventFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsEventFindFirstArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnalyticsEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnalyticsEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany()
     * 
     * // Get first 10 AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsEventFindManyArgs>(args?: SelectSubset<T, AnalyticsEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnalyticsEvent.
     * @param {AnalyticsEventCreateArgs} args - Arguments to create a AnalyticsEvent.
     * @example
     * // Create one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.create({
     *   data: {
     *     // ... data to create a AnalyticsEvent
     *   }
     * })
     * 
     */
    create<T extends AnalyticsEventCreateArgs>(args: SelectSubset<T, AnalyticsEventCreateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnalyticsEvents.
     * @param {AnalyticsEventCreateManyArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsEventCreateManyArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticsEvents and returns the data saved in the database.
     * @param {AnalyticsEventCreateManyAndReturnArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnalyticsEvent.
     * @param {AnalyticsEventDeleteArgs} args - Arguments to delete one AnalyticsEvent.
     * @example
     * // Delete one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsEvent
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsEventDeleteArgs>(args: SelectSubset<T, AnalyticsEventDeleteArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnalyticsEvent.
     * @param {AnalyticsEventUpdateArgs} args - Arguments to update one AnalyticsEvent.
     * @example
     * // Update one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsEventUpdateArgs>(args: SelectSubset<T, AnalyticsEventUpdateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnalyticsEvents.
     * @param {AnalyticsEventDeleteManyArgs} args - Arguments to filter AnalyticsEvents to delete.
     * @example
     * // Delete a few AnalyticsEvents
     * const { count } = await prisma.analyticsEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsEventDeleteManyArgs>(args?: SelectSubset<T, AnalyticsEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsEventUpdateManyArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents and returns the data updated in the database.
     * @param {AnalyticsEventUpdateManyAndReturnArgs} args - Arguments to update many AnalyticsEvents.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends AnalyticsEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnalyticsEvent.
     * @param {AnalyticsEventUpsertArgs} args - Arguments to update or create a AnalyticsEvent.
     * @example
     * // Update or create a AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.upsert({
     *   create: {
     *     // ... data to create a AnalyticsEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsEvent we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsEventUpsertArgs>(args: SelectSubset<T, AnalyticsEventUpsertArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventCountArgs} args - Arguments to filter AnalyticsEvents to count.
     * @example
     * // Count the number of AnalyticsEvents
     * const count = await prisma.analyticsEvent.count({
     *   where: {
     *     // ... the filter for the AnalyticsEvents we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsEventCountArgs>(
      args?: Subset<T, AnalyticsEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AnalyticsEventAggregateArgs>(args: Subset<T, AnalyticsEventAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsEventAggregateType<T>>

    /**
     * Group by AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventGroupByArgs} args - Group by arguments.
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
      T extends AnalyticsEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsEventGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsEventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AnalyticsEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsEvent model
   */
  readonly fields: AnalyticsEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    GameSession<T extends GameSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameSessionDefaultArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AnalyticsEvent model
   */
  interface AnalyticsEventFieldRefs {
    readonly id: FieldRef<"AnalyticsEvent", 'String'>
    readonly gameSessionId: FieldRef<"AnalyticsEvent", 'String'>
    readonly eventType: FieldRef<"AnalyticsEvent", 'String'>
    readonly payload: FieldRef<"AnalyticsEvent", 'Json'>
    readonly createdAt: FieldRef<"AnalyticsEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsEvent findUnique
   */
  export type AnalyticsEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findUniqueOrThrow
   */
  export type AnalyticsEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findFirst
   */
  export type AnalyticsEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findFirstOrThrow
   */
  export type AnalyticsEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findMany
   */
  export type AnalyticsEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvents to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent create
   */
  export type AnalyticsEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
  }

  /**
   * AnalyticsEvent createMany
   */
  export type AnalyticsEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsEvent createManyAndReturn
   */
  export type AnalyticsEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent update
   */
  export type AnalyticsEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsEvent to update.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent updateMany
   */
  export type AnalyticsEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent updateManyAndReturn
   */
  export type AnalyticsEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnalyticsEvent upsert
   */
  export type AnalyticsEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsEvent to update in case it exists.
     */
    where: AnalyticsEventWhereUniqueInput
    /**
     * In case the AnalyticsEvent found by the `where` argument doesn't exist, create a new AnalyticsEvent with this data.
     */
    create: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
    /**
     * In case the AnalyticsEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
  }

  /**
   * AnalyticsEvent delete
   */
  export type AnalyticsEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
    /**
     * Filter which AnalyticsEvent to delete.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent deleteMany
   */
  export type AnalyticsEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvents to delete
     */
    where?: AnalyticsEventWhereInput
    /**
     * Limit how many AnalyticsEvents to delete.
     */
    limit?: number
  }

  /**
   * AnalyticsEvent without action
   */
  export type AnalyticsEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnalyticsEvent
     */
    omit?: AnalyticsEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnalyticsEventInclude<ExtArgs> | null
  }


  /**
   * Model EmbedToken
   */

  export type AggregateEmbedToken = {
    _count: EmbedTokenCountAggregateOutputType | null
    _min: EmbedTokenMinAggregateOutputType | null
    _max: EmbedTokenMaxAggregateOutputType | null
  }

  export type EmbedTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    partnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmbedTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    partnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmbedTokenCountAggregateOutputType = {
    id: number
    token: number
    partnerId: number
    permissions: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmbedTokenMinAggregateInputType = {
    id?: true
    token?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmbedTokenMaxAggregateInputType = {
    id?: true
    token?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmbedTokenCountAggregateInputType = {
    id?: true
    token?: true
    partnerId?: true
    permissions?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmbedTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmbedToken to aggregate.
     */
    where?: EmbedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbedTokens to fetch.
     */
    orderBy?: EmbedTokenOrderByWithRelationInput | EmbedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmbedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbedTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EmbedTokens
    **/
    _count?: true | EmbedTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmbedTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmbedTokenMaxAggregateInputType
  }

  export type GetEmbedTokenAggregateType<T extends EmbedTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateEmbedToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmbedToken[P]>
      : GetScalarType<T[P], AggregateEmbedToken[P]>
  }




  export type EmbedTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmbedTokenWhereInput
    orderBy?: EmbedTokenOrderByWithAggregationInput | EmbedTokenOrderByWithAggregationInput[]
    by: EmbedTokenScalarFieldEnum[] | EmbedTokenScalarFieldEnum
    having?: EmbedTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmbedTokenCountAggregateInputType | true
    _min?: EmbedTokenMinAggregateInputType
    _max?: EmbedTokenMaxAggregateInputType
  }

  export type EmbedTokenGroupByOutputType = {
    id: string
    token: string
    partnerId: string
    permissions: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: EmbedTokenCountAggregateOutputType | null
    _min: EmbedTokenMinAggregateOutputType | null
    _max: EmbedTokenMaxAggregateOutputType | null
  }

  type GetEmbedTokenGroupByPayload<T extends EmbedTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmbedTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmbedTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmbedTokenGroupByOutputType[P]>
            : GetScalarType<T[P], EmbedTokenGroupByOutputType[P]>
        }
      >
    >


  export type EmbedTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    partnerId?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embedToken"]>

  export type EmbedTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    partnerId?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embedToken"]>

  export type EmbedTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    partnerId?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["embedToken"]>

  export type EmbedTokenSelectScalar = {
    id?: boolean
    token?: boolean
    partnerId?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmbedTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "partnerId" | "permissions" | "createdAt" | "updatedAt", ExtArgs["result"]["embedToken"]>
  export type EmbedTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }
  export type EmbedTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }
  export type EmbedTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }

  export type $EmbedTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EmbedToken"
    objects: {
      Partner: Prisma.$PartnerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      partnerId: string
      permissions: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["embedToken"]>
    composites: {}
  }

  type EmbedTokenGetPayload<S extends boolean | null | undefined | EmbedTokenDefaultArgs> = $Result.GetResult<Prisma.$EmbedTokenPayload, S>

  type EmbedTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmbedTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmbedTokenCountAggregateInputType | true
    }

  export interface EmbedTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EmbedToken'], meta: { name: 'EmbedToken' } }
    /**
     * Find zero or one EmbedToken that matches the filter.
     * @param {EmbedTokenFindUniqueArgs} args - Arguments to find a EmbedToken
     * @example
     * // Get one EmbedToken
     * const embedToken = await prisma.embedToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmbedTokenFindUniqueArgs>(args: SelectSubset<T, EmbedTokenFindUniqueArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EmbedToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmbedTokenFindUniqueOrThrowArgs} args - Arguments to find a EmbedToken
     * @example
     * // Get one EmbedToken
     * const embedToken = await prisma.embedToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmbedTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, EmbedTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmbedToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenFindFirstArgs} args - Arguments to find a EmbedToken
     * @example
     * // Get one EmbedToken
     * const embedToken = await prisma.embedToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmbedTokenFindFirstArgs>(args?: SelectSubset<T, EmbedTokenFindFirstArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EmbedToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenFindFirstOrThrowArgs} args - Arguments to find a EmbedToken
     * @example
     * // Get one EmbedToken
     * const embedToken = await prisma.embedToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmbedTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, EmbedTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EmbedTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EmbedTokens
     * const embedTokens = await prisma.embedToken.findMany()
     * 
     * // Get first 10 EmbedTokens
     * const embedTokens = await prisma.embedToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const embedTokenWithIdOnly = await prisma.embedToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmbedTokenFindManyArgs>(args?: SelectSubset<T, EmbedTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EmbedToken.
     * @param {EmbedTokenCreateArgs} args - Arguments to create a EmbedToken.
     * @example
     * // Create one EmbedToken
     * const EmbedToken = await prisma.embedToken.create({
     *   data: {
     *     // ... data to create a EmbedToken
     *   }
     * })
     * 
     */
    create<T extends EmbedTokenCreateArgs>(args: SelectSubset<T, EmbedTokenCreateArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EmbedTokens.
     * @param {EmbedTokenCreateManyArgs} args - Arguments to create many EmbedTokens.
     * @example
     * // Create many EmbedTokens
     * const embedToken = await prisma.embedToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmbedTokenCreateManyArgs>(args?: SelectSubset<T, EmbedTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EmbedTokens and returns the data saved in the database.
     * @param {EmbedTokenCreateManyAndReturnArgs} args - Arguments to create many EmbedTokens.
     * @example
     * // Create many EmbedTokens
     * const embedToken = await prisma.embedToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EmbedTokens and only return the `id`
     * const embedTokenWithIdOnly = await prisma.embedToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmbedTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, EmbedTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EmbedToken.
     * @param {EmbedTokenDeleteArgs} args - Arguments to delete one EmbedToken.
     * @example
     * // Delete one EmbedToken
     * const EmbedToken = await prisma.embedToken.delete({
     *   where: {
     *     // ... filter to delete one EmbedToken
     *   }
     * })
     * 
     */
    delete<T extends EmbedTokenDeleteArgs>(args: SelectSubset<T, EmbedTokenDeleteArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EmbedToken.
     * @param {EmbedTokenUpdateArgs} args - Arguments to update one EmbedToken.
     * @example
     * // Update one EmbedToken
     * const embedToken = await prisma.embedToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmbedTokenUpdateArgs>(args: SelectSubset<T, EmbedTokenUpdateArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EmbedTokens.
     * @param {EmbedTokenDeleteManyArgs} args - Arguments to filter EmbedTokens to delete.
     * @example
     * // Delete a few EmbedTokens
     * const { count } = await prisma.embedToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmbedTokenDeleteManyArgs>(args?: SelectSubset<T, EmbedTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmbedTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EmbedTokens
     * const embedToken = await prisma.embedToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmbedTokenUpdateManyArgs>(args: SelectSubset<T, EmbedTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EmbedTokens and returns the data updated in the database.
     * @param {EmbedTokenUpdateManyAndReturnArgs} args - Arguments to update many EmbedTokens.
     * @example
     * // Update many EmbedTokens
     * const embedToken = await prisma.embedToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EmbedTokens and only return the `id`
     * const embedTokenWithIdOnly = await prisma.embedToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends EmbedTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, EmbedTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EmbedToken.
     * @param {EmbedTokenUpsertArgs} args - Arguments to update or create a EmbedToken.
     * @example
     * // Update or create a EmbedToken
     * const embedToken = await prisma.embedToken.upsert({
     *   create: {
     *     // ... data to create a EmbedToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EmbedToken we want to update
     *   }
     * })
     */
    upsert<T extends EmbedTokenUpsertArgs>(args: SelectSubset<T, EmbedTokenUpsertArgs<ExtArgs>>): Prisma__EmbedTokenClient<$Result.GetResult<Prisma.$EmbedTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EmbedTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenCountArgs} args - Arguments to filter EmbedTokens to count.
     * @example
     * // Count the number of EmbedTokens
     * const count = await prisma.embedToken.count({
     *   where: {
     *     // ... the filter for the EmbedTokens we want to count
     *   }
     * })
    **/
    count<T extends EmbedTokenCountArgs>(
      args?: Subset<T, EmbedTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmbedTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EmbedToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmbedTokenAggregateArgs>(args: Subset<T, EmbedTokenAggregateArgs>): Prisma.PrismaPromise<GetEmbedTokenAggregateType<T>>

    /**
     * Group by EmbedToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmbedTokenGroupByArgs} args - Group by arguments.
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
      T extends EmbedTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmbedTokenGroupByArgs['orderBy'] }
        : { orderBy?: EmbedTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmbedTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmbedTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EmbedToken model
   */
  readonly fields: EmbedTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EmbedToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmbedTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Partner<T extends PartnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerDefaultArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the EmbedToken model
   */
  interface EmbedTokenFieldRefs {
    readonly id: FieldRef<"EmbedToken", 'String'>
    readonly token: FieldRef<"EmbedToken", 'String'>
    readonly partnerId: FieldRef<"EmbedToken", 'String'>
    readonly permissions: FieldRef<"EmbedToken", 'Json'>
    readonly createdAt: FieldRef<"EmbedToken", 'DateTime'>
    readonly updatedAt: FieldRef<"EmbedToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EmbedToken findUnique
   */
  export type EmbedTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmbedToken to fetch.
     */
    where: EmbedTokenWhereUniqueInput
  }

  /**
   * EmbedToken findUniqueOrThrow
   */
  export type EmbedTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmbedToken to fetch.
     */
    where: EmbedTokenWhereUniqueInput
  }

  /**
   * EmbedToken findFirst
   */
  export type EmbedTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmbedToken to fetch.
     */
    where?: EmbedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbedTokens to fetch.
     */
    orderBy?: EmbedTokenOrderByWithRelationInput | EmbedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmbedTokens.
     */
    cursor?: EmbedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbedTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmbedTokens.
     */
    distinct?: EmbedTokenScalarFieldEnum | EmbedTokenScalarFieldEnum[]
  }

  /**
   * EmbedToken findFirstOrThrow
   */
  export type EmbedTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmbedToken to fetch.
     */
    where?: EmbedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbedTokens to fetch.
     */
    orderBy?: EmbedTokenOrderByWithRelationInput | EmbedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EmbedTokens.
     */
    cursor?: EmbedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbedTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EmbedTokens.
     */
    distinct?: EmbedTokenScalarFieldEnum | EmbedTokenScalarFieldEnum[]
  }

  /**
   * EmbedToken findMany
   */
  export type EmbedTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * Filter, which EmbedTokens to fetch.
     */
    where?: EmbedTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EmbedTokens to fetch.
     */
    orderBy?: EmbedTokenOrderByWithRelationInput | EmbedTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EmbedTokens.
     */
    cursor?: EmbedTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EmbedTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EmbedTokens.
     */
    skip?: number
    distinct?: EmbedTokenScalarFieldEnum | EmbedTokenScalarFieldEnum[]
  }

  /**
   * EmbedToken create
   */
  export type EmbedTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a EmbedToken.
     */
    data: XOR<EmbedTokenCreateInput, EmbedTokenUncheckedCreateInput>
  }

  /**
   * EmbedToken createMany
   */
  export type EmbedTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EmbedTokens.
     */
    data: EmbedTokenCreateManyInput | EmbedTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EmbedToken createManyAndReturn
   */
  export type EmbedTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * The data used to create many EmbedTokens.
     */
    data: EmbedTokenCreateManyInput | EmbedTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmbedToken update
   */
  export type EmbedTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a EmbedToken.
     */
    data: XOR<EmbedTokenUpdateInput, EmbedTokenUncheckedUpdateInput>
    /**
     * Choose, which EmbedToken to update.
     */
    where: EmbedTokenWhereUniqueInput
  }

  /**
   * EmbedToken updateMany
   */
  export type EmbedTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EmbedTokens.
     */
    data: XOR<EmbedTokenUpdateManyMutationInput, EmbedTokenUncheckedUpdateManyInput>
    /**
     * Filter which EmbedTokens to update
     */
    where?: EmbedTokenWhereInput
    /**
     * Limit how many EmbedTokens to update.
     */
    limit?: number
  }

  /**
   * EmbedToken updateManyAndReturn
   */
  export type EmbedTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * The data used to update EmbedTokens.
     */
    data: XOR<EmbedTokenUpdateManyMutationInput, EmbedTokenUncheckedUpdateManyInput>
    /**
     * Filter which EmbedTokens to update
     */
    where?: EmbedTokenWhereInput
    /**
     * Limit how many EmbedTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EmbedToken upsert
   */
  export type EmbedTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the EmbedToken to update in case it exists.
     */
    where: EmbedTokenWhereUniqueInput
    /**
     * In case the EmbedToken found by the `where` argument doesn't exist, create a new EmbedToken with this data.
     */
    create: XOR<EmbedTokenCreateInput, EmbedTokenUncheckedCreateInput>
    /**
     * In case the EmbedToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmbedTokenUpdateInput, EmbedTokenUncheckedUpdateInput>
  }

  /**
   * EmbedToken delete
   */
  export type EmbedTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
    /**
     * Filter which EmbedToken to delete.
     */
    where: EmbedTokenWhereUniqueInput
  }

  /**
   * EmbedToken deleteMany
   */
  export type EmbedTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EmbedTokens to delete
     */
    where?: EmbedTokenWhereInput
    /**
     * Limit how many EmbedTokens to delete.
     */
    limit?: number
  }

  /**
   * EmbedToken without action
   */
  export type EmbedTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EmbedToken
     */
    select?: EmbedTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EmbedToken
     */
    omit?: EmbedTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EmbedTokenInclude<ExtArgs> | null
  }


  /**
   * Model GameAction
   */

  export type AggregateGameAction = {
    _count: GameActionCountAggregateOutputType | null
    _min: GameActionMinAggregateOutputType | null
    _max: GameActionMaxAggregateOutputType | null
  }

  export type GameActionMinAggregateOutputType = {
    id: string | null
    gameSessionId: string | null
    actionType: string | null
    createdAt: Date | null
  }

  export type GameActionMaxAggregateOutputType = {
    id: string | null
    gameSessionId: string | null
    actionType: string | null
    createdAt: Date | null
  }

  export type GameActionCountAggregateOutputType = {
    id: number
    gameSessionId: number
    actionType: number
    payload: number
    createdAt: number
    _all: number
  }


  export type GameActionMinAggregateInputType = {
    id?: true
    gameSessionId?: true
    actionType?: true
    createdAt?: true
  }

  export type GameActionMaxAggregateInputType = {
    id?: true
    gameSessionId?: true
    actionType?: true
    createdAt?: true
  }

  export type GameActionCountAggregateInputType = {
    id?: true
    gameSessionId?: true
    actionType?: true
    payload?: true
    createdAt?: true
    _all?: true
  }

  export type GameActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameAction to aggregate.
     */
    where?: GameActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameActions to fetch.
     */
    orderBy?: GameActionOrderByWithRelationInput | GameActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameActions
    **/
    _count?: true | GameActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameActionMaxAggregateInputType
  }

  export type GetGameActionAggregateType<T extends GameActionAggregateArgs> = {
        [P in keyof T & keyof AggregateGameAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameAction[P]>
      : GetScalarType<T[P], AggregateGameAction[P]>
  }




  export type GameActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameActionWhereInput
    orderBy?: GameActionOrderByWithAggregationInput | GameActionOrderByWithAggregationInput[]
    by: GameActionScalarFieldEnum[] | GameActionScalarFieldEnum
    having?: GameActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameActionCountAggregateInputType | true
    _min?: GameActionMinAggregateInputType
    _max?: GameActionMaxAggregateInputType
  }

  export type GameActionGroupByOutputType = {
    id: string
    gameSessionId: string
    actionType: string
    payload: JsonValue
    createdAt: Date
    _count: GameActionCountAggregateOutputType | null
    _min: GameActionMinAggregateOutputType | null
    _max: GameActionMaxAggregateOutputType | null
  }

  type GetGameActionGroupByPayload<T extends GameActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameActionGroupByOutputType[P]>
            : GetScalarType<T[P], GameActionGroupByOutputType[P]>
        }
      >
    >


  export type GameActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameSessionId?: boolean
    actionType?: boolean
    payload?: boolean
    createdAt?: boolean
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameAction"]>

  export type GameActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameSessionId?: boolean
    actionType?: boolean
    payload?: boolean
    createdAt?: boolean
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameAction"]>

  export type GameActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    gameSessionId?: boolean
    actionType?: boolean
    payload?: boolean
    createdAt?: boolean
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameAction"]>

  export type GameActionSelectScalar = {
    id?: boolean
    gameSessionId?: boolean
    actionType?: boolean
    payload?: boolean
    createdAt?: boolean
  }

  export type GameActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "gameSessionId" | "actionType" | "payload" | "createdAt", ExtArgs["result"]["gameAction"]>
  export type GameActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }
  export type GameActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }
  export type GameActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    GameSession?: boolean | GameSessionDefaultArgs<ExtArgs>
  }

  export type $GameActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameAction"
    objects: {
      GameSession: Prisma.$GameSessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      gameSessionId: string
      actionType: string
      payload: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["gameAction"]>
    composites: {}
  }

  type GameActionGetPayload<S extends boolean | null | undefined | GameActionDefaultArgs> = $Result.GetResult<Prisma.$GameActionPayload, S>

  type GameActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameActionCountAggregateInputType | true
    }

  export interface GameActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameAction'], meta: { name: 'GameAction' } }
    /**
     * Find zero or one GameAction that matches the filter.
     * @param {GameActionFindUniqueArgs} args - Arguments to find a GameAction
     * @example
     * // Get one GameAction
     * const gameAction = await prisma.gameAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameActionFindUniqueArgs>(args: SelectSubset<T, GameActionFindUniqueArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameActionFindUniqueOrThrowArgs} args - Arguments to find a GameAction
     * @example
     * // Get one GameAction
     * const gameAction = await prisma.gameAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameActionFindUniqueOrThrowArgs>(args: SelectSubset<T, GameActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionFindFirstArgs} args - Arguments to find a GameAction
     * @example
     * // Get one GameAction
     * const gameAction = await prisma.gameAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameActionFindFirstArgs>(args?: SelectSubset<T, GameActionFindFirstArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionFindFirstOrThrowArgs} args - Arguments to find a GameAction
     * @example
     * // Get one GameAction
     * const gameAction = await prisma.gameAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameActionFindFirstOrThrowArgs>(args?: SelectSubset<T, GameActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameActions
     * const gameActions = await prisma.gameAction.findMany()
     * 
     * // Get first 10 GameActions
     * const gameActions = await prisma.gameAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameActionWithIdOnly = await prisma.gameAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameActionFindManyArgs>(args?: SelectSubset<T, GameActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameAction.
     * @param {GameActionCreateArgs} args - Arguments to create a GameAction.
     * @example
     * // Create one GameAction
     * const GameAction = await prisma.gameAction.create({
     *   data: {
     *     // ... data to create a GameAction
     *   }
     * })
     * 
     */
    create<T extends GameActionCreateArgs>(args: SelectSubset<T, GameActionCreateArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameActions.
     * @param {GameActionCreateManyArgs} args - Arguments to create many GameActions.
     * @example
     * // Create many GameActions
     * const gameAction = await prisma.gameAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameActionCreateManyArgs>(args?: SelectSubset<T, GameActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameActions and returns the data saved in the database.
     * @param {GameActionCreateManyAndReturnArgs} args - Arguments to create many GameActions.
     * @example
     * // Create many GameActions
     * const gameAction = await prisma.gameAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameActions and only return the `id`
     * const gameActionWithIdOnly = await prisma.gameAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameActionCreateManyAndReturnArgs>(args?: SelectSubset<T, GameActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameAction.
     * @param {GameActionDeleteArgs} args - Arguments to delete one GameAction.
     * @example
     * // Delete one GameAction
     * const GameAction = await prisma.gameAction.delete({
     *   where: {
     *     // ... filter to delete one GameAction
     *   }
     * })
     * 
     */
    delete<T extends GameActionDeleteArgs>(args: SelectSubset<T, GameActionDeleteArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameAction.
     * @param {GameActionUpdateArgs} args - Arguments to update one GameAction.
     * @example
     * // Update one GameAction
     * const gameAction = await prisma.gameAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameActionUpdateArgs>(args: SelectSubset<T, GameActionUpdateArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameActions.
     * @param {GameActionDeleteManyArgs} args - Arguments to filter GameActions to delete.
     * @example
     * // Delete a few GameActions
     * const { count } = await prisma.gameAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameActionDeleteManyArgs>(args?: SelectSubset<T, GameActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameActions
     * const gameAction = await prisma.gameAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameActionUpdateManyArgs>(args: SelectSubset<T, GameActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameActions and returns the data updated in the database.
     * @param {GameActionUpdateManyAndReturnArgs} args - Arguments to update many GameActions.
     * @example
     * // Update many GameActions
     * const gameAction = await prisma.gameAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameActions and only return the `id`
     * const gameActionWithIdOnly = await prisma.gameAction.updateManyAndReturn({
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
    updateManyAndReturn<T extends GameActionUpdateManyAndReturnArgs>(args: SelectSubset<T, GameActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameAction.
     * @param {GameActionUpsertArgs} args - Arguments to update or create a GameAction.
     * @example
     * // Update or create a GameAction
     * const gameAction = await prisma.gameAction.upsert({
     *   create: {
     *     // ... data to create a GameAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameAction we want to update
     *   }
     * })
     */
    upsert<T extends GameActionUpsertArgs>(args: SelectSubset<T, GameActionUpsertArgs<ExtArgs>>): Prisma__GameActionClient<$Result.GetResult<Prisma.$GameActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionCountArgs} args - Arguments to filter GameActions to count.
     * @example
     * // Count the number of GameActions
     * const count = await prisma.gameAction.count({
     *   where: {
     *     // ... the filter for the GameActions we want to count
     *   }
     * })
    **/
    count<T extends GameActionCountArgs>(
      args?: Subset<T, GameActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameActionAggregateArgs>(args: Subset<T, GameActionAggregateArgs>): Prisma.PrismaPromise<GetGameActionAggregateType<T>>

    /**
     * Group by GameAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameActionGroupByArgs} args - Group by arguments.
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
      T extends GameActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameActionGroupByArgs['orderBy'] }
        : { orderBy?: GameActionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GameActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameAction model
   */
  readonly fields: GameActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    GameSession<T extends GameSessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameSessionDefaultArgs<ExtArgs>>): Prisma__GameSessionClient<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the GameAction model
   */
  interface GameActionFieldRefs {
    readonly id: FieldRef<"GameAction", 'String'>
    readonly gameSessionId: FieldRef<"GameAction", 'String'>
    readonly actionType: FieldRef<"GameAction", 'String'>
    readonly payload: FieldRef<"GameAction", 'Json'>
    readonly createdAt: FieldRef<"GameAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameAction findUnique
   */
  export type GameActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * Filter, which GameAction to fetch.
     */
    where: GameActionWhereUniqueInput
  }

  /**
   * GameAction findUniqueOrThrow
   */
  export type GameActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * Filter, which GameAction to fetch.
     */
    where: GameActionWhereUniqueInput
  }

  /**
   * GameAction findFirst
   */
  export type GameActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * Filter, which GameAction to fetch.
     */
    where?: GameActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameActions to fetch.
     */
    orderBy?: GameActionOrderByWithRelationInput | GameActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameActions.
     */
    cursor?: GameActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameActions.
     */
    distinct?: GameActionScalarFieldEnum | GameActionScalarFieldEnum[]
  }

  /**
   * GameAction findFirstOrThrow
   */
  export type GameActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * Filter, which GameAction to fetch.
     */
    where?: GameActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameActions to fetch.
     */
    orderBy?: GameActionOrderByWithRelationInput | GameActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameActions.
     */
    cursor?: GameActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameActions.
     */
    distinct?: GameActionScalarFieldEnum | GameActionScalarFieldEnum[]
  }

  /**
   * GameAction findMany
   */
  export type GameActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * Filter, which GameActions to fetch.
     */
    where?: GameActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameActions to fetch.
     */
    orderBy?: GameActionOrderByWithRelationInput | GameActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameActions.
     */
    cursor?: GameActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameActions.
     */
    skip?: number
    distinct?: GameActionScalarFieldEnum | GameActionScalarFieldEnum[]
  }

  /**
   * GameAction create
   */
  export type GameActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * The data needed to create a GameAction.
     */
    data: XOR<GameActionCreateInput, GameActionUncheckedCreateInput>
  }

  /**
   * GameAction createMany
   */
  export type GameActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameActions.
     */
    data: GameActionCreateManyInput | GameActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameAction createManyAndReturn
   */
  export type GameActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * The data used to create many GameActions.
     */
    data: GameActionCreateManyInput | GameActionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameAction update
   */
  export type GameActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * The data needed to update a GameAction.
     */
    data: XOR<GameActionUpdateInput, GameActionUncheckedUpdateInput>
    /**
     * Choose, which GameAction to update.
     */
    where: GameActionWhereUniqueInput
  }

  /**
   * GameAction updateMany
   */
  export type GameActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameActions.
     */
    data: XOR<GameActionUpdateManyMutationInput, GameActionUncheckedUpdateManyInput>
    /**
     * Filter which GameActions to update
     */
    where?: GameActionWhereInput
    /**
     * Limit how many GameActions to update.
     */
    limit?: number
  }

  /**
   * GameAction updateManyAndReturn
   */
  export type GameActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * The data used to update GameActions.
     */
    data: XOR<GameActionUpdateManyMutationInput, GameActionUncheckedUpdateManyInput>
    /**
     * Filter which GameActions to update
     */
    where?: GameActionWhereInput
    /**
     * Limit how many GameActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameAction upsert
   */
  export type GameActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * The filter to search for the GameAction to update in case it exists.
     */
    where: GameActionWhereUniqueInput
    /**
     * In case the GameAction found by the `where` argument doesn't exist, create a new GameAction with this data.
     */
    create: XOR<GameActionCreateInput, GameActionUncheckedCreateInput>
    /**
     * In case the GameAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameActionUpdateInput, GameActionUncheckedUpdateInput>
  }

  /**
   * GameAction delete
   */
  export type GameActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
    /**
     * Filter which GameAction to delete.
     */
    where: GameActionWhereUniqueInput
  }

  /**
   * GameAction deleteMany
   */
  export type GameActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameActions to delete
     */
    where?: GameActionWhereInput
    /**
     * Limit how many GameActions to delete.
     */
    limit?: number
  }

  /**
   * GameAction without action
   */
  export type GameActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameAction
     */
    select?: GameActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameAction
     */
    omit?: GameActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameActionInclude<ExtArgs> | null
  }


  /**
   * Model GameConfig
   */

  export type AggregateGameConfig = {
    _count: GameConfigCountAggregateOutputType | null
    _avg: GameConfigAvgAggregateOutputType | null
    _sum: GameConfigSumAggregateOutputType | null
    _min: GameConfigMinAggregateOutputType | null
    _max: GameConfigMaxAggregateOutputType | null
  }

  export type GameConfigAvgAggregateOutputType = {
    defaultBid: number | null
    bidAmounts: number | null
    movesPerRound: number | null
    multDiamond: number | null
    multGold: number | null
    multOil: number | null
    probDiamond: number | null
    probDust: number | null
    probGold: number | null
    probOil: number | null
    probRock: number | null
  }

  export type GameConfigSumAggregateOutputType = {
    defaultBid: number | null
    bidAmounts: number[]
    movesPerRound: number | null
    multDiamond: number | null
    multGold: number | null
    multOil: number | null
    probDiamond: number | null
    probDust: number | null
    probGold: number | null
    probOil: number | null
    probRock: number | null
  }

  export type GameConfigMinAggregateOutputType = {
    id: string | null
    name: string | null
    gameType: string | null
    partnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    backgroundUrl: string | null
    diamondImageUrl: string | null
    dustImageUrl: string | null
    goldImageUrl: string | null
    defaultBid: number | null
    loseSoundUrl: string | null
    movesPerRound: number | null
    multDiamond: number | null
    multGold: number | null
    multOil: number | null
    oilImageUrl: string | null
    probDiamond: number | null
    probDust: number | null
    probGold: number | null
    probOil: number | null
    probRock: number | null
    rockImageUrl: string | null
    winSoundUrl: string | null
    mascotImageUrl: string | null
    mascotOnDustImageUrl: string | null
    mascotOnRockImageUrl: string | null
    mascotOnOilImageUrl: string | null
    mascotOnGoldImageUrl: string | null
    mascotOnDiamondImageUrl: string | null
  }

  export type GameConfigMaxAggregateOutputType = {
    id: string | null
    name: string | null
    gameType: string | null
    partnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    backgroundUrl: string | null
    diamondImageUrl: string | null
    dustImageUrl: string | null
    goldImageUrl: string | null
    defaultBid: number | null
    loseSoundUrl: string | null
    movesPerRound: number | null
    multDiamond: number | null
    multGold: number | null
    multOil: number | null
    oilImageUrl: string | null
    probDiamond: number | null
    probDust: number | null
    probGold: number | null
    probOil: number | null
    probRock: number | null
    rockImageUrl: string | null
    winSoundUrl: string | null
    mascotImageUrl: string | null
    mascotOnDustImageUrl: string | null
    mascotOnRockImageUrl: string | null
    mascotOnOilImageUrl: string | null
    mascotOnGoldImageUrl: string | null
    mascotOnDiamondImageUrl: string | null
  }

  export type GameConfigCountAggregateOutputType = {
    id: number
    name: number
    gameType: number
    partnerId: number
    createdAt: number
    updatedAt: number
    backgroundUrl: number
    diamondImageUrl: number
    dustImageUrl: number
    goldImageUrl: number
    defaultBid: number
    bidAmounts: number
    loseSoundUrl: number
    movesPerRound: number
    multDiamond: number
    multGold: number
    multOil: number
    oilImageUrl: number
    probDiamond: number
    probDust: number
    probGold: number
    probOil: number
    probRock: number
    rockImageUrl: number
    winSoundUrl: number
    mascotImageUrl: number
    mascotOnDustImageUrl: number
    mascotOnRockImageUrl: number
    mascotOnOilImageUrl: number
    mascotOnGoldImageUrl: number
    mascotOnDiamondImageUrl: number
    _all: number
  }


  export type GameConfigAvgAggregateInputType = {
    defaultBid?: true
    bidAmounts?: true
    movesPerRound?: true
    multDiamond?: true
    multGold?: true
    multOil?: true
    probDiamond?: true
    probDust?: true
    probGold?: true
    probOil?: true
    probRock?: true
  }

  export type GameConfigSumAggregateInputType = {
    defaultBid?: true
    bidAmounts?: true
    movesPerRound?: true
    multDiamond?: true
    multGold?: true
    multOil?: true
    probDiamond?: true
    probDust?: true
    probGold?: true
    probOil?: true
    probRock?: true
  }

  export type GameConfigMinAggregateInputType = {
    id?: true
    name?: true
    gameType?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    backgroundUrl?: true
    diamondImageUrl?: true
    dustImageUrl?: true
    goldImageUrl?: true
    defaultBid?: true
    loseSoundUrl?: true
    movesPerRound?: true
    multDiamond?: true
    multGold?: true
    multOil?: true
    oilImageUrl?: true
    probDiamond?: true
    probDust?: true
    probGold?: true
    probOil?: true
    probRock?: true
    rockImageUrl?: true
    winSoundUrl?: true
    mascotImageUrl?: true
    mascotOnDustImageUrl?: true
    mascotOnRockImageUrl?: true
    mascotOnOilImageUrl?: true
    mascotOnGoldImageUrl?: true
    mascotOnDiamondImageUrl?: true
  }

  export type GameConfigMaxAggregateInputType = {
    id?: true
    name?: true
    gameType?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    backgroundUrl?: true
    diamondImageUrl?: true
    dustImageUrl?: true
    goldImageUrl?: true
    defaultBid?: true
    loseSoundUrl?: true
    movesPerRound?: true
    multDiamond?: true
    multGold?: true
    multOil?: true
    oilImageUrl?: true
    probDiamond?: true
    probDust?: true
    probGold?: true
    probOil?: true
    probRock?: true
    rockImageUrl?: true
    winSoundUrl?: true
    mascotImageUrl?: true
    mascotOnDustImageUrl?: true
    mascotOnRockImageUrl?: true
    mascotOnOilImageUrl?: true
    mascotOnGoldImageUrl?: true
    mascotOnDiamondImageUrl?: true
  }

  export type GameConfigCountAggregateInputType = {
    id?: true
    name?: true
    gameType?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    backgroundUrl?: true
    diamondImageUrl?: true
    dustImageUrl?: true
    goldImageUrl?: true
    defaultBid?: true
    bidAmounts?: true
    loseSoundUrl?: true
    movesPerRound?: true
    multDiamond?: true
    multGold?: true
    multOil?: true
    oilImageUrl?: true
    probDiamond?: true
    probDust?: true
    probGold?: true
    probOil?: true
    probRock?: true
    rockImageUrl?: true
    winSoundUrl?: true
    mascotImageUrl?: true
    mascotOnDustImageUrl?: true
    mascotOnRockImageUrl?: true
    mascotOnOilImageUrl?: true
    mascotOnGoldImageUrl?: true
    mascotOnDiamondImageUrl?: true
    _all?: true
  }

  export type GameConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameConfig to aggregate.
     */
    where?: GameConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameConfigs to fetch.
     */
    orderBy?: GameConfigOrderByWithRelationInput | GameConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameConfigs
    **/
    _count?: true | GameConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameConfigMaxAggregateInputType
  }

  export type GetGameConfigAggregateType<T extends GameConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateGameConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameConfig[P]>
      : GetScalarType<T[P], AggregateGameConfig[P]>
  }




  export type GameConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameConfigWhereInput
    orderBy?: GameConfigOrderByWithAggregationInput | GameConfigOrderByWithAggregationInput[]
    by: GameConfigScalarFieldEnum[] | GameConfigScalarFieldEnum
    having?: GameConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameConfigCountAggregateInputType | true
    _avg?: GameConfigAvgAggregateInputType
    _sum?: GameConfigSumAggregateInputType
    _min?: GameConfigMinAggregateInputType
    _max?: GameConfigMaxAggregateInputType
  }

  export type GameConfigGroupByOutputType = {
    id: string
    name: string
    gameType: string
    partnerId: string | null
    createdAt: Date
    updatedAt: Date
    backgroundUrl: string | null
    diamondImageUrl: string | null
    dustImageUrl: string | null
    goldImageUrl: string | null
    defaultBid: number | null
    bidAmounts: number[]
    loseSoundUrl: string | null
    movesPerRound: number
    multDiamond: number
    multGold: number
    multOil: number
    oilImageUrl: string | null
    probDiamond: number
    probDust: number
    probGold: number
    probOil: number
    probRock: number
    rockImageUrl: string | null
    winSoundUrl: string | null
    mascotImageUrl: string | null
    mascotOnDustImageUrl: string | null
    mascotOnRockImageUrl: string | null
    mascotOnOilImageUrl: string | null
    mascotOnGoldImageUrl: string | null
    mascotOnDiamondImageUrl: string | null
    _count: GameConfigCountAggregateOutputType | null
    _avg: GameConfigAvgAggregateOutputType | null
    _sum: GameConfigSumAggregateOutputType | null
    _min: GameConfigMinAggregateOutputType | null
    _max: GameConfigMaxAggregateOutputType | null
  }

  type GetGameConfigGroupByPayload<T extends GameConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameConfigGroupByOutputType[P]>
            : GetScalarType<T[P], GameConfigGroupByOutputType[P]>
        }
      >
    >


  export type GameConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gameType?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    backgroundUrl?: boolean
    diamondImageUrl?: boolean
    dustImageUrl?: boolean
    goldImageUrl?: boolean
    defaultBid?: boolean
    bidAmounts?: boolean
    loseSoundUrl?: boolean
    movesPerRound?: boolean
    multDiamond?: boolean
    multGold?: boolean
    multOil?: boolean
    oilImageUrl?: boolean
    probDiamond?: boolean
    probDust?: boolean
    probGold?: boolean
    probOil?: boolean
    probRock?: boolean
    rockImageUrl?: boolean
    winSoundUrl?: boolean
    mascotImageUrl?: boolean
    mascotOnDustImageUrl?: boolean
    mascotOnRockImageUrl?: boolean
    mascotOnOilImageUrl?: boolean
    mascotOnGoldImageUrl?: boolean
    mascotOnDiamondImageUrl?: boolean
    Partner?: boolean | GameConfig$PartnerArgs<ExtArgs>
    GameSession?: boolean | GameConfig$GameSessionArgs<ExtArgs>
    _count?: boolean | GameConfigCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameConfig"]>

  export type GameConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gameType?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    backgroundUrl?: boolean
    diamondImageUrl?: boolean
    dustImageUrl?: boolean
    goldImageUrl?: boolean
    defaultBid?: boolean
    bidAmounts?: boolean
    loseSoundUrl?: boolean
    movesPerRound?: boolean
    multDiamond?: boolean
    multGold?: boolean
    multOil?: boolean
    oilImageUrl?: boolean
    probDiamond?: boolean
    probDust?: boolean
    probGold?: boolean
    probOil?: boolean
    probRock?: boolean
    rockImageUrl?: boolean
    winSoundUrl?: boolean
    mascotImageUrl?: boolean
    mascotOnDustImageUrl?: boolean
    mascotOnRockImageUrl?: boolean
    mascotOnOilImageUrl?: boolean
    mascotOnGoldImageUrl?: boolean
    mascotOnDiamondImageUrl?: boolean
    Partner?: boolean | GameConfig$PartnerArgs<ExtArgs>
  }, ExtArgs["result"]["gameConfig"]>

  export type GameConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    gameType?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    backgroundUrl?: boolean
    diamondImageUrl?: boolean
    dustImageUrl?: boolean
    goldImageUrl?: boolean
    defaultBid?: boolean
    bidAmounts?: boolean
    loseSoundUrl?: boolean
    movesPerRound?: boolean
    multDiamond?: boolean
    multGold?: boolean
    multOil?: boolean
    oilImageUrl?: boolean
    probDiamond?: boolean
    probDust?: boolean
    probGold?: boolean
    probOil?: boolean
    probRock?: boolean
    rockImageUrl?: boolean
    winSoundUrl?: boolean
    mascotImageUrl?: boolean
    mascotOnDustImageUrl?: boolean
    mascotOnRockImageUrl?: boolean
    mascotOnOilImageUrl?: boolean
    mascotOnGoldImageUrl?: boolean
    mascotOnDiamondImageUrl?: boolean
    Partner?: boolean | GameConfig$PartnerArgs<ExtArgs>
  }, ExtArgs["result"]["gameConfig"]>

  export type GameConfigSelectScalar = {
    id?: boolean
    name?: boolean
    gameType?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    backgroundUrl?: boolean
    diamondImageUrl?: boolean
    dustImageUrl?: boolean
    goldImageUrl?: boolean
    defaultBid?: boolean
    bidAmounts?: boolean
    loseSoundUrl?: boolean
    movesPerRound?: boolean
    multDiamond?: boolean
    multGold?: boolean
    multOil?: boolean
    oilImageUrl?: boolean
    probDiamond?: boolean
    probDust?: boolean
    probGold?: boolean
    probOil?: boolean
    probRock?: boolean
    rockImageUrl?: boolean
    winSoundUrl?: boolean
    mascotImageUrl?: boolean
    mascotOnDustImageUrl?: boolean
    mascotOnRockImageUrl?: boolean
    mascotOnOilImageUrl?: boolean
    mascotOnGoldImageUrl?: boolean
    mascotOnDiamondImageUrl?: boolean
  }

  export type GameConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "gameType" | "partnerId" | "createdAt" | "updatedAt" | "backgroundUrl" | "diamondImageUrl" | "dustImageUrl" | "goldImageUrl" | "defaultBid" | "bidAmounts" | "loseSoundUrl" | "movesPerRound" | "multDiamond" | "multGold" | "multOil" | "oilImageUrl" | "probDiamond" | "probDust" | "probGold" | "probOil" | "probRock" | "rockImageUrl" | "winSoundUrl" | "mascotImageUrl" | "mascotOnDustImageUrl" | "mascotOnRockImageUrl" | "mascotOnOilImageUrl" | "mascotOnGoldImageUrl" | "mascotOnDiamondImageUrl", ExtArgs["result"]["gameConfig"]>
  export type GameConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Partner?: boolean | GameConfig$PartnerArgs<ExtArgs>
    GameSession?: boolean | GameConfig$GameSessionArgs<ExtArgs>
    _count?: boolean | GameConfigCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Partner?: boolean | GameConfig$PartnerArgs<ExtArgs>
  }
  export type GameConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Partner?: boolean | GameConfig$PartnerArgs<ExtArgs>
  }

  export type $GameConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameConfig"
    objects: {
      Partner: Prisma.$PartnerPayload<ExtArgs> | null
      GameSession: Prisma.$GameSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      gameType: string
      partnerId: string | null
      createdAt: Date
      updatedAt: Date
      backgroundUrl: string | null
      diamondImageUrl: string | null
      dustImageUrl: string | null
      goldImageUrl: string | null
      defaultBid: number | null
      bidAmounts: number[]
      loseSoundUrl: string | null
      movesPerRound: number
      multDiamond: number
      multGold: number
      multOil: number
      oilImageUrl: string | null
      probDiamond: number
      probDust: number
      probGold: number
      probOil: number
      probRock: number
      rockImageUrl: string | null
      winSoundUrl: string | null
      mascotImageUrl: string | null
      mascotOnDustImageUrl: string | null
      mascotOnRockImageUrl: string | null
      mascotOnOilImageUrl: string | null
      mascotOnGoldImageUrl: string | null
      mascotOnDiamondImageUrl: string | null
    }, ExtArgs["result"]["gameConfig"]>
    composites: {}
  }

  type GameConfigGetPayload<S extends boolean | null | undefined | GameConfigDefaultArgs> = $Result.GetResult<Prisma.$GameConfigPayload, S>

  type GameConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameConfigCountAggregateInputType | true
    }

  export interface GameConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameConfig'], meta: { name: 'GameConfig' } }
    /**
     * Find zero or one GameConfig that matches the filter.
     * @param {GameConfigFindUniqueArgs} args - Arguments to find a GameConfig
     * @example
     * // Get one GameConfig
     * const gameConfig = await prisma.gameConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameConfigFindUniqueArgs>(args: SelectSubset<T, GameConfigFindUniqueArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameConfigFindUniqueOrThrowArgs} args - Arguments to find a GameConfig
     * @example
     * // Get one GameConfig
     * const gameConfig = await prisma.gameConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, GameConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigFindFirstArgs} args - Arguments to find a GameConfig
     * @example
     * // Get one GameConfig
     * const gameConfig = await prisma.gameConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameConfigFindFirstArgs>(args?: SelectSubset<T, GameConfigFindFirstArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigFindFirstOrThrowArgs} args - Arguments to find a GameConfig
     * @example
     * // Get one GameConfig
     * const gameConfig = await prisma.gameConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, GameConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameConfigs
     * const gameConfigs = await prisma.gameConfig.findMany()
     * 
     * // Get first 10 GameConfigs
     * const gameConfigs = await prisma.gameConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameConfigWithIdOnly = await prisma.gameConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameConfigFindManyArgs>(args?: SelectSubset<T, GameConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameConfig.
     * @param {GameConfigCreateArgs} args - Arguments to create a GameConfig.
     * @example
     * // Create one GameConfig
     * const GameConfig = await prisma.gameConfig.create({
     *   data: {
     *     // ... data to create a GameConfig
     *   }
     * })
     * 
     */
    create<T extends GameConfigCreateArgs>(args: SelectSubset<T, GameConfigCreateArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameConfigs.
     * @param {GameConfigCreateManyArgs} args - Arguments to create many GameConfigs.
     * @example
     * // Create many GameConfigs
     * const gameConfig = await prisma.gameConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameConfigCreateManyArgs>(args?: SelectSubset<T, GameConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameConfigs and returns the data saved in the database.
     * @param {GameConfigCreateManyAndReturnArgs} args - Arguments to create many GameConfigs.
     * @example
     * // Create many GameConfigs
     * const gameConfig = await prisma.gameConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameConfigs and only return the `id`
     * const gameConfigWithIdOnly = await prisma.gameConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, GameConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameConfig.
     * @param {GameConfigDeleteArgs} args - Arguments to delete one GameConfig.
     * @example
     * // Delete one GameConfig
     * const GameConfig = await prisma.gameConfig.delete({
     *   where: {
     *     // ... filter to delete one GameConfig
     *   }
     * })
     * 
     */
    delete<T extends GameConfigDeleteArgs>(args: SelectSubset<T, GameConfigDeleteArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameConfig.
     * @param {GameConfigUpdateArgs} args - Arguments to update one GameConfig.
     * @example
     * // Update one GameConfig
     * const gameConfig = await prisma.gameConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameConfigUpdateArgs>(args: SelectSubset<T, GameConfigUpdateArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameConfigs.
     * @param {GameConfigDeleteManyArgs} args - Arguments to filter GameConfigs to delete.
     * @example
     * // Delete a few GameConfigs
     * const { count } = await prisma.gameConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameConfigDeleteManyArgs>(args?: SelectSubset<T, GameConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameConfigs
     * const gameConfig = await prisma.gameConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameConfigUpdateManyArgs>(args: SelectSubset<T, GameConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameConfigs and returns the data updated in the database.
     * @param {GameConfigUpdateManyAndReturnArgs} args - Arguments to update many GameConfigs.
     * @example
     * // Update many GameConfigs
     * const gameConfig = await prisma.gameConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameConfigs and only return the `id`
     * const gameConfigWithIdOnly = await prisma.gameConfig.updateManyAndReturn({
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
    updateManyAndReturn<T extends GameConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, GameConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameConfig.
     * @param {GameConfigUpsertArgs} args - Arguments to update or create a GameConfig.
     * @example
     * // Update or create a GameConfig
     * const gameConfig = await prisma.gameConfig.upsert({
     *   create: {
     *     // ... data to create a GameConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameConfig we want to update
     *   }
     * })
     */
    upsert<T extends GameConfigUpsertArgs>(args: SelectSubset<T, GameConfigUpsertArgs<ExtArgs>>): Prisma__GameConfigClient<$Result.GetResult<Prisma.$GameConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigCountArgs} args - Arguments to filter GameConfigs to count.
     * @example
     * // Count the number of GameConfigs
     * const count = await prisma.gameConfig.count({
     *   where: {
     *     // ... the filter for the GameConfigs we want to count
     *   }
     * })
    **/
    count<T extends GameConfigCountArgs>(
      args?: Subset<T, GameConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GameConfigAggregateArgs>(args: Subset<T, GameConfigAggregateArgs>): Prisma.PrismaPromise<GetGameConfigAggregateType<T>>

    /**
     * Group by GameConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameConfigGroupByArgs} args - Group by arguments.
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
      T extends GameConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameConfigGroupByArgs['orderBy'] }
        : { orderBy?: GameConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GameConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameConfig model
   */
  readonly fields: GameConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Partner<T extends GameConfig$PartnerArgs<ExtArgs> = {}>(args?: Subset<T, GameConfig$PartnerArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    GameSession<T extends GameConfig$GameSessionArgs<ExtArgs> = {}>(args?: Subset<T, GameConfig$GameSessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the GameConfig model
   */
  interface GameConfigFieldRefs {
    readonly id: FieldRef<"GameConfig", 'String'>
    readonly name: FieldRef<"GameConfig", 'String'>
    readonly gameType: FieldRef<"GameConfig", 'String'>
    readonly partnerId: FieldRef<"GameConfig", 'String'>
    readonly createdAt: FieldRef<"GameConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"GameConfig", 'DateTime'>
    readonly backgroundUrl: FieldRef<"GameConfig", 'String'>
    readonly diamondImageUrl: FieldRef<"GameConfig", 'String'>
    readonly dustImageUrl: FieldRef<"GameConfig", 'String'>
    readonly goldImageUrl: FieldRef<"GameConfig", 'String'>
    readonly defaultBid: FieldRef<"GameConfig", 'Int'>
    readonly bidAmounts: FieldRef<"GameConfig", 'Int[]'>
    readonly loseSoundUrl: FieldRef<"GameConfig", 'String'>
    readonly movesPerRound: FieldRef<"GameConfig", 'Int'>
    readonly multDiamond: FieldRef<"GameConfig", 'Float'>
    readonly multGold: FieldRef<"GameConfig", 'Float'>
    readonly multOil: FieldRef<"GameConfig", 'Float'>
    readonly oilImageUrl: FieldRef<"GameConfig", 'String'>
    readonly probDiamond: FieldRef<"GameConfig", 'Int'>
    readonly probDust: FieldRef<"GameConfig", 'Int'>
    readonly probGold: FieldRef<"GameConfig", 'Int'>
    readonly probOil: FieldRef<"GameConfig", 'Int'>
    readonly probRock: FieldRef<"GameConfig", 'Int'>
    readonly rockImageUrl: FieldRef<"GameConfig", 'String'>
    readonly winSoundUrl: FieldRef<"GameConfig", 'String'>
    readonly mascotImageUrl: FieldRef<"GameConfig", 'String'>
    readonly mascotOnDustImageUrl: FieldRef<"GameConfig", 'String'>
    readonly mascotOnRockImageUrl: FieldRef<"GameConfig", 'String'>
    readonly mascotOnOilImageUrl: FieldRef<"GameConfig", 'String'>
    readonly mascotOnGoldImageUrl: FieldRef<"GameConfig", 'String'>
    readonly mascotOnDiamondImageUrl: FieldRef<"GameConfig", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GameConfig findUnique
   */
  export type GameConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * Filter, which GameConfig to fetch.
     */
    where: GameConfigWhereUniqueInput
  }

  /**
   * GameConfig findUniqueOrThrow
   */
  export type GameConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * Filter, which GameConfig to fetch.
     */
    where: GameConfigWhereUniqueInput
  }

  /**
   * GameConfig findFirst
   */
  export type GameConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * Filter, which GameConfig to fetch.
     */
    where?: GameConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameConfigs to fetch.
     */
    orderBy?: GameConfigOrderByWithRelationInput | GameConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameConfigs.
     */
    cursor?: GameConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameConfigs.
     */
    distinct?: GameConfigScalarFieldEnum | GameConfigScalarFieldEnum[]
  }

  /**
   * GameConfig findFirstOrThrow
   */
  export type GameConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * Filter, which GameConfig to fetch.
     */
    where?: GameConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameConfigs to fetch.
     */
    orderBy?: GameConfigOrderByWithRelationInput | GameConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameConfigs.
     */
    cursor?: GameConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameConfigs.
     */
    distinct?: GameConfigScalarFieldEnum | GameConfigScalarFieldEnum[]
  }

  /**
   * GameConfig findMany
   */
  export type GameConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * Filter, which GameConfigs to fetch.
     */
    where?: GameConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameConfigs to fetch.
     */
    orderBy?: GameConfigOrderByWithRelationInput | GameConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameConfigs.
     */
    cursor?: GameConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameConfigs.
     */
    skip?: number
    distinct?: GameConfigScalarFieldEnum | GameConfigScalarFieldEnum[]
  }

  /**
   * GameConfig create
   */
  export type GameConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a GameConfig.
     */
    data: XOR<GameConfigCreateInput, GameConfigUncheckedCreateInput>
  }

  /**
   * GameConfig createMany
   */
  export type GameConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameConfigs.
     */
    data: GameConfigCreateManyInput | GameConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameConfig createManyAndReturn
   */
  export type GameConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * The data used to create many GameConfigs.
     */
    data: GameConfigCreateManyInput | GameConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameConfig update
   */
  export type GameConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a GameConfig.
     */
    data: XOR<GameConfigUpdateInput, GameConfigUncheckedUpdateInput>
    /**
     * Choose, which GameConfig to update.
     */
    where: GameConfigWhereUniqueInput
  }

  /**
   * GameConfig updateMany
   */
  export type GameConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameConfigs.
     */
    data: XOR<GameConfigUpdateManyMutationInput, GameConfigUncheckedUpdateManyInput>
    /**
     * Filter which GameConfigs to update
     */
    where?: GameConfigWhereInput
    /**
     * Limit how many GameConfigs to update.
     */
    limit?: number
  }

  /**
   * GameConfig updateManyAndReturn
   */
  export type GameConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * The data used to update GameConfigs.
     */
    data: XOR<GameConfigUpdateManyMutationInput, GameConfigUncheckedUpdateManyInput>
    /**
     * Filter which GameConfigs to update
     */
    where?: GameConfigWhereInput
    /**
     * Limit how many GameConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameConfig upsert
   */
  export type GameConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the GameConfig to update in case it exists.
     */
    where: GameConfigWhereUniqueInput
    /**
     * In case the GameConfig found by the `where` argument doesn't exist, create a new GameConfig with this data.
     */
    create: XOR<GameConfigCreateInput, GameConfigUncheckedCreateInput>
    /**
     * In case the GameConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameConfigUpdateInput, GameConfigUncheckedUpdateInput>
  }

  /**
   * GameConfig delete
   */
  export type GameConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
    /**
     * Filter which GameConfig to delete.
     */
    where: GameConfigWhereUniqueInput
  }

  /**
   * GameConfig deleteMany
   */
  export type GameConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameConfigs to delete
     */
    where?: GameConfigWhereInput
    /**
     * Limit how many GameConfigs to delete.
     */
    limit?: number
  }

  /**
   * GameConfig.Partner
   */
  export type GameConfig$PartnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    where?: PartnerWhereInput
  }

  /**
   * GameConfig.GameSession
   */
  export type GameConfig$GameSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameSession
     */
    select?: GameSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameSession
     */
    omit?: GameSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameSessionInclude<ExtArgs> | null
    where?: GameSessionWhereInput
    orderBy?: GameSessionOrderByWithRelationInput | GameSessionOrderByWithRelationInput[]
    cursor?: GameSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GameSessionScalarFieldEnum | GameSessionScalarFieldEnum[]
  }

  /**
   * GameConfig without action
   */
  export type GameConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameConfig
     */
    select?: GameConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameConfig
     */
    omit?: GameConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameConfigInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    passwordResetToken: string | null
    passwordResetExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    passwordResetToken: string | null
    passwordResetExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    email: number
    password: number
    passwordResetToken: number
    passwordResetExpiry: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    passwordResetToken?: true
    passwordResetExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    passwordResetToken?: true
    passwordResetExpiry?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    passwordResetToken?: true
    passwordResetExpiry?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    email: string
    password: string
    passwordResetToken: string | null
    passwordResetExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "passwordResetToken" | "passwordResetExpiry" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      passwordResetToken: string | null
      passwordResetExpiry: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
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
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
    readonly passwordResetToken: FieldRef<"Admin", 'String'>
    readonly passwordResetExpiry: FieldRef<"Admin", 'DateTime'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
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


  export const PartnerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const GameSessionScalarFieldEnum: {
    id: 'id',
    playerIdentifier: 'playerIdentifier',
    gameConfigId: 'gameConfigId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GameSessionScalarFieldEnum = (typeof GameSessionScalarFieldEnum)[keyof typeof GameSessionScalarFieldEnum]


  export const AnalyticsEventScalarFieldEnum: {
    id: 'id',
    gameSessionId: 'gameSessionId',
    eventType: 'eventType',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type AnalyticsEventScalarFieldEnum = (typeof AnalyticsEventScalarFieldEnum)[keyof typeof AnalyticsEventScalarFieldEnum]


  export const EmbedTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    partnerId: 'partnerId',
    permissions: 'permissions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EmbedTokenScalarFieldEnum = (typeof EmbedTokenScalarFieldEnum)[keyof typeof EmbedTokenScalarFieldEnum]


  export const GameActionScalarFieldEnum: {
    id: 'id',
    gameSessionId: 'gameSessionId',
    actionType: 'actionType',
    payload: 'payload',
    createdAt: 'createdAt'
  };

  export type GameActionScalarFieldEnum = (typeof GameActionScalarFieldEnum)[keyof typeof GameActionScalarFieldEnum]


  export const GameConfigScalarFieldEnum: {
    id: 'id',
    name: 'name',
    gameType: 'gameType',
    partnerId: 'partnerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    backgroundUrl: 'backgroundUrl',
    diamondImageUrl: 'diamondImageUrl',
    dustImageUrl: 'dustImageUrl',
    goldImageUrl: 'goldImageUrl',
    defaultBid: 'defaultBid',
    bidAmounts: 'bidAmounts',
    loseSoundUrl: 'loseSoundUrl',
    movesPerRound: 'movesPerRound',
    multDiamond: 'multDiamond',
    multGold: 'multGold',
    multOil: 'multOil',
    oilImageUrl: 'oilImageUrl',
    probDiamond: 'probDiamond',
    probDust: 'probDust',
    probGold: 'probGold',
    probOil: 'probOil',
    probRock: 'probRock',
    rockImageUrl: 'rockImageUrl',
    winSoundUrl: 'winSoundUrl',
    mascotImageUrl: 'mascotImageUrl',
    mascotOnDustImageUrl: 'mascotOnDustImageUrl',
    mascotOnRockImageUrl: 'mascotOnRockImageUrl',
    mascotOnOilImageUrl: 'mascotOnOilImageUrl',
    mascotOnGoldImageUrl: 'mascotOnGoldImageUrl',
    mascotOnDiamondImageUrl: 'mascotOnDiamondImageUrl'
  };

  export type GameConfigScalarFieldEnum = (typeof GameConfigScalarFieldEnum)[keyof typeof GameConfigScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    passwordResetToken: 'passwordResetToken',
    passwordResetExpiry: 'passwordResetExpiry',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    EmbedToken?: EmbedTokenListRelationFilter
    GameConfig?: GameConfigListRelationFilter
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    EmbedToken?: EmbedTokenOrderByRelationAggregateInput
    GameConfig?: GameConfigOrderByRelationAggregateInput
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    EmbedToken?: EmbedTokenListRelationFilter
    GameConfig?: GameConfigListRelationFilter
  }, "id" | "name">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Partner"> | string
    name?: StringWithAggregatesFilter<"Partner"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
  }

  export type GameSessionWhereInput = {
    AND?: GameSessionWhereInput | GameSessionWhereInput[]
    OR?: GameSessionWhereInput[]
    NOT?: GameSessionWhereInput | GameSessionWhereInput[]
    id?: StringFilter<"GameSession"> | string
    playerIdentifier?: StringFilter<"GameSession"> | string
    gameConfigId?: StringFilter<"GameSession"> | string
    createdAt?: DateTimeFilter<"GameSession"> | Date | string
    updatedAt?: DateTimeFilter<"GameSession"> | Date | string
    AnalyticsEvent?: AnalyticsEventListRelationFilter
    GameAction?: GameActionListRelationFilter
    GameConfig?: XOR<GameConfigScalarRelationFilter, GameConfigWhereInput>
  }

  export type GameSessionOrderByWithRelationInput = {
    id?: SortOrder
    playerIdentifier?: SortOrder
    gameConfigId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    AnalyticsEvent?: AnalyticsEventOrderByRelationAggregateInput
    GameAction?: GameActionOrderByRelationAggregateInput
    GameConfig?: GameConfigOrderByWithRelationInput
  }

  export type GameSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameSessionWhereInput | GameSessionWhereInput[]
    OR?: GameSessionWhereInput[]
    NOT?: GameSessionWhereInput | GameSessionWhereInput[]
    playerIdentifier?: StringFilter<"GameSession"> | string
    gameConfigId?: StringFilter<"GameSession"> | string
    createdAt?: DateTimeFilter<"GameSession"> | Date | string
    updatedAt?: DateTimeFilter<"GameSession"> | Date | string
    AnalyticsEvent?: AnalyticsEventListRelationFilter
    GameAction?: GameActionListRelationFilter
    GameConfig?: XOR<GameConfigScalarRelationFilter, GameConfigWhereInput>
  }, "id">

  export type GameSessionOrderByWithAggregationInput = {
    id?: SortOrder
    playerIdentifier?: SortOrder
    gameConfigId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GameSessionCountOrderByAggregateInput
    _max?: GameSessionMaxOrderByAggregateInput
    _min?: GameSessionMinOrderByAggregateInput
  }

  export type GameSessionScalarWhereWithAggregatesInput = {
    AND?: GameSessionScalarWhereWithAggregatesInput | GameSessionScalarWhereWithAggregatesInput[]
    OR?: GameSessionScalarWhereWithAggregatesInput[]
    NOT?: GameSessionScalarWhereWithAggregatesInput | GameSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameSession"> | string
    playerIdentifier?: StringWithAggregatesFilter<"GameSession"> | string
    gameConfigId?: StringWithAggregatesFilter<"GameSession"> | string
    createdAt?: DateTimeWithAggregatesFilter<"GameSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GameSession"> | Date | string
  }

  export type AnalyticsEventWhereInput = {
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    gameSessionId?: StringFilter<"AnalyticsEvent"> | string
    eventType?: StringFilter<"AnalyticsEvent"> | string
    payload?: JsonFilter<"AnalyticsEvent">
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    GameSession?: XOR<GameSessionScalarRelationFilter, GameSessionWhereInput>
  }

  export type AnalyticsEventOrderByWithRelationInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    GameSession?: GameSessionOrderByWithRelationInput
  }

  export type AnalyticsEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    gameSessionId?: StringFilter<"AnalyticsEvent"> | string
    eventType?: StringFilter<"AnalyticsEvent"> | string
    payload?: JsonFilter<"AnalyticsEvent">
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
    GameSession?: XOR<GameSessionScalarRelationFilter, GameSessionWhereInput>
  }, "id">

  export type AnalyticsEventOrderByWithAggregationInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    _count?: AnalyticsEventCountOrderByAggregateInput
    _max?: AnalyticsEventMaxOrderByAggregateInput
    _min?: AnalyticsEventMinOrderByAggregateInput
  }

  export type AnalyticsEventScalarWhereWithAggregatesInput = {
    AND?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    OR?: AnalyticsEventScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    gameSessionId?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    eventType?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    payload?: JsonWithAggregatesFilter<"AnalyticsEvent">
    createdAt?: DateTimeWithAggregatesFilter<"AnalyticsEvent"> | Date | string
  }

  export type EmbedTokenWhereInput = {
    AND?: EmbedTokenWhereInput | EmbedTokenWhereInput[]
    OR?: EmbedTokenWhereInput[]
    NOT?: EmbedTokenWhereInput | EmbedTokenWhereInput[]
    id?: StringFilter<"EmbedToken"> | string
    token?: StringFilter<"EmbedToken"> | string
    partnerId?: StringFilter<"EmbedToken"> | string
    permissions?: JsonFilter<"EmbedToken">
    createdAt?: DateTimeFilter<"EmbedToken"> | Date | string
    updatedAt?: DateTimeFilter<"EmbedToken"> | Date | string
    Partner?: XOR<PartnerScalarRelationFilter, PartnerWhereInput>
  }

  export type EmbedTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    partnerId?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Partner?: PartnerOrderByWithRelationInput
  }

  export type EmbedTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: EmbedTokenWhereInput | EmbedTokenWhereInput[]
    OR?: EmbedTokenWhereInput[]
    NOT?: EmbedTokenWhereInput | EmbedTokenWhereInput[]
    partnerId?: StringFilter<"EmbedToken"> | string
    permissions?: JsonFilter<"EmbedToken">
    createdAt?: DateTimeFilter<"EmbedToken"> | Date | string
    updatedAt?: DateTimeFilter<"EmbedToken"> | Date | string
    Partner?: XOR<PartnerScalarRelationFilter, PartnerWhereInput>
  }, "id" | "token">

  export type EmbedTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    partnerId?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmbedTokenCountOrderByAggregateInput
    _max?: EmbedTokenMaxOrderByAggregateInput
    _min?: EmbedTokenMinOrderByAggregateInput
  }

  export type EmbedTokenScalarWhereWithAggregatesInput = {
    AND?: EmbedTokenScalarWhereWithAggregatesInput | EmbedTokenScalarWhereWithAggregatesInput[]
    OR?: EmbedTokenScalarWhereWithAggregatesInput[]
    NOT?: EmbedTokenScalarWhereWithAggregatesInput | EmbedTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EmbedToken"> | string
    token?: StringWithAggregatesFilter<"EmbedToken"> | string
    partnerId?: StringWithAggregatesFilter<"EmbedToken"> | string
    permissions?: JsonWithAggregatesFilter<"EmbedToken">
    createdAt?: DateTimeWithAggregatesFilter<"EmbedToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EmbedToken"> | Date | string
  }

  export type GameActionWhereInput = {
    AND?: GameActionWhereInput | GameActionWhereInput[]
    OR?: GameActionWhereInput[]
    NOT?: GameActionWhereInput | GameActionWhereInput[]
    id?: StringFilter<"GameAction"> | string
    gameSessionId?: StringFilter<"GameAction"> | string
    actionType?: StringFilter<"GameAction"> | string
    payload?: JsonFilter<"GameAction">
    createdAt?: DateTimeFilter<"GameAction"> | Date | string
    GameSession?: XOR<GameSessionScalarRelationFilter, GameSessionWhereInput>
  }

  export type GameActionOrderByWithRelationInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    actionType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    GameSession?: GameSessionOrderByWithRelationInput
  }

  export type GameActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameActionWhereInput | GameActionWhereInput[]
    OR?: GameActionWhereInput[]
    NOT?: GameActionWhereInput | GameActionWhereInput[]
    gameSessionId?: StringFilter<"GameAction"> | string
    actionType?: StringFilter<"GameAction"> | string
    payload?: JsonFilter<"GameAction">
    createdAt?: DateTimeFilter<"GameAction"> | Date | string
    GameSession?: XOR<GameSessionScalarRelationFilter, GameSessionWhereInput>
  }, "id">

  export type GameActionOrderByWithAggregationInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    actionType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
    _count?: GameActionCountOrderByAggregateInput
    _max?: GameActionMaxOrderByAggregateInput
    _min?: GameActionMinOrderByAggregateInput
  }

  export type GameActionScalarWhereWithAggregatesInput = {
    AND?: GameActionScalarWhereWithAggregatesInput | GameActionScalarWhereWithAggregatesInput[]
    OR?: GameActionScalarWhereWithAggregatesInput[]
    NOT?: GameActionScalarWhereWithAggregatesInput | GameActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameAction"> | string
    gameSessionId?: StringWithAggregatesFilter<"GameAction"> | string
    actionType?: StringWithAggregatesFilter<"GameAction"> | string
    payload?: JsonWithAggregatesFilter<"GameAction">
    createdAt?: DateTimeWithAggregatesFilter<"GameAction"> | Date | string
  }

  export type GameConfigWhereInput = {
    AND?: GameConfigWhereInput | GameConfigWhereInput[]
    OR?: GameConfigWhereInput[]
    NOT?: GameConfigWhereInput | GameConfigWhereInput[]
    id?: StringFilter<"GameConfig"> | string
    name?: StringFilter<"GameConfig"> | string
    gameType?: StringFilter<"GameConfig"> | string
    partnerId?: StringNullableFilter<"GameConfig"> | string | null
    createdAt?: DateTimeFilter<"GameConfig"> | Date | string
    updatedAt?: DateTimeFilter<"GameConfig"> | Date | string
    backgroundUrl?: StringNullableFilter<"GameConfig"> | string | null
    diamondImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    dustImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    goldImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    defaultBid?: IntNullableFilter<"GameConfig"> | number | null
    bidAmounts?: IntNullableListFilter<"GameConfig">
    loseSoundUrl?: StringNullableFilter<"GameConfig"> | string | null
    movesPerRound?: IntFilter<"GameConfig"> | number
    multDiamond?: FloatFilter<"GameConfig"> | number
    multGold?: FloatFilter<"GameConfig"> | number
    multOil?: FloatFilter<"GameConfig"> | number
    oilImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    probDiamond?: IntFilter<"GameConfig"> | number
    probDust?: IntFilter<"GameConfig"> | number
    probGold?: IntFilter<"GameConfig"> | number
    probOil?: IntFilter<"GameConfig"> | number
    probRock?: IntFilter<"GameConfig"> | number
    rockImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    winSoundUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnDustImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnRockImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnOilImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnGoldImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnDiamondImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    Partner?: XOR<PartnerNullableScalarRelationFilter, PartnerWhereInput> | null
    GameSession?: GameSessionListRelationFilter
  }

  export type GameConfigOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    partnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    backgroundUrl?: SortOrderInput | SortOrder
    diamondImageUrl?: SortOrderInput | SortOrder
    dustImageUrl?: SortOrderInput | SortOrder
    goldImageUrl?: SortOrderInput | SortOrder
    defaultBid?: SortOrderInput | SortOrder
    bidAmounts?: SortOrder
    loseSoundUrl?: SortOrderInput | SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    oilImageUrl?: SortOrderInput | SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
    rockImageUrl?: SortOrderInput | SortOrder
    winSoundUrl?: SortOrderInput | SortOrder
    mascotImageUrl?: SortOrderInput | SortOrder
    mascotOnDustImageUrl?: SortOrderInput | SortOrder
    mascotOnRockImageUrl?: SortOrderInput | SortOrder
    mascotOnOilImageUrl?: SortOrderInput | SortOrder
    mascotOnGoldImageUrl?: SortOrderInput | SortOrder
    mascotOnDiamondImageUrl?: SortOrderInput | SortOrder
    Partner?: PartnerOrderByWithRelationInput
    GameSession?: GameSessionOrderByRelationAggregateInput
  }

  export type GameConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    partnerId_name?: GameConfigPartnerIdNameCompoundUniqueInput
    AND?: GameConfigWhereInput | GameConfigWhereInput[]
    OR?: GameConfigWhereInput[]
    NOT?: GameConfigWhereInput | GameConfigWhereInput[]
    name?: StringFilter<"GameConfig"> | string
    gameType?: StringFilter<"GameConfig"> | string
    partnerId?: StringNullableFilter<"GameConfig"> | string | null
    createdAt?: DateTimeFilter<"GameConfig"> | Date | string
    updatedAt?: DateTimeFilter<"GameConfig"> | Date | string
    backgroundUrl?: StringNullableFilter<"GameConfig"> | string | null
    diamondImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    dustImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    goldImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    defaultBid?: IntNullableFilter<"GameConfig"> | number | null
    bidAmounts?: IntNullableListFilter<"GameConfig">
    loseSoundUrl?: StringNullableFilter<"GameConfig"> | string | null
    movesPerRound?: IntFilter<"GameConfig"> | number
    multDiamond?: FloatFilter<"GameConfig"> | number
    multGold?: FloatFilter<"GameConfig"> | number
    multOil?: FloatFilter<"GameConfig"> | number
    oilImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    probDiamond?: IntFilter<"GameConfig"> | number
    probDust?: IntFilter<"GameConfig"> | number
    probGold?: IntFilter<"GameConfig"> | number
    probOil?: IntFilter<"GameConfig"> | number
    probRock?: IntFilter<"GameConfig"> | number
    rockImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    winSoundUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnDustImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnRockImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnOilImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnGoldImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnDiamondImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    Partner?: XOR<PartnerNullableScalarRelationFilter, PartnerWhereInput> | null
    GameSession?: GameSessionListRelationFilter
  }, "id" | "partnerId_name">

  export type GameConfigOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    partnerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    backgroundUrl?: SortOrderInput | SortOrder
    diamondImageUrl?: SortOrderInput | SortOrder
    dustImageUrl?: SortOrderInput | SortOrder
    goldImageUrl?: SortOrderInput | SortOrder
    defaultBid?: SortOrderInput | SortOrder
    bidAmounts?: SortOrder
    loseSoundUrl?: SortOrderInput | SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    oilImageUrl?: SortOrderInput | SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
    rockImageUrl?: SortOrderInput | SortOrder
    winSoundUrl?: SortOrderInput | SortOrder
    mascotImageUrl?: SortOrderInput | SortOrder
    mascotOnDustImageUrl?: SortOrderInput | SortOrder
    mascotOnRockImageUrl?: SortOrderInput | SortOrder
    mascotOnOilImageUrl?: SortOrderInput | SortOrder
    mascotOnGoldImageUrl?: SortOrderInput | SortOrder
    mascotOnDiamondImageUrl?: SortOrderInput | SortOrder
    _count?: GameConfigCountOrderByAggregateInput
    _avg?: GameConfigAvgOrderByAggregateInput
    _max?: GameConfigMaxOrderByAggregateInput
    _min?: GameConfigMinOrderByAggregateInput
    _sum?: GameConfigSumOrderByAggregateInput
  }

  export type GameConfigScalarWhereWithAggregatesInput = {
    AND?: GameConfigScalarWhereWithAggregatesInput | GameConfigScalarWhereWithAggregatesInput[]
    OR?: GameConfigScalarWhereWithAggregatesInput[]
    NOT?: GameConfigScalarWhereWithAggregatesInput | GameConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameConfig"> | string
    name?: StringWithAggregatesFilter<"GameConfig"> | string
    gameType?: StringWithAggregatesFilter<"GameConfig"> | string
    partnerId?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GameConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GameConfig"> | Date | string
    backgroundUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    diamondImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    dustImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    goldImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    defaultBid?: IntNullableWithAggregatesFilter<"GameConfig"> | number | null
    bidAmounts?: IntNullableListFilter<"GameConfig">
    loseSoundUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    movesPerRound?: IntWithAggregatesFilter<"GameConfig"> | number
    multDiamond?: FloatWithAggregatesFilter<"GameConfig"> | number
    multGold?: FloatWithAggregatesFilter<"GameConfig"> | number
    multOil?: FloatWithAggregatesFilter<"GameConfig"> | number
    oilImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    probDiamond?: IntWithAggregatesFilter<"GameConfig"> | number
    probDust?: IntWithAggregatesFilter<"GameConfig"> | number
    probGold?: IntWithAggregatesFilter<"GameConfig"> | number
    probOil?: IntWithAggregatesFilter<"GameConfig"> | number
    probRock?: IntWithAggregatesFilter<"GameConfig"> | number
    rockImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    winSoundUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    mascotImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    mascotOnDustImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    mascotOnRockImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    mascotOnOilImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    mascotOnGoldImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
    mascotOnDiamondImageUrl?: StringNullableWithAggregatesFilter<"GameConfig"> | string | null
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
    passwordResetToken?: StringNullableFilter<"Admin"> | string | null
    passwordResetExpiry?: DateTimeNullableFilter<"Admin"> | Date | string | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    passwordResetToken?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    password?: StringFilter<"Admin"> | string
    passwordResetExpiry?: DateTimeNullableFilter<"Admin"> | Date | string | null
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }, "id" | "email" | "passwordResetToken">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
    passwordResetToken?: StringNullableWithAggregatesFilter<"Admin"> | string | null
    passwordResetExpiry?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type PartnerCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    EmbedToken?: EmbedTokenCreateNestedManyWithoutPartnerInput
    GameConfig?: GameConfigCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    EmbedToken?: EmbedTokenUncheckedCreateNestedManyWithoutPartnerInput
    GameConfig?: GameConfigUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    EmbedToken?: EmbedTokenUpdateManyWithoutPartnerNestedInput
    GameConfig?: GameConfigUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    EmbedToken?: EmbedTokenUncheckedUpdateManyWithoutPartnerNestedInput
    GameConfig?: GameConfigUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionCreateInput = {
    id?: string
    playerIdentifier: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutGameSessionInput
    GameAction?: GameActionCreateNestedManyWithoutGameSessionInput
    GameConfig: GameConfigCreateNestedOneWithoutGameSessionInput
  }

  export type GameSessionUncheckedCreateInput = {
    id?: string
    playerIdentifier: string
    gameConfigId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutGameSessionInput
    GameAction?: GameActionUncheckedCreateNestedManyWithoutGameSessionInput
  }

  export type GameSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutGameSessionNestedInput
    GameAction?: GameActionUpdateManyWithoutGameSessionNestedInput
    GameConfig?: GameConfigUpdateOneRequiredWithoutGameSessionNestedInput
  }

  export type GameSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    gameConfigId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutGameSessionNestedInput
    GameAction?: GameActionUncheckedUpdateManyWithoutGameSessionNestedInput
  }

  export type GameSessionCreateManyInput = {
    id?: string
    playerIdentifier: string
    gameConfigId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    gameConfigId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateInput = {
    id: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    GameSession: GameSessionCreateNestedOneWithoutAnalyticsEventInput
  }

  export type AnalyticsEventUncheckedCreateInput = {
    id: string
    gameSessionId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    GameSession?: GameSessionUpdateOneRequiredWithoutAnalyticsEventNestedInput
  }

  export type AnalyticsEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameSessionId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManyInput = {
    id: string
    gameSessionId: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameSessionId?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbedTokenCreateInput = {
    id: string
    token: string
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    Partner: PartnerCreateNestedOneWithoutEmbedTokenInput
  }

  export type EmbedTokenUncheckedCreateInput = {
    id: string
    token: string
    partnerId: string
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbedTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Partner?: PartnerUpdateOneRequiredWithoutEmbedTokenNestedInput
  }

  export type EmbedTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    partnerId?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbedTokenCreateManyInput = {
    id: string
    token: string
    partnerId: string
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbedTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbedTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    partnerId?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameActionCreateInput = {
    id: string
    actionType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    GameSession: GameSessionCreateNestedOneWithoutGameActionInput
  }

  export type GameActionUncheckedCreateInput = {
    id: string
    gameSessionId: string
    actionType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    GameSession?: GameSessionUpdateOneRequiredWithoutGameActionNestedInput
  }

  export type GameActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameSessionId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameActionCreateManyInput = {
    id: string
    gameSessionId: string
    actionType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    gameSessionId?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameConfigCreateInput = {
    id: string
    name?: string
    gameType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
    Partner?: PartnerCreateNestedOneWithoutGameConfigInput
    GameSession?: GameSessionCreateNestedManyWithoutGameConfigInput
  }

  export type GameConfigUncheckedCreateInput = {
    id: string
    name?: string
    gameType?: string
    partnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
    GameSession?: GameSessionUncheckedCreateNestedManyWithoutGameConfigInput
  }

  export type GameConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Partner?: PartnerUpdateOneWithoutGameConfigNestedInput
    GameSession?: GameSessionUpdateManyWithoutGameConfigNestedInput
  }

  export type GameConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    GameSession?: GameSessionUncheckedUpdateManyWithoutGameConfigNestedInput
  }

  export type GameConfigCreateManyInput = {
    id: string
    name?: string
    gameType?: string
    partnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
  }

  export type GameConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminCreateInput = {
    id?: string
    email: string
    password: string
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: string
    email: string
    password: string
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type EmbedTokenListRelationFilter = {
    every?: EmbedTokenWhereInput
    some?: EmbedTokenWhereInput
    none?: EmbedTokenWhereInput
  }

  export type GameConfigListRelationFilter = {
    every?: GameConfigWhereInput
    some?: GameConfigWhereInput
    none?: GameConfigWhereInput
  }

  export type EmbedTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
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

  export type AnalyticsEventListRelationFilter = {
    every?: AnalyticsEventWhereInput
    some?: AnalyticsEventWhereInput
    none?: AnalyticsEventWhereInput
  }

  export type GameActionListRelationFilter = {
    every?: GameActionWhereInput
    some?: GameActionWhereInput
    none?: GameActionWhereInput
  }

  export type GameConfigScalarRelationFilter = {
    is?: GameConfigWhereInput
    isNot?: GameConfigWhereInput
  }

  export type AnalyticsEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameSessionCountOrderByAggregateInput = {
    id?: SortOrder
    playerIdentifier?: SortOrder
    gameConfigId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    playerIdentifier?: SortOrder
    gameConfigId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameSessionMinOrderByAggregateInput = {
    id?: SortOrder
    playerIdentifier?: SortOrder
    gameConfigId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type GameSessionScalarRelationFilter = {
    is?: GameSessionWhereInput
    isNot?: GameSessionWhereInput
  }

  export type AnalyticsEventCountOrderByAggregateInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    eventType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventMaxOrderByAggregateInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventMinOrderByAggregateInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    eventType?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type PartnerScalarRelationFilter = {
    is?: PartnerWhereInput
    isNot?: PartnerWhereInput
  }

  export type EmbedTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    partnerId?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmbedTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmbedTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameActionCountOrderByAggregateInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    actionType?: SortOrder
    payload?: SortOrder
    createdAt?: SortOrder
  }

  export type GameActionMaxOrderByAggregateInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    actionType?: SortOrder
    createdAt?: SortOrder
  }

  export type GameActionMinOrderByAggregateInput = {
    id?: SortOrder
    gameSessionId?: SortOrder
    actionType?: SortOrder
    createdAt?: SortOrder
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PartnerNullableScalarRelationFilter = {
    is?: PartnerWhereInput | null
    isNot?: PartnerWhereInput | null
  }

  export type GameSessionListRelationFilter = {
    every?: GameSessionWhereInput
    some?: GameSessionWhereInput
    none?: GameSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GameSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameConfigPartnerIdNameCompoundUniqueInput = {
    partnerId: string
    name: string
  }

  export type GameConfigCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    backgroundUrl?: SortOrder
    diamondImageUrl?: SortOrder
    dustImageUrl?: SortOrder
    goldImageUrl?: SortOrder
    defaultBid?: SortOrder
    bidAmounts?: SortOrder
    loseSoundUrl?: SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    oilImageUrl?: SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
    rockImageUrl?: SortOrder
    winSoundUrl?: SortOrder
    mascotImageUrl?: SortOrder
    mascotOnDustImageUrl?: SortOrder
    mascotOnRockImageUrl?: SortOrder
    mascotOnOilImageUrl?: SortOrder
    mascotOnGoldImageUrl?: SortOrder
    mascotOnDiamondImageUrl?: SortOrder
  }

  export type GameConfigAvgOrderByAggregateInput = {
    defaultBid?: SortOrder
    bidAmounts?: SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
  }

  export type GameConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    backgroundUrl?: SortOrder
    diamondImageUrl?: SortOrder
    dustImageUrl?: SortOrder
    goldImageUrl?: SortOrder
    defaultBid?: SortOrder
    loseSoundUrl?: SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    oilImageUrl?: SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
    rockImageUrl?: SortOrder
    winSoundUrl?: SortOrder
    mascotImageUrl?: SortOrder
    mascotOnDustImageUrl?: SortOrder
    mascotOnRockImageUrl?: SortOrder
    mascotOnOilImageUrl?: SortOrder
    mascotOnGoldImageUrl?: SortOrder
    mascotOnDiamondImageUrl?: SortOrder
  }

  export type GameConfigMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    gameType?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    backgroundUrl?: SortOrder
    diamondImageUrl?: SortOrder
    dustImageUrl?: SortOrder
    goldImageUrl?: SortOrder
    defaultBid?: SortOrder
    loseSoundUrl?: SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    oilImageUrl?: SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
    rockImageUrl?: SortOrder
    winSoundUrl?: SortOrder
    mascotImageUrl?: SortOrder
    mascotOnDustImageUrl?: SortOrder
    mascotOnRockImageUrl?: SortOrder
    mascotOnOilImageUrl?: SortOrder
    mascotOnGoldImageUrl?: SortOrder
    mascotOnDiamondImageUrl?: SortOrder
  }

  export type GameConfigSumOrderByAggregateInput = {
    defaultBid?: SortOrder
    bidAmounts?: SortOrder
    movesPerRound?: SortOrder
    multDiamond?: SortOrder
    multGold?: SortOrder
    multOil?: SortOrder
    probDiamond?: SortOrder
    probDust?: SortOrder
    probGold?: SortOrder
    probOil?: SortOrder
    probRock?: SortOrder
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EmbedTokenCreateNestedManyWithoutPartnerInput = {
    create?: XOR<EmbedTokenCreateWithoutPartnerInput, EmbedTokenUncheckedCreateWithoutPartnerInput> | EmbedTokenCreateWithoutPartnerInput[] | EmbedTokenUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: EmbedTokenCreateOrConnectWithoutPartnerInput | EmbedTokenCreateOrConnectWithoutPartnerInput[]
    createMany?: EmbedTokenCreateManyPartnerInputEnvelope
    connect?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
  }

  export type GameConfigCreateNestedManyWithoutPartnerInput = {
    create?: XOR<GameConfigCreateWithoutPartnerInput, GameConfigUncheckedCreateWithoutPartnerInput> | GameConfigCreateWithoutPartnerInput[] | GameConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: GameConfigCreateOrConnectWithoutPartnerInput | GameConfigCreateOrConnectWithoutPartnerInput[]
    createMany?: GameConfigCreateManyPartnerInputEnvelope
    connect?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
  }

  export type EmbedTokenUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<EmbedTokenCreateWithoutPartnerInput, EmbedTokenUncheckedCreateWithoutPartnerInput> | EmbedTokenCreateWithoutPartnerInput[] | EmbedTokenUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: EmbedTokenCreateOrConnectWithoutPartnerInput | EmbedTokenCreateOrConnectWithoutPartnerInput[]
    createMany?: EmbedTokenCreateManyPartnerInputEnvelope
    connect?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
  }

  export type GameConfigUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<GameConfigCreateWithoutPartnerInput, GameConfigUncheckedCreateWithoutPartnerInput> | GameConfigCreateWithoutPartnerInput[] | GameConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: GameConfigCreateOrConnectWithoutPartnerInput | GameConfigCreateOrConnectWithoutPartnerInput[]
    createMany?: GameConfigCreateManyPartnerInputEnvelope
    connect?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EmbedTokenUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<EmbedTokenCreateWithoutPartnerInput, EmbedTokenUncheckedCreateWithoutPartnerInput> | EmbedTokenCreateWithoutPartnerInput[] | EmbedTokenUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: EmbedTokenCreateOrConnectWithoutPartnerInput | EmbedTokenCreateOrConnectWithoutPartnerInput[]
    upsert?: EmbedTokenUpsertWithWhereUniqueWithoutPartnerInput | EmbedTokenUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: EmbedTokenCreateManyPartnerInputEnvelope
    set?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    disconnect?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    delete?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    connect?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    update?: EmbedTokenUpdateWithWhereUniqueWithoutPartnerInput | EmbedTokenUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: EmbedTokenUpdateManyWithWhereWithoutPartnerInput | EmbedTokenUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: EmbedTokenScalarWhereInput | EmbedTokenScalarWhereInput[]
  }

  export type GameConfigUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<GameConfigCreateWithoutPartnerInput, GameConfigUncheckedCreateWithoutPartnerInput> | GameConfigCreateWithoutPartnerInput[] | GameConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: GameConfigCreateOrConnectWithoutPartnerInput | GameConfigCreateOrConnectWithoutPartnerInput[]
    upsert?: GameConfigUpsertWithWhereUniqueWithoutPartnerInput | GameConfigUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: GameConfigCreateManyPartnerInputEnvelope
    set?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    disconnect?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    delete?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    connect?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    update?: GameConfigUpdateWithWhereUniqueWithoutPartnerInput | GameConfigUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: GameConfigUpdateManyWithWhereWithoutPartnerInput | GameConfigUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: GameConfigScalarWhereInput | GameConfigScalarWhereInput[]
  }

  export type EmbedTokenUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<EmbedTokenCreateWithoutPartnerInput, EmbedTokenUncheckedCreateWithoutPartnerInput> | EmbedTokenCreateWithoutPartnerInput[] | EmbedTokenUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: EmbedTokenCreateOrConnectWithoutPartnerInput | EmbedTokenCreateOrConnectWithoutPartnerInput[]
    upsert?: EmbedTokenUpsertWithWhereUniqueWithoutPartnerInput | EmbedTokenUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: EmbedTokenCreateManyPartnerInputEnvelope
    set?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    disconnect?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    delete?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    connect?: EmbedTokenWhereUniqueInput | EmbedTokenWhereUniqueInput[]
    update?: EmbedTokenUpdateWithWhereUniqueWithoutPartnerInput | EmbedTokenUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: EmbedTokenUpdateManyWithWhereWithoutPartnerInput | EmbedTokenUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: EmbedTokenScalarWhereInput | EmbedTokenScalarWhereInput[]
  }

  export type GameConfigUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<GameConfigCreateWithoutPartnerInput, GameConfigUncheckedCreateWithoutPartnerInput> | GameConfigCreateWithoutPartnerInput[] | GameConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: GameConfigCreateOrConnectWithoutPartnerInput | GameConfigCreateOrConnectWithoutPartnerInput[]
    upsert?: GameConfigUpsertWithWhereUniqueWithoutPartnerInput | GameConfigUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: GameConfigCreateManyPartnerInputEnvelope
    set?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    disconnect?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    delete?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    connect?: GameConfigWhereUniqueInput | GameConfigWhereUniqueInput[]
    update?: GameConfigUpdateWithWhereUniqueWithoutPartnerInput | GameConfigUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: GameConfigUpdateManyWithWhereWithoutPartnerInput | GameConfigUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: GameConfigScalarWhereInput | GameConfigScalarWhereInput[]
  }

  export type AnalyticsEventCreateNestedManyWithoutGameSessionInput = {
    create?: XOR<AnalyticsEventCreateWithoutGameSessionInput, AnalyticsEventUncheckedCreateWithoutGameSessionInput> | AnalyticsEventCreateWithoutGameSessionInput[] | AnalyticsEventUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutGameSessionInput | AnalyticsEventCreateOrConnectWithoutGameSessionInput[]
    createMany?: AnalyticsEventCreateManyGameSessionInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type GameActionCreateNestedManyWithoutGameSessionInput = {
    create?: XOR<GameActionCreateWithoutGameSessionInput, GameActionUncheckedCreateWithoutGameSessionInput> | GameActionCreateWithoutGameSessionInput[] | GameActionUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: GameActionCreateOrConnectWithoutGameSessionInput | GameActionCreateOrConnectWithoutGameSessionInput[]
    createMany?: GameActionCreateManyGameSessionInputEnvelope
    connect?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
  }

  export type GameConfigCreateNestedOneWithoutGameSessionInput = {
    create?: XOR<GameConfigCreateWithoutGameSessionInput, GameConfigUncheckedCreateWithoutGameSessionInput>
    connectOrCreate?: GameConfigCreateOrConnectWithoutGameSessionInput
    connect?: GameConfigWhereUniqueInput
  }

  export type AnalyticsEventUncheckedCreateNestedManyWithoutGameSessionInput = {
    create?: XOR<AnalyticsEventCreateWithoutGameSessionInput, AnalyticsEventUncheckedCreateWithoutGameSessionInput> | AnalyticsEventCreateWithoutGameSessionInput[] | AnalyticsEventUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutGameSessionInput | AnalyticsEventCreateOrConnectWithoutGameSessionInput[]
    createMany?: AnalyticsEventCreateManyGameSessionInputEnvelope
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
  }

  export type GameActionUncheckedCreateNestedManyWithoutGameSessionInput = {
    create?: XOR<GameActionCreateWithoutGameSessionInput, GameActionUncheckedCreateWithoutGameSessionInput> | GameActionCreateWithoutGameSessionInput[] | GameActionUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: GameActionCreateOrConnectWithoutGameSessionInput | GameActionCreateOrConnectWithoutGameSessionInput[]
    createMany?: GameActionCreateManyGameSessionInputEnvelope
    connect?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
  }

  export type AnalyticsEventUpdateManyWithoutGameSessionNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutGameSessionInput, AnalyticsEventUncheckedCreateWithoutGameSessionInput> | AnalyticsEventCreateWithoutGameSessionInput[] | AnalyticsEventUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutGameSessionInput | AnalyticsEventCreateOrConnectWithoutGameSessionInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutGameSessionInput | AnalyticsEventUpsertWithWhereUniqueWithoutGameSessionInput[]
    createMany?: AnalyticsEventCreateManyGameSessionInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutGameSessionInput | AnalyticsEventUpdateWithWhereUniqueWithoutGameSessionInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutGameSessionInput | AnalyticsEventUpdateManyWithWhereWithoutGameSessionInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type GameActionUpdateManyWithoutGameSessionNestedInput = {
    create?: XOR<GameActionCreateWithoutGameSessionInput, GameActionUncheckedCreateWithoutGameSessionInput> | GameActionCreateWithoutGameSessionInput[] | GameActionUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: GameActionCreateOrConnectWithoutGameSessionInput | GameActionCreateOrConnectWithoutGameSessionInput[]
    upsert?: GameActionUpsertWithWhereUniqueWithoutGameSessionInput | GameActionUpsertWithWhereUniqueWithoutGameSessionInput[]
    createMany?: GameActionCreateManyGameSessionInputEnvelope
    set?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    disconnect?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    delete?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    connect?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    update?: GameActionUpdateWithWhereUniqueWithoutGameSessionInput | GameActionUpdateWithWhereUniqueWithoutGameSessionInput[]
    updateMany?: GameActionUpdateManyWithWhereWithoutGameSessionInput | GameActionUpdateManyWithWhereWithoutGameSessionInput[]
    deleteMany?: GameActionScalarWhereInput | GameActionScalarWhereInput[]
  }

  export type GameConfigUpdateOneRequiredWithoutGameSessionNestedInput = {
    create?: XOR<GameConfigCreateWithoutGameSessionInput, GameConfigUncheckedCreateWithoutGameSessionInput>
    connectOrCreate?: GameConfigCreateOrConnectWithoutGameSessionInput
    upsert?: GameConfigUpsertWithoutGameSessionInput
    connect?: GameConfigWhereUniqueInput
    update?: XOR<XOR<GameConfigUpdateToOneWithWhereWithoutGameSessionInput, GameConfigUpdateWithoutGameSessionInput>, GameConfigUncheckedUpdateWithoutGameSessionInput>
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutGameSessionNestedInput = {
    create?: XOR<AnalyticsEventCreateWithoutGameSessionInput, AnalyticsEventUncheckedCreateWithoutGameSessionInput> | AnalyticsEventCreateWithoutGameSessionInput[] | AnalyticsEventUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: AnalyticsEventCreateOrConnectWithoutGameSessionInput | AnalyticsEventCreateOrConnectWithoutGameSessionInput[]
    upsert?: AnalyticsEventUpsertWithWhereUniqueWithoutGameSessionInput | AnalyticsEventUpsertWithWhereUniqueWithoutGameSessionInput[]
    createMany?: AnalyticsEventCreateManyGameSessionInputEnvelope
    set?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    disconnect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    delete?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    connect?: AnalyticsEventWhereUniqueInput | AnalyticsEventWhereUniqueInput[]
    update?: AnalyticsEventUpdateWithWhereUniqueWithoutGameSessionInput | AnalyticsEventUpdateWithWhereUniqueWithoutGameSessionInput[]
    updateMany?: AnalyticsEventUpdateManyWithWhereWithoutGameSessionInput | AnalyticsEventUpdateManyWithWhereWithoutGameSessionInput[]
    deleteMany?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
  }

  export type GameActionUncheckedUpdateManyWithoutGameSessionNestedInput = {
    create?: XOR<GameActionCreateWithoutGameSessionInput, GameActionUncheckedCreateWithoutGameSessionInput> | GameActionCreateWithoutGameSessionInput[] | GameActionUncheckedCreateWithoutGameSessionInput[]
    connectOrCreate?: GameActionCreateOrConnectWithoutGameSessionInput | GameActionCreateOrConnectWithoutGameSessionInput[]
    upsert?: GameActionUpsertWithWhereUniqueWithoutGameSessionInput | GameActionUpsertWithWhereUniqueWithoutGameSessionInput[]
    createMany?: GameActionCreateManyGameSessionInputEnvelope
    set?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    disconnect?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    delete?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    connect?: GameActionWhereUniqueInput | GameActionWhereUniqueInput[]
    update?: GameActionUpdateWithWhereUniqueWithoutGameSessionInput | GameActionUpdateWithWhereUniqueWithoutGameSessionInput[]
    updateMany?: GameActionUpdateManyWithWhereWithoutGameSessionInput | GameActionUpdateManyWithWhereWithoutGameSessionInput[]
    deleteMany?: GameActionScalarWhereInput | GameActionScalarWhereInput[]
  }

  export type GameSessionCreateNestedOneWithoutAnalyticsEventInput = {
    create?: XOR<GameSessionCreateWithoutAnalyticsEventInput, GameSessionUncheckedCreateWithoutAnalyticsEventInput>
    connectOrCreate?: GameSessionCreateOrConnectWithoutAnalyticsEventInput
    connect?: GameSessionWhereUniqueInput
  }

  export type GameSessionUpdateOneRequiredWithoutAnalyticsEventNestedInput = {
    create?: XOR<GameSessionCreateWithoutAnalyticsEventInput, GameSessionUncheckedCreateWithoutAnalyticsEventInput>
    connectOrCreate?: GameSessionCreateOrConnectWithoutAnalyticsEventInput
    upsert?: GameSessionUpsertWithoutAnalyticsEventInput
    connect?: GameSessionWhereUniqueInput
    update?: XOR<XOR<GameSessionUpdateToOneWithWhereWithoutAnalyticsEventInput, GameSessionUpdateWithoutAnalyticsEventInput>, GameSessionUncheckedUpdateWithoutAnalyticsEventInput>
  }

  export type PartnerCreateNestedOneWithoutEmbedTokenInput = {
    create?: XOR<PartnerCreateWithoutEmbedTokenInput, PartnerUncheckedCreateWithoutEmbedTokenInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutEmbedTokenInput
    connect?: PartnerWhereUniqueInput
  }

  export type PartnerUpdateOneRequiredWithoutEmbedTokenNestedInput = {
    create?: XOR<PartnerCreateWithoutEmbedTokenInput, PartnerUncheckedCreateWithoutEmbedTokenInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutEmbedTokenInput
    upsert?: PartnerUpsertWithoutEmbedTokenInput
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutEmbedTokenInput, PartnerUpdateWithoutEmbedTokenInput>, PartnerUncheckedUpdateWithoutEmbedTokenInput>
  }

  export type GameSessionCreateNestedOneWithoutGameActionInput = {
    create?: XOR<GameSessionCreateWithoutGameActionInput, GameSessionUncheckedCreateWithoutGameActionInput>
    connectOrCreate?: GameSessionCreateOrConnectWithoutGameActionInput
    connect?: GameSessionWhereUniqueInput
  }

  export type GameSessionUpdateOneRequiredWithoutGameActionNestedInput = {
    create?: XOR<GameSessionCreateWithoutGameActionInput, GameSessionUncheckedCreateWithoutGameActionInput>
    connectOrCreate?: GameSessionCreateOrConnectWithoutGameActionInput
    upsert?: GameSessionUpsertWithoutGameActionInput
    connect?: GameSessionWhereUniqueInput
    update?: XOR<XOR<GameSessionUpdateToOneWithWhereWithoutGameActionInput, GameSessionUpdateWithoutGameActionInput>, GameSessionUncheckedUpdateWithoutGameActionInput>
  }

  export type GameConfigCreatebidAmountsInput = {
    set: number[]
  }

  export type PartnerCreateNestedOneWithoutGameConfigInput = {
    create?: XOR<PartnerCreateWithoutGameConfigInput, PartnerUncheckedCreateWithoutGameConfigInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutGameConfigInput
    connect?: PartnerWhereUniqueInput
  }

  export type GameSessionCreateNestedManyWithoutGameConfigInput = {
    create?: XOR<GameSessionCreateWithoutGameConfigInput, GameSessionUncheckedCreateWithoutGameConfigInput> | GameSessionCreateWithoutGameConfigInput[] | GameSessionUncheckedCreateWithoutGameConfigInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutGameConfigInput | GameSessionCreateOrConnectWithoutGameConfigInput[]
    createMany?: GameSessionCreateManyGameConfigInputEnvelope
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
  }

  export type GameSessionUncheckedCreateNestedManyWithoutGameConfigInput = {
    create?: XOR<GameSessionCreateWithoutGameConfigInput, GameSessionUncheckedCreateWithoutGameConfigInput> | GameSessionCreateWithoutGameConfigInput[] | GameSessionUncheckedCreateWithoutGameConfigInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutGameConfigInput | GameSessionCreateOrConnectWithoutGameConfigInput[]
    createMany?: GameSessionCreateManyGameConfigInputEnvelope
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GameConfigUpdatebidAmountsInput = {
    set?: number[]
    push?: number | number[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PartnerUpdateOneWithoutGameConfigNestedInput = {
    create?: XOR<PartnerCreateWithoutGameConfigInput, PartnerUncheckedCreateWithoutGameConfigInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutGameConfigInput
    upsert?: PartnerUpsertWithoutGameConfigInput
    disconnect?: PartnerWhereInput | boolean
    delete?: PartnerWhereInput | boolean
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutGameConfigInput, PartnerUpdateWithoutGameConfigInput>, PartnerUncheckedUpdateWithoutGameConfigInput>
  }

  export type GameSessionUpdateManyWithoutGameConfigNestedInput = {
    create?: XOR<GameSessionCreateWithoutGameConfigInput, GameSessionUncheckedCreateWithoutGameConfigInput> | GameSessionCreateWithoutGameConfigInput[] | GameSessionUncheckedCreateWithoutGameConfigInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutGameConfigInput | GameSessionCreateOrConnectWithoutGameConfigInput[]
    upsert?: GameSessionUpsertWithWhereUniqueWithoutGameConfigInput | GameSessionUpsertWithWhereUniqueWithoutGameConfigInput[]
    createMany?: GameSessionCreateManyGameConfigInputEnvelope
    set?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    disconnect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    delete?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    update?: GameSessionUpdateWithWhereUniqueWithoutGameConfigInput | GameSessionUpdateWithWhereUniqueWithoutGameConfigInput[]
    updateMany?: GameSessionUpdateManyWithWhereWithoutGameConfigInput | GameSessionUpdateManyWithWhereWithoutGameConfigInput[]
    deleteMany?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
  }

  export type GameSessionUncheckedUpdateManyWithoutGameConfigNestedInput = {
    create?: XOR<GameSessionCreateWithoutGameConfigInput, GameSessionUncheckedCreateWithoutGameConfigInput> | GameSessionCreateWithoutGameConfigInput[] | GameSessionUncheckedCreateWithoutGameConfigInput[]
    connectOrCreate?: GameSessionCreateOrConnectWithoutGameConfigInput | GameSessionCreateOrConnectWithoutGameConfigInput[]
    upsert?: GameSessionUpsertWithWhereUniqueWithoutGameConfigInput | GameSessionUpsertWithWhereUniqueWithoutGameConfigInput[]
    createMany?: GameSessionCreateManyGameConfigInputEnvelope
    set?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    disconnect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    delete?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    connect?: GameSessionWhereUniqueInput | GameSessionWhereUniqueInput[]
    update?: GameSessionUpdateWithWhereUniqueWithoutGameConfigInput | GameSessionUpdateWithWhereUniqueWithoutGameConfigInput[]
    updateMany?: GameSessionUpdateManyWithWhereWithoutGameConfigInput | GameSessionUpdateManyWithWhereWithoutGameConfigInput[]
    deleteMany?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EmbedTokenCreateWithoutPartnerInput = {
    id: string
    token: string
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbedTokenUncheckedCreateWithoutPartnerInput = {
    id: string
    token: string
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmbedTokenCreateOrConnectWithoutPartnerInput = {
    where: EmbedTokenWhereUniqueInput
    create: XOR<EmbedTokenCreateWithoutPartnerInput, EmbedTokenUncheckedCreateWithoutPartnerInput>
  }

  export type EmbedTokenCreateManyPartnerInputEnvelope = {
    data: EmbedTokenCreateManyPartnerInput | EmbedTokenCreateManyPartnerInput[]
    skipDuplicates?: boolean
  }

  export type GameConfigCreateWithoutPartnerInput = {
    id: string
    name?: string
    gameType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
    GameSession?: GameSessionCreateNestedManyWithoutGameConfigInput
  }

  export type GameConfigUncheckedCreateWithoutPartnerInput = {
    id: string
    name?: string
    gameType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
    GameSession?: GameSessionUncheckedCreateNestedManyWithoutGameConfigInput
  }

  export type GameConfigCreateOrConnectWithoutPartnerInput = {
    where: GameConfigWhereUniqueInput
    create: XOR<GameConfigCreateWithoutPartnerInput, GameConfigUncheckedCreateWithoutPartnerInput>
  }

  export type GameConfigCreateManyPartnerInputEnvelope = {
    data: GameConfigCreateManyPartnerInput | GameConfigCreateManyPartnerInput[]
    skipDuplicates?: boolean
  }

  export type EmbedTokenUpsertWithWhereUniqueWithoutPartnerInput = {
    where: EmbedTokenWhereUniqueInput
    update: XOR<EmbedTokenUpdateWithoutPartnerInput, EmbedTokenUncheckedUpdateWithoutPartnerInput>
    create: XOR<EmbedTokenCreateWithoutPartnerInput, EmbedTokenUncheckedCreateWithoutPartnerInput>
  }

  export type EmbedTokenUpdateWithWhereUniqueWithoutPartnerInput = {
    where: EmbedTokenWhereUniqueInput
    data: XOR<EmbedTokenUpdateWithoutPartnerInput, EmbedTokenUncheckedUpdateWithoutPartnerInput>
  }

  export type EmbedTokenUpdateManyWithWhereWithoutPartnerInput = {
    where: EmbedTokenScalarWhereInput
    data: XOR<EmbedTokenUpdateManyMutationInput, EmbedTokenUncheckedUpdateManyWithoutPartnerInput>
  }

  export type EmbedTokenScalarWhereInput = {
    AND?: EmbedTokenScalarWhereInput | EmbedTokenScalarWhereInput[]
    OR?: EmbedTokenScalarWhereInput[]
    NOT?: EmbedTokenScalarWhereInput | EmbedTokenScalarWhereInput[]
    id?: StringFilter<"EmbedToken"> | string
    token?: StringFilter<"EmbedToken"> | string
    partnerId?: StringFilter<"EmbedToken"> | string
    permissions?: JsonFilter<"EmbedToken">
    createdAt?: DateTimeFilter<"EmbedToken"> | Date | string
    updatedAt?: DateTimeFilter<"EmbedToken"> | Date | string
  }

  export type GameConfigUpsertWithWhereUniqueWithoutPartnerInput = {
    where: GameConfigWhereUniqueInput
    update: XOR<GameConfigUpdateWithoutPartnerInput, GameConfigUncheckedUpdateWithoutPartnerInput>
    create: XOR<GameConfigCreateWithoutPartnerInput, GameConfigUncheckedCreateWithoutPartnerInput>
  }

  export type GameConfigUpdateWithWhereUniqueWithoutPartnerInput = {
    where: GameConfigWhereUniqueInput
    data: XOR<GameConfigUpdateWithoutPartnerInput, GameConfigUncheckedUpdateWithoutPartnerInput>
  }

  export type GameConfigUpdateManyWithWhereWithoutPartnerInput = {
    where: GameConfigScalarWhereInput
    data: XOR<GameConfigUpdateManyMutationInput, GameConfigUncheckedUpdateManyWithoutPartnerInput>
  }

  export type GameConfigScalarWhereInput = {
    AND?: GameConfigScalarWhereInput | GameConfigScalarWhereInput[]
    OR?: GameConfigScalarWhereInput[]
    NOT?: GameConfigScalarWhereInput | GameConfigScalarWhereInput[]
    id?: StringFilter<"GameConfig"> | string
    name?: StringFilter<"GameConfig"> | string
    gameType?: StringFilter<"GameConfig"> | string
    partnerId?: StringNullableFilter<"GameConfig"> | string | null
    createdAt?: DateTimeFilter<"GameConfig"> | Date | string
    updatedAt?: DateTimeFilter<"GameConfig"> | Date | string
    backgroundUrl?: StringNullableFilter<"GameConfig"> | string | null
    diamondImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    dustImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    goldImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    defaultBid?: IntNullableFilter<"GameConfig"> | number | null
    bidAmounts?: IntNullableListFilter<"GameConfig">
    loseSoundUrl?: StringNullableFilter<"GameConfig"> | string | null
    movesPerRound?: IntFilter<"GameConfig"> | number
    multDiamond?: FloatFilter<"GameConfig"> | number
    multGold?: FloatFilter<"GameConfig"> | number
    multOil?: FloatFilter<"GameConfig"> | number
    oilImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    probDiamond?: IntFilter<"GameConfig"> | number
    probDust?: IntFilter<"GameConfig"> | number
    probGold?: IntFilter<"GameConfig"> | number
    probOil?: IntFilter<"GameConfig"> | number
    probRock?: IntFilter<"GameConfig"> | number
    rockImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    winSoundUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnDustImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnRockImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnOilImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnGoldImageUrl?: StringNullableFilter<"GameConfig"> | string | null
    mascotOnDiamondImageUrl?: StringNullableFilter<"GameConfig"> | string | null
  }

  export type AnalyticsEventCreateWithoutGameSessionInput = {
    id: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUncheckedCreateWithoutGameSessionInput = {
    id: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventCreateOrConnectWithoutGameSessionInput = {
    where: AnalyticsEventWhereUniqueInput
    create: XOR<AnalyticsEventCreateWithoutGameSessionInput, AnalyticsEventUncheckedCreateWithoutGameSessionInput>
  }

  export type AnalyticsEventCreateManyGameSessionInputEnvelope = {
    data: AnalyticsEventCreateManyGameSessionInput | AnalyticsEventCreateManyGameSessionInput[]
    skipDuplicates?: boolean
  }

  export type GameActionCreateWithoutGameSessionInput = {
    id: string
    actionType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameActionUncheckedCreateWithoutGameSessionInput = {
    id: string
    actionType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameActionCreateOrConnectWithoutGameSessionInput = {
    where: GameActionWhereUniqueInput
    create: XOR<GameActionCreateWithoutGameSessionInput, GameActionUncheckedCreateWithoutGameSessionInput>
  }

  export type GameActionCreateManyGameSessionInputEnvelope = {
    data: GameActionCreateManyGameSessionInput | GameActionCreateManyGameSessionInput[]
    skipDuplicates?: boolean
  }

  export type GameConfigCreateWithoutGameSessionInput = {
    id: string
    name?: string
    gameType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
    Partner?: PartnerCreateNestedOneWithoutGameConfigInput
  }

  export type GameConfigUncheckedCreateWithoutGameSessionInput = {
    id: string
    name?: string
    gameType?: string
    partnerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
  }

  export type GameConfigCreateOrConnectWithoutGameSessionInput = {
    where: GameConfigWhereUniqueInput
    create: XOR<GameConfigCreateWithoutGameSessionInput, GameConfigUncheckedCreateWithoutGameSessionInput>
  }

  export type AnalyticsEventUpsertWithWhereUniqueWithoutGameSessionInput = {
    where: AnalyticsEventWhereUniqueInput
    update: XOR<AnalyticsEventUpdateWithoutGameSessionInput, AnalyticsEventUncheckedUpdateWithoutGameSessionInput>
    create: XOR<AnalyticsEventCreateWithoutGameSessionInput, AnalyticsEventUncheckedCreateWithoutGameSessionInput>
  }

  export type AnalyticsEventUpdateWithWhereUniqueWithoutGameSessionInput = {
    where: AnalyticsEventWhereUniqueInput
    data: XOR<AnalyticsEventUpdateWithoutGameSessionInput, AnalyticsEventUncheckedUpdateWithoutGameSessionInput>
  }

  export type AnalyticsEventUpdateManyWithWhereWithoutGameSessionInput = {
    where: AnalyticsEventScalarWhereInput
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyWithoutGameSessionInput>
  }

  export type AnalyticsEventScalarWhereInput = {
    AND?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    OR?: AnalyticsEventScalarWhereInput[]
    NOT?: AnalyticsEventScalarWhereInput | AnalyticsEventScalarWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    gameSessionId?: StringFilter<"AnalyticsEvent"> | string
    eventType?: StringFilter<"AnalyticsEvent"> | string
    payload?: JsonFilter<"AnalyticsEvent">
    createdAt?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }

  export type GameActionUpsertWithWhereUniqueWithoutGameSessionInput = {
    where: GameActionWhereUniqueInput
    update: XOR<GameActionUpdateWithoutGameSessionInput, GameActionUncheckedUpdateWithoutGameSessionInput>
    create: XOR<GameActionCreateWithoutGameSessionInput, GameActionUncheckedCreateWithoutGameSessionInput>
  }

  export type GameActionUpdateWithWhereUniqueWithoutGameSessionInput = {
    where: GameActionWhereUniqueInput
    data: XOR<GameActionUpdateWithoutGameSessionInput, GameActionUncheckedUpdateWithoutGameSessionInput>
  }

  export type GameActionUpdateManyWithWhereWithoutGameSessionInput = {
    where: GameActionScalarWhereInput
    data: XOR<GameActionUpdateManyMutationInput, GameActionUncheckedUpdateManyWithoutGameSessionInput>
  }

  export type GameActionScalarWhereInput = {
    AND?: GameActionScalarWhereInput | GameActionScalarWhereInput[]
    OR?: GameActionScalarWhereInput[]
    NOT?: GameActionScalarWhereInput | GameActionScalarWhereInput[]
    id?: StringFilter<"GameAction"> | string
    gameSessionId?: StringFilter<"GameAction"> | string
    actionType?: StringFilter<"GameAction"> | string
    payload?: JsonFilter<"GameAction">
    createdAt?: DateTimeFilter<"GameAction"> | Date | string
  }

  export type GameConfigUpsertWithoutGameSessionInput = {
    update: XOR<GameConfigUpdateWithoutGameSessionInput, GameConfigUncheckedUpdateWithoutGameSessionInput>
    create: XOR<GameConfigCreateWithoutGameSessionInput, GameConfigUncheckedCreateWithoutGameSessionInput>
    where?: GameConfigWhereInput
  }

  export type GameConfigUpdateToOneWithWhereWithoutGameSessionInput = {
    where?: GameConfigWhereInput
    data: XOR<GameConfigUpdateWithoutGameSessionInput, GameConfigUncheckedUpdateWithoutGameSessionInput>
  }

  export type GameConfigUpdateWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    Partner?: PartnerUpdateOneWithoutGameConfigNestedInput
  }

  export type GameConfigUncheckedUpdateWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    partnerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GameSessionCreateWithoutAnalyticsEventInput = {
    id?: string
    playerIdentifier: string
    createdAt?: Date | string
    updatedAt?: Date | string
    GameAction?: GameActionCreateNestedManyWithoutGameSessionInput
    GameConfig: GameConfigCreateNestedOneWithoutGameSessionInput
  }

  export type GameSessionUncheckedCreateWithoutAnalyticsEventInput = {
    id?: string
    playerIdentifier: string
    gameConfigId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    GameAction?: GameActionUncheckedCreateNestedManyWithoutGameSessionInput
  }

  export type GameSessionCreateOrConnectWithoutAnalyticsEventInput = {
    where: GameSessionWhereUniqueInput
    create: XOR<GameSessionCreateWithoutAnalyticsEventInput, GameSessionUncheckedCreateWithoutAnalyticsEventInput>
  }

  export type GameSessionUpsertWithoutAnalyticsEventInput = {
    update: XOR<GameSessionUpdateWithoutAnalyticsEventInput, GameSessionUncheckedUpdateWithoutAnalyticsEventInput>
    create: XOR<GameSessionCreateWithoutAnalyticsEventInput, GameSessionUncheckedCreateWithoutAnalyticsEventInput>
    where?: GameSessionWhereInput
  }

  export type GameSessionUpdateToOneWithWhereWithoutAnalyticsEventInput = {
    where?: GameSessionWhereInput
    data: XOR<GameSessionUpdateWithoutAnalyticsEventInput, GameSessionUncheckedUpdateWithoutAnalyticsEventInput>
  }

  export type GameSessionUpdateWithoutAnalyticsEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    GameAction?: GameActionUpdateManyWithoutGameSessionNestedInput
    GameConfig?: GameConfigUpdateOneRequiredWithoutGameSessionNestedInput
  }

  export type GameSessionUncheckedUpdateWithoutAnalyticsEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    gameConfigId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    GameAction?: GameActionUncheckedUpdateManyWithoutGameSessionNestedInput
  }

  export type PartnerCreateWithoutEmbedTokenInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    GameConfig?: GameConfigCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateWithoutEmbedTokenInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    GameConfig?: GameConfigUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerCreateOrConnectWithoutEmbedTokenInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutEmbedTokenInput, PartnerUncheckedCreateWithoutEmbedTokenInput>
  }

  export type PartnerUpsertWithoutEmbedTokenInput = {
    update: XOR<PartnerUpdateWithoutEmbedTokenInput, PartnerUncheckedUpdateWithoutEmbedTokenInput>
    create: XOR<PartnerCreateWithoutEmbedTokenInput, PartnerUncheckedCreateWithoutEmbedTokenInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutEmbedTokenInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutEmbedTokenInput, PartnerUncheckedUpdateWithoutEmbedTokenInput>
  }

  export type PartnerUpdateWithoutEmbedTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    GameConfig?: GameConfigUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateWithoutEmbedTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    GameConfig?: GameConfigUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type GameSessionCreateWithoutGameActionInput = {
    id?: string
    playerIdentifier: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutGameSessionInput
    GameConfig: GameConfigCreateNestedOneWithoutGameSessionInput
  }

  export type GameSessionUncheckedCreateWithoutGameActionInput = {
    id?: string
    playerIdentifier: string
    gameConfigId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutGameSessionInput
  }

  export type GameSessionCreateOrConnectWithoutGameActionInput = {
    where: GameSessionWhereUniqueInput
    create: XOR<GameSessionCreateWithoutGameActionInput, GameSessionUncheckedCreateWithoutGameActionInput>
  }

  export type GameSessionUpsertWithoutGameActionInput = {
    update: XOR<GameSessionUpdateWithoutGameActionInput, GameSessionUncheckedUpdateWithoutGameActionInput>
    create: XOR<GameSessionCreateWithoutGameActionInput, GameSessionUncheckedCreateWithoutGameActionInput>
    where?: GameSessionWhereInput
  }

  export type GameSessionUpdateToOneWithWhereWithoutGameActionInput = {
    where?: GameSessionWhereInput
    data: XOR<GameSessionUpdateWithoutGameActionInput, GameSessionUncheckedUpdateWithoutGameActionInput>
  }

  export type GameSessionUpdateWithoutGameActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutGameSessionNestedInput
    GameConfig?: GameConfigUpdateOneRequiredWithoutGameSessionNestedInput
  }

  export type GameSessionUncheckedUpdateWithoutGameActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    gameConfigId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutGameSessionNestedInput
  }

  export type PartnerCreateWithoutGameConfigInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    EmbedToken?: EmbedTokenCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateWithoutGameConfigInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    EmbedToken?: EmbedTokenUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerCreateOrConnectWithoutGameConfigInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutGameConfigInput, PartnerUncheckedCreateWithoutGameConfigInput>
  }

  export type GameSessionCreateWithoutGameConfigInput = {
    id?: string
    playerIdentifier: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AnalyticsEvent?: AnalyticsEventCreateNestedManyWithoutGameSessionInput
    GameAction?: GameActionCreateNestedManyWithoutGameSessionInput
  }

  export type GameSessionUncheckedCreateWithoutGameConfigInput = {
    id?: string
    playerIdentifier: string
    createdAt?: Date | string
    updatedAt?: Date | string
    AnalyticsEvent?: AnalyticsEventUncheckedCreateNestedManyWithoutGameSessionInput
    GameAction?: GameActionUncheckedCreateNestedManyWithoutGameSessionInput
  }

  export type GameSessionCreateOrConnectWithoutGameConfigInput = {
    where: GameSessionWhereUniqueInput
    create: XOR<GameSessionCreateWithoutGameConfigInput, GameSessionUncheckedCreateWithoutGameConfigInput>
  }

  export type GameSessionCreateManyGameConfigInputEnvelope = {
    data: GameSessionCreateManyGameConfigInput | GameSessionCreateManyGameConfigInput[]
    skipDuplicates?: boolean
  }

  export type PartnerUpsertWithoutGameConfigInput = {
    update: XOR<PartnerUpdateWithoutGameConfigInput, PartnerUncheckedUpdateWithoutGameConfigInput>
    create: XOR<PartnerCreateWithoutGameConfigInput, PartnerUncheckedCreateWithoutGameConfigInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutGameConfigInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutGameConfigInput, PartnerUncheckedUpdateWithoutGameConfigInput>
  }

  export type PartnerUpdateWithoutGameConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    EmbedToken?: EmbedTokenUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateWithoutGameConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    EmbedToken?: EmbedTokenUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type GameSessionUpsertWithWhereUniqueWithoutGameConfigInput = {
    where: GameSessionWhereUniqueInput
    update: XOR<GameSessionUpdateWithoutGameConfigInput, GameSessionUncheckedUpdateWithoutGameConfigInput>
    create: XOR<GameSessionCreateWithoutGameConfigInput, GameSessionUncheckedCreateWithoutGameConfigInput>
  }

  export type GameSessionUpdateWithWhereUniqueWithoutGameConfigInput = {
    where: GameSessionWhereUniqueInput
    data: XOR<GameSessionUpdateWithoutGameConfigInput, GameSessionUncheckedUpdateWithoutGameConfigInput>
  }

  export type GameSessionUpdateManyWithWhereWithoutGameConfigInput = {
    where: GameSessionScalarWhereInput
    data: XOR<GameSessionUpdateManyMutationInput, GameSessionUncheckedUpdateManyWithoutGameConfigInput>
  }

  export type GameSessionScalarWhereInput = {
    AND?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
    OR?: GameSessionScalarWhereInput[]
    NOT?: GameSessionScalarWhereInput | GameSessionScalarWhereInput[]
    id?: StringFilter<"GameSession"> | string
    playerIdentifier?: StringFilter<"GameSession"> | string
    gameConfigId?: StringFilter<"GameSession"> | string
    createdAt?: DateTimeFilter<"GameSession"> | Date | string
    updatedAt?: DateTimeFilter<"GameSession"> | Date | string
  }

  export type EmbedTokenCreateManyPartnerInput = {
    id: string
    token: string
    permissions: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameConfigCreateManyPartnerInput = {
    id: string
    name?: string
    gameType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    backgroundUrl?: string | null
    diamondImageUrl?: string | null
    dustImageUrl?: string | null
    goldImageUrl?: string | null
    defaultBid?: number | null
    bidAmounts?: GameConfigCreatebidAmountsInput | number[]
    loseSoundUrl?: string | null
    movesPerRound?: number
    multDiamond?: number
    multGold?: number
    multOil?: number
    oilImageUrl?: string | null
    probDiamond?: number
    probDust?: number
    probGold?: number
    probOil?: number
    probRock?: number
    rockImageUrl?: string | null
    winSoundUrl?: string | null
    mascotImageUrl?: string | null
    mascotOnDustImageUrl?: string | null
    mascotOnRockImageUrl?: string | null
    mascotOnOilImageUrl?: string | null
    mascotOnGoldImageUrl?: string | null
    mascotOnDiamondImageUrl?: string | null
  }

  export type EmbedTokenUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbedTokenUncheckedUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmbedTokenUncheckedUpdateManyWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    permissions?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameConfigUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    GameSession?: GameSessionUpdateManyWithoutGameConfigNestedInput
  }

  export type GameConfigUncheckedUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    GameSession?: GameSessionUncheckedUpdateManyWithoutGameConfigNestedInput
  }

  export type GameConfigUncheckedUpdateManyWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    gameType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    backgroundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    goldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultBid?: NullableIntFieldUpdateOperationsInput | number | null
    bidAmounts?: GameConfigUpdatebidAmountsInput | number[]
    loseSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    movesPerRound?: IntFieldUpdateOperationsInput | number
    multDiamond?: FloatFieldUpdateOperationsInput | number
    multGold?: FloatFieldUpdateOperationsInput | number
    multOil?: FloatFieldUpdateOperationsInput | number
    oilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    probDiamond?: IntFieldUpdateOperationsInput | number
    probDust?: IntFieldUpdateOperationsInput | number
    probGold?: IntFieldUpdateOperationsInput | number
    probOil?: IntFieldUpdateOperationsInput | number
    probRock?: IntFieldUpdateOperationsInput | number
    rockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    winSoundUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDustImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnRockImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnOilImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnGoldImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    mascotOnDiamondImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AnalyticsEventCreateManyGameSessionInput = {
    id: string
    eventType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GameActionCreateManyGameSessionInput = {
    id: string
    actionType: string
    payload: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AnalyticsEventUpdateWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameActionUpdateWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameActionUncheckedUpdateWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameActionUncheckedUpdateManyWithoutGameSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameSessionCreateManyGameConfigInput = {
    id?: string
    playerIdentifier: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GameSessionUpdateWithoutGameConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AnalyticsEvent?: AnalyticsEventUpdateManyWithoutGameSessionNestedInput
    GameAction?: GameActionUpdateManyWithoutGameSessionNestedInput
  }

  export type GameSessionUncheckedUpdateWithoutGameConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    AnalyticsEvent?: AnalyticsEventUncheckedUpdateManyWithoutGameSessionNestedInput
    GameAction?: GameActionUncheckedUpdateManyWithoutGameSessionNestedInput
  }

  export type GameSessionUncheckedUpdateManyWithoutGameConfigInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerIdentifier?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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