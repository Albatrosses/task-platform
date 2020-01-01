import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {UserTasks} from "./user_tasks";
import {Transactions} from "./transactions";
import {EventLog} from "./event_log";


@Entity("users" ,{schema:"task_platform" } )
export class Users extends BaseEntity {

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
        length:30,
        name:"password"
        })
    password:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"phone"
        })
    phone:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:1000,
        name:"avatar"
        })
    avatar:string | null;
        

    @Column("double",{ 
        nullable:false,
        default: () => "'0'",
        precision:22,
        name:"balance"
        })
    balance:number;
        

    @Column("json",{ 
        nullable:true,
        name:"payWays"
        })
    payWays:object | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:10,
        name:"inviteCode"
        })
    inviteCode:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"inviteId"
        })
    inviteId:number | null;
        

    @Column("tinyint",{ 
        nullable:false,
        default: () => "'0'",
        name:"status"
        })
    status:number;
        

    @Column("datetime",{ 
        nullable:true,
        name:"signInDate"
        })
    signInDate:Date | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"loginDate"
        })
    loginDate:Date | null;
        

   
    @OneToMany(()=>UserTasks, (userTasks: UserTasks)=>userTasks.user,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    userTaskss:UserTasks[];
    

   
    @OneToMany(()=>Transactions, (transactions: Transactions)=>transactions.user,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    transactionss:Transactions[];
    

   
    @OneToMany(()=>EventLog, (eventLog: EventLog)=>eventLog.user,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    eventLogs:EventLog[];
    
}
