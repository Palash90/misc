import json;

def read():
    f=open("data.json");
    data = json.load(f);
    f.close();
    return data;

def getData():
    data = read();
    input=data["input"];
    expected = data["expected"];
    inputLength=len(input);
    print("Original data:\t", data["input"]);
    return (input, inputLength);

def getSortedData():
    data = read();
    expected = data["expected"];
    inputLength=len(expected);
    print("Original data:\t", expected);
    return (expected, inputLength);

def checkResult(sorted):
    data=read();

    print("Expected data:\t", data["expected"]);
    print("Sorted data:\t", sorted);

    if len(sorted) != len(data["input"]):
        raise Exception("Length of input and output does not match");

    for i in range(len(sorted)):
        if sorted[i] != data["expected"][i]:
            raise Exception("Mismatch in position" + str(i) + " sorted " + str(sorted[i]) + " expected " + str(data["expected"][i]));
    print("Sorting succeeded");

