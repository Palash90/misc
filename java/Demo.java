import java.util.*;

class ClassField {
    private String name;
    private String type;

    public ClassField(String name, String type){
        this.name = name;
        this.type = type;
    }

    @Override
    public String toString(){
        return "public " + type + " "+name;
    }
}

class CodeBuilder
{
    private String className;
    private ArrayList<ClassField> fields = new ArrayList<>();
    private String newLine = System.lineSeparator();
    private String indentation = "  ";

    public CodeBuilder(String className)
    {
        this.className = className;
    }

    public CodeBuilder addField(String name, String type)
    {
        fields.add(new ClassField (name, type));
        return this;
    }

    @Override
    public String toString()
    {
        StringBuilder sb = new StringBuilder("public class " + className+newLine);
        sb.append("{"+newLine);

        for(ClassField field:fields){
            sb.append(indentation);
            sb.append(field.toString());
            sb.append(";");
            sb.append(newLine);
        }

        sb.append("}"+newLine);
        return sb.toString();
    }
}

public class Demo {
    public static void main(String[] args){
        CodeBuilder cb = new CodeBuilder("Person").addField("name", "String").addField("age", "int");
        System.out.println(cb);
    }
}
