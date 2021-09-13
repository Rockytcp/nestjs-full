import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';
// import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountModel.create(createAccountDto);
  }

  async findAll() {
    const accounts = await this.accountModel.findAll();
    if (accounts.length === 0) {
      throw new NotFoundException('Accounts not found.');
    }
    return accounts;
  }

  async findOne(id: string) {
    const account = await this.accountModel.findByPk(id);
    if (!account) {
      throw new NotFoundException('account not found');
    }
    return account;
  }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
