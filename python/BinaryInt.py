def calculate(binary_rep):
    number = 0
    binary_rep = binary_rep.replace("-", "")
    binary_rep = binary_rep[::-1]
    for index in range(len(binary_rep)):
        if binary_rep[index] == '0' or binary_rep[index] == '1':
            bit = int(binary_rep[index])
            number = number + 2 ** index * bit
        else:
            print("Invalid input string, contains non-binary", bit)
            return
    return number


def into_binary(number, byte_big_endian=False, word_big_endian=False, dword_big_endian=False):
    binary_number = ""
    if number != 0:
        while number >= 1:
            if number % 2 == 0:
                binary_number = binary_number + "0"
                number = number / 2
            else:
                binary_number = binary_number + "1"
                number = (number - 1) / 2
    else:
        binary_number = "0"
    rep = "".join(reversed(binary_number)).zfill(64)
    nibbles = [rep[i:i + 4] for i in range(0, len(rep), 4)]
    rep = ''
    for nibble in nibbles:
        rep = rep + nibble + "-"
    return binary_to_ulong(rep[:-1], byte_big_endian, word_big_endian, dword_big_endian)


def binary_to_ushort(rep, byteOrderBigEndian=False):
    ushortRep = ''
    rep = rep.replace("-", "")
    if len(rep) == 8:
        pass
    elif len(rep) == 16:
        n = 8
        byteSegments = [rep[i:i + n] for i in range(0, len(rep), n)]
        if byteOrderBigEndian:
            ushortRep = byteSegments[1] + '-' + byteSegments[0]
            pass
        else:
            ushortRep = byteSegments[0] + '-' + byteSegments[1]

    else:
        print("Invalid Representation")
        return
    n = 4
    ushortRep = ushortRep.replace("-", "")
    nibbles = [ushortRep[i:i + n] for i in range(0, len(ushortRep), n)]
    ushortRep = nibbles[0] + "-" + nibbles[1] + "-" + nibbles[2] + "-" + nibbles[3]
    return ushortRep


def binary_to_uint(rep, byteOrderBigEndian=False, wordOrderBigEndian=False):
    rep = rep.replace("-", "")

    if len(rep) == 32:
        n = 16
        shortSegments = [rep[i:i + n] for i in range(0, len(rep), n)]
        if wordOrderBigEndian:
            uintRep = binary_to_ushort(shortSegments[1], byteOrderBigEndian) + '-' + binary_to_ushort(
                shortSegments[0], byteOrderBigEndian)
        else:
            uintRep = binary_to_ushort(shortSegments[0], byteOrderBigEndian) + '-' + binary_to_ushort(
                shortSegments[1], byteOrderBigEndian)
    else:
        print("Invalid Representation")
        return
    return uintRep


def binary_to_ulong(rep, byteOrderBigEndian=False, wordOrderBigEndian=False, dwordOrderBigEndian=False):
    rep = rep.replace("-", "")

    if len(rep) == 64:
        n = 32
        intSegments = [rep[i:i + n] for i in range(0, len(rep), n)]
        if dwordOrderBigEndian:
            ulongRep = binary_to_uint(intSegments[1], byteOrderBigEndian,
                                      wordOrderBigEndian) + '-' + binary_to_uint(
                intSegments[0], byteOrderBigEndian, wordOrderBigEndian)
        else:
            ulongRep = binary_to_uint(intSegments[0], byteOrderBigEndian,
                                      wordOrderBigEndian) + '-' + binary_to_uint(
                intSegments[1], byteOrderBigEndian, wordOrderBigEndian)
    else:
        print("Invalid Representation")
        return
    return ulongRep


numberReps = [
    {
        "rep": "0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0011",
        "byteOrder": False,
        "wordOrder": False,
        "dwordOrder": False,
        "expected": 3
    },
    {
        "rep": "0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0011-0000-0000",
        "byteOrder": True,
        "wordOrder": False,
        "dwordOrder": False,
        "expected": 3
    },
    {
        "rep": "0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0011-0000-0000-0000-0000",
        "byteOrder": False,
        "wordOrder": True,
        "dwordOrder": False,
        "expected": 3
    },
    {
        "rep": "0000-0000-0000-0000-0000-0000-0000-0000-0000-0011-0000-0000-0000-0000-0000-0000",
        "byteOrder": True,
        "wordOrder": True,
        "dwordOrder": False,
        "expected": 3
    },
    {
        "rep": "0000-0000-0000-0000-0000-0000-0000-0011-0000-0000-0000-0000-0000-0000-0000-0000",
        "byteOrder": False,
        "wordOrder": False,
        "dwordOrder": True,
        "expected": 3
    },
    {
        "rep": "0000-0000-0000-0000-0000-0011-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000",
        "byteOrder": True,
        "wordOrder": False,
        "dwordOrder": True,
        "expected": 3
    },
    {
        "rep": "0000-0000-0000-0011-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000",
        "byteOrder": False,
        "wordOrder": True,
        "dwordOrder": True,
        "expected": 3
    },
    {
        "rep": "0000-0011-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000-0000",
        "byteOrder": True,
        "wordOrder": True,
        "dwordOrder": True,
        "expected": 3
    }
]
for numberRep in numberReps:
    expected = numberRep["expected"]
    byteOrder = numberRep["byteOrder"]
    wordOrder = numberRep["wordOrder"]
    dwordOrder = numberRep["dwordOrder"]
    rep = numberRep["rep"]

    numberToBinary = into_binary(expected, byteOrder, wordOrder, dwordOrder)
    binaryToNumber = calculate(binary_to_ulong(rep, byteOrder, wordOrder, dwordOrder))

    numberToBinaryToNumber = calculate(binary_to_ulong(numberToBinary, byteOrder, wordOrder, dwordOrder))
    binaryToNumberToBinary = into_binary(binaryToNumber, byteOrder, wordOrder, dwordOrder)

    numberToBinaryCheck = numberToBinary == rep
    binaryToNumberCheck = binaryToNumber == expected
    numberToBinaryToNumberCheck = numberToBinaryToNumber == expected
    binaryToNumberToBinaryCheck = binaryToNumberToBinary == rep

    print(numberToBinaryCheck, binaryToNumberCheck, numberToBinaryToNumberCheck, binaryToNumberToBinaryCheck)
