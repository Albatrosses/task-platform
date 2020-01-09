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

@Entity("user_tasks", { schema: "task_platform" })
@Index("reviewer", ["reviewer"])
@Index("taskId", ["task"])
@Index("userId", ["user"])
export class UserTasks extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    name: "id"
  })
  public id: number;

  @ManyToOne(
    () => Tasks,
    (tasks: Tasks) => tasks.userTaskss,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "taskId" })
  public task: Tasks | null;

  @ManyToOne(
    () => Users,
    (users: Users) => users.userTaskss,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "userId" })
  public user: Users | null;

  @Column("json", {
    nullable: true,
    name: "credentials"
  })
  public credentials: object | null;

  @Column("tinyint", {
    nullable: true,
    name: "status"
  })
  public status: number | null;

  @Column("datetime", {
    nullable: true,
    name: "assignDate"
  })
  public assignDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "uploadDate"
  })
  public uploadDate: Date | null;

  @Column("datetime", {
    nullable: true,
    name: "reviewDate"
  })
  public reviewDate: Date | null;

  @Column("int", {
    nullable: true,
    unsigned: true,
    name: "reviewer"
  })
  public reviewer: number | null;
}
