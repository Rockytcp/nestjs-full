import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    private tenantService: TenantService,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.transactionModel.create({
      ...createTransactionDto,
      account_id: this.tenantService.tenant.id,
    });
  }

  async findAll() {
    const transactions = await this.transactionModel.findAll({
      where: { account_id: this.tenantService.tenant.id },
    });
    if (transactions.length === 0) {
      throw new NotFoundException('Transactions not found');
    }
    return transactions;
  }

  // async findOne(id: string) {
  //   const transaction = await this.transactionModel.findOne(id);
  //   return transaction;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
