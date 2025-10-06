# Getting Started
Go to project\taskmanagement> mvn clean install -DskipTests

#To Run
mvn spring-boot:run

# Test in browser (json response)
http://localhost:8080/tasks

# Run the below script in Postgresql

create sequence case_id_seq start with 1 increment by 1;
create table task
(
    id         bigint       not null default nextval('case_id_seq '),
    title      varchar(200) not null,
    description  varchar(500) not null,
    status  varchar(15) not null,
    due_date timestamp not null,
    created_at timestamp    not null default now(),
    updated_at timestamp,
    primary key (id)
);

insert into task(title, description, status, due_date, created_at, updated_at) values
    ('Defining the Issues', 'The tribunal will identify the specific questions that need to be decided at the final hearing.', 'New', '05-01-2026', '10-09-2025', null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Case Management', 'The primary goal is to manage the case, which includes setting deadlines and determining the procedures for the case. ', 'New','12-02-2026', '06-05-2025', null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Document Disclosure', 'Parties agree on how and when case-related documents will be exchanged between them. ', 'New','23-03-2026', CURRENT_DATE, null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Witness Statements', 'Information is shared about the number of witnesses expected and the process for exchanging witness statements. ','New', '15-07-2026', CURRENT_DATE, null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Deposit Orders', 'If the tribunal believes part of a claim or response has little reasonable prospect of success, it may order a party to pay a deposit to continue. ', 'New','22-07-2026', CURRENT_DATE, null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Striking Out Claims', 'Applications can be made to strike out a claim or response if it has no reasonable prospect of success. ', 'New','29-07-2026', CURRENT_DATE, null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Remedies and Reinstatement', 'The claimants desired outcomes, such as monetary compensation or returning to work, are discussed. ','New', '17-10-2026', CURRENT_DATE, null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Judicial Mediation', 'The parties may explore options for settling the case through mediation. ', 'New','09-12-2026', CURRENT_DATE, null);
insert into task(title, description, status, due_date, created_at, updated_at) values('Applications', 'Decisions are made on various applications, such as amendments to claims or adding/removing parties. ', 'New','05-04-2026', CURRENT_DATE, null);

COMMIT;


