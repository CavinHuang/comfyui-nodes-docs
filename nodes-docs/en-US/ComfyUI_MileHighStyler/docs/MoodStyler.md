---
tags:
- Prompt
- PromptStyling
---

# Mood Styler
## Documentation
- Class name: `MoodStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The MoodStyler node dynamically customizes text prompts based on a selection of mood-related styles, enabling the generation of content with a specific emotional or atmospheric tone. It leverages a collection of predefined templates to apply stylistic modifications to input prompts, facilitating the creation of nuanced and contextually rich outputs.
## Input types
### Required
- **`text_positive`**
    - The original text prompt intended for positive or desired outcomes. It serves as the base content that will be stylistically enhanced by the MoodStyler to reflect a specific mood.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The original text prompt intended for negative or undesired outcomes. This input allows for the differentiation of content based on the mood style applied, ensuring that the output can be tailored to avoid certain themes or tones.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mood`**
    - Specifies the mood style to be applied to the text prompts. This selection determines the emotional or atmospheric tone that will be reflected in the styled outputs, allowing for a customized content generation experience.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - A boolean flag that, when enabled, logs the original and styled prompts along with the selected mood style. This feature aids in debugging and understanding the transformation process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The enhanced text prompt reflecting the selected mood style for positive or desired outcomes.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The enhanced text prompt reflecting the selected mood style for negative or undesired outcomes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
