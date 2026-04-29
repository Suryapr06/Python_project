# Introduction to Python

## What is Python?

Python is a high-level, general-purpose programming language known for its clean, readable syntax and versatility. Created by Guido van Rossum and first released in 1991, Python has grown into one of the most popular programming languages in the world.

## Why Learn Python?

- **Beginner-friendly**: Python's syntax reads almost like plain English, making it an excellent first language.
- **Versatile**: Used in web development, data science, machine learning, automation, scripting, and more.
- **Large ecosystem**: A rich standard library and thousands of third-party packages (via PyPI).
- **Strong community**: Extensive documentation, tutorials, and forums available.
- **Cross-platform**: Runs on Windows, macOS, and Linux.

## Installing Python

Download the latest version from [python.org](https://www.python.org/downloads/).

Verify your installation:

```bash
python --version
```

## Your First Python Program

```python
print("Hello, World!")
```

Run it:

```bash
python hello.py
```

## Basic Syntax

### Variables and Data Types

```python
# Integer
age = 25

# Float
price = 9.99

# String
name = "Alice"

# Boolean
is_active = True

# NoneType
result = None
```

### Comments

```python
# This is a single-line comment

"""
This is a
multi-line comment (docstring).
"""
```

### String Operations

```python
greeting = "Hello"
name = "World"

# Concatenation
message = greeting + ", " + name + "!"

# f-strings (recommended)
message = f"{greeting}, {name}!"

# String methods
print("hello".upper())   # HELLO
print("HELLO".lower())   # hello
print("  hi  ".strip())  # hi
```

## Control Flow

### Conditionals

```python
age = 18

if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teenager")
else:
    print("Child")
```

### Loops

```python
# for loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# while loop
count = 0
while count < 3:
    print(count)
    count += 1

# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

## Data Structures

### Lists

```python
numbers = [1, 2, 3, 4, 5]
numbers.append(6)       # Add to end
numbers.pop()           # Remove from end
print(numbers[0])       # Access by index: 1
print(numbers[-1])      # Last element: 5
print(numbers[1:3])     # Slice: [2, 3]
```

### Tuples (immutable lists)

```python
coordinates = (10, 20)
x, y = coordinates     # Unpacking
```

### Dictionaries

```python
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

print(person["name"])          # Alice
person["email"] = "a@b.com"   # Add key
del person["city"]             # Remove key

for key, value in person.items():
    print(f"{key}: {value}")
```

### Sets

```python
unique_numbers = {1, 2, 3, 2, 1}
print(unique_numbers)  # {1, 2, 3}
```

## Functions

```python
def greet(name, greeting="Hello"):
    """Return a greeting message."""
    return f"{greeting}, {name}!"

print(greet("Alice"))            # Hello, Alice!
print(greet("Bob", "Hi"))       # Hi, Bob!
```

### Lambda Functions

```python
square = lambda x: x ** 2
print(square(5))  # 25
```

## Object-Oriented Programming

```python
class Animal:
    def __init__(self, name, sound):
        self.name = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"


class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")

    def fetch(self):
        return f"{self.name} fetches the ball!"


dog = Dog("Rex")
print(dog.speak())   # Rex says Woof!
print(dog.fetch())   # Rex fetches the ball!
```

## Modules and Packages

```python
# Importing standard library modules
import math
import os
from datetime import datetime

print(math.sqrt(16))           # 4.0
print(os.getcwd())             # current directory
print(datetime.now())          # current date and time
```

Install third-party packages with pip:

```bash
pip install requests
```

## Error Handling

```python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
except (TypeError, ValueError) as e:
    print(f"Type or value error: {e}")
else:
    print("Success!")
finally:
    print("This always runs.")
```

## File I/O

```python
# Writing to a file
with open("data.txt", "w") as f:
    f.write("Hello, file!\n")

# Reading from a file
with open("data.txt", "r") as f:
    content = f.read()
    print(content)
```

## List Comprehensions

```python
# Traditional approach
squares = []
for x in range(10):
    squares.append(x ** 2)

# List comprehension (Pythonic)
squares = [x ** 2 for x in range(10)]

# With a condition
even_squares = [x ** 2 for x in range(10) if x % 2 == 0]
```

## Next Steps

Once you're comfortable with the basics, explore:

1. **Virtual environments** (`venv`) for project isolation
2. **pip** and package management
3. **Popular libraries**: NumPy, Pandas, Matplotlib, Flask, FastAPI
4. **Testing**: `unittest` and `pytest`
5. **Type hints** for better code clarity
6. **Async programming** with `asyncio`

## Resources

- [Official Python Documentation](https://docs.python.org/)
- [Python Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/)
- [PyPI – Python Package Index](https://pypi.org/)
