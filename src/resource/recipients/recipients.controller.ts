import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { QueryRecipientDto } from './dto/query-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { RecipientsService } from './recipients.service';

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) { }

  @Post()
  async create(@Body() createRecipientDto: CreateRecipientDto) {
    return this.recipientsService.create(createRecipientDto);
  }

  @Get()
  async findAll(@Query() query: QueryRecipientDto) {
    return this.recipientsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipientsService.findUnique(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    return this.recipientsService.update(id, updateRecipientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.recipientsService.delete(id);
  }
}
