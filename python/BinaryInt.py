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
    binary_rep = "".join(reversed(binary_number)).zfill(64)
    nibbles = [binary_rep[i:i + 4] for i in range(0, len(binary_rep), 4)]
    binary_rep = ''
    for nibble in nibbles:
        binary_rep = binary_rep + nibble + "-"
    return binary_unsigned_long_rep(binary_rep[:-1], byte_big_endian, word_big_endian, dword_big_endian)


def binary_ushort_rep(binary_rep, byte_big_endian=False):
    ushortRep = ''
    binary_rep = binary_rep.replace("-", "")
    if len(binary_rep) == 8:
        pass
    elif len(binary_rep) == 16:
        n = 8
        byteSegments = [binary_rep[i:i + n] for i in range(0, len(binary_rep), n)]
        if byte_big_endian:
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


def binary_unsigned_int_rep(binary_rep, byte_big_endian=False, word_big_endian=False):
    binary_rep = binary_rep.replace("-", "")

    if len(binary_rep) == 32:
        n = 16
        shortSegments = [binary_rep[i:i + n] for i in range(0, len(binary_rep), n)]
        if word_big_endian:
            unsignedIntRep = binary_ushort_rep(shortSegments[1], byte_big_endian) + '-' + binary_ushort_rep(
                shortSegments[0], byte_big_endian)
        else:
            unsignedIntRep = binary_ushort_rep(shortSegments[0], byte_big_endian) + '-' + binary_ushort_rep(
                shortSegments[1], byte_big_endian)
    else:
        print("Invalid Representation")
        return
    return unsignedIntRep


def binary_unsigned_long_rep(binary_rep, byte_big_endian=False, word_big_endian=False, dword_big_endian=False):
    binary_rep = binary_rep.replace("-", "")

    if len(binary_rep) == 64:
        n = 32
        intSegments = [binary_rep[i:i + n] for i in range(0, len(binary_rep), n)]
        if dword_big_endian:
            unsignedLongRep = binary_unsigned_int_rep(intSegments[1], byte_big_endian,
                                               word_big_endian) + '-' + binary_unsigned_int_rep(
                intSegments[0], byte_big_endian, word_big_endian)
        else:
            unsignedLongRep = binary_unsigned_int_rep(intSegments[0], byte_big_endian,
                                               word_big_endian) + '-' + binary_unsigned_int_rep(
                intSegments[1], byte_big_endian, word_big_endian)
    else:
        print("Invalid Representation")
        return
    return unsignedLongRep


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
    binaryToNumber = calculate(binary_unsigned_long_rep(rep, byteOrder, wordOrder, dwordOrder))

    numberToBinaryToNumber = calculate(binary_unsigned_long_rep(numberToBinary, byteOrder, wordOrder, dwordOrder))
    binaryToNumberToBinary = into_binary(binaryToNumber, byteOrder, wordOrder, dwordOrder)

    numberToBinaryCheck = numberToBinary == rep
    binaryToNumberCheck = binaryToNumber == expected
    numberToBinaryToNumberCheck = numberToBinaryToNumber == expected
    binaryToNumberToBinaryCheck = binaryToNumberToBinary == rep

    print(numberToBinaryCheck, binaryToNumberCheck, numberToBinaryToNumberCheck, binaryToNumberToBinaryCheck)
