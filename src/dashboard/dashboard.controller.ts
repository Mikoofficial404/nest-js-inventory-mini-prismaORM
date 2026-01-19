import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum'; // Using local enum as established in other files

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get('summary')
    @Roles(Role.Admin, Role.User) // Both Admin and User should probably see the dashboard? Or just Admin? Defaulting to both for now.
    getSummary() {
        return this.dashboardService.getSummary();
    }
}
