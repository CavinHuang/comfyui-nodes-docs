---
tags:
- Prompt
---

# Unzip Prompt (Inspire)
## Documentation
- Class name: `UnzipPrompt __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The UnzipPrompt node is designed to decompress and separate a zipped prompt into its constituent parts, typically including positive, negative, and optional name components. This functionality is essential for processing and utilizing complex prompt structures within the InspirePack framework.
## Input types
### Required
- **`zipped_prompt`**
    - The zipped_prompt parameter is the compressed form of the prompt that needs to be decompressed. It plays a crucial role in the node's operation by being the source data that is unpacked into its individual components.
    - Comfy dtype: `ZIPPED_PROMPT`
    - Python dtype: `Tuple[str, str, str]`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - The positive output represents the positive aspect of the decompressed prompt.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - The negative output represents the negative aspect of the decompressed prompt.
    - Python dtype: `str`
- **`name`**
    - Comfy dtype: `STRING`
    - The name output represents the optional name component of the decompressed prompt, providing additional context or identification.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UnzipPrompt:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"zipped_prompt": ("ZIPPED_PROMPT",), }}

    RETURN_TYPES = ("STRING", "STRING", "STRING")
    RETURN_NAMES = ("positive", "negative", "name")

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, zipped_prompt):
        return zipped_prompt

```
