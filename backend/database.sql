CREATE DATABASE db_controle;

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50),
    valor NUMERIC(8,2),
    tipo BOOLEAN,
    data_transacao DATE
);