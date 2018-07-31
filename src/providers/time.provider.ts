export class TimeProvider {



  /////BLOCO DE HORAS
   calculaHorasParte(horaInicial,horaFinal){
      if(this.possuiValor(horaInicial) && this.possuiValor(horaFinal) ) {
        let diffHoras: any;
        let somaHoras : any;
        let convDiasHoras : any;
    
        diffHoras = this.diferencaHoras( horaInicial, horaFinal );
        somaHoras = this.somaHora( horaInicial, horaFinal );
        convDiasHoras = this.converteEmDiasHoras(somaHoras) ;
        
        return diffHoras;
      }
      
    }
    
    /**
    * Retona a diferença entre duas horas.
    * Exemplo: 14:35 a 17:21 = 02:46
    * Adaptada de http://stackoverflow.com/questions/2053057/doing-time-subtraction-with-jquery
    */
     diferencaHoras(horaInicial, horaFinal) {
    
      // Se a hora inicial é menor que a final, faça a diferença tranquilamente	
      if(this.isHoraInicialMenorHoraFinal(horaInicial, horaFinal)){
            let horasTotal : any;
            let minutosTotal : any
            let hIni : any;
            let hFim : any
        let aux : any;
         aux = horaInicial;
        horaInicial = horaFinal;
        horaInicial = aux;	
    
        hIni = horaInicial.split(':');
        hFim = horaFinal.split(':');
    
        horasTotal = parseInt(hFim[0], 10) - parseInt(hIni[0], 10);
        minutosTotal = parseInt(hFim[1], 10) - parseInt(hIni[1], 10);
        
        if(minutosTotal < 0){
          minutosTotal += 60;
          horasTotal -= 1;
        }
        
        horaInicial = this.completaZeroEsquerda(horasTotal) + ":" + this.completaZeroEsquerda(minutosTotal);
        return horaInicial;
      } 
      
      // Aqui fica a gosto de quem for programar: se forem iguais, vc pode assumir que 
      // o intervalo é 24h ou zero. Depende de vc! Eu escolhi assumir que é 24h
      else if(horaInicial === horaFinal)
      {
        return "00:00";
      }
      
      // Se a hora inicial é maior que a final, então vou assumir que o 
      // horário inicial é de um dia e o final é do dia seguinte
      else
      {
        let horasQueFaltamPraMeiaNoite = this.diferencaHoras(horaInicial, "24:00"); // chamada recursiva, há há!
        let totalHoras = this.somaHora(horasQueFaltamPraMeiaNoite, horaFinal);
        return totalHoras;
      }
    }
    
    /**
    * Soma duas horas.
    * Exemplo:  12:35 + 07:20 = 19:55.
    */
     somaHora(horaInicio, horaSomada) {
      
        let horaIni = horaInicio.split(':');
        let horaSom = horaSomada.split(':');
    
        let horasTotal = parseInt(horaIni[0], 10) + parseInt(horaSom[0], 10);
      let minutosTotal = parseInt(horaIni[1], 10) + parseInt(horaSom[1], 10);
      
        if(minutosTotal >= 60){
            minutosTotal -= 60;
            horasTotal += 1;
        }
      
        let horaTotal = this.completaZeroEsquerda(horasTotal) + ":" + this.completaZeroEsquerda(minutosTotal);
        return horaTotal ;
    }
    /**
     * Recebe um total de horas e devolve o correspondente a dias e horas.
     * Exemplo: 29:45 => 01d 05h 00m
     */
     converteEmDiasHoras(totalHoras)
    {
       let total = totalHoras.split(':');
       let horas = parseInt(total[0]);
       let minutos = parseInt(total[1]);
       
       if(horas < 24)
         return '00d ' + this.completaZeroEsquerda(horas) + 'h ' + this.completaZeroEsquerda(minutos) + 'm';
       
       let dias = Math.floor(horas/24); //Math.floor para forçar resultado inteiro
       horas = horas%24;
       return this.completaZeroEsquerda(dias) +'d ' + this.completaZeroEsquerda(horas) + 'h ' + this.completaZeroEsquerda(minutos) + 'm';
    }
    /**
    * Verifica se a hora inicial é menor que a final.
    * Exemplo: 10:50 < 22:10 ? Retorna true.
    */
     isHoraInicialMenorHoraFinal(horaInicial, horaFinal){
       let horaIni : any;
       let horaFim : any
       let hIni : any;
       let hFim : any
       let mIni : any;
       let mFim : any
       
       horaIni = horaInicial.split(':');
       horaFim = horaFinal.split(':');
    
       // Verifica as horas. Se forem diferentes, é só ver se a inicial 
       // é menor que a final.
       hIni = parseInt(horaIni[0], 10);
       hFim = parseInt(horaFim[0], 10);
       if(hIni != hFim)
         return hIni < hFim;
       
       // Se as horas são iguais, verifica os minutos então.
       mIni = parseInt(horaIni[1], 10);
       mFim = parseInt(horaFim[1], 10);
       if(mIni != mFim)
         return mIni < mFim;
    }
    
    /**
     * Verifica se um campo está vazio.
     */
     possuiValor( valor ){
      return valor != undefined && valor != '';
    }
    
    /**
     * Completa um número menor que dez com um zero à esquerda.
     * Usado aqui para formatar as horas... Exemplo: 3:10 -> 03:10 , 10:5 -> 10:05
     */
     completaZeroEsquerda( numero ){
      return ( numero < 10 ? "0" + numero : numero);
    }
    ///////////////////
  }