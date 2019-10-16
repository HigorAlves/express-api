import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id!: number;

	@Column('varchar', { length: 40 }) firstName: string | undefined;

	@Column('varchar', { length: 40 }) lastName: string | undefined;

	@Column('varchar', { length: 100, unique: true }) email: string | undefined;

	@Column('text') password: string | undefined;

	@Column('varchar', { length: 11, unique: true, nullable: true }) cpf: number | undefined;

	@Column('varchar', { length: 2, nullable: true }) phoneCountry: number | undefined;

	@Column('varchar', { length: 11, nullable: true }) phoneNumber: number | undefined;

	@Column({ type: 'int', width: 2, nullable: true }) birthdateDay: number | undefined;

	@Column({ type: 'int', width: 2, nullable: true }) birthdateMonth: number | undefined;

	@Column({ type: 'int', width: 4, nullable: true }) birthdateYear: number | undefined;

	@Column('varchar', { length: 255, nullable: true }) addressStreet: string | undefined;

	@Column({ type: 'int', width: 10, nullable: true }) addressNumber: string | undefined;

	@Column('varchar', { length: 40, nullable: true }) addressComplement: string | undefined;

	@Column('varchar', { length: 50, nullable: true }) addressCity: string | undefined;

	@Column('varchar', { length: 40, nullable: true }) addressDistrict: string | undefined;

	@Column('varchar', { length: 100, nullable: true }) addressState: string | undefined;

	@Column('varchar', { length: 100, nullable: true }) addressCountry: string | undefined;

	@Column('varchar', { length: 60, nullable: true }) addressZipcode: string | undefined;

	@Column('boolean', { default: false }) confirmed: boolean | undefined;

	@Column('varchar', { length: 6, default: 'USER' }) type!: string;
}
