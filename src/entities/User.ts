import bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { 
	BaseEntity,
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
    ManyToOne,
    OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';
import Chat from './Chat';
import Message from './Message';
import Verification from './Verification';
import Ride from './Ride';


/**
 * The Number of times our password should be hashed
 */
const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
	@PrimaryGeneratedColumn() id: number;

	@Column({ type: 'text', unique: true })
	@IsEmail()
	email: string;

	@Column({ type: 'boolean', default: false })
	verifiedEmail: boolean;

	@Column({ type: 'text' })
	firstName: string;

	@Column({ type: 'text' })
	lastName: string;

	@Column({ type: 'int'})
	age: number;

	@Column({ type: 'text'})
	password: string;

	@Column({ type: 'text'})
	phoneNumber: string;

	@Column({ type: 'boolean', default: false })
    verifiedPhoneNumber: boolean;

	@Column({ type: 'text'})
	profilePhoto: string;

	@Column({ type: 'boolean', default: false})
	isDriving: boolean;

	@Column({ type: 'boolean', default: false})
	isRiding: boolean;

	@Column({ type: 'boolean', default: false})
	isTaken: boolean;

	@Column({ type: 'double precision', default: 0 })
	lastLng: number;

	@Column({ type: 'double precision', default: 0 })
	lastLat: number;

	@Column({ type: 'double precision', default: 0 })
	lastOrientation: number;

    @Column({ type: 'text', nullable: true})
    fbId: string;@CreateDateColumn() createdAt: string;

	@UpdateDateColumn() updatedAd: string;

	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

    @ManyToOne(type => Chat, chat => chat.participants)
    chat: Chat;

    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @OneToMany(type => Verification, verification => verification.user)
    verifications: Verification[];

    @OneToMany(type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[];


    @OneToMany(type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[];

	@BeforeInsert()
	@BeforeUpdate()

	/**
	 * @desc Asynchronus funciton to hash Our password
	 * @param { Password } The_Pass_to_be_hashed
	 * @returns { Promise<void> } The Hashed Password
	 */
	async savePassword(): Promise<void> {
		if (this.password) {
			const hashedPassword = await this.hashPassword(this.password);
			this.password = hashedPassword;
		}
	}

	/**
	 * @desc The function to check if both passes are identic 
	 * @param { password }
	 * @return { Promise<void> }
	 */
	public comparePassword(password: string = ''): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	/**
	 * @desc The Private function to hash the pass
	 * @param { password }
	 * @return { Promise<string> } The hashed pass
	 */
	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, BCRYPT_ROUNDS);
	}
}

export default User;