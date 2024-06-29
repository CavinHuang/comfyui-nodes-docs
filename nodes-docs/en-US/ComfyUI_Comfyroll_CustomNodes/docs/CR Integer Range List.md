---
tags:
- NumberRangeGeneration
---

# 📜 CR Integer Range List
## Documentation
- Class name: `CR Integer Range List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

The CR_IntegerRangeList node generates a list of integers within a specified range, potentially repeating and reversing the sequence based on the provided parameters. It's designed to create complex sequences of numbers for various applications, such as scheduling or iterative processes.
## Input types
### Required
- **`start`**
    - Defines the starting point of the integer range. It sets the initial value from which the range generation begins.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end`**
    - Specifies the endpoint of the integer range. It determines the value at which the range generation stops, not including this value itself.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`step`**
    - Determines the increment between each integer in the range. It controls the difference between successive numbers in the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - Specifies the number of times the entire range sequence is repeated. It allows for the generation of longer sequences by repeating the basic range pattern.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`ping_pong`**
    - A boolean parameter that, when true, reverses the direction of the range on every other iteration. It adds a back-and-forth pattern to the sequence.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`INT`**
    - Comfy dtype: `INT`
    - A list of integers generated based on the specified range, step, loops, and ping-pong parameters.
    - Python dtype: `List[int]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the documentation or help page related to the CR_IntegerRangeList node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_IntegerRangeList:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"start": ("INT", {"default": 0, "min": -99999, "max": 99999}),
                             "end": ("INT", {"default": 0, "min": -99999, "max": 99999}),
                             "step": ("INT", {"default": 1, "min": 1, "max": 99999}),
                             "loops": ("INT", {"default": 1, "min": 1, "max": 999}),
                             "ping_pong": ("BOOLEAN", {"default": False}),
                            },
        }
        
    RETURN_TYPES = ("INT", "STRING",)
    RETURN_NAMES = ("INT", "show_help", )    
    OUTPUT_IS_LIST = (True, False)    
    FUNCTION = 'make_range'
    CATEGORY = icons.get("Comfyroll/List")

    def make_range(self, start, end, step, loops, ping_pong):
        
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-list-schedule"      
    
        range_values = list()
        for i in range(loops):
            current_range = list(range(start, end, step))
            
            if ping_pong:
                # Reverse the direction of the range on even iterations
                if i % 2 == 1:
                    range_values += reversed(current_range)
                else:
                    range_values += current_range     
            else:
                range_values += current_range           

        return (range_values, show_help, )

```
