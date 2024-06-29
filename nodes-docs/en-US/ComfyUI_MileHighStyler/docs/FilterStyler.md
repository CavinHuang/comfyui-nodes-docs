---
tags:
- Prompt
- PromptStyling
---

# Filter Styler
## Documentation
- Class name: `FilterStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The FilterStyler node dynamically applies stylistic modifications to text prompts based on user-selected filters from a predefined menu. It leverages a collection of templates to transform the input prompts, aiming to enhance or alter their stylistic attributes according to the selected filter options.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled. It serves as the base content for stylistic modifications, influencing the node's output by applying selected stylistic filters.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. Similar to the positive prompt, it undergoes stylistic modifications based on the selected filters, affecting the overall style of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filter`**
    - Specifies the filter to apply for styling the text prompts. This selection determines the stylistic transformation that will be applied to both positive and negative prompts.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that controls the logging of input and styled prompts for debugging or verification purposes. When enabled, it logs the before and after states of the prompts, along with the selected filters.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text prompt, transformed according to the selected stylistic filters.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, similarly transformed by the applied stylistic filters.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
