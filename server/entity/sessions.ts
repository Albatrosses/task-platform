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

@Entity("sessions", { schema: "task_platform" })
export class Sessions extends BaseEntity {
  @Column("varchar", {
    nullable: false,
    primary: true,
    length: 128,
    name: "session_id"
  })
  public sessionId: string;

  @Column("int", {
    nullable: false,
    unsigned: true,
    name: "userId"
  })
  public userId: number | null;

  @Column("text", {
    nullable: true,
    name: "data"
  })
  public data: string | null;
}
