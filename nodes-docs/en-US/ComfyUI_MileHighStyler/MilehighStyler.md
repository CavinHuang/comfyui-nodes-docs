---
tags:
- Prompt
- PromptStyling
---

# Milehigh Styler
## Documentation
- Class name: `MilehighStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The MilehighStyler node dynamically generates and applies a variety of styling options to text prompts based on user selections from a predefined set of styles. It leverages a collection of templates to modify and enhance text inputs, aiming to tailor the content to specific aesthetic or thematic preferences.
## Input types
### Required
- **`text_positive`**
    - A positive text prompt intended for styling. It plays a crucial role in determining the final styled output by providing the base content that will be enhanced according to the selected style.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - A negative text prompt intended for styling. This input is used to specify content that should be styled in a contrasting manner to the positive prompt, allowing for nuanced and balanced output generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`milehigh`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the input prompts and their styled versions for debugging or analysis purposes. This helps in understanding how the selected styles are applied to the text inputs.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The enhanced version of the positive text prompt, styled according to the user's selections. It represents the application of aesthetic or thematic modifications to the original input.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The enhanced version of the negative text prompt, styled in a manner that contrasts with the positive prompt, based on the user's selections. This output showcases the versatility of the styling process in generating diverse content.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [Efficient Loader](../../efficiency-nodes-comfyui/Nodes/Efficient Loader.md)
    - [ShowText|pysssss](../../ComfyUI-Custom-Scripts/Nodes/ShowText|pysssss.md)



## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
