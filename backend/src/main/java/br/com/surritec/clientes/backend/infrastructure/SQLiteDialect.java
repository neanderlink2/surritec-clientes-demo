// package br.com.surritec.clientes.backend.infrastructure;

// import java.sql.Types;

// import org.hibernate.dialect.Dialect;
// import org.hibernate.dialect.function.SQLFunctionTemplate;
// import org.hibernate.dialect.function.StandardSQLFunction;
// import org.hibernate.dialect.function.VarArgsSQLFunction;
// import org.hibernate.dialect.identity.IdentityColumnSupport;
// import org.hibernate.type.StringType;

// public class SQLiteDialect extends Dialect {

//     public SQLiteDialect() {
//         registerColumnType(Types.BIT, "integer");
//         registerColumnType(Types.TINYINT, "tinyint");
//         registerColumnType(Types.SMALLINT, "smallint");
//         registerColumnType(Types.INTEGER, "integer");
//         registerColumnType(Types.BIGINT, "bigint");
//         registerColumnType(Types.FLOAT, "float");
//         registerColumnType(Types.REAL, "real");
//         registerColumnType(Types.DOUBLE, "double");
//         registerColumnType(Types.NUMERIC, "numeric");
//         registerColumnType(Types.DECIMAL, "decimal");
//         registerColumnType(Types.CHAR, "char");
//         registerColumnType(Types.VARCHAR, "varchar");
//         registerColumnType(Types.LONGVARCHAR, "longvarchar");
//         registerColumnType(Types.DATE, "date");
//         registerColumnType(Types.TIME, "time");
//         registerColumnType(Types.TIMESTAMP, "timestamp");
//         registerColumnType(Types.BINARY, "blob");
//         registerColumnType(Types.VARBINARY, "blob");
//         registerColumnType(Types.LONGVARBINARY, "blob");
//         registerColumnType(Types.BLOB, "blob");
//         registerColumnType(Types.CLOB, "clob");
//         registerColumnType(Types.BOOLEAN, "integer");

//         registerFunction("concat", new VarArgsSQLFunction(StringType.INSTANCE, "", "||", ""));
//         registerFunction("mod", new SQLFunctionTemplate(StringType.INSTANCE, "?1 % ?2"));
//         registerFunction("substr", new StandardSQLFunction("substr", StringType.INSTANCE));
//         registerFunction("substring", new StandardSQLFunction("substr", StringType.INSTANCE));

//     }

//     public IdentityColumnSupport getIdentityColumnSupport() {
//         return new SQLiteIdentityColumnSupport();
//     }

//     public boolean hasAlterTable() {
//         return false;
//     }

//     public boolean dropConstraints() {
//         return false;
//     }

//     public String getDropForeignKeyString() {
//         return "";
//     }

//     public String getAddForeignKeyConstraintString(String constraintName, String[] foreignKey, String referencedTable,
//             String[] primaryKey, boolean referencesPrimaryKey) {
//         return "";
//     }

//     public String getAddPrimaryKeyConstraintString(String constraintName) {
//         return "";
//     }

//     public String getForUpdateString() {
//         return "";
//     }

//     public String getAddColumnString() {
//         return "add column";
//     }

//     public boolean supportsOuterJoinForUpdate() {
//         return false;
//     }

//     public boolean supportsIfExistsBeforeTableName() {
//         return true;
//     }

//     public boolean supportsCascadeDelete() {
//         return false;
//     }
// }
