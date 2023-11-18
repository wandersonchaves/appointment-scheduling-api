import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  translateEntity(property: string): string {
    const translationMap: { [key: string]: string } = {
      appointment: 'agendamento',
      customer: 'cliente',
      establishment: 'estabelecimento',
      professional: 'profissional',
      schedule: 'horário',
      service: 'serviço',
    };

    const singularForm = property.endsWith('s')
      ? property.slice(0, -1)
      : property;

    return translationMap[singularForm] || 'Entidade desconhecida';
  }
}
