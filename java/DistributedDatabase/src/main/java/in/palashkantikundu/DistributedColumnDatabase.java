package in.palashkantikundu;

import java.io.*;
import java.util.*;

public class DistributedColumnDatabase {

    public static void main(String[] args) {
        // Initialize nodes
        MasterNode master1 = new MasterNode();
        MasterNode master2 = new MasterNode(); // Second master node for redundancy
        SlaveNode slave1 = new SlaveNode("slave1_data.txt");
        SlaveNode slave2 = new SlaveNode("slave2_data.txt");
        SlaveNode slave3 = new SlaveNode("slave3_data.txt");
        SlaveNode slave4 = new SlaveNode("slave4_data.txt");

        // Add slaves to the masters
        master1.addSlaveNode(slave1);
        master1.addSlaveNode(slave2);
        master2.addSlaveNode(slave3);
        master2.addSlaveNode(slave4);

        // Create a table
        master1.createTable("users", Arrays.asList("name", "age"));
        master2.createTable("users", Arrays.asList("name", "age"));

        // Insert rows
        master1.insertRow("users", new HashMap<>(Map.of("name", "Alice", "age", 30)));
        master1.insertRow("users", new HashMap<>(Map.of("name", "Bob", "age", 25)));
        master1.insertRow("users", new HashMap<>(Map.of("name", "Charlie", "age", 28)));

        // Query the data
        List<Map<String, Object>> results = master1.select("users", "name");
        results.forEach(System.out::println);  // Output: {name=Alice}, {name=Bob}, {name=Charlie}
    }

    // Node base class
    abstract static class Node {
        protected final Map<String, Table> tables = new HashMap<>();

        public void createTable(String tableName, List<String> columns) {
            tables.put(tableName, new Table(columns));
        }

        public abstract void insertRow(String tableName, Map<String, Object> row);

        public abstract List<Map<String, Object>> select(String tableName, String columnName);

        public Table getTable(String tableName) {
            return tables.get(tableName);
        }
    }

    // Table class
    static class Table {
        private final Map<String, Column<Object>> columns;

        public Table(List<String> columnNames) {
            columns = new HashMap<>();
            for (String columnName : columnNames) {
                columns.put(columnName, new Column<>());
            }
        }

        public Column<Object> getColumn(String columnName) {
            return columns.get(columnName);
        }

        public Map<String, Column<Object>> getColumns() {
            return columns;
        }
    }

    // Column class
    static class Column<T> {
        private final List<T> data = new ArrayList<>();

        public void addData(T value) {
            data.add(value);
        }

        public List<T> getData() {
            return data;
        }
    }

    // MasterNode class
    static class MasterNode extends Node {
        private final List<SlaveNode> slaveNodes = new ArrayList<>();

        public void addSlaveNode(SlaveNode slave) {
            slaveNodes.add(slave);
        }

        @Override
        public void createTable(String tableName, List<String> columns) {
            for (SlaveNode slave : slaveNodes) {
                slave.createTable(tableName, columns);
            }
        }

        @Override
        public void insertRow(String tableName, Map<String, Object> row) {
            // Select 2 different slave nodes for replication
            Collections.shuffle(slaveNodes); // Shuffle to get random nodes
            for (int i = 0; i < 2; i++) {
                slaveNodes.get(i).insertRow(tableName, row);
            }
        }

        public List<Map<String, Object>> select(String tableName, String columnName) {
            List<Map<String, Object>> results = new ArrayList<>();
            for (SlaveNode slave : slaveNodes) {
                results.addAll(slave.select(tableName, columnName));
            }
            return results;
        }
    }

    // SlaveNode class
    static class SlaveNode extends Node {
        private final String filePath;

        public SlaveNode(String filePath) {
            this.filePath = filePath;
        }

        @Override
        public void insertRow(String tableName, Map<String, Object> row) {
            // Directly insert data to the slave's table without calling super
            Table table = tables.get(tableName);
            if (table != null) {
                // Persist data to disk
                persistData(tableName, row);
                // Add data to the in-memory structure
                for (String columnName : table.getColumns().keySet()) {
                    Column<Object> column = (Column<Object>) table.getColumn(columnName);
                    if (column != null) {
                        column.addData(row.get(columnName)); // Add value as Object
                    }
                }
            }
        }

        private void persistData(String tableName, Map<String, Object> row) {
            try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, true))) {
                Table table = tables.get(tableName);
                if (table != null) {
                    StringBuilder sb = new StringBuilder();
                    for (String columnName : table.getColumns().keySet()) {
                        sb.append(row.get(columnName)).append(","); // Use the row's data for persistence
                    }
                    sb.setLength(sb.length() - 1); // Remove the last comma
                    writer.write(sb.toString());
                    writer.newLine();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        public List<Map<String, Object>> select(String tableName, String columnName) {
            List<Map<String, Object>> results = new ArrayList<>();
            // Read data from the file if needed
            readFromFile(tableName);

            Table table = getTable(tableName);
            if (table != null) {
                // Construct rows from column data
                int rowCount = table.getColumn(columnName).getData().size(); // Get the number of rows from a column
                for (int i = 0; i < rowCount; i++) {
                    Map<String, Object> row = new HashMap<>();
                    for (String colName : table.getColumns().keySet()) {
                        Column<Object> column = (Column<Object>) table.getColumn(colName);
                        if (column != null) {
                            row.put(colName, column.getData().get(i)); // Add value from the column
                        }
                    }
                    results.add(row);
                }
            }
            return results;
        }

        private void readFromFile(String tableName) {
            try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    String[] values = line.split(",");
                    Table table = tables.get(tableName);
                    if (table != null) {
                        Map<String, Object> row = new HashMap<>();
                        for (int i = 0; i < values.length; i++) {
                            String columnName = new ArrayList<>(table.getColumns().keySet()).get(i);
                            row.put(columnName, values[i]);
                            Column<Object> column = (Column<Object>) table.getColumn(columnName);
                            if (column != null) {
                                column.addData(values[i]); // Add value as Object
                            }
                        }
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
