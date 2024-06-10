---
tags:
- RandomGeneration
- Randomization
---

# Text Random Line
## Documentation
- Class name: `Text Random Line`
- Category: `WAS Suite/Text`
- Output node: `False`

This node selects a random line from a given text based on a seed value. It allows for the randomization of text selection, providing a simple yet effective method for introducing variability into text processing workflows.
## Input types
### Required
- **`text`**
    - The input text from which a line will be randomly selected. This parameter is crucial for determining the pool of possible lines to choose from.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - A seed value to ensure the reproducibility of the random selection. This parameter influences the randomness, allowing for consistent results across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The randomly selected line from the input text. This output provides a single, randomly chosen line, offering a simple way to introduce randomness into text-based operations.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Text Concatenate](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Text Concatenate.md)
    - [Text Concatenate](../../was-node-suite-comfyui/Nodes/Text Concatenate.md)



## Source code
```python
class WAS_Text_Random_Line:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_random_line"

    CATEGORY = "WAS Suite/Text"

    def text_random_line(self, text, seed):
        lines = text.split("\n")
        random.seed(seed)
        choice = random.choice(lines)
        return (choice, )

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
