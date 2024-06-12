---
tags:
- RandomGeneration
- Randomization
---

# 🎲 CR Random Panel Codes
## Documentation
- Class name: `CR Random Panel Codes`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🎲 Random`
- Output node: `False`

This node generates a series of unique codes based on specified parameters, including the number of rows, string length, and a set of values to include in the codes. It utilizes a seed for randomization to ensure reproducibility of results. The node is designed to create randomized, yet structured, text strings that can serve various purposes, such as unique identifiers or access codes.
## Input types
### Required
- **`seed`**
    - The seed parameter is used to initialize the random number generator, ensuring that the sequence of generated codes is reproducible when the same seed is used. This is crucial for scenarios where consistent output is necessary across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - Specifies the number of codes to generate. This parameter directly influences the output's length, allowing for customization based on the required number of unique codes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`string_length`**
    - Determines the length of the numeric part of each code, thereby controlling the granularity and potential uniqueness of each generated code.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`values`**
    - A string containing characters that can be used in the generation of the codes. This parameter allows for customization of the code format by specifying the allowable characters.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`multiline_text`**
    - Comfy dtype: `STRING`
    - A string containing the generated codes, each on a new line. This output is useful for applications requiring a list of unique identifiers or access codes.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing access to additional documentation and help for using the node effectively.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomPanelCodes:
    
    @classmethod
    def INPUT_TYPES(cls):
            
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "rows": ("INT", {"default": 5, "min": 1, "max": 2048}),
                             "string_length": ("INT", {"default": 5, "min": 1, "max": 1024}),
                             "values": ("STRING", {"multiline": False, "default": "123"}),
               }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("multiline_text", "show_help", )
    FUNCTION = "generate"
    CATEGORY = icons.get("Comfyroll/Utils/Random")

    def generate(self, rows, string_length, values, seed):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-panel-codes"
        
        # Set the seed
        random.seed(seed)
        
        start_letter = random.choice('HV')
        value_range = random.choice(values)
            
        codes = []
        for _ in range(rows):
            # Generate a random number within the specified range
            number = ''.join(random.choice(values) for _ in range(string_length))
            # Append the code to the list
            codes.append(f"{start_letter}{number}")
            
        multiline_text = '\n'.join(codes)   
                 
        return (multiline_text, show_help, )

```
