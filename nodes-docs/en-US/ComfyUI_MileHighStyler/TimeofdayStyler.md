---
tags:
- Prompt
- PromptStyling
---

# Timeofday Styler
## Documentation
- Class name: `TimeofdayStyler`
- Category: `ali1234/stylers`
- Output node: `False`

The TimeofdayStyler node dynamically customizes text prompts based on time-of-day styling preferences, leveraging a collection of predefined templates to enhance or modify the descriptive elements of the prompts. This node aims to provide a nuanced and contextually relevant adjustment to text generation tasks, focusing on the atmospheric and lighting conditions associated with different times of the day.
## Input types
### Required
- **`text_positive`**
    - The positive text prompt to be styled, serving as the base content for time-of-day specific enhancements. This input is crucial for tailoring the output to reflect desired atmospheric conditions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - The negative text prompt to be styled, used to negate or counterbalance specific elements in the generation process. This input helps refine the output by excluding undesired time-of-day characteristics.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`timeofday`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
- **`log_prompt`**
    - unknown
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `unknown`
## Output types
- **`text_positive`**
    - Comfy dtype: `STRING`
    - The enhanced positive text prompt, styled with time-of-day specific characteristics to better reflect desired atmospheric and lighting conditions.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - The refined negative text prompt, styled to exclude or negate undesired time-of-day elements, ensuring a more focused and relevant text generation output.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
