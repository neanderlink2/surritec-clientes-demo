// package br.com.surritec.clientes.backend.infrastructure;

// import java.util.Properties;

// import javax.sql.DataSource;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.context.annotation.PropertySource;
// import org.springframework.core.env.Environment;
// import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
// import org.springframework.jdbc.datasource.DriverManagerDataSource;
// import org.springframework.orm.jpa.JpaTransactionManager;
// import org.springframework.orm.jpa.JpaVendorAdapter;
// import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
// import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
// import org.springframework.transaction.PlatformTransactionManager;
// import org.springframework.transaction.annotation.EnableTransactionManagement;

// @Configuration
// @EnableTransactionManagement
// public class SQLiteDataSource {

//     final Environment env;

//     public SQLiteDataSource(Environment env) {
//         this.env = env;
//     }

//     @Bean
//     public DataSource dataSource() {
//         final DriverManagerDataSource dataSource = new DriverManagerDataSource();
//         dataSource.setDriverClassName(env.getProperty("driverClassName"));
//         dataSource.setUrl(env.getProperty("url"));
//         return dataSource;
//     }

//     @Configuration
//     @PropertySource("classpath:persistence.properties")
//     static class SqliteConfig {
//     }

//     @Bean
//     public PlatformTransactionManager transactionManager() {
//         JpaTransactionManager transactionManager = new JpaTransactionManager();
//         transactionManager.setEntityManagerFactory(entityManagerFactory().getObject());

//         return transactionManager;
//     }

//     @Bean
//     public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
//         return new PersistenceExceptionTranslationPostProcessor();
//     }

//     Properties additionalProperties() {
//         Properties properties = new Properties();
//         properties.setProperty("hibernate.hbm2ddl.auto", "create-drop");
//         properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");

//         return properties;
//     }

//     @Bean
//     public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
//         LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
//         em.setDataSource(dataSource());
//         em.setPackagesToScan("br.com.surritec.clientes.backend.entities");

//         JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//         em.setJpaVendorAdapter(vendorAdapter);
//         em.setJpaProperties(additionalProperties());

//         return em;
//     }
// }