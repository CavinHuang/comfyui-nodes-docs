---
tags:
- NumberRangeGeneration
---

# 📜 CR Float Range List
## Documentation
- Class name: `CR Float Range List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

This node generates a list of floating-point numbers within a specified range, allowing for the creation of sequences with precise increments. It is designed to facilitate the creation of lists where each element is a float value, providing a tool for scenarios requiring detailed numerical sequences.
## Input types
### Required
- **`start`**
    - Defines the starting point of the float range. It sets the initial value from which the sequence begins, playing a crucial role in determining the range's scope.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end`**
    - Specifies the ending point of the float range. It determines the value at which the sequence stops, thus defining the extent of the range.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`step`**
    - Determines the increment between each number in the range. This value affects the density of the sequence, allowing for finer control over the spacing between elements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`operation`**
    - Specifies the mathematical operation to apply to each element in the range, such as 'none', 'sin', 'cos', or 'tan', allowing for the transformation of the sequence based on trigonometric functions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`decimal_places`**
    - Determines the number of decimal places for each number in the range, allowing for precision control over the float values.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ignore_first_value`**
    - When true, the first value of the generated range is omitted from the output, allowing for sequences that start from the second value onwards.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`max_values_per_loop`**
    - Limits the number of values generated per loop, providing control over the size of the output list within each iteration.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - Indicates how many times the range sequence should be repeated. This parameter can be used to extend the sequence by looping it multiple times.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ping_pong`**
    - A boolean flag that, when true, reverses the direction of the range on every other iteration, creating a back-and-forth pattern.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - The generated list of floating-point numbers within the specified range.
    - Python dtype: `List[float]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing detailed information and guidance on using the CR Float Range List node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_FloatRangeList:

    @classmethod
    def INPUT_TYPES(s):
    
        operations = ["none","sin","cos","tan"]
        
        return {"required": {"start": ("FLOAT", {"default": 0.00, "min": -99999.99, "max": 99999.99, "step": 0.01}),
                             "end": ("FLOAT", {"default": 1.00, "min": -99999.99, "max": 99999.99, "step": 0.01}),
                             "step": ("FLOAT", {"default": 1.00, "min": -99999.99, "max": 99999.99, "step": 0.01}),
                             "operation": (operations, ),
                             "decimal_places": ("INT", {"default": 2, "min": 0, "max": 10}),
                             "ignore_first_value": ("BOOLEAN", {"default": True}),
                             "max_values_per_loop": ("INT", {"default": 128, "min": 1, "max": 99999}),                              
                             "loops": ("INT", {"default": 1, "min": 1, "max": 999}),
                             "ping_pong": ("BOOLEAN", {"default": False}),
                            },
        }                        

    RETURN_TYPES = ("FLOAT", "STRING",)
    RETURN_NAMES = ("FLOAT", "show_help", )    
    OUTPUT_IS_LIST = (True, False)    
    FUNCTION = 'make_range'
    CATEGORY = icons.get("Comfyroll/List")

    def make_range(self, start, end, step, max_values_per_loop, operation, decimal_places, ignore_first_value, loops, ping_pong):
            
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-float-range-list"      
        
        range_values = list()
        
        for i in range(loops):
        
            if end < start and step > 0:
                step = -step
                
            current_range = list(np.arange(start, end + step, step))

            # Apply math operations to each value in the range
            if operation == "sin":
                current_range = [math.sin(value) for value in current_range]
            elif operation == "cos":
                current_range = [math.cos(value) for value in current_range]    
            elif operation == "tan":
                current_range = [math.tan(value) for value in current_range]  
            
            current_range = [round(value, decimal_places) for value in current_range]  
            
            if ping_pong:
                # Reverse the direction of the range on even iterations
                if i % 2 == 1:
                    if ignore_first_value:
                        current_range = current_range[:-1]
                    current_range = current_range[:max_values_per_loop]
                    range_values += reversed(current_range)
                else:
                    if ignore_first_value:
                        current_range = current_range[1:]
                    current_range = current_range[:max_values_per_loop]
                    range_values += current_range  
            else:
                if ignore_first_value:
                    current_range = current_range[1:]
                current_range = current_range[:max_values_per_loop]
                range_values += current_range
                    
        return (range_values, show_help, )

```
