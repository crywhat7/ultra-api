export const dataItemVehiculo = `
id,
createdAt: created_at,
marca: vehiculos_marcas (
    id,
    brand,
    region: vehiculos_marcas_regiones (
        id,
        region
    )
),
modelo: vehiculos_marcas_modelos (
    id,
    model
),
transmission: vehiculos_tipos_transmision (
    id,
    description
),
year,
color`;
