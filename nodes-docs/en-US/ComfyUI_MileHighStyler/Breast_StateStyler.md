---
tags:
- Prompt
- PromptStyling
---

# Breast_State Styler
## Documentation
- Class name: `Breast_StateStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The Breast_StateStyler node dynamically customizes text prompts based on user-selected styling options, enhancing the specificity and creativity of the output. It leverages a comprehensive database of styling data to apply nuanced modifications to text inputs, thereby tailoring the generation process to align with user preferences and thematic requirements.
## Input types
### Required
- **`text_positive`**
    - The 'text_positive' input represents the initial positive text prompt that the node will modify based on the selected styling options. It plays a crucial role in shaping the final styled output by providing the base content that will be enhanced.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The 'text_negative' input is the initial negative text prompt that the node will adjust according to the chosen styling preferences. It is essential for refining the output by specifying what themes or elements should be minimized or avoided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`breast_state`**
    - The 'breast_state' input specifies the particular state or condition of the breast that the styling options should emphasize or de-emphasize, playing a key role in customizing the output to meet specific thematic or content requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - The 'log_prompt' input enables logging of the styling process, including the original prompts and the selections made, offering insights into how the styling choices influence the final output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The modified positive text prompt, reflecting the applied styling choices. It showcases the node's ability to enhance and personalize text generation based on user preferences.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The adjusted negative text prompt, indicating the effects of the styling preferences on minimizing or avoiding certain themes or elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
