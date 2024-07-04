
# Documentation
- Class name: ArtistStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ArtistStyler节点根据预定义的艺术风格数据集对文本提示进行动态的艺术风格处理。它允许用户使用预设的艺术风格来增强其文本输入，从而实现更具创意和个性化的文本生成过程。

# Input types
## Required
- text_positive
    - 用户希望应用艺术风格的正面文本输入。这个输入对于定义将要用选定艺术风格增强的基础内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 用户希望应用艺术风格的负面文本输入。这个输入补充了正面文本，通过考虑需要在风格上淡化或弱化的元素，为文本风格化提供了一个更加微妙的方法。
    - Comfy dtype: STRING
    - Python dtype: str
- artist
    - 指定要应用于文本输入的艺术风格。这个选择对于文本的个性化至关重要，能够为文本赋予特定的艺术风格。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔值，指示是否记录提示风格化过程。启用此选项可以提供透明度，并深入了解节点做出的风格化决策。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 艺术风格化后的正面文本输出，反映了将选定艺术风格应用于原始正面输入的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 艺术风格化后的负面文本输出，反映了将选定艺术风格应用于原始负面输入的结果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
