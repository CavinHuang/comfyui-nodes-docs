---
tags:
- ComfyrollNodes
---

# 📜 CR Value Cycler
## Documentation
- Class name: `CR Value Cycler`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List`
- Output node: `False`

The CR_ValueCycler node is designed to cycle through a list of values, repeating each value a specified number of times and looping through the entire list for a given number of iterations. It is capable of parsing numeric values from a multiline string, converting them into floats and integers, and outputting these numbers in separate lists.
## Input types
### Required
- **`values`**
    - A multiline string containing values to be cycled through. This input is crucial for defining the set of values the node will operate on.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`repeats`**
    - Specifies how many times each value should be repeated in a single loop. This affects the length and repetition pattern of the output lists.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`loops`**
    - Determines the number of times the entire set of values is cycled through. This influences the total number of iterations and the final size of the output lists.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`FLOAT`**
    - Comfy dtype: `FLOAT`
    - A list of floating-point numbers parsed from the input values, repeated and looped according to the specified parameters.
    - Python dtype: `List[float]`
- **`INT`**
    - Comfy dtype: `INT`
    - A list of integers converted from the floating-point numbers in the input values, following the same repetition and looping pattern.
    - Python dtype: `List[int]`
- **`show_text`**
    - Comfy dtype: `STRING`
    - A URL to a help page providing additional information and guidance on using the CR_ValueCycler node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_ValueCycler:
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "values": ("STRING", {"multiline": True, "default": ""}),
            "repeats": ("INT", {"default": 1, "min": 1, "max": 99999}),
            "loops": ("INT", {"default": 1, "min": 1, "max": 99999}),
            }
        }

    RETURN_TYPES = ("FLOAT", "INT", "STRING", )
    RETURN_NAMES = ("FLOAT", "INT", "show_text", )
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = "cycle"
    CATEGORY = icons.get("Comfyroll/List")    

    def cycle(self, values, repeats, loops=1):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-value-cycler"
    
        lines = values.split('\n')
        float_list_out = []
        int_list_out = []

        # add check if valid number

        for i in range(loops):
            for _ in range(repeats):
                for text_item in lines:
                    if all(char.isdigit() or char == '.' for char in text_item.strip()):
                        float_list_out.append(float(text_item))
                        int_list_out.append(int(float(text_item)))  # Convert to int after parsing as float

        return (float_list_out, int_list_out, show_help, )    

```
