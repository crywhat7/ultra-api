import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/db/supabase.service';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { DB_RESPONSE } from '../utils/db-response';
import {
  dataItemCategoria,
  dataItemCliente,
  dataItemEmpleado,
  dataItemFactura,
  dataItemFamilia,
  dataItemFormaPago,
  dataItemGenero,
  dataItemMarca,
  dataItemPrecioProducto,
  dataItemProducto,
  dataItemPuesto,
  dataItemSubclase,
  dataItemTienda,
  dataItemTipoPago,
  dataItemTipoUnidad,
} from './queries/proyecto-is2.queries';
import { CreateEmployeeDto } from './dtos/CreateEmployee.dto';
import { decode } from 'base64-arraybuffer';
import { STORAGE_RESPONSE } from '../utils/storage-response';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProducto.dto';
import { CreateClientDto } from './dtos/CreateClient.dto';

const SCHEMA = 'is2';

@Injectable()
export class ProyectoIS2Service {
  private supabase: SupabaseClient<any, 'public', any>;
  constructor(private readonly supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.supabase;
  }

  EMPLEADOS = {
    getEmpleados: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .select(dataItemEmpleado)
        .order('nombre', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'empleados',
        error,
        'Error al obtener empleados',
      ).sendResponse();
    },
    getEmpleadoById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .select(dataItemEmpleado)
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'empleados',
        error,
        'Error al obtener empleado',
      ).sendResponse();
    },
    postEmpleado: async (empleado: CreateEmployeeDto) => {
      const {
        nombre,
        apellido,
        email,
        telefono,
        idPuesto,
        idGenero,
        alias,
        password,
        salario,
        idTipoPago,
      } = empleado;
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .insert({
          nombre,
          apellido,
          email,
          telefono,
          id_puesto: idPuesto,
          id_genero: idGenero,
          alias,
          password,
          salario,
          id_tipo_pago: idTipoPago,
        })
        .select(dataItemEmpleado)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'registrarEmpleado',
        error,
        'Error al crear empleado',
      ).sendResponse();
    },

    updateEmpleado: async (id: number, empleado: CreateEmployeeDto) => {
      const {
        nombre,
        apellido,
        email,
        telefono,
        idPuesto,
        idGenero,
        alias,
        password,
        salario,
        idTipoPago,
      } = empleado;
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .update({
          nombre,
          apellido,
          email,
          telefono,
          id_puesto: idPuesto,
          id_genero: idGenero,
          alias,
          password,
          salario,
          id_tipo_pago: idTipoPago,
        })
        .eq('id', id)
        .select(dataItemEmpleado)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'actualizar empleado',
        error,
        'Error al actualizar empleado',
      ).sendResponse();
    },

    deleteEmpleado: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .delete()
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'eliminarEmpleado',
        error,
        'Error al eliminar empleado',
      ).sendResponse();
    },

    updateStatusAndObservacionesEmpleado: async (
      id: number,
      inhabilitado: boolean,
      observaciones: string,
    ) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .update({ inhabilitado, observaciones })
        .eq('id', id)
        .select(dataItemEmpleado)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'inhabilitarEmpleado',
        error,
        'Error al inhabilitar empleado',
      ).sendResponse();
    },
    uploadImageToEmpleado: async (id: number, imageBase64: string) => {
      const [, base64] = imageBase64.split(',');
      const ArrayBufferImage = decode(base64);

      const { data, error } = await this.supabase.storage
        .from('is_documents_and_files')
        .upload(`empleados/${id}.jpeg`, ArrayBufferImage, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      return new STORAGE_RESPONSE<typeof data>(
        data,
        'uploadImageToEmpleado',
        error,
        'Error al subir imagen',
      ).sendResponse();
    },
  };

  LOGIN = {
    loginUser: async (emailOrAlias: string, password: string) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('empleados')
        .select(dataItemEmpleado)
        .or(`email.eq.${emailOrAlias},alias.eq.${emailOrAlias}`)
        .eq('password', password)
        .single();

      if (!data) {
        return new DB_RESPONSE<typeof data>(
          data,
          'login',
          {
            message: 'Usuario o contraseña incorrectos',
            details: '',
            hint: '',
            code: '500',
          } as PostgrestError,
          'Usuario o contraseña incorrectos',
        ).sendResponse();
      }

      return new DB_RESPONSE<typeof data>(
        data,
        'login',
        error,
        'Se ha logueado correctamente',
      ).sendResponse();
    },
  };

  PUESTOS = {
    getPuestos: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('puestos')
        .select(dataItemPuesto)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'puestos',
        error,
        'Error al obtener puestos',
      ).sendResponse();
    },
  };

  GENEROS = {
    getGeneros: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('generos')
        .select(dataItemGenero)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'generos',
        error,
        'Error al obtener generos',
      ).sendResponse();
    },
  };

  TIPO_PAGO = {
    getTipoPago: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('tipos_pago')
        .select(dataItemTipoPago)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'tiposPago',
        error,
        'Error al obtener tipos de pago',
      ).sendResponse();
    },
  };

  FORMA_PAGO = {
    getFormaPago: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('formas_pago')
        .select(dataItemFormaPago)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'formasPago',
        error,
        'Error al obtener formas de pago',
      ).sendResponse();
    },
  };

  FAMILIAS = {
    getFamilias: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('familias')
        .select(dataItemFamilia)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'familias',
        error,
        'Error al obtener familias',
      ).sendResponse();
    },
  };

  CATEGORIAS = {
    getCategorias: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('categorias')
        .select(dataItemCategoria)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'categorias',
        error,
        'Error al obtener categorias',
      ).sendResponse();
    },
  };

  SUBCLASES = {
    getSubclases: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('subclases')
        .select(dataItemSubclase)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'subclases',
        error,
        'Error al obtener subclases',
      ).sendResponse();
    },
  };

  TIENDAS = {
    getTiendas: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('tiendas')
        .select(dataItemTienda)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'tiendas',
        error,
        'Error al obtener tiendas',
      ).sendResponse();
    },
  };

  MARCAS = {
    getMarcas: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('marcas')
        .select(dataItemMarca)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'marcas',
        error,
        'Error al obtener marcas',
      ).sendResponse();
    },
  };

  PRODUCTOS = {
    getProductos: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos')
        .select(dataItemProducto)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'productos',
        error,
        'Error al obtener productos',
      ).sendResponse();
    },

    getProductoById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos')
        .select(dataItemProducto)
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'productos',
        error,
        'Error al obtener producto',
      ).sendResponse();
    },

    postProducto: async (producto: CreateProductDto) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos')
        .insert({
          descripcion: producto.descripcion,
          id_subclase: producto.idSubclase,
          id_marca: producto.idMarca,
        })
        .select(dataItemProducto)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'nuevoProducto',
        error,
        'Error al crear producto',
      ).sendResponse();
    },

    updateProducto: async (id: number, producto: UpdateProductDto) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos')
        .update({
          descripcion: producto.descripcion,
          id_marca: producto.idMarca,
          inhabilitado: producto.inhabilitado,
          oferta: producto.oferta,
        })
        .eq('id', id)
        .select(dataItemProducto)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'actualizarProducto',
        error,
        'Error al actualizar producto',
      ).sendResponse();
    },

    deleteProducto: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos')
        .delete()
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'eliminarProducto',
        error,
        'Error al eliminar producto',
      ).sendResponse();
    },

    uploadImageToProducto: async (id: number, imageBase64: string) => {
      const [, base64] = imageBase64.split(',');
      const ArrayBufferImage = decode(base64);

      const { data, error } = await this.supabase.storage
        .from('is_documents_and_files')
        .upload(`productos/${id}.jpeg`, ArrayBufferImage, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      return new STORAGE_RESPONSE<typeof data>(
        data,
        'uploadImageToProducto',
        error,
        'Error al subir imagen',
      ).sendResponse();
    },
  };

  TIPOS_UNIDADES = {
    getTiposUnidades: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('tipos_unidades')
        .select(dataItemTipoUnidad)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'tiposUnidades',
        error,
        'Error al obtener tipos de unidades',
      ).sendResponse();
    },
  };

  PRECIOS_PRODUCTOS = {
    setPrecioProducto: async (
      idProducto: number,
      idTipoUnidad: number,
      precio: number,
    ) => {
      // Insert or Update if exists idProducto and idTipoUnidad
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos_precios')
        .upsert(
          {
            id_producto: idProducto,
            id_tipo_unidad: idTipoUnidad,
            precio,
          },
          {
            onConflict: 'id_producto,id_tipo_unidad',
          },
        )
        .select(dataItemPrecioProducto)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'precioProducto',
        error,
        'Error al establecer precio de producto',
      ).sendResponse();
    },

    deletePrecioProducto: async (idPrecioProducto: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('productos_precios')
        .delete()
        .eq('id', idPrecioProducto)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'eliminarPrecioProducto',
        error,
        'Error al eliminar precio de producto',
      ).sendResponse();
    },
  };

  CLIENTES = {
    getClientes: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .select(dataItemCliente)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'clientes',
        error,
        'Error al obtener clientes',
      ).sendResponse();
    },

    getClienteById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .select(dataItemCliente)
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'clientes',
        error,
        'Error al obtener cliente',
      ).sendResponse();
    },
    getClienteByDni: async (dni: string) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .select(dataItemCliente)
        .eq('dni', dni)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'clientes',
        error,
        'Error al obtener cliente',
      ).sendResponse();
    },
    createClient: async (client: CreateClientDto) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('clientes')
        .insert({
          nombre_completo: client.nombreCompleto,
          dni: client.dni,
          telefono: client.telefono,
        })
        .select(dataItemCliente)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'registrarCliente',
        error,
        'Error al crear cliente',
      ).sendResponse();
    },
  };

  FACTURAS = {
    getFacturas: async () => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('facturas')
        .select(dataItemFactura)
        .order('id', { ascending: true });

      return new DB_RESPONSE<typeof data>(
        data,
        'facturas',
        error,
        'Error al obtener facturas',
      ).sendResponse();
    },

    getFacturaById: async (id: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('facturas')
        .select(dataItemFactura)
        .eq('id', id)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'facturas',
        error,
        'Error al obtener factura',
      ).sendResponse();
    },

    anularFactura: async (idFactura: number) => {
      const { data, error } = await this.supabase
        .schema(SCHEMA)
        .from('facturas')
        .update({ anulada: true })
        .eq('id', idFactura)
        .single();

      return new DB_RESPONSE<typeof data>(
        data,
        'anularFactura',
        error,
        'Error al anular factura',
      ).sendResponse();
    },

    processCreateFactura: async (props: {
      empleado: {
        idEmpleado: number;
      };
      cliente: {
        dni: string;
        nombreCompleto: string;
        telefono: string;
      };
      formaPago: {
        idFormaPago: number;
      };
      productosFactura: {
        idProducto: number;
        idTipoUnidad: number;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
      }[];
    }) => {
      const { data, error } = await this.supabase.rpc('ft_proc_facturar', {
        p_props: JSON.stringify(props),
      });
      return new DB_RESPONSE<typeof data>(
        data,
        'crearFactura',
        error,
        'Error al crear factura',
      ).sendResponse();

      // 1. Ejecutar la función
    },
  };
  returnActualOrNewClient = async (
    dni: string,
    nombre: string,
    telefono: string,
  ) => {
    const { count: countActualClient, data: actualClient } =
      await this.CLIENTES.getClienteByDni(dni);

    if (countActualClient) {
      return actualClient;
    }

    const { data: newClient } = await this.CLIENTES.createClient({
      dni,
      nombreCompleto: nombre,
      telefono,
    });
    if (!newClient) {
      throw new Error('Error al crear cliente');
    }

    return newClient;
  };
}
