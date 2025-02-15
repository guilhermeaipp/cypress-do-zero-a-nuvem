describe("Central de Atendimento ao Cliente TAT", function() {
  beforeEach(function() {
      cy.visit('src/index.html'); // Visita a página index.html
  }

  )

  it("Verifica título da aplicação", function() {
    
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); // Verifica se o título da página contém o texto esperado
  });

  it("Verifica mensagem Campos obrigatorios", function() {
    cy.get('button[type="submit"]').click()
  
    cy.get('span.error')
.should('not.be.visible') // Verifica que o elemento está oculto inicialmente.
.invoke('show')           // Simula a exibição do elemento, se necessário.
.should('be.visible')     // Verifica que agora o elemento está visível.
.and('contain.text', 'Valide os campos obrigatórios!'); // Valida o texto dentro do elemento.

});  

it("preenche os campos obrigatórios do formulário", function() {
  const longText = "Fundos de investimento são uma forma de aplicação financeira coletiva, onde diversos investidores (também chamados de cotistas) unem seus recursos para formar um patrimônio comum, gerido por um profissional ou instituição especializada. Esse gestor é responsável por decidir onde investir o dinheiro do fundo, seguindo a política de investimento definida em seu regulamento."
    
    cy.get('#firstName').type('Guilherme').should('have.value', 'Guilherme')
    cy.get('#lastName').type("Aipp").should('have.value', 'Aipp')
    cy.get('#email').type('marques.guilherme@protonmail.com').should('have.value', 'marques.guilherme@protonmail.com')
    cy.get('#phone').type('11952439847').should('have.value', '11952439847')
    cy.get('#open-text-area').type(longText, {delay: 0 }).should('have.value', longText)
    
      });
      
it("Seleciona Campos", function() {

  cy.get('#product').select('blog').should('have.value', 'blog');
  cy.get('input[type="radio"][value="elogio"]').check().should('be.checked');

});

it("Seleciona Telefone e valida observação", function() {
  cy.get('#phone-checkbox').check().should('be.checked');

  cy.get('.phone-label-span.required-mark') // Seleciona o elemento pelo seletor
  .should('be.visible')                   // Verifica se está visível
  .and('contain.text', '(obrigatório)');  // Verifica se contém o texto "(obrigatório)"



});
it("Clica em enviar", function() {
  cy.get('button[type="submit"]').click()
});

it("Digita e limpa campos", function() {
    cy.get('#firstName').type('Guilherme').should('have.value', 'Guilherme').clear().should('have.value', '')
    cy.get('#lastName').type("Aipp").should('have.value', 'Aipp').clear().should('have.value', '')
    cy.get('#email').type('marques.guilherme@protonmail.com').should('have.value', 'marques.guilherme@protonmail.com').clear().should('have.value', '')
    cy.get('#phone').type('11952439847').should('have.value', '11952439847').clear().should('have.value', '')
    
});

it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function() {
  cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank')
});


it("acessa a página da política de privacidade removendo o target e então clicando no link", function() {
  cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click();

  cy.get('#title').should('be.visible').and('contain', 'CAC TAT - Política de Privacidade');
});


});