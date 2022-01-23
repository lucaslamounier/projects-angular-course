import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
 Conversao,
 ConversaoResponse
} from '../models';
@Injectable()
export class ConversorService {
  private readonly BASE_URL = "http://data.fixer.io/api/latest?access_key=ef5596ff15eedb056794b15fcf73d228";
  constructor(private http: HttpClient) {}
  /**
   * Realiza a chamada para a API de conversão de moedas.
   *
   * @param Conversao conversao
   * @return Observable<ConversaoResponse>
   */
  converter(conversao: Conversao): Observable<any> {
  let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
  return this.http
      .get(this.BASE_URL + params);
  }
  /**
   * Retorna a cotação para dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return number
   */
  cotacaoPara(conversaoResponse: ConversaoResponse,
 conversao: Conversao): number {
  let converterPara = conversao.moedaPara;
  if (converterPara)
    return conversaoResponse.rates[converterPara];
  return 0;
  }
  /**
   * Retorna a cotação de dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @param Conversao conversao
   * @return string
   */
  cotacaoDe(conversaoResponse: ConversaoResponse,
 conversao: Conversao): string {
  if (conversao.moedaPara)
    return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4);
  return '0';
  }
  /**
   * Retorna a data da cotação dado uma response.
   *
   * @param ConversaoResponse conversaoResponse
   * @return string
   */
  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse.date)
      return conversaoResponse.date;
    return '';
  }
}
