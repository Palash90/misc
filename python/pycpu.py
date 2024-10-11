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
        return input(">>> ")  # ESimple console input

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

# Instructions:
# 0x08 - IN reg_num      ; Read command input into register
# 0x01 - LOAD reg_num, address  ; Load the input from memory
# 0x02 - STORE reg_num, address   ; Store the register value to memory
# 0x03 - ADD reg1, reg2     ; Add values in registers
# 0x06 - JZ reg_num, address ; Jump to address if zero
# 0x05 - JMP address         ; Jump to specified address
# 0x09 - OUT reg_num         ; Output the value of a register
# 0x07 - HALT                ; Stop execution

# Program
file_sys=[ 
    (0x08, 0),            # IN reg[0] (Get user input command into reg[0])
    (0x02, 0, 0xFE),      # STORE reg[0], 0xFE (Store command in memory 0xFE)
    (0x01, 0, 0xFE),      # LOAD reg[0], 0xFE (Load command into reg[0])
    
    (0x06, 0, 0x20),      # JZ reg[0], 0x20 (Jump if command is zero, which means invalid)
    
    (0x05, 0x10),         # JMP 0x10 (Jump to address 0x10 to parse the command)
    
    # Command Parsing
    (0xFE, 0),            # Command area (using input)
    (0xFD, 0),            # Filename storage
    (0xFC, 0),            # Content storage
    
    # mk command
    (0x08, 1),            # IN reg[1] (Get filename into reg[1])
    (0x02, 1, 0xFD),      # STORE reg[1], 0xFD (Store filename in memory 0xFD)
    (0x08, 2),            # IN reg[2] (Get content into reg[2])
    (0x02, 2, 0xFC),      # STORE reg[2], 0xFC (Store content in memory 0xFC)
    
    # Output filename and content
    (0x01, 1, 0xFD),      # LOAD reg[1], 0xFD (Load filename from memory)
    (0x09, 1),            # OUT reg[1] (Output filename)
    (0x01, 2, 0xFC),      # LOAD reg[2], 0xFC (Load content from memory)
    (0x09, 2),            # OUT reg[2] (Output content)

    # rd command
    (0x05, 0x30),         # JMP 0x30 (Jump to read command)
    
    # Read command implementation
    (0x01, 1, 0xFD),      # LOAD reg[1], 0xFD (Load filename from memory)
    (0x09, 1),            # OUT reg[1] (Output filename)

    # dl command
    (0x05, 0x40),         # JMP 0x40 (Jump to delete command)
    
    # Delete command implementation
    (0x01, 1, 0xFD),      # LOAD reg[1], 0xFD (Load filename)
    (0x02, 1, 0x00),      # STORE reg[1], 0x00 (Mark as deleted)
    
    (0x07)                # HALT
]


# Initialize CPU and load boot code
cpu = SimpleCPU()
cpu.load_boot_code(file_sys)

# Run CPU
cpu.run()
