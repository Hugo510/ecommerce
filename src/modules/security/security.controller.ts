import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { SecurityService } from "./security.service";
import { CreateSecurityLogDto } from "./dto/create-security-log.dto";
import { UpdateSecurityLogDto } from "./dto/update-security-log.dto";
import { SecurityLog } from "./schemas/security-log.schema";

// ...existing code...
@Controller("security")
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post()
  async create(@Body() createDto: CreateSecurityLogDto): Promise<SecurityLog> {
    return this.securityService.create(createDto);
  }

  @Get()
  async findAll(): Promise<SecurityLog[]> {
    return this.securityService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<SecurityLog> {
    return this.securityService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateSecurityLogDto
  ): Promise<SecurityLog> {
    return this.securityService.update(id, updateDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<SecurityLog> {
    return this.securityService.remove(id);
  }
  // ...existing code...
}
