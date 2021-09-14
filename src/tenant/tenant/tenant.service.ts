import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class TenantService {
  private account: Account | null = null;

  constructor(@InjectModel(Account) private accountModel: typeof Account) {}

  set tenant(tenant: Account) {
    this.account = tenant;
  }

  get tenant(): Account {
    return this.account;
  }

  async setTenantBy(subdomain) {
    this.tenant = await this.accountModel.findOne({
      where: { subdomain: subdomain },
    });
  }
}
