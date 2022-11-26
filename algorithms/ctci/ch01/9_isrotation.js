function isRotatedSubstring(str1, str2) {
    if (!str1 || !str2) {
        throw new Error('invalid input');
    }
    if (str1.length !== str2.length) {
        return false;
    }
    return isSubstring(str1 + str1, str2);
}

function isSubstring(str, substr) {
    return str.includes(substr);
}


console.log(isRotatedSubstring("waterbottle", "erbortlewat"))
