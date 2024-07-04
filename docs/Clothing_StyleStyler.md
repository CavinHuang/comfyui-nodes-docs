
# Documentation
- Class name: Clothing_StyleStyler
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Clothing Style Styler节点旨在根据特定的服装风格偏好对文本提示进行样式调整。它利用预定义的模板集来修改和增强输入的文本提示，以在生成的内容中反映所需的服装风格。

# Input types
## Required
- text_positive
    - 要进行样式设置的文本提示的正面内容，作为样式修改的基础内容。它在决定最终的样式化输出中起着关键作用，提供了将根据所选服装风格进行增强的初始内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式设置的文本提示的负面内容，用于指定在样式化输出中需要淡化或避免的元素。该参数通过排除最终内容中的不需要的元素，有助于优化样式设置过程。
    - Comfy dtype: STRING
    - Python dtype: str
- clothing_style
    - 指定要应用于文本提示的特定服装风格，引导样式调整和增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，指示是否应记录样式设置过程和选择，提供样式决策的透明度和可追溯性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive
    - 反映应用的服装风格调整后的正面文本提示的样式化版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 调整后的负面文本提示的样式化版本，旨在排除或最小化指定的不需要的元素。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
