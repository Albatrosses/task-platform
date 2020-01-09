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
import { Tasks } from "./tasks";
import { Users } from "./users";

@Entity("transactions", { schema: "task_platform" })
@Index("reviewer", ["reviewer"])
@Index("taskId", ["task"])
@Index("userId", ["user"])
export class Transactions extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    name: "id"
  })
  public id: number;

  @ManyToOne(
    () => Tasks,
    (tasks: Tasks) => tasks.transactionss,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "taskId" })
  public task: Tasks | null;

  @ManyToOne(
    () => Users,
    (users: Users) => users.transactionss,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "userId" })
  public user: Users | null;

  @Column("double", {
    nullable: true,
    precision: 22,
    name: "balance"
  })
  public balance: number | null;

  @Column("tinyint", {
    nullable: true,
    name: "type"
  })
  public type: number | null;

  @Column("tinyint", {
    nullable: true,
    name: "status"
  })
  public status: number | null;

  @Column("datetime", {
    nullable: true,
    name: "submitDate"
  })
  public submitDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "resultDate"
  })
  public resultDate: Date | null;

  @Column("int", {
    nullable: true,
    unsigned: true,
    name: "reviewer"
  })
  public reviewer: number | null;
}
