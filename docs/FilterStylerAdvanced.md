
# Documentation
- Class name: FilterStylerAdvanced
- Category: ali1234/stylers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FilterStylerAdvanced节点是一个高级文本提示样式器，它通过组合用户选择的选项来对文本提示进行高级样式处理，从而增强或修改原始提示以达到所需的美学或主题效果。该节点支持动态选择样式选项，允许在样式处理过程中进行高度定制。

# Input types
## Required
- text_positive_g
    - 要进行样式处理的全局正面文本提示，作为样式转换的基础内容之一。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式处理的局部正面文本提示，与全局提示一起工作，以细化样式化文本的主题方向。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式处理的负面文本提示，用于指定在样式化输出中应避免或与之对比的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- filter
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面样式应用的范围，无论是影响全局提示、局部提示还是两者兼顾。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 启用时，记录原始提示和样式化后的提示，以及用户的菜单选择，有助于调试和理解所选样式的影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 全局正面文本提示的样式化版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部正面文本提示的样式化版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 全局和局部正面文本提示的组合样式化版本。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 全局负面文本提示的样式化版本，如果适用于'negative_prompt_to'选择的话。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部负面文本提示的样式化版本，如果适用于'negative_prompt_to'选择的话。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的样式化版本，展示了应用过滤器对原始内容的对比或回避效果。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
