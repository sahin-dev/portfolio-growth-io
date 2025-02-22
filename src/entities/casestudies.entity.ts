import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CaseStudies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  field: string;

  @Column({ type: 'time' })
  time: string;

  @Column({ type: 'date' })
  date: string;

  // introduction
  @Column()
  introduction: string;
  // Challenge
  @Column()
  challenge: string;
  // solution
  @Column()
  solution: string;
  // result
  @Column()
  result: string;
  // conclusion
  @Column()
  conclusion: string;
}
