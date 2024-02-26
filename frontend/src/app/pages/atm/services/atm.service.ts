import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_LOGGED_ATM, WEB_SERVICE } from '../../../../config/config';
import { catchError, map } from 'rxjs';
import {
  APIResponse,
  CreateChat,
  CreateTicket,
  Estado,
  Genero,
  Message,
  Prioridad,
  Rol,
  Terminacion,
  Ticket,
  Usuario,
  UsuarioCreate,
} from '../types/atm';
import { AlertaService } from '../../../services/alerta.service';
import { Router } from '@angular/router';

const URL_BASE = `${WEB_SERVICE}/atm`;

@Injectable({
  providedIn: 'root',
})
export class AtmService {
  constructor(
    private http: HttpClient,
    private alertaSrv: AlertaService,
    private router: Router
  ) {}

  ROLES = {
    getRoles: () => {
      const ruta = `${URL_BASE}/roles`;
      return this.http.get<APIResponse<Rol[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateRol: (rol: Rol) => {
      const ruta = `${URL_BASE}/roles/${rol.id}`;
      return this.http.put<APIResponse<Rol>>(ruta, rol).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    deleteRol: (id: number) => {
      const ruta = `${URL_BASE}/roles/${id}`;
      return this.http.delete<APIResponse<Rol>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    createRol: (rol: Omit<Rol, 'id' | 'createdAt'>) => {
      const ruta = `${URL_BASE}/roles`;
      return this.http.post<APIResponse<Rol>>(ruta, rol).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };
  LOGIN = {
    login: (alias: string, password: string) => {
      const ruta = `${URL_BASE}/login`;
      return this.http
        .post<APIResponse<Usuario>>(ruta, {
          alias,
          password,
        })
        .pipe(
          map((resp) => {
            console.log({ resp });

            if (!resp.isSuccess) {
              this.alertaSrv.showWarn('Los datos ingresados son incorrectos');
              return null;
            }
            this.SESSION_STORAGE.setUser(resp.data);
            this.REDIRECTS.goToMain();
            return resp.data;
          }),
          catchError((err) => {
            this.alertaSrv.showError(
              err?.error?.message ?? 'Error desconocido'
            );
            throw err;
          })
        );
    },
    logout: () => {
      sessionStorage.removeItem(USER_LOGGED_ATM);
      this.REDIRECTS.goToLogin();
    },
  };
  CREATE_USER = {
    createUser: (user: UsuarioCreate) => {
      const ruta = `${URL_BASE}/usuarios`;
      return this.http.post<APIResponse<Usuario>>(ruta, user).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.SESSION_STORAGE.setUser(resp.data);
          this.REDIRECTS.goToMain();
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };

  GENEROS = {
    getGeneros: () => {
      const ruta = `${URL_BASE}/generos`;
      return this.http.get<APIResponse<Genero[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateGenero: (genero: Genero) => {
      const ruta = `${URL_BASE}/generos/${genero.id}`;
      return this.http.put<APIResponse<Genero>>(ruta, genero).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    deleteGenero: (id: number) => {
      const ruta = `${URL_BASE}/generos/${id}`;
      return this.http.delete<APIResponse<Genero>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    createGenero: (genero: Omit<Genero, 'id' | 'createdAt'>) => {
      const ruta = `${URL_BASE}/generos`;
      return this.http.post<APIResponse<Genero>>(ruta, genero).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };
  USERS = {
    getUsers: () => {
      const ruta = `${URL_BASE}/usuarios`;
      return this.http.get<APIResponse<Usuario[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateUser: (id: number, user: UsuarioCreate) => {
      const ruta = `${URL_BASE}/usuarios/${id}`;
      return this.http.put<APIResponse<Usuario>>(ruta, user).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    deleteUser: (id: number) => {
      const ruta = `${URL_BASE}/usuarios/${id}`;
      return this.http.delete<APIResponse<Usuario>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };

  TICKETS_PRIORIDADES = {
    getPrioridades: () => {
      const ruta = `${URL_BASE}/prioridades`;
      return this.http.get<APIResponse<Prioridad[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    createPrioridad: (prioridad: Omit<Prioridad, 'id' | 'createdAt'>) => {
      const ruta = `${URL_BASE}/prioridades`;
      return this.http.post<APIResponse<Prioridad>>(ruta, prioridad).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updatePrioridad: (prioridad: Prioridad) => {
      const ruta = `${URL_BASE}/prioridades/${prioridad.id}`;
      return this.http.put<APIResponse<Prioridad>>(ruta, prioridad).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    deletePrioridad: (id: number) => {
      const ruta = `${URL_BASE}/prioridades/${id}`;
      return this.http.delete<APIResponse<Prioridad>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };

  TICKETS_ESTADOS = {
    getEstados: () => {
      const ruta = `${URL_BASE}/estados`;
      return this.http.get<APIResponse<Estado[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    createEstado: (estado: Omit<Estado, 'id' | 'createdAt'>) => {
      const ruta = `${URL_BASE}/estados`;
      return this.http.post<APIResponse<Estado>>(ruta, estado).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateEstado: (estado: Prioridad) => {
      const ruta = `${URL_BASE}/estados/${estado.id}`;
      return this.http.put<APIResponse<Estado>>(ruta, estado).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    deleteEstado: (id: number) => {
      const ruta = `${URL_BASE}/estados/${id}`;
      return this.http.delete<APIResponse<Estado>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };
  TICKETS_TERMINACIONES = {
    getTerminaciones: () => {
      const ruta = `${URL_BASE}/terminaciones`;
      return this.http.get<APIResponse<Terminacion[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    createTerminacion: (terminacion: Omit<Terminacion, 'id' | 'createdAt'>) => {
      const ruta = `${URL_BASE}/terminaciones`;
      return this.http.post<APIResponse<Terminacion>>(ruta, terminacion).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateTerminacion: (terminacion: Prioridad) => {
      const ruta = `${URL_BASE}/terminaciones/${terminacion.id}`;
      return this.http.put<APIResponse<Terminacion>>(ruta, terminacion).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    deleteTerminacion: (id: number) => {
      const ruta = `${URL_BASE}/terminaciones/${id}`;
      return this.http.delete<APIResponse<Terminacion>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };

  TICKETS = {
    createTicket: (ticket: CreateTicket) => {
      const ruta = `${URL_BASE}/tickets`;
      return this.http.post<APIResponse<CreateTicket>>(ruta, ticket).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    getTickets: () => {
      const ruta = `${URL_BASE}/tickets`;
      return this.http.get<APIResponse<Ticket[]>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    getTicket: (id: number) => {
      const ruta = `${URL_BASE}/tickets/${id}`;
      return this.http.get<APIResponse<Ticket>>(ruta).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateTicketStatus: (id: number, idEstado: number) => {
      const ruta = `${URL_BASE}/tickets/${id}/estado/${idEstado}`;
      return this.http.patch<APIResponse<Ticket>>(ruta, {}).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
    updateTicketTerminacion: (id: number, idTerminacion: number) => {
      const ruta = `${URL_BASE}/tickets/${id}/terminacion/${idTerminacion}`;
      return this.http.patch<APIResponse<Ticket>>(ruta, {}).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };

  TICKETS_CHAT = {
    postChat: (chat: CreateChat) => {
      const ruta = `${URL_BASE}/chat`;
      return this.http.post<APIResponse<Message>>(ruta, chat).pipe(
        map((resp) => {
          if (!resp.isSuccess) {
            this.alertaSrv.showWarn(resp.message);
            return null;
          }
          this.alertaSrv.showSuccess(resp.message);
          return resp.data;
        }),
        catchError((err) => {
          this.alertaSrv.showError(err?.error?.message ?? 'Error desconocido');
          throw err;
        })
      );
    },
  };

  REDIRECTS = {
    goToLogin: () => {
      this.router.navigate(['atm/login']);
    },
    goToMain: () => {
      this.router.navigate(['atm/main']);
    },
  };

  SESSION_STORAGE = {
    setUser: (user: Usuario) => {
      sessionStorage.setItem(USER_LOGGED_ATM, JSON.stringify(user));
    },
    getUser: () => {
      return JSON.parse(sessionStorage.getItem(USER_LOGGED_ATM) || '{}');
    },
  };
}
