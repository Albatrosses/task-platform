import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Transactions} from "./transactions";
import {UserTasks} from "./user_tasks";
import {EventLog} from "./event_log";
import {Sessions} from "./sessions";
import {Tasks} from "./tasks";


@Entity("users" ,{schema:"task_platform" } )
@Index("reviewer",["reviewer",])
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
        length:1000,
        name:"password"
        })
    password:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"phone"
        })
    phone:string | null;
        

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
        

    @Column("tinyint",{ 
        nullable:true,
        name:"role"
        })
    role:number | null;
        

    @Column("tinyint",{ 
        nullable:true,
        name:"roleLevel"
        })
    roleLevel:number | null;
        

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
        

    @Column("datetime",{ 
        nullable:true,
        name:"logoutDate"
        })
    logoutDate:Date | null;
        

   
    @ManyToOne(()=>Users, (users: Users)=>users.userss,{ onDelete: 'SET NULL',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'reviewer'})
    reviewer:Users | null;


   
    @OneToMany(()=>Transactions, (transactions: Transactions)=>transactions.user,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    transactionss:Transactions[];
    

   
    @OneToMany(()=>UserTasks, (userTasks: UserTasks)=>userTasks.user,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    userTaskss:UserTasks[];
    

   
    @OneToMany(()=>EventLog, (eventLog: EventLog)=>eventLog.user,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    eventLogs:EventLog[];
    

   
    @OneToMany(()=>Sessions, (sessions: Sessions)=>sessions.user,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    sessionss:Sessions[];
    

   
    @OneToMany(()=>Tasks, (tasks: Tasks)=>tasks.reviewer,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    taskss:Tasks[];
    

   
    @OneToMany(()=>Transactions, (transactions: Transactions)=>transactions.reviewer,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    transactionss2:Transactions[];
    

   
    @OneToMany(()=>UserTasks, (userTasks: UserTasks)=>userTasks.reviewer,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    userTaskss2:UserTasks[];
    

   
    @OneToMany(()=>Users, (users: Users)=>users.reviewer,{ onDelete: 'SET NULL' ,onUpdate: 'CASCADE' })
    userss:Users[];
    
}
