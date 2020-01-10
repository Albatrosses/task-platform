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
import { HeroImage } from "./hero_image";
import { Transactions } from "./transactions";
import { UserTasks } from "./user_tasks";
import { Users } from "./users";

@Entity("tasks", { schema: "task_platform" })
@Index("reviewer", ["reviewer"])
export class Tasks extends BaseEntity {
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
    length: 60,
    name: "simple"
  })
  public simple: string | null;

  @Column("varchar", {
    nullable: true,
    length: 600,
    name: "description"
  })
  public description: string | null;

  @Column("json", {
    nullable: true,
    name: "steps"
  })
  public steps: object | null;

  @Column("json", {
    nullable: true,
    name: "criteria"
  })
  public criteria: object | null;

  @Column("json", {
    nullable: true,
    name: "platform"
  })
  public platform: object | null;

  @Column("int", {
    nullable: true,
    name: "total"
  })
  public total: number | null;

  @Column("double", {
    nullable: true,
    precision: 22,
    name: "amount"
  })
  public amount: number | null;

  @Column("tinyint", {
    nullable: true,
    name: "status"
  })
  public status: number | null;

  @Column("datetime", {
    nullable: true,
    name: "startDate"
  })
  public startDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "endDate"
  })
  public endDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "updateDate"
  })
  public updateDate: Date | null;

  @ManyToOne(
    () => Users,
    (users: Users) => users.taskss,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "reviewer" })
  public reviewer: Users | null;

  @OneToMany(
    () => HeroImage,
    (heroImage: HeroImage) => heroImage.task,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public heroImages: HeroImage[];

  @OneToMany(
    () => Transactions,
    (transactions: Transactions) => transactions.task,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public transactionss: Transactions[];

  @OneToMany(
    () => UserTasks,
    (userTasks: UserTasks) => userTasks.task,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  public userTaskss: UserTasks[];
}
