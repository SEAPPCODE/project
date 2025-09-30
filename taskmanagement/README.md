# Getting Started

### Reference Documentation

For further reference, please consider the following sections:

* [Official Gradle documentation](https://docs.gradle.org)
* [Spring Boot Gradle Plugin Reference Guide](https://docs.spring.io/spring-boot/3.5.5/gradle-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/3.5.5/gradle-plugin/packaging-oci-image.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/3.5.5/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Validation](https://docs.spring.io/spring-boot/3.5.5/reference/io/validation.html)
* [Spring Web](https://docs.spring.io/spring-boot/3.5.5/reference/web/servlet.html)

### Guides

The following guides illustrate how to use some features concretely:

* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Validation](https://spring.io/guides/gs/validating-form-input/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### Additional Links

These additional references should also help you:

* [Gradle Build Scans – insights for your project's build](https://scans.gradle.com#gradle)

create sequence case_id_seq start with 1 increment by 1;
create table task
(
id         bigint       not null default nextval('case_id_seq '),
title      varchar(200) not null,
description  varchar(500) not null,
due_date timestamp not null,
created_at timestamp    not null default now(),
updated_at timestamp,
primary key (id)
);

insert into task(title, description, due_date, created_at, updated_at) values
('Defining the Issues', 'The tribunal will identify the specific questions that need to be decided at the final hearing.', '05-01-2026', '10-09-2025', null);
insert into task(title, description, due_date, created_at, updated_at) values('Case Management', 'The primary goal is to manage the case, which includes setting deadlines and determining the procedures for the case. ', '12-02-2026', '06-05-2025', null);
insert into task(title, description, due_date, created_at, updated_at) values('Document Disclosure', 'Parties agree on how and when case-related documents will be exchanged between them. ', '23-03-2026', CURRENT_DATE, null);
insert into task(title, description, due_date, created_at, updated_at) values('Witness Statements', 'Information is shared about the number of witnesses expected and the process for exchanging witness statements. ', '15-07-2026', CURRENT_DATE, null);
insert into task(title, description, due_date, created_at, updated_at) values('Deposit Orders', 'If the tribunal believes part of a claim or response has little reasonable prospect of success, it may order a party to pay a deposit to continue. ', '22-07-2026', CURRENT_DATE, null);
insert into task(title, description, due_date, created_at, updated_at) values('Striking Out Claims', 'Applications can be made to strike out a claim or response if it has no reasonable prospect of success. ', '29-07-2026', CURRENT_DATE, null);
insert into task(title, description, due_date, created_at, updated_at) values('Remedies and Reinstatement', 'The claimants desired outcomes, such as monetary compensation or returning to work, are discussed. ', '17-10-2026', CURRENT_DATE, null);
insert into task(title, description, due_date, created_at, updated_at) values('Judicial Mediation', 'The parties may explore options for settling the case through mediation. ', '09-12-2026', CURRENT_DATE, null);
insert into task(title, description, due_date, created_at, updated_at) values('Applications', 'Decisions are made on various applications, such as amendments to claims or adding/removing parties. ', '05-04-2026', CURRENT_DATE, null);

COMMIT;