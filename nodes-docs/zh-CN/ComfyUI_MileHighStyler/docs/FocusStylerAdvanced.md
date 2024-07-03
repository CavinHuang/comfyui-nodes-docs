
# Documentation
- Class name: FocusStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FocusStylerAdvanced是一个高级文本提示样式器，它通过先进的样式技术来增强文本提示。该节点允许对正面和负面提示进行复杂的定制，引入了全局和局部上下文的细致样式层，使用户能够更精确地调整他们的文本提示。

# Input types
## Required
- text_positive_g
    - 作为正面文本提示的全局上下文，为样式提供了广泛的主题基础。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 代表正面文本提示的局部上下文，允许在全局主题内进行详细定制。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式化的负面文本提示，可以调整以与正面提示形成对比或互补。
    - Comfy dtype: STRING
    - Python dtype: str
- focus
    - 未知参数。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 决定如何应用负面样式，指定调整是影响负面提示的全局方面、局部方面还是两者兼顾。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 当为真时，记录样式处理的详细信息，提供对所做选择及其效果的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 样式化后的全局正面文本提示，反映了应用的样式选项。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 样式化后的局部正面文本提示，展示了精细调整的效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 全局和局部正面提示的组合，根据指定的选项进行样式化和合并。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 样式化后的全局负面文本提示，根据negative_prompt_to参数进行调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 样式化后的局部负面文本提示，根据negative_prompt_to参数进行定制。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 整体样式化后的负面提示，包含全局和局部的调整。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
