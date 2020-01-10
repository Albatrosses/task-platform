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

@Entity("sessions", { schema: "task_platform" })
@Index("userId", ["user"])
export class Sessions extends BaseEntity {
  @Column("varchar", {
    nullable: false,
    primary: true,
    length: 128,
    name: "session_id"
  })
  public sessionId: string;

  @ManyToOne(
    () => Users,
    (users: Users) => users.sessionss,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "userId" })
  public user: Users | null;

  @Column("text", {
    nullable: true,
    name: "data"
  })
  public data: string | null;
}
