/// <reference types="cypress" />

describe('Foto-Config App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080'); // ajuste a porta se necessário
  });

  it('carrega a página inicial e mostra o ícone de configurações', () => {
    cy.get('#settingsBtn').should('be.visible');
  });

  it('abre e fecha o painel de configurações', () => {
    cy.get('#settingsBtn').click();
    cy.get('#settingsPanel').should('be.visible');
    cy.get('#closeSettings').click();
    cy.get('#settingsPanel').should('not.be.visible');
  });

  it('faz upload de uma imagem e mostra preview', () => {
    cy.fixture('sample.jpg', 'base64').then(fileContent => {
      cy.get('input[type="file"]').attachFile({ fileContent, fileName: 'sample.jpg', mimeType: 'image/jpeg' });
    });
    cy.get('#canvasPreview').should('be.visible');
  });

  it('aplica filtro Leica e verifica canvas', () => {
    cy.get('#settingsBtn').click();
    cy.get('#leicaBW').check({ force: true });
    cy.get('#closeSettings').click();
    cy.fixture('sample.jpg', 'base64').then(fileContent => {
      cy.get('input[type="file"]').attachFile({ fileContent, fileName: 'sample.jpg', mimeType: 'image/jpeg' });
    });
    cy.get('#canvasPreview').should('be.visible');
  });

  it('faz download da foto com moldura', () => {
    cy.fixture('sample.jpg', 'base64').then(fileContent => {
      cy.get('input[type="file"]').attachFile({ fileContent, fileName: 'sample.jpg', mimeType: 'image/jpeg' });
    });
    cy.get('#downloadBtn').should('be.visible').click();
  });
});
