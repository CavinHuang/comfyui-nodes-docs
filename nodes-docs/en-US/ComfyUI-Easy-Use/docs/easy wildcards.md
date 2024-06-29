---
tags:
- Prompt
- Text
- Wildcard
---

# Wildcards
## Documentation
- Class name: `easy wildcards`
- Category: `EasyUse/Prompt`
- Output node: `True`

The 'easy wildcards' node is designed to facilitate the dynamic substitution of placeholders within text strings with actual values. It leverages a dictionary of predefined wildcards, allowing for the customization and variation of text outputs based on specific keywords. This node supports complex patterns, including conditional selections and range-based selections, enhancing text generation processes with flexibility and adaptability.
## Input types
### Required
- **`text`**
    - The text string containing wildcards to be replaced. It serves as the input for dynamic text generation, where placeholders are substituted with corresponding values from the wildcard dictionary.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - Allows the selection of a LoRA (Low-Rank Adaptation) configuration to be added to the text, enhancing the model's adaptability and performance with specific adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`Select to add Wildcard`**
    - Enables the selection of predefined wildcards to be inserted into the text, facilitating dynamic text customization through the use of placeholders.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`seed`**
    - An optional seed value for random number generation, ensuring consistency in wildcard replacements across different executions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`multiline_mode`**
    - A boolean flag indicating whether the input text should be processed in multiline mode, affecting how wildcards and LoRAs are applied within the text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The original text input before any processing.
    - Python dtype: `str`
- **`populated_text`**
    - Comfy dtype: `STRING`
    - The text after all applicable wildcards and LoRA tags have been processed and replaced with their corresponding values, reflecting dynamic text customization.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class wildcardsPrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        wildcard_list = get_wildcard_list()
        return {"required": {
            "text": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False, "placeholder": "(Support Lora Block Weight and wildcard)"}),
            "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
            "Select to add Wildcard": (["Select the Wildcard to add to the text"] + wildcard_list,),
            "seed": ("INT", {"default": 0, "min": 0, "max": MAX_SEED_NUM}),
            "multiline_mode": ("BOOLEAN", {"default": False}),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID"},
        }

    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("text", "populated_text")
    OUTPUT_IS_LIST = (True, True)
    OUTPUT_NODE = True
    FUNCTION = "main"

    CATEGORY = "EasyUse/Prompt"

    @staticmethod
    def main(*args, **kwargs):
        prompt = kwargs["prompt"] if "prompt" in kwargs else None
        seed = kwargs["seed"]

        # Clean loaded_objects
        if prompt:
            easyCache.update_loaded_objects(prompt)

        text = kwargs['text']
        if "multiline_mode" in kwargs and kwargs["multiline_mode"]:
            populated_text = []
            text = text.split("\n")
            for t in text:
                populated_text.append(process(t, seed))
        else:
            populated_text = [process(text, seed)]
            text = [text]
        return {"ui": {"value": [seed]}, "result": (text, populated_text)}

```
