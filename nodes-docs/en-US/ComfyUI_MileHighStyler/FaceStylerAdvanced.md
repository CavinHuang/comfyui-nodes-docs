---
tags:
- Image
- Style
---

# Face Styler (Advanced)
## Documentation
- Class name: `FaceStylerAdvanced`
- Category: `ali1234/stylers`
- Output node: `False`

The FaceStylerAdvanced node is designed to apply advanced styling techniques to faces within images, leveraging deep learning models to enhance or alter facial features according to specified styles or parameters. This node focuses on providing users with the ability to customize and refine the appearance of faces in their digital content, offering a range of styling options that can be dynamically applied to achieve desired aesthetic outcomes.
## Input types
### Required
- **`text_positive_g`**
    - This parameter represents the global positive textual descriptors or keywords that guide the overall styling process, influencing the node's output by specifying general aspects to enhance or introduce in the face styling.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_positive_l`**
    - This parameter focuses on local positive textual descriptors or keywords, allowing for more detailed guidance on specific facial features or areas to be enhanced according to the styling preferences.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`text_negative`**
    - Captures negative textual descriptors or keywords that indicate what aspects of the face styling to avoid or minimize, helping to steer the output away from undesired features or effects.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`face`**
    - Allows users to input the face or faces to be styled, serving as the direct subject of the styling process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`negative_prompt_to`**
    - Specifies the scope of the negative prompts' application, whether to global, local, or both aspects of the styling process, thus affecting how the negative descriptors influence the outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`log_prompt`**
    - Used for logging purposes, capturing the user's input prompt that describes the desired outcome of the face styling. It aids in tracking and refining the styling process based on user feedback and preferences.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `str`
## Output types
- **`text_positive_g`**
    - Comfy dtype: `STRING`
    - Represents the global enhancements achieved through the styling process, described in positive textual descriptors or keywords.
    - Python dtype: `str`
- **`text_positive_l`**
    - Comfy dtype: `STRING`
    - Captures the local enhancements to specific facial features or areas, as guided by the detailed positive textual descriptors.
    - Python dtype: `str`
- **`text_positive`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
- **`text_negative_g`**
    - Comfy dtype: `STRING`
    - This output captures the global aspects of face styling that were successfully minimized or avoided, as indicated by the negative textual descriptors or keywords.
    - Python dtype: `str`
- **`text_negative_l`**
    - Comfy dtype: `STRING`
    - Represents the local aspects of face styling that were successfully minimized or avoided, focusing on specific facial features or areas.
    - Python dtype: `str`
- **`text_negative`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
