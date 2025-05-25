export const Role = {
  MANUFACTURER: 0,
  DISTRIBUTOR: 1,
  RETAILER: 2,
  CONSUMER: 3
};

export const ProductState = {
  CREATED: 0,
  IN_TRANSIT: 1,
  DELIVERED: 2
};

export const getRoleName = (role) => {
  switch (role) {
    case Role.MANUFACTURER:
      return 'Manufacturer';
    case Role.DISTRIBUTOR:
      return 'Distributor';
    case Role.RETAILER:
      return 'Retailer';
    case Role.CONSUMER:
      return 'Consumer';
    default:
      return 'Unknown';
  }
};

export const getProductStateName = (state) => {
  switch (state) {
    case ProductState.CREATED:
      return 'Created';
    case ProductState.IN_TRANSIT:
      return 'In Transit';
    case ProductState.DELIVERED:
      return 'Delivered';
    default:
      return 'Unknown';
  }
}; 