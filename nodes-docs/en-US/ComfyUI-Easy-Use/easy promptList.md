---
tags:
- Prompt
---

# PromptList
## Documentation
- Class name: `easy promptList`
- Category: `EasyUse/Prompt`
- Output node: `False`

The `promptList` node is designed to generate a list of strings based on a given multiline prompt, starting from a specified index and up to a maximum number of rows. It aims to facilitate the extraction and manipulation of text data by breaking down larger text inputs into manageable, indexed segments.
## Input types
### Required
- **`prompt_i`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
### Optional
- **`optional_prompt_list`**
    - An optional parameter that accepts a list of prompts, providing flexibility in the input by allowing multiple prompts to be combined or processed separately.
    - Comfy dtype: `LIST`
    - Python dtype: `List[str]`
## Output types
- **`prompt_list`**
    - Comfy dtype: `LIST`
    - Outputs a list of prompts, aggregating inputs from various sources into a unified list.
    - Python dtype: `List[str]`
- **`prompt_strings`**
    - Comfy dtype: `STRING`
    - Outputs the same list of prompts as `prompt_list`, effectively duplicating the output for potential different uses or processing steps.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class promptList:
    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "prompt_1": ("STRING", {"multiline": True, "default": ""}),
            "prompt_2": ("STRING", {"multiline": True, "default": ""}),
            "prompt_3": ("STRING", {"multiline": True, "default": ""}),
            "prompt_4": ("STRING", {"multiline": True, "default": ""}),
            "prompt_5": ("STRING", {"multiline": True, "default": ""}),
        },
            "optional": {
                "optional_prompt_list": ("LIST",)
            }
        }

    RETURN_TYPES = ("LIST", "STRING")
    RETURN_NAMES = ("prompt_list", "prompt_strings")
    OUTPUT_IS_LIST = (False, True)
    FUNCTION = "run"
    CATEGORY = "EasyUse/Prompt"

    def run(self, **kwargs):
        prompts = []

        if "optional_prompt_list" in kwargs:
            for l in kwargs["optional_prompt_list"]:
                prompts.append(l)

        # Iterate over the received inputs in sorted order.
        for k in sorted(kwargs.keys()):
            v = kwargs[k]

            # Only process string input ports.
            if isinstance(v, str) and v != '':
                prompts.append(v)

        return (prompts, prompts)

```
