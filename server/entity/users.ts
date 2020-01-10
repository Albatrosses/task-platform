import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import { EventLog } from "./event_log";
import { Sessions } from "./sessions";
import { Tasks } from "./tasks";
import { Transactions } from "./transactions";
import { UserTasks } from "./user_tasks";

@Entity("users", { schema: "task_platform" })
@Index("reviewer", ["reviewer"])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    name: "id"
  })
  public id: number;

  @Column("varchar", {
    nullable: true,
    length: 20,
    name: "name"
  })
  public name: string | null;

  @Column("varchar", {
    nullable: true,
    length: 1000,
    name: "password"
  })
  public password: string | null;

  @Column("varchar", {
    nullable: true,
    length: 20,
    name: "phone"
  })
  public phone: string | null;

  @Column("varchar", {
    nullable: true,
    length: 1000,
    name: "avatar"
  })
  public avatar: string | null;

  @Column("double", {
    nullable: false,
    default: () => "'0'",
    precision: 22,
    name: "balance"
  })
  public balance: number;

  @Column("json", {
    nullable: true,
    name: "payWays"
  })
  public payWays: object | null;

  @Column("varchar", {
    nullable: true,
    length: 10,
    name: "inviteCode"
  })
  public inviteCode: string | null;

  @Column("int", {
    nullable: true,
    name: "inviteId"
  })
  public inviteId: number | null;

  @Column("tinyint", {
    nullable: false,
    default: () => "'0'",
    name: "status"
  })
  public status: number;

  @Column("tinyint", {
    nullable: true,
    name: "role"
  })
  public role: number | null;

  @Column("tinyint", {
    nullable: true,
    name: "roleLevel"
  })
  public roleLevel: number | null;

  @Column("datetime", {
    nullable: true,
    name: "signInDate"
  })
  public signInDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "loginDate"
  })
  public loginDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "logoutDate"
  })
  public logoutDate: Date | null;

  @ManyToOne(
    () => Users,
    (users: Users) => users.userss,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "reviewer" })
  public reviewer: Users | null;

  @OneToMany(
    () => Transactions,
    (transactions: Transactions) => transactions.user,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public transactionss: Transactions[];

  @OneToMany(
    () => UserTasks,
    (userTasks: UserTasks) => userTasks.user,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public userTaskss: UserTasks[];

  @OneToMany(
    () => EventLog,
    (eventLog: EventLog) => eventLog.user,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public eventLogs: EventLog[];

  @OneToMany(
    () => Sessions,
    (sessions: Sessions) => sessions.user,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  public sessionss: Sessions[];

  @OneToMany(
    () => Tasks,
    (tasks: Tasks) => tasks.reviewer,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public taskss: Tasks[];

  @OneToMany(
    () => Transactions,
    (transactions: Transactions) => transactions.reviewer,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public transactionss2: Transactions[];

  @OneToMany(
    () => UserTasks,
    (userTasks: UserTasks) => userTasks.reviewer,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public userTaskss2: UserTasks[];

  @OneToMany(
    () => Users,
    (users: Users) => users.reviewer,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public userss: Users[];
}
