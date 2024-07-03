
# Documentation
- Class name: NounsStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

NounsStyler节点旨在为文本提示添加动态样式。它基于一系列预定义的风格主题（如相机、构图和氛围等）来修饰和增强输入文本，从而达到特定的美学或主题效果。这个节点允许用户通过应用各种样式来定制文本输入，使其更加丰富多彩。

# Input types
## Required
- text_positive
    - 这是需要被修饰的文本的正面内容。它在决定样式化输出的整体基调和方向上扮演着至关重要的角色。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 这是需要被修饰的文本的负面内容。它用于对比或否定文本中的某些元素，有助于产生更加细腻和平衡的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- nouns
    - 未知参数
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- log_prompt
    - 这是一个布尔标志，用于指示是否应记录样式处理过程和选择。它有助于提高样式处理过程的透明度，并方便调试。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 这是经过样式处理后的正面文本输入。它反映了所选择的风格主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 这是经过样式处理后的负面文本输入。它在主题一致性上与正面文本相辅相成。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
