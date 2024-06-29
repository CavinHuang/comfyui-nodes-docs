---
tags:
- Prompt
- PromptStyling
---

# Environment Styler
## Documentation
- Class name: `EnvironmentStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The EnvironmentStyler node dynamically applies stylistic modifications to text prompts based on environmental aspects, leveraging a collection of predefined templates. It allows for the customization of text prompts to reflect specific environmental settings or themes, enhancing the contextual relevance and creativity of the output.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled. It serves as the base content that will be modified according to the selected environmental style, impacting the thematic direction of the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled. This input works alongside the positive prompt, allowing for nuanced adjustments that refine the overall thematic expression based on environmental cues.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`environment`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the input prompts and their styled versions for debugging or analysis purposes. It aids in understanding how the environmental styling influences the text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The styled version of the positive text prompt, reflecting the applied environmental theme.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The styled version of the negative text prompt, adjusted to complement the positive prompt within the environmental context.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
