import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TenantGuard } from 'src/tenant/tenant.guard';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { RoleGuard } from 'src/auth/role.guard';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';

@UseGuards(JwtAuthGuard, TenantGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private tenantService: TenantService,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    const transactions = await this.transactionsService.findAll();
    return transactions;
  }

  @UseGuards(RoleGuard)
  @Post('users')
  createUser(@Res() res: any) {
    const targetUrl = 'http://localhost:8080/auth/admin/realms/fincycle/users';
    return res.redirect(targetUrl);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
  //   return this.transactionsService.update(+id, updateTransactionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transactionsService.remove(+id);
  // }
}
