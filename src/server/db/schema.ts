// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {sql} from "drizzle-orm";
import {
    index,
    pgTableCreator,
    serial,
    timestamp,
    varchar,
    boolean,
    real,
    integer,
    smallint,
    text,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `yonote_${name}`);
export const subscription = createTable(
    "subscription",
    {
        id: serial("id").primaryKey(),
        userId: varchar("user_id"),
        columnId: varchar("column_id"),
        status: boolean("status"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);
export const post = createTable(
    "post",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        userID: varchar("user_id"),
        readNumber: integer("readNumber"),
        likeCount: integer("likeCount"),
        content: varchar("content"),
        tag: varchar("tag"),
        columnId: varchar("column_id"),
        isTop: boolean("is_top").default(false),
        isFree: boolean("is_free").default(false),
        status: boolean("status"),
        cover: text("logo"),
        chapter: integer("chapter"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    },
    (example) => ({
        nameIndex: index("name_idx").on(example.name),
    })
);

export const user = createTable(
    "user",
    {
        id: varchar("id", {length: 256}).primaryKey(),
        name: varchar("name", {length: 256}),
        phone: varchar("phone"),
        idNumber: varchar("id_number"),
        password: integer("password"),
        avatar: text("avatar"),
        idType: varchar("id_type"),
        weChat: varchar("we_chat"),
        endDate: timestamp("end_date"),
        sex: integer("sex"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);


export const column = createTable(
    "column",
    {
        id: varchar("id").primaryKey(),
        name: varchar("name", {length: 256}),
        distributorship: boolean("distributorship").notNull().default(false),
        introduce: varchar("introduce"),
        type: varchar("type"),
        cover: text("logo").default("http://yo-note.oss-cn-shenzhen.aliyuncs.com/%E5%8F%AF%E8%BE%BE%E9%B8%AD2.png"),
        description: varchar("description"),
        payment: varchar("payment"),
        userId: varchar("user_id"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);
export const distributorshipDetail = createTable(
    "distributorship_detail",
    {
        id: serial("id").primaryKey(),
        columnId: serial("column_id"),
        platDistributorship: integer("plat_distributorship"),
        speedUp: integer("speed_up"),
        writerMoney: real("writer_money"),
        price: real("column_price"),
        distributorship: integer("distributorship"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const order = createTable(
    "order",
    {
        id: serial("id").primaryKey(),
        columnId: varchar("column_id"),
        price: real("price"),
        buyerId: varchar("buyer_id"),
        ownerId: varchar("owner_id"),
        payment: varchar("payment"),
        endStatus: boolean("end_status"),
        recommendationId: varchar("recommendation_id"),
        referralLevel: integer("referral_level"),
        status: boolean("status"),
        endDate: timestamp("end_date"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
        isVisible: boolean("is_visable"),
    }
);

export const speedUp = createTable(
    "speed_up",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        ownerId: serial("owner_id"),
        quantity: integer("quantity"),
        ranking: smallint("ranking"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const wallet = createTable(
    "wallet",
    {
        id: serial("id").primaryKey(),
        userId: varchar("user_id").notNull(),
        amountWithdraw: real("amount_withdraw"),
        freezeIncome: real("freeze_income"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const activity = createTable(
    "activity",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        introduction: varchar("introduction", {length: 256}),
        cover: varchar("cover", {length: 256}),
        url: varchar("url", {length: 256}),
        endDate: timestamp("end_date"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const coColumn = createTable(
    "co_column",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        deadline: timestamp("deadline"),
        subscribers: integer("subscribers"),
        number: integer("number"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const courseRecommendation = createTable(
    "course_recommendation",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        deadline: timestamp("deadline"),
        subscribers: integer("subscribers"),
        number: integer("number"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const columnRecommendation = createTable(
    "column_recommendation",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", {length: 256}),
        deadline: timestamp("deadline"),
        subscribers: integer("subscribers"),
        number: integer("number"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const postLike = createTable(
    "post_like",
    {
        id: serial("id").primaryKey(),
        postId: integer("post_id"),
        userId: varchar("user_id"),
        isLike: boolean("is_like"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
);

export const postRead = createTable(
    "post_read",
    {
        id: serial("id").primaryKey(),
        postId: integer("post_id"),
        userId: varchar("user_id"),
        readCount: integer("read_count"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
)

export const invitationCode = createTable(
    "invitation_code",
    {
        id: serial("id").primaryKey(),
        value: varchar("value")
    }
)
export const referrals = createTable(
    "referrals",
    {
        id: serial("id").primaryKey(),
        userId: varchar("user_id"),
        columnId: varchar("column_id"),
        referredUserId: varchar("referred_user_id"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
)
export const priceList = createTable(
    "price_list",
    {
        id: serial("id").primaryKey(),
        columnId: varchar("column_id"),
        price: real("price"),
        timeLimit: integer("time_limit"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
)

export const runningWater = createTable(
    "running_water",
    {
        id: serial("id").primaryKey(),
        userId: varchar("user_id"),
        name: varchar("name"),
        price: real("price"),
        expenditureOrIncome: integer("expenditure_or_income"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at"),
    }
)
export type User = typeof user.$inferInsert
export type RunningWater = typeof runningWater.$inferSelect
export type Column = typeof column.$inferSelect
export type ColumnUser = {
    column: typeof column.$inferSelect,
    user: typeof user.$inferSelect
}
export type ColumnOrder = {
    column: typeof column.$inferSelect,
    order: typeof order.$inferSelect
}

export type Post = typeof post.$inferSelect

export type Order = typeof order.$inferSelect

export type OrderBuyer = {
    id: number;
    columnId: string;
    price: number;
    buyerId: string;
    ownerId: string;
    payment: string;
    endStatus: boolean;
    recommendationId: string;
    referralLevel: number;
    status: boolean;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    isVisible: boolean;
    userName: string;
}

export type BaseColumnCard = {
    id: string;
    name: string;
    introduce?: string;
    description?: string;
    cover: string;
    userId: string;
    userName: string;
    avatar: string;
    createdAt: Date;
}

export type DetailColumnCard = BaseColumnCard & {
    readCount: number;
    likeCount: number;
    isTop: boolean;
    isFree: boolean;
}
