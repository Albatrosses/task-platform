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

@Entity("tokens", { schema: "task_platform" })
export class Tokens extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id"
  })
  public id: number;

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

  @Column("varchar", {
    nullable: true,
    length: 1000,
    name: "authToken"
  })
  public authToken: string | null;

  @Column("datetime", {
    nullable: true,
    name: "expireDate"
  })
  public expireDate: Date | null;
}
