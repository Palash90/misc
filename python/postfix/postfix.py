from .prescan import pre_scan
from .converter import convert


def prescan(exp):
    return pre_scan(exp)


def evaluate(exp):
    print("Evaluating", exp)
    postfix = convert(prescan(exp))
    return postfix