import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Examen1Service } from './examen-1.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Examen 1')
@Controller('examen-1')
export class Examen1Controller {
  constructor(private readonly examen1Service: Examen1Service) {}

  // ! Alumnos
  @Get('alumnos/')
  async getAlumnos() {
    return await this.examen1Service.getAlumnos();
  }

  @Get('alumnos/:id')
  async getAlumnoById(@Param('id') id: string) {
    return await this.examen1Service.getAlumnoById(id);
  }

  // ! Maestros
  @Get('maestros')
  async getMaestros() {
    return await this.examen1Service.getMaestros();
  }

  @Get('maestros/:id')
  async getMaestroById(@Param('id') id: string) {
    return await this.examen1Service.getMaestroById(id);
  }

  // ! Clases
  @Get('clases')
  async getClases() {
    return await this.examen1Service.getClases();
  }

  @Get('clases/:id')
  async getClaseById(@Param('id') id: string) {
    return await this.examen1Service.getClaseById(id);
  }

  @Patch('clases/asignar-maestro/:idClase/:idMaestro')
  async asignarMaestro(
    @Param('idClase') idClase: string,
    @Param('idMaestro') idMaestro: string,
  ) {
    return await this.examen1Service.asignarMaestroAClase(idMaestro, idClase);
  }

  @Patch('clases/quitar-maestro/:idClase')
  async quitarMaestro(@Param('idClase') idClase: string) {
    return await this.examen1Service.desasignarMaestroAClase(idClase);
  }

  // ! Matriculas

  @Get('matriculas')
  async getMatriculas() {
    return await this.examen1Service.getMatriculas();
  }

  @Get('matriculas/:id')
  async getMatriculaById(@Param('id') id: string) {
    return await this.examen1Service.getMatriculaById(id);
  }

  @Post('matriculas/matricular/:idAlumno/:idClase')
  async matriculaAlumnoAClase(
    @Param('idAlumno') idAlumno: string,
    @Param('idClase') idClase: string,
  ) {
    return await this.examen1Service.matricular(idAlumno, idClase);
  }

  @Delete('matriculas/alumno-de-clase/:idMatricula')
  async desmatricularAlumnoDeClase(@Param('idMatricula') idMatricula: string) {
    return await this.examen1Service.desmatricular(idMatricula);
  }

  @Patch('matriculas/actualizar-nota/:idMatricula/:nota')
  async actualizarNota(
    @Param('idMatricula') idMatricula: string,
    @Param('nota') nota: number,
  ) {
    return await this.examen1Service.actualizarNota(idMatricula, nota);
  }
}
