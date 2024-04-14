export interface IAddress {
  id: string;
  zipCode: string;
  address: string;
  number: number;
  complement: string;
  neighborhood: string;
  state: string;
  city: string;
  personId: string;
}

export type TCreateAddressBodyRequest = Omit<IAddress, 'id' | 'personId'>;

export type TUpdateAddressBodyRequest = Partial<TCreateAddressBodyRequest>;
