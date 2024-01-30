export interface Vehiculo {
  id: string;
  createdAt: Date;
  year: number;
  color: string;
  marca: Marca;
  modelo: Modelo;
  transmission: Transmission;
}

export interface Marca {
  id: string;
  brand: string;
  region: Region;
}

export interface Region {
  id: string;
  region: string;
}

export interface Modelo {
  id: string;
  model: string;
}

export interface Transmission {
  id: string;
  description: string;
}

export interface MarcaOpt {
  id: string;
  created_at: Date;
  brand: string;
  region: string;
  inactive: boolean;
}

export interface ModeloOpt {
  id: string;
  created_at: Date;
  brand: string;
  model: string;
}

export interface TipoTransmision {
  id: string;
  created_at: Date;
  description: string;
}
