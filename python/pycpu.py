# Instruction Set Overview
# Each instruction is represented as a tuple, where the first element is the opcode.

# Opcodes:
# 0x00: NOP
#   - No operation. This instruction does nothing and simply increments the program counter (PC).
#
# 0x01: LOAD
#   - LOAD reg_num, address
#   - Loads the value from the specified memory address into the specified register (REG[reg_num]).
#
# 0x02: STORE
#   - STORE reg_num, address
#   - Stores the value from the specified register (REG[reg_num]) into the specified memory address.
#
# 0x03: ADD
#   - ADD reg1, reg2
#   - Adds the value in the second register (REG[reg2]) to the first register (REG[reg1])
#     and stores the result in the first register (REG[reg1]).
#
# 0x04: SUB
#   - SUB reg1, reg2
#   - Subtracts the value in the second register (REG[reg2]) from the first register (REG[reg1])
#     and stores the result in the first register (REG[reg1]).
#
# 0x05: JMP
#   - JMP address
#   - Jumps to the specified memory address, setting the program counter (PC) to that address.
#
# 0x06: JZ
#   - JZ reg_num, address
#   - Jumps to the specified address if the value in the specified register (REG[reg_num]) is zero.
#     If the register value is not zero, it increments the PC.
#
# 0x07: HALT
#   - Stops execution of the program. Sets the running flag to False, ending the run loop.
#
# 0x08: IN
#   - IN reg_num
#   - Reads input from the keyboard and stores it in the specified register (REG[reg_num]).
#     The input is retrieved from the designated input memory location (0xFE).
#
# 0x09: OUT
#   - OUT reg_num
#   - Writes the value from the specified register (REG[reg_num]) to the designated output memory location (0xFF)
#     and prints it to the console.


class SimpleCPU:
    def __init__(self):
        self.memory = [0] * 256  # 256 bytes of RAM
        self.hard_disk = [0] * 256  # Hard disk storage
        self.PC = 0  # Program counter
        self.ACC = 0  # Accumulator
        self.REG = [0] * 4  # General-purpose registers
        self.running = True

    def load_boot_code(self, boot_code):
        # Load boot code into memory
        for i, instruction in enumerate(boot_code):
            self.memory[i] = instruction

    def execute_instruction(self):
        instruction = self.memory[self.PC]
        opcode = instruction[0]
        
        if opcode == 0x00:  # NOP
            self.PC += 1
        elif opcode == 0x01:  # LOAD
            reg_num, address = instruction[1], instruction[2]
            self.REG[reg_num] = self.memory[address]
            self.PC += 1
        elif opcode == 0x02:  # STORE
            reg_num, address = instruction[1], instruction[2]
            self.memory[address] = self.REG[reg_num]
            self.PC += 1
        elif opcode == 0x03:  # ADD
            reg1, reg2 = instruction[1], instruction[2]
            self.REG[reg1] += self.REG[reg2]
            self.PC += 1
        elif opcode == 0x04:  # SUB
            reg1, reg2 = instruction[1], instruction[2]
            self.REG[reg1] -= self.REG[reg2]
            self.PC += 1
        elif opcode == 0x05:  # JMP
            address = instruction[1]
            self.PC = address
        elif opcode == 0x06:  # JZ
            reg_num, address = instruction[1], instruction[2]
            if self.REG[reg_num] == 0:
                self.PC = address
            else:
                self.PC += 1
        elif opcode == 0x07:  # HALT
            self.running = False
        elif opcode == 0x08:  # IN
            reg_num = instruction[1]
            self.REG[reg_num] = self.read_input()  # Read input from device
            self.PC += 1
        elif opcode == 0x09:  # OUT
            reg_num = instruction[1]
            self.write_output(self.REG[reg_num])  # Write output to device
            self.PC += 1

    def read_input(self):
        # Simulate reading input from a device (e.g., keyboard)
        return int(input("Enter a number: "))  # Simple console input

    def write_output(self, value):
        # Simulate writing output to a device (e.g., screen)
        print(f"Output: {value}")  # Simple console output

    def run(self):
        while self.running:
            self.execute_instruction()

# Example boot code (instructions)
boot_code = [
    (0x08, 0),  # IN: Read input into REG[0]
    (0x08, 1),  # IN: Read another input into REG[1]
    (0x03, 0, 1),  # ADD: Add REG[0] and REG[1] into REG[0]
    (0x09, 0),  # OUT: Output the result from REG[0]
    (0x07,)        # HALT
]

# Initialize CPU and load boot code
cpu = SimpleCPU()
cpu.load_boot_code(boot_code)

# Run CPU
cpu.run()
