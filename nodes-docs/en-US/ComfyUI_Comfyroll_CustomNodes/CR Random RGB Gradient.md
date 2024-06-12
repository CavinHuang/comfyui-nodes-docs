---
tags:
- RandomGeneration
- Randomization
---

# 🎲 CR Random RGB Gradient
## Documentation
- Class name: `CR Random RGB Gradient`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🎲 Random`
- Output node: `False`

This node generates a multiline text string representing a random RGB gradient, based on a given seed and the number of rows specified. It aims to provide a simple way to create diverse and random color gradients for various applications.
## Input types
### Required
- **`seed`**
    - The seed parameter initializes the random number generator, ensuring the reproducibility of the gradient pattern. It plays a crucial role in generating consistent results across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`rows`**
    - The rows parameter determines the number of color steps in the gradient, affecting the gradient's smoothness and complexity. It directly influences the length and variation of the generated multiline text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`multiline_text`**
    - Comfy dtype: `STRING`
    - A string containing multiple lines, each representing a step in the RGB gradient with random colors.
    - Python dtype: `str`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL string providing access to additional help and documentation related to the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_RandomRGBGradient:
    
    @classmethod
    def INPUT_TYPES(cls):
    
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "rows": ("INT", {"default": 5, "min": 1, "max": 2048}),
               }
        }

    RETURN_TYPES = ("STRING", "STRING", )
    RETURN_NAMES = ("multiline_text", "show_help", )
    FUNCTION = "generate"
    CATEGORY = icons.get("Comfyroll/Utils/Random")

    def generate(self, rows, seed):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Other-Nodes#cr-random-RGB-gradient"
    
        # Set the seed
        random.seed(seed)
        
        temp = 0
        multiline_text = ""
         
        for i in range(1, rows + 1):
            print(temp)
            if temp <= 99 - rows + i:
                upper_bound = min(99, temp + (99 - temp) // (rows - i + 1))
                current_value = random.randint(temp, upper_bound)
                multiline_text += f'{current_value}:{random.randint(0, 255)},{random.randint(0, 255)},{random.randint(0, 255)}\n'
                
                temp = current_value + 1

        return (multiline_text, show_help, )

```
