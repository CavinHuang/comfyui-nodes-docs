
# Documentation
- Class name: Breast_StateStylerAdvanced
- Category: ali1234/stylers
- Output node: False

Breast_StateStylerAdvanced节点旨在对文本提示应用高级样式选项，利用一套全面的样式参数来增强或修改输入文本的美学和主题元素。它将复杂的样式操作抽象为用户友好的界面，允许对基于文本的内容进行详细的自定义和精细调整。

# Input types
## Required
- text_positive_g
    - 代表全局正面文本提示的样式，设定广泛的主题方向。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 指定局部正面文本提示，允许在全局上下文中进行更细致的主题调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 初始负面文本提示，节点将对其进行修改以平衡或避免特定主题。
    - Comfy dtype: STRING
    - Python dtype: str
- breast_state
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 决定如何应用负面样式，提供针对全局、局部或两者的选项。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 布尔标志，用于启用样式过程的日志记录，提供有关所做选择和应用转换的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过样式处理的全局正面文本提示，反映广泛的主题增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过样式处理的局部正面文本提示，展示全局主题内的更精细调整。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 全局和局部正面提示的组合，完全应用样式。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 经过样式处理的全局负面文本提示，经修改以平衡或避免特定的全局主题。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 经过样式处理的局部负面文本提示，处理需要避免或平衡的更细微主题元素。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 全局和局部负面提示的组合，完全应用样式以避免或平衡特定主题。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
