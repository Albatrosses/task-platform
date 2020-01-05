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
    length: 30,
    name: "password"
  })
  public password: string | null;

  @Column("int", {
    nullable: true,
    name: "phone"
  })
  public phone: number | null;

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

  @Column("int", {
    nullable: true,
    unsigned: true,
    name: "reviewer"
  })
  public reviewer: number | null;

  @OneToMany(
    () => Transactions,
    (transactions: Transactions) => transactions.userId,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public transactionss: Transactions[];

  @OneToMany(
    () => UserTasks,
    (userTasks: UserTasks) => userTasks.userId,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public userTaskss: UserTasks[];

  @OneToMany(
    () => EventLog,
    (eventLog: EventLog) => eventLog.userId,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public eventLogs: EventLog[];
}
