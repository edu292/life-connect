USE life_connect;
alter table usuarios add column instagram VARCHAR(50);

alter table alimentos add column instagram varchar(50);

alter table doacoes add column instagram varchar(50);

alter table lotes_doacao add column instagram varchar(30);
alter table categorias add column instagram varchar(50)