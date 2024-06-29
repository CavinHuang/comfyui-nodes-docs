# Positive
## Documentation
- Class name: `easy positive`
- Category: `EasyUse/Prompt`
- Output node: `False`

The 'easy positive' node is designed to process and enhance positive textual inputs for generative tasks, utilizing advanced techniques such as token normalization and weight interpretation to optimize the input's effectiveness. It integrates with language models and image processing tools to conditionally generate or modify content based on the positive input, aiming to achieve a desired outcome or effect.
## Input types
### Required
- **`positive`**
    - Represents the positive textual input that the node processes. This input is crucial for guiding the generative process towards generating or modifying content in a positive manner.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - The generated or enhanced positive prompt text, ready for further processing or direct use in generative tasks. This output reflects the node's processing and optimization of the positive input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class positivePrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "positive": ("STRING", {"default": "", "multiline": True, "placeholder": "Positive"}),}
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("positive",)
    FUNCTION = "main"

    CATEGORY = "EasyUse/Prompt"

    @staticmethod
    def main(positive):
        return positive,

```
