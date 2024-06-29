---
tags:
- Prompt
- PromptStyling
---

# Artist Styler
## Documentation
- Class name: `ArtistStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The ArtistStyler node dynamically applies artistic styling to text prompts based on a selection of styles defined in a dataset. It allows users to enhance their text inputs with predefined artistic styles, enabling a more creative and tailored text generation process.
## Input types
### Required
- **`text_positive`**
    - A positive text input that the user wishes to apply artistic styling to. This input is crucial for defining the base content that will be enhanced with the selected artistic style.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - A negative text input that the user wishes to apply artistic styling to. This input complements the positive text, offering a nuanced approach to text styling by also considering elements to be stylistically negated or downplayed.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`artist`**
    - Specifies the artistic style to apply to the text inputs. This selection is central to the customization of the text, enabling the application of a specific artistic flair.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean indicating whether to log the prompt styling process. Enabling this option provides transparency and insight into the styling decisions made by the node.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The artistically styled positive text output, reflecting the application of the selected artistic style to the original positive input.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The artistically styled negative text output, reflecting the application of the selected artistic style to the original negative input.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
