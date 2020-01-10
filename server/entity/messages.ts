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

@Entity("messages", { schema: "task_platform" })
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id"
  })
  public id: number;

  @Column("varchar", {
    nullable: true,
    length: 20,
    name: "phone"
  })
  public phone: string | null;

  @Column("varchar", {
    nullable: true,
    length: 100,
    name: "context"
  })
  public context: string | null;
}
