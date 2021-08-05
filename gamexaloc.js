<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-br" lang="pt-br">
  <head>
    <title>jogo de lógica</title>
 

    <style type="text/css"> /* Estilos da página */
      <!--  
      * {
        font: 12px "Segoe UI", Tahoma, Verdana, sans-serif;
      }
      body {
        background-color: #FFFFEF
      }
      select {
        background-color: #DFDFCF
      }
      .titulo {
        font: small-caps 25px Tahoma, sans-serif;
        color: #255681;
        background-color: #EFEFEF
      }
      .vermelho {color: #FF0000 }
      .verde { color: #006600 }
      .azul { color: #0000FF }
      .rosa { color: #FF00FF }
      .laranja { color: #FF9900 }
      .preto { color: #000000 }
      -->
    </style>

    <script type="text/javascript">
      <!--

      cor = new Array();     
      cor[0] = "#FF0000";    // Vermelho
      cor[1] = "#006600";    // Verde
      cor[2] = "#0000FF";    // Azul
      cor[3] = "#FF00FF";    // Rosa
      cor[4] = "#FF9900";    // Laranja
      cor[5] = "#000000";    // Preto

      nivel = 1;     
      Pensar();      
      partidas = 1;    

      limite = new Array();   
      limite[1] = 10;       
      limite[2] = 12;       
      limite[3] = 14;        




      function Pensar() {
        indice = nivel * 1 + 2;                          
        bloco1 = cor[Math.round(Math.random() * indice)];  
        bloco2 = cor[Math.round(Math.random() * indice)];
        bloco3 = cor[Math.round(Math.random() * indice)];
        bloco4 = cor[Math.round(Math.random() * indice)];
      }

      function Jogar() {
        nivel = document.jogo.nivel.value;   
        erro = 0;                            

        var primeiro = document.getElementsByTagName("select")[4 * nivel - 3].value;   // Primeiro bloco escolhido
        var segundo = document.getElementsByTagName("select")[4 * nivel - 2].value;    // Segundo bloco escolhido
        var terceiro = document.getElementsByTagName("select")[4 * nivel - 1].value;   // Terceiro bloco escolhido
        var quarto = document.getElementsByTagName("select")[4 * nivel].value;         // Quarto bloco escolhido


 
        if (primeiro == "-") {
          alert("Selecione a cor do primeiro bloco");
          document.getElementsByTagName("select")[4 * nivel - 3].focus();
          return false;
        }
        if (segundo == "-") {
          alert("Selecione a cor do segundo bloco");
          document.getElementsByTagName("select")[4 * nivel - 2].focus();
          return false;
        }
        if (terceiro == "-") {
          alert("Selecione a cor do terceiro bloco");
          document.getElementsByTagName("select")[4 * nivel - 1].focus();
          return false;
        }
        if (quarto == "-") {
          alert("Selecione a cor do quarto bloco");
          document.getElementsByTagName("select")[4 * nivel].focus();
          return false;
        }

        // Escreve sequência do usuário:
        document.getElementById("status").innerHTML += "<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + primeiro + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + segundo + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + terceiro + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + quarto + "'></button>&nbsp;&nbsp;&nbsp;&nbsp;";

        if (primeiro != bloco1) {
          erro++;                 
        }
        if (segundo != bloco2) {
          erro++;
        }
        if (terceiro != bloco3) {
          erro++;
        }
        if (quarto != bloco4) {
          erro++;
        }

        chances = limite[nivel] - partidas;    // Chances que ainda restam para o fim do jogo


        // CASO 1: Se não errou nenhum bloco em qualquer partida, exceto a primeira:
        if (erro == 0 && partidas != 1) {
          document.getElementById("status").innerHTML += "<i>ACERTOU em " + partidas + " partidas!</i>";
          HabilitarBotoes(false);
          alert("Parabéns! Tente novamente!")
        }

        else if (erro == 0 && partidas == 1) {          
          document.getElementById("status").innerHTML += "<i>ACERTOU em apenas 1 partida!\nIsso é pura sorte!</i>";
          HabilitarBotoes(false);
          alert("Parabéns! Continue assim!")
        }

        // CASO 3: Apenas 1 bloco errado. Escrever no singular.
        else if (erro == 1) {
          document.getElementById("status").innerHTML += "1 erro. Chances: " + chances + "<br /><br />";
        }

        // CASO 4: Mais de um bloco errado. Escrever no plural.
        else {
          document.getElementById("status").innerHTML += erro + " erros. Chances: " + chances + "<br /><br />";
        }

        Rolar();  // Mostrar o último resultado

        if (partidas == limite[nivel] && erro != 0) {
          // Chances esgotadas, game over!          

          alert("Suas tentativas se esgotaram. Fim de jogo!");
          return SequenciaCorreta();   // Mostra qual era a resposta correta
        }
        partidas++;   // Ainda não acertou, assim soma o número de partidas jogadas
      }

      function Desistir() {
        confirma = window.confirm("Tem certeza?");
        if (confirma) {
          SequenciaCorreta();  
        }
        else {
          return false;
        }
      }

      function NovaPartida() {
        HabilitarBotoes(true);                              
        partidas = 0;                                       
        Pensar();                                          
        Jogar();                                            
        document.getElementById("status").innerHTML = "";   
      }

      function ConfirmarNovaPartida() {
        confirma = window.confirm("Começar novo jogo?");   
        if (confirma) {                                    
          NovaPartida(); 
        }
        else {
          return false;
        }      
      }

      function SequenciaCorreta() {      
        document.getElementById("status").innerHTML += "<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco1 + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco2 + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco3 + "'></button>&nbsp;&nbsp;<button disabled='disabled' style='border: outset 4px #ABABAB; width: 20px; height: 20px; background-color: " + bloco4 + "'></button>&nbsp;&nbsp;&nbsp;&nbsp;<i>Esta era a sequência correta</i>";        
        HabilitarBotoes(false);       
        Rolar();
      }

      function MudarNivel() {
        nivel = document.jogo.nivel.value;   // Atualiza nível

        if (nivel == 1) {
          document.getElementById("facil").style.display = "inline";    
          document.getElementById("medio").style.display = "none";
          document.getElementById("dificil").style.display = "none";
        }
        else if (nivel == 2) {
          document.getElementById("facil").style.display = "none";
          document.getElementById("medio").style.display = "inline";
          document.getElementById("dificil").style.display = "none";
        }
        else {
          document.getElementById("facil").style.display = "none";
          document.getElementById("medio").style.display = "none";
          document.getElementById("dificil").style.display = "inline";
        }

        n = new Array();   // Níveis de dificuldade disponíveis
        n[1] = "fácil";
        n[2] = "médio";
        n[3] = "difícil";

        alert("O nível foi alterado para " + n[nivel]);
        NovaPartida();    
        partidas = 1;      
      }

      function HabilitarBotoes(r) {
        if (r) {
          document.jogo.ok.disabled = false;  // Reabilita botão OK, pois o jogo já acabou
          document.jogo.desistir.disabled = false;      
        }
        else {
          document.jogo.ok.disabled = "disabled";         
          document.jogo.desistir.disabled = "disabled";  
        }
      }

      function Rolar() {
        document.getElementById("status").scrollTop = 1000000;
      }

      //-->
    </script>
  </head>

  <body onload="document.getElementsByTagName('select')[0].value = '1'"> <!-- O valor do atributo onload evita bug ao recarregar a página no meio da execução do jogo -->
    <span class="titulo">PopColor+ v1.0 - Jogo de lógica</span><br /><br />

    <form name="jogo" action="#">
      <span class="vermelho">Nível de dificuldade:</span>
      <select name="nivel" onchange="MudarNivel()">
        <option value="1">Fácil</option>
        <option value="2">Médio</option>
        <option value="3">Difícil</option>
      </select><br /><br />

      <span id="facil">  <!-- Bloco de opções do nível Fácil -->
        <select name="primeiro">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>        
        </select>&nbsp;

        <select name="segundo">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
        </select>&nbsp;

        <select name="terceiro">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
        </select>&nbsp;

        <select name="quarto">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
        </select>
      </span>

      <span id="medio" style="display: none">  
        <select name="primeiro">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
        </select>&nbsp;

        <select name="segundo">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
        </select>&nbsp;

        <select name="terceiro">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
        </select>&nbsp;

        <select name="quarto">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
        </select>
      </span>

      <span id="dificil" style="display: none">  <!-- Bloco de opções do nível Difícil -->
        <select name="primeiro">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
          <option value="#000000" class="preto">Preto</option>
        </select>&nbsp;

        <select name="segundo">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
          <option value="#000000" class="preto">Preto</option>
        </select>&nbsp;

        <select name="terceiro">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" style="color: #FF9900">Laranja</option>
          <option value="#000000" class="preto">Preto</option>
        </select>&nbsp;

        <select name="quarto">
          <option value="-">--
          <option value="#FF0000" class="vermelho">Vermelho</option>
          <option value="#006600" class="verde">Verde</option>
          <option value="#0000FF" class="azul">Azul</option>
          <option value="#FF00FF" class="rosa">Rosa</option>
          <option value="#FF9900" class="laranja">Laranja</option>
          <option value="#000000" class="preto">Preto</option>
        </select>
      </span>&nbsp;&nbsp;

      <input type="button" name="ok" value="OK" onclick="Jogar()" title="Jogar!" onmouseover="style.color = '#FF0000'" onmouseout="style.color = ''" />&nbsp;&nbsp;
      <input type="button" name="desistir" value="Desistir" onclick="Desistir()" title="Desistir e ver resposta certa" />&nbsp;&nbsp;
      <input type="button" value="Jogar novamente" onclick="ConfirmarNovaPartida()" title="Iniciar nova partida" />&nbsp;&nbsp;<br /><br />

      <div id="status" style="width: 400px; height: 380px; background-color: #DFDFDF; border: solid 2px #122561; color: #225651; padding: 5px 5px 5px 5px; overflow: auto" onmouseover="style.borderColor = '#165221'" onmouseout="style.borderColor = '#122561'"></div><br />

      <div style="width: 400px; height: 18px; background-color: #DFDFDF; border: solid 2px #122561; color: #225651; padding: 0px 5px 0px 5px">  <!-- Barra de mensagens -->
        <marquee scrollamount="3">
          O objetivo deste jogo é encontrar a combinação secreta de cores. No nível fácil, escolha uma entre quatro cores para cada bloco, sendo que você tem dez chances para acertar. No nível médio, são cinco cores disponíveis e doze chances. Já no nível difícil, são seis cores e quatorze chances. Lembrando que uma mesma cor pode estar presente em mais de um bloco. A quantidade de erros por jogada é mostrada ao lado dos blocos. Boa sorte!
        </marquee>
      </div>
    </form>
  </body>
</html>
