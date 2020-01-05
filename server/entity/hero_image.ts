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

@Entity("hero_image", { schema: "task_platform" })
@Index("taskId", ["taskId"])
export class HeroImage extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id"
  })
  public id: number;

  @ManyToOne(
    () => Tasks,
    (tasks: Tasks) => tasks.heroImages,
    { onDelete: "SET NULL", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "taskId" })
  public taskId: Tasks | null;

  @Column("varchar", {
    nullable: true,
    length: 1000,
    name: "imageSrc"
  })
  public imageSrc: string | null;
}
