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

export type TPersonAddress = {
  id: string;
  name: string;
  email: string;
  password: string;
  sex: string;
  birthDate: string;
  civilState: string;
  addresses: IAddress[];
};

export type TPersonAddresses = Pick<TPersonAddress, 'addresses'>;
export type TCreateAddressBodyRequest = Omit<IAddress, 'id' | 'personId'>;

export type TUpdateAddressBodyRequest = Partial<TCreateAddressBodyRequest>;
