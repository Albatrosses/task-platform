import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Tasks} from "./tasks";
import {Users} from "./users";


@Entity("user_tasks" ,{schema:"task_platform" } )
@Index("reviewer",["reviewer",])
@Index("taskId",["task",])
@Index("userId",["user",])
export class UserTasks extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        unsigned: true,
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(()=>Tasks, (tasks: Tasks)=>tasks.userTaskss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'taskId'})
    task:Tasks | null;


   
    @ManyToOne(()=>Users, (users: Users)=>users.userTaskss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'userId'})
    user:Users | null;


    @Column("json",{ 
        nullable:true,
        name:"credentials"
        })
    credentials:object | null;
        

    @Column("tinyint",{ 
        nullable:true,
        name:"status"
        })
    status:number | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"assignDate"
        })
    assignDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"uploadDate"
        })
    uploadDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"reviewDate"
        })
    reviewDate:Date | null;
        

   
    @ManyToOne(()=>Users, (users: Users)=>users.userTaskss2,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'reviewer'})
    reviewer:Users | null;

}
