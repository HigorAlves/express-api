import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plan extends BaseEntity {
	@PrimaryGeneratedColumn('uuid') id!: number;

	@Column('uuid') code!: string;

	@Column('varchar', { length: 65 }) name: string | undefined;

	@Column('varchar', { length: 65 }) description: string | undefined;

	@Column({ type: 'int', width: 11 }) amount: number | undefined;

	@Column({ type: 'int', width: 11 }) setupFee: number | undefined;

	@Column({ type: 'varchar', length: 5, default: 'MONTH' }) intervalUnit: string | undefined;

	@Column({ type: 'int', width: 11, default: '1' }) intervalLength: number | undefined;

	@Column({ type: 'int', width: 11 }) billingCycles: number | undefined;

	@Column({ type: 'int', width: 11 }) trialDays: number | undefined;

	@Column({ type: 'boolean', default: true }) trialEnabled: boolean | undefined;

	@Column({ type: 'boolean', default: true }) trialHoldSetupFee: boolean | undefined;

	@Column({ type: 'boolean', default: true }) status: boolean | undefined;

	@Column({ type: 'int', width: 11 }) maxQty: number | undefined;

	@Column({ type: 'varchar', length: 11, default: 'CREDIT_CARD' }) paymentMethod: string | undefined;
}
