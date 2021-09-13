import {
  IsIn,
  IsISO8601,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  TransactionCategories,
  TransactionCategory,
  TransactionType,
  TransactionTypes,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsISO8601()
  payment_date: Date;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsIn(TransactionCategories)
  category: TransactionCategory;

  @IsNotEmpty()
  ammount: number;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  @IsIn(TransactionTypes)
  type: TransactionType;
}
