tests = [
    "-", "-2", "-9*-4", "-2--7", "2+-7", "-(2*7*-7)-8", "-(2*7*-7)*-8",
    "-(2*7*-7)*(-8)", "-(2*7*-7)*cos(-8)", "-(2*7*(-7))*cos(-8)",
    "-(2*7*(-7))*atan(-8)", "-(2 + 7)", "4 * -8", " 4*  - 8 ", " 2 *(-4 +8)",
    "1-4", "1 - 4 ", " 4*8 - 2", " 4 -  +2", " 4 +  -2", "+++++", "------",
    "+", "+2", "+9*+4", "+2-+7", "2++7", "+(2*7*+7)+8", "+(2*7*+7)*+8",
    "+(2*7*+7)*(+8)", "+(2*7*+7)*cos(+8)", "+(2*7*(+7))*cos(+8)",
    "+(2*7*(+7))*atan(+8)", "+(2 + 7)", "4 * +8", " 4*  + 8 ", " 2 *(+4 +8)",
    "1+4", "1 + 4 ", " 4*8 + 2", " 4 +  +2", "4+log(5)", "", "2+3-4/5*9",
    "2+3*log(9)-", {
        "exp": "2*x-t*y",
        "variables": {
            "x": 1,
            "t": 1
        }
    }, {
        "exp": "2*x-t*y",
        "variables": {
            "x": 1,
            "t": 1,
            "y": 1
        }
    }, "2*4-3", "cos(5)", "2.445*4-3.9*log(5, 10)", "2*4-3*log(5, 10)",
    "((((ln(1)+2)*3)-cos((sqrt(4)+5)))+(sqrt(ln((6*4)))+4))",
    "2*3-2*8*5/2%3*abs(-4)", "2*3-2*8*5/2%3*abs(-4)*ceil(2)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2)*factorial(2)",
    "factorial(2)*2*3-2*8*5/2%3*abs(-4)*ceil(2)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(2)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(2)*gcd(5,15)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(2)*gcd(5.2,15)",
    "2*3-2*8*5/2%3*abs(-4)*ceil(2.8)*factorial(1.2)*gcd(5,15)",
    "2*3-2*8*5/2*exp(2)", "2*pow(2,3)", "2*pow(2,3)*sqrt(4)",
    "2*pow(2,3)*log(1000)", "2*pow(2,3)*log2(16)", "2*pow(2,3)*Log(16, 2)",
    "2*pow(2,3)*ln(e^2)", "-(2*7*-7)*sin(-8)", "-(2*7*-7)*tan(-8)",
    "-(2*7*-7)*sinh(-8)", "-(2*7*-7)*cosh(-8)", "-(2*7*-7)*tanh(-8)",
    "-(2*7*-7)*atan(-8)", "-(2*7*-7)*asin(-8)", "-(2*7*-7)*acos(-8)",
    "-(2*7*-7)*asin(-.8)", "-(2*7*-7)*acos(-.8)", "-(2*7*-7)*atanh(-8)",
    "-(2*7*-7)*asinh(-8)", "-(2*7*-7)*acosh(-8)", "hypot(4,3)", "deg(pi/3)",
    "rad(60)", {
        "exp": "t y *",
        "variables": {
            "x": 1,
            "t": 1,
            "y": 1
        },
        "convert": False
    }, {
        "exp": "t y *",
        "variables": {
            "x": 1,
            "y": 1
        },
        "convert": False
    }, {
        "exp": "3 t y *",
        "variables": {
            "t": 1,
            "y": 1
        },
        "convert": False
    }, {
        "exp": " y     *",
        "variables": {
            "t": 1,
            "y": 1
        },
        "convert": False
    }, "-2", "--2", "---2", "----2", "-----2", "++2", "+++2", "++++2", "--++2",
    "++-2", "++++----2", "++++-----2", "-(2*7*-7)*cos(---8)",
    "-(2*7*-7)*cos(----8)", "-(2*7*--7)*cos(--8)", "-(2*7*---7)*cos(---8)",
    "-(2*7*----7)*cos(----8)", "-(2*7*-----7)*cos(----8)", "sin(cos(45))",
    "deg(asin(cos(45)))", "deg(asin(cos(rad(45))))",
    "deg(acos(cos(rad(hypot(4, 3)))))", {
        "exp": "deg(acos(cos(rad(hypot(4, 3)))))+ y     *x^t",
        "variables": {
            "t": 16,
            "x": 4,
            "y": 9
        },
        "convert": True
    }, {
        "exp": "atan(deg(acos(cos(rad(hypot(4, 3)))))+ y     *x^t)",
        "variables": {
            "t": 16,
            "x": 4,
            "y": 9
        },
        "convert": True
    }, {
        "exp": "atan(deg(acos(cos(rad(hypot(4, 3)))))+ y     *x^t)",
        "variables": {
            "t": 16,
            "x": "2*4 - 3",
            "y": 9
        },
        "convert": True
    }, {
        "exp": "hypot(x^2*4, y*t)",
        "variables": {
            "x": "2*4 - 3",
            "y": "5*0.6",
            "t": 6
        },
        "convert": True
    }, {
        "exp": "hypot(x^2*4, y*t)",
        "variables": {
            "x": "2*m - 3",
            "y": "5*0.6",
            "t": 6
        },
        "convert": True
    }, {
        "exp": "hypot(x+y*t,x*y)",
        "variables": {
            "x": "6",
            "y": "5*0.6",
            "t": 6
        },
        "convert": True
    }, {
        "exp": "hypot(x+y*t,x*y)",
        "variables": {
            "x": "4",
            "y": "5*0.6",
            "t": 6
        },
        "convert": True
    }, {
        "exp": "hypot(x+y*t,x*y)",
        "variables": {
            "x": "5*5",
            "y": {
                "exp": "a + b",
                "variables": {
                    "a": 9,
                    "b": 10
                }
            },
            "t": 6
        },
        "convert": True
    }, {
        "exp": "x",
        "variables": {
            "x": {
                "exp": "atan(deg(acos(cos(rad(hypot(4, 3)))))+ y     *x^t)",
                "variables": {
                    "t": 16,
                    "x": "2*4 - 3",
                    "y": 9
                },
                "convert": True
            }
        }
    }, {
        "exp": "x*y + z^2",
        "variables": {
            "x": 2,
            "y": {
                "exp": "x + y",
                "variables": {
                    "x": {
                        "exp": "2*y",
                        "variables": {
                            "y": 1
                        }
                    },
                    "y": {
                        "exp": "2*x",
                        "variables": {
                            "x": {
                                "exp": "(sin(theta))^2 + (cos(theta))^2",
                                "variables": {
                                    "theta": {
                                        "exp": "log(9*y) - 2*cos(z)+ln(e^2)",
                                        "variables": {
                                            "y": {
                                                "exp": "x",
                                                "variables": {
                                                    "x": {
                                                        "exp":
                                                        "atan(deg(acos(cos(rad(hypot(4, 3)))))+ y     *x^t)",
                                                        "variables": {
                                                            "t": 16,
                                                            "x": "2*4 - 3",
                                                            "y": 9
                                                        },
                                                        "convert": True
                                                    }
                                                }
                                            },
                                            "z": "e"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "z": "5*0.5"
        }
    }, {
        "exp": "x",
        "variables": {
            "x": {
                "exp": "y",
                "variables": {
                    "y": {
                        "exp": "z",
                        "variables": {
                            "z": 3
                        }
                    }
                }
            }
        }
    }
]