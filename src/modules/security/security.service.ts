import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SecurityLog } from "./schemas/security-log.schema";
import { CreateSecurityLogDto } from "./dto/create-security-log.dto";
import { UpdateSecurityLogDto } from "./dto/update-security-log.dto";

// ...existing code...
@Injectable()
export class SecurityService {
  constructor(
    @InjectModel(SecurityLog.name)
    private securityLogModel: Model<SecurityLog>
  ) {}

  async create(createDto: CreateSecurityLogDto): Promise<SecurityLog> {
    const created = new this.securityLogModel(createDto);
    return created.save();
  }

  async findAll(): Promise<SecurityLog[]> {
    return this.securityLogModel.find().exec();
  }

  async findOne(id: string): Promise<SecurityLog> {
    const log = await this.securityLogModel.findById(id).exec();
    if (!log) {
      throw new NotFoundException(`SecurityLog no encontrado: ${id}`);
    }
    return log;
  }

  async update(
    id: string,
    updateDto: UpdateSecurityLogDto
  ): Promise<SecurityLog> {
    const updated = await this.securityLogModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`SecurityLog no encontrado: ${id}`);
    }
    return updated;
  }

  async remove(id: string): Promise<SecurityLog> {
    const removed = await this.securityLogModel.findByIdAndDelete(id).exec();
    if (!removed) {
      throw new NotFoundException(`SecurityLog no encontrado: ${id}`);
    }
    return removed;
  }
  // ...existing code...
}
