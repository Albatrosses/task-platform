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
import { Users } from "./users";

@Entity("event_log", { schema: "task_platform" })
@Index("userId", ["user"])
export class EventLog extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    unsigned: true,
    name: "id"
  })
  public id: number;

  @ManyToOne(
    () => Users,
    (users: Users) => users.eventLogs,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "userId" })
  public user: Users | null;

  @Column("text", {
    nullable: true,
    name: "event"
  })
  public event: string | null;

  @Column("datetime", {
    nullable: true,
    name: "date"
  })
  public date: Date | null;
}
