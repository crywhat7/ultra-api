import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProyectoVanguardiaService } from './proyecto-vanguardia.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRolDto } from './dtos/rol.dto';
import { CreateGeneroDto } from './dtos/genero.dto';
import { CreateUsuarioDto } from './dtos/usuario.dto';
import { CreatePrioridadDto } from './dtos/prioridad.dto';
import { CreateEstadoDto } from './dtos/estado.dto';
import { CreateTerminacionDto } from './dtos/terminacion.dto';
import { CreateTicketDto } from './dtos/ticket.dto';
import { CreateChatDto } from './dtos/chat.dto';
import { LoginDto } from './dtos/login.dto';

@ApiTags('Proyecto Vanguardia - ATM')
@Controller('atm')
export class ProyectoVanguardiaController {
  constructor(private readonly pryVanguardiaSrv: ProyectoVanguardiaService) {}

  // ! Login
  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.pryVanguardiaSrv.LOGIN.login(body.alias, body.password);
  }

  // ! Roles
  @Get('roles')
  async getRoles() {
    return await this.pryVanguardiaSrv.ROLES.getRoles();
  }
  @Get('roles/:id')
  async getRol(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.ROLES.getRolById(id);
  }
  @Post('roles')
  async crearRol(@Body() body: CreateRolDto) {
    return await this.pryVanguardiaSrv.ROLES.crearRol(body);
  }
  @Put('roles/:id')
  async actualizarRol(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateRolDto,
  ) {
    return await this.pryVanguardiaSrv.ROLES.editarRol({ id, ...body });
  }
  @Delete('roles/:id')
  async eliminarRol(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.ROLES.deleteRol(id);
  }

  // ! Generos
  @Get('generos')
  async getGeneros() {
    return await this.pryVanguardiaSrv.GENEROS.getGeneros();
  }
  @Get('generos/:id')
  async getGenero(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.GENEROS.getGeneroById(id);
  }
  @Post('generos')
  async crearGenero(@Body() body: CreateGeneroDto) {
    return await this.pryVanguardiaSrv.GENEROS.crearGenero(body);
  }
  @Put('generos/:id')
  async actualizarGenero(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateGeneroDto,
  ) {
    return await this.pryVanguardiaSrv.GENEROS.editarGenero({ id, ...body });
  }
  @Delete('generos/:id')
  async eliminarGenero(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.GENEROS.deleteGenero(id);
  }

  // ! Usuario
  @Get('usuarios')
  async getUsuarios() {
    return await this.pryVanguardiaSrv.USUARIOS.getUsuarios();
  }
  @Get('usuarios/:id')
  async getUsuario(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.USUARIOS.getUsuarioById(id);
  }
  @Post('usuarios')
  async crearUsuario(@Body() body: CreateUsuarioDto) {
    return await this.pryVanguardiaSrv.USUARIOS.createUsuario(body);
  }
  @Put('usuarios/:id')
  async actualizarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUsuarioDto,
  ) {
    return await this.pryVanguardiaSrv.USUARIOS.updateUsuario({ id, ...body });
  }
  @Delete('usuarios/:id')
  async eliminarUsuario(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.USUARIOS.deleteUsuario(id);
  }

  // ! Prioridades
  @Get('prioridades')
  async getPrioridades() {
    return await this.pryVanguardiaSrv.PRIORIDADES.getPrioridades();
  }
  @Get('prioridades/:id')
  async getPrioridad(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.PRIORIDADES.getPrioridadById(id);
  }
  @Post('prioridades')
  async crearPrioridad(@Body() body: CreatePrioridadDto) {
    return await this.pryVanguardiaSrv.PRIORIDADES.crearPrioridad(body);
  }
  @Put('prioridades/:id')
  async actualizarPrioridad(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePrioridadDto,
  ) {
    return await this.pryVanguardiaSrv.PRIORIDADES.editarPrioridad({
      id,
      ...body,
    });
  }
  @Delete('prioridades/:id')
  async eliminarPrioridad(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.PRIORIDADES.deletePrioridad(id);
  }

  // ! Estados
  @Get('estados')
  async getEstados() {
    return await this.pryVanguardiaSrv.ESTADOS.getEstados();
  }
  @Get('estados/:id')
  async getEstado(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.ESTADOS.getEstadoById(id);
  }
  @Post('estados')
  async crearEstado(@Body() body: CreateEstadoDto) {
    return await this.pryVanguardiaSrv.ESTADOS.crearEstado(body);
  }
  @Put('estados/:id')
  async actualizarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateEstadoDto,
  ) {
    return await this.pryVanguardiaSrv.ESTADOS.editarEstado({ id, ...body });
  }
  @Delete('estados/:id')
  async eliminarEstado(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.ESTADOS.deleteEstado(id);
  }

  // ! Terminaciones
  @Get('terminaciones')
  async getTerminaciones() {
    return await this.pryVanguardiaSrv.TERMINACIONES.getTerminaciones();
  }
  @Get('terminaciones/:id')
  async getTerminacion(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.TERMINACIONES.getTerminacionById(id);
  }
  @Post('terminaciones')
  async crearTerminacion(@Body() body: CreateTerminacionDto) {
    return await this.pryVanguardiaSrv.TERMINACIONES.crearTerminacion(body);
  }
  @Put('terminaciones/:id')
  async actualizarTerminacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTerminacionDto,
  ) {
    return await this.pryVanguardiaSrv.TERMINACIONES.editarTerminacion({
      id,
      ...body,
    });
  }
  @Delete('terminaciones/:id')
  async eliminarTerminacion(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.TERMINACIONES.deleteTerminacion(id);
  }

  // ! Tickets
  @Get('tickets')
  async getTickets() {
    return await this.pryVanguardiaSrv.TICKETS.getTickets();
  }
  @Get('tickets/:id')
  async getTicket(@Param('id', ParseIntPipe) id: number) {
    return await this.pryVanguardiaSrv.TICKETS.getTicketById(id);
  }
  @Post('tickets')
  async crearTicket(@Body() body: CreateTicketDto) {
    return await this.pryVanguardiaSrv.TICKETS.createTicket(body);
  }
  @Patch('tickets/:id/terminacion/:idTerminacion')
  async terminarTicket(
    @Param('id', ParseIntPipe) id: number,
    @Param('idTerminacion', ParseIntPipe) idTerminacion: number,
  ) {
    return await this.pryVanguardiaSrv.TICKETS.updateTerminacionTicket(
      id,
      idTerminacion,
    );
  }
  @Patch('tickets/:id/estado/:idEstado')
  async cambiarEstadoTicket(
    @Param('id', ParseIntPipe) id: number,
    @Param('idEstado', ParseIntPipe) idEstado: number,
  ) {
    return await this.pryVanguardiaSrv.TICKETS.updateStatusTicket(id, idEstado);
  }
  @Patch('tickets/:id/asignar/:idUsuario')
  async asignarTicket(
    @Param('id', ParseIntPipe) id: number,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ) {
    return await this.pryVanguardiaSrv.TICKETS.updateAssignedUserTicket(
      id,
      idUsuario,
    );
  }

  // ! Chat
  @Post('chat')
  async enviarMensaje(@Body() body: CreateChatDto) {
    const { idTicket, idUsuario, message, imagenBase64 } = body;
    return await this.pryVanguardiaSrv.CHAT.insertChatMessage(
      idTicket,
      idUsuario,
      message,
      imagenBase64,
    );
  }
}
