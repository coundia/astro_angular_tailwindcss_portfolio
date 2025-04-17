tree src
src
├── main
│   ├── java
│   │   └── com
│   │       └── pcoundia
│   │           ├── MainApplication.java
│   │           ├── shared
│   │           │   ├── Presentation
│   │           │   │   └── StatusController.java
│   │           │   ├── application
│   │           │   │   └── ApiResponseDto.java
│   │           │   └── infrastructure
│   │           │       ├── FileStorageService.java
│   │           │       ├── FileStorageServiceImpl.java
│   │           │       ├── config
│   │           │       │   └── DatabaseConfiguration.java
│   │           │       ├── exception
│   │           │       │   └── GlobalExceptionHandler.java
│   │           │       ├── security
│   │           │       │   └── SecurityConfig.java
│   │           │       └── webflux
│   │           │           └── CorsGlobalConfiguration.java
│   │           └── transactions
│   │               ├── application
│   │               │   ├── command
│   │               │   │   ├── CreateTransactionCommand.java
│   │               │   │   ├── DeleteTransactionCommand.java
│   │               │   │   └── UpdateTransactionCommand.java
│   │               │   ├── commandHandler
│   │               │   │   ├── CreateTransactionCommandHandler.java
│   │               │   │   ├── DeleteTransactionCommandHandler.java
│   │               │   │   └── UpdateTransactionCommandHandler.java
│   │               │   ├── dto
│   │               │   │   ├── TransactionPagedResponse.java
│   │               │   │   ├── TransactionRequest.java
│   │               │   │   └── TransactionResponse.java
│   │               │   ├── mapper
│   │               │   │   └── TransactionMapper.java
│   │               │   ├── query
│   │               │   │   ├── FindByIdTransactionQuery.java
│   │               │   │   └── ListTransactionQuery.java
│   │               │   └── queryHandler
│   │               │       ├── FindByIdTransactionHandler.java
│   │               │       └── ListTransactionQueryHandler.java
│   │               ├── domain
│   │               │   ├── TransactionAggregate.java
│   │               │   ├── exception
│   │               │   │   ├── TransactionAmountNotValid.java
│   │               │   │   ├── TransactionIdNotValid.java
│   │               │   │   ├── TransactionNotFoundException.java
│   │               │   │   └── TransactionReferenceNotValid.java
│   │               │   └── valueObject
│   │               │       ├── TransactionAmount.java
│   │               │       ├── TransactionId.java
│   │               │       └── TransactionReference.java
│   │               ├── infrastructure
│   │               │   ├── entity
│   │               │   │   └── Transaction.java
│   │               │   └── repository
│   │               │       └── TransactionRepository.java
│   │               └── presentation
│   │                   ├── controller
│   │                   │   ├── AddTransactionController.java
│   │                   │   ├── DeleteTransactionController.java
│   │                   │   ├── FindByIdTransactionController.java
│   │                   │   ├── TransactionListController.java
│   │                   │   ├── TransactionSseController.java
│   │                   │   └── UpdateTransactionController.java
│   │                   └── sse
│   │                       └── TransactionPublisher.java
│   └── resources
│       ├── application-test.properties
│       ├── application.properties
│       ├── schema-domain.sql
│       └── schema-others.sql
└── test
└── java
└── com
└── pcoundia
├── ProductCommandApplicationTests.java
├── shared
│   ├── BaseIntegrationTests.java
│   └── BaseUnitTests.java
└── transactions
├── application
│   ├── CreateTransactionCommandHandlerTest.java
│   ├── DeleteTransactionCommandHandlerTest.java
│   └── UpdateTransactionCommandHandlerTest.java
├── domain
│   └── TransactionAggregateTests.java
├── presentation
│   └── controller
│       ├── StatusControllerTest.java
│       ├── TransactionCreateControllerIntegrationTest.java
│       ├── TransactionDeleteControllerIntegrationTest.java
│       ├── TransactionFindAllControllerIntegrationTest.java
│       ├── TransactionFindByIdControllerIntegrationTest.java
│       ├── TransactionFixtures.java
│       ├── TransactionSseControllerTest.java
│       └── TransactionUpdateControllerIntegrationTest.java
└── shared
├── BaseIntegrationTests.java
└── BaseUnitTests.java

42 directories, 61 files
