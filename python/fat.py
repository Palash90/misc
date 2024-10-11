import numpy as np
import matplotlib.pyplot as plt

# Disk size in terms of bits
DISK_SIZE = 512  # Let's assume a simple 512-bit disk for this example

# A simple in-memory FAT file system
class InMemoryFAT:
    def __init__(self, disk_size):
        self.disk_size = disk_size
        self.disk = np.zeros(disk_size, dtype=bool)
        self.fat_table = {}

    def text_to_bits(self, text):
        """Convert text to binary bit array (stored as boolean array)."""
        bit_string = ''.join(format(ord(char), '08b') for char in text)  # Convert each char to 8-bit binary
        return [bool(int(bit)) for bit in bit_string]  # Convert binary string to a list of booleans

    def bits_to_text(self, bits):
        """Convert boolean array back to text."""
        # Group bits into chunks of 8, then convert each chunk back to characters
        chars = [chr(int(''.join(str(int(b)) for b in bits[i:i+8]), 2)) for i in range(0, len(bits), 8)]
        return ''.join(chars)

    def allocate(self, file_name, content):
        content_bits = self.text_to_bits(content)  # Convert text content into binary bits
        content_bits_len = len(content_bits)
        
        if content_bits_len > self.disk_size:
            print(f"Error: Disk size exceeded for file {file_name}.")
            return False

        free_space = np.where(self.disk == False)[0]  # Find free bits

        if len(free_space) < content_bits_len:
            print(f"Error: Not enough free space for file {file_name}.")
            return False

        # Allocate the first available space for the file
        allocated_bits = free_space[:content_bits_len]
        self.fat_table[file_name] = allocated_bits
        self.disk[allocated_bits] = content_bits
        print(f"File '{file_name}' created successfully.")
        return True

    def read(self, file_name):
        if file_name not in self.fat_table:
            print(f"Error: File '{file_name}' does not exist.")
            return None

        file_bits = self.fat_table[file_name]
        file_content_bits = self.disk[file_bits]  # Get the bits allocated for the file
        content = self.bits_to_text(file_content_bits)  # Convert bits back to text
        print(f"Reading file '{file_name}': {content}")
        return content

    def delete(self, file_name):
        if file_name not in self.fat_table:
            print(f"Error: File '{file_name}' does not exist.")
            return False

        file_bits = self.fat_table[file_name]
        self.disk[file_bits] = False
        del self.fat_table[file_name]
        print(f"File '{file_name}' deleted successfully.")
        return True

    def visualize_disk(self):
        plt.figure(figsize=(8, 2))
        reshaped_disk = self.disk.reshape(16, 32)
        plt.imshow(reshaped_disk, cmap="coolwarm", interpolation='nearest')
        plt.title("Disk Visualization: Red = Occupied, Blue = Free")
        plt.show()

# Shell for interacting with the FAT system
class Shell:
    def __init__(self, fat):
        self.fat = fat

    def run(self):
        print("Welcome to the FAT file system shell.")
        while True:
            command = input("> ").strip().split()
            if not command:
                continue
            cmd, args = command[0], command[1:]
            
            if cmd == "mk":
                if len(args) != 2:
                    print("Usage: mk <file_name> <content>")
                else:
                    file_name, content = args
                    self.fat.allocate(file_name, content)

            elif cmd == "rd":
                if len(args) != 1:
                    print("Usage: rd <file_name>")
                else:
                    self.fat.read(args[0])

            elif cmd == "dl":
                if len(args) != 1:
                    print("Usage: dl <file_name>")
                else:
                    self.fat.delete(args[0])

            elif cmd == "visualize":
                self.fat.visualize_disk()

            elif cmd == "exit":
                print("Exiting shell.")
                break

            else:
                print("Unknown command. Available commands: mk, rd, dl, visualize, exit.")

# Initialize the FAT system and shell
fat = InMemoryFAT(DISK_SIZE)
shell = Shell(fat)

# Run the shell
shell.run()
