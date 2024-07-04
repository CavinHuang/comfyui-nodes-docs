
# Documentation
- Class name: MoodStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

MoodStyler节点通过应用一组预定义的与情绪相关的样式模板，对文本提示进行动态定制，从而实现特定情感或氛围基调的内容生成。它利用这些模板对输入提示进行风格化修改，有助于创造出细腻且富有情境的输出结果。

# Input types
## Required
- text_positive
    - 用于正面或期望结果的原始文本提示。它作为基础内容，将被MoodStyler进行风格化增强，以反映特定的情绪基调。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 用于负面或不期望结果的原始文本提示。这个输入允许根据应用的情绪风格区分内容，确保输出可以避开某些主题或语气。
    - Comfy dtype: STRING
    - Python dtype: str
- mood
    - 指定要应用于文本提示的情绪风格。这个选择决定了将在风格化输出中体现的情感或氛围基调，从而实现定制化的内容生成体验。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，启用时会记录原始提示和风格化后的提示，以及所选的情绪风格。这个功能有助于调试和理解转换过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 反映所选情绪风格的、用于正面或期望结果的增强文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 反映所选情绪风格的、用于负面或不期望结果的增强文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
