import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {UserTasks} from "./user_tasks";
import {Transactions} from "./transactions";


@Entity("tasks" ,{schema:"task_platform" } )
export class Tasks extends BaseEntity {

    @PrimaryGeneratedColumn({
        type:"int", 
        unsigned: true,
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"name"
        })
    name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:60,
        name:"simple"
        })
    simple:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:600,
        name:"description"
        })
    description:string | null;
        

    @Column("json",{ 
        nullable:true,
        name:"steps"
        })
    steps:object | null;
        

    @Column("json",{ 
        nullable:true,
        name:"criteria"
        })
    criteria:object | null;
        

    @Column("json",{ 
        nullable:true,
        name:"platforms"
        })
    platforms:object | null;
        

    @Column("int",{ 
        nullable:true,
        name:"total"
        })
    total:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"reward"
        })
    reward:number | null;
        

    @Column("tinyint",{ 
        nullable:true,
        name:"status"
        })
    status:number | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"startDate"
        })
    startDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"endDate"
        })
    endDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"updateDate"
        })
    updateDate:Date | null;
        

   
    @OneToMany(()=>UserTasks, (userTasks: UserTasks)=>userTasks.task,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    userTaskss:UserTasks[];
    

   
    @OneToMany(()=>Transactions, (transactions: Transactions)=>transactions.task,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    transactionss:Transactions[];
    
}
