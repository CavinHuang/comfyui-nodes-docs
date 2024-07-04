
# Documentation
- Class name: FocalPointStylerAdvanced
- Category: ali1234/stylers
- Output node: False

FocalPointStylerAdvanced节点是一个高级文本提示词样式处理器，它通过动态子类化机制从基础节点继承功能。该节点利用预定义的样式菜单和样式模板数据集，对文本提示词进行修改和增强。其目的是通过应用特定的风格调整，包括全局和局部文本提示词的修改，来优化图像或文本输出的生成过程。

# Input types
## Required
- text_positive_g
    - 要进行样式处理的全局正面文本提示词，是主要的样式调整输入之一。对其的修改会在全局范围内影响生成输出的主题方向和视觉特征。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行样式处理的局部正面文本提示词，是另一个主要的样式调整输入。对其的修改会在局部范围内影响生成输出的主题方向和视觉特征。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 要进行样式处理的负面文本提示词，用于指定输出中不希望出现的元素或主题。通过修改这个提示词，可以通过排除特定特征来微调生成过程。
    - Comfy dtype: STRING
    - Python dtype: str
- focal point
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面提示词样式处理的范围，允许在仅全局、仅局部或两者之间进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于指示是否记录输入和输出提示词以进行调试或分析。启用此选项可以提供对样式处理过程及其对提示词影响的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - Comfy dtype: STRING
    - 经过样式调整后的全局正面文本提示词，反映了应用的风格调整。
    - Python dtype: str
- text_positive_l
    - Comfy dtype: STRING
    - 经过样式调整后的局部正面文本提示词，反映了应用的风格调整。
    - Python dtype: str
- text_positive
    - Comfy dtype: STRING
    - 结合了全局和局部调整的修改后的正面文本提示词。
    - Python dtype: str
- text_negative_g
    - Comfy dtype: STRING
    - 经过调整的全局负面文本提示词，旨在更有效地排除生成输出中不需要的元素或主题。
    - Python dtype: str
- text_negative_l
    - Comfy dtype: STRING
    - 经过调整的局部负面文本提示词，旨在更有效地排除生成输出中不需要的元素或主题。
    - Python dtype: str
- text_negative
    - Comfy dtype: STRING
    - 结合了全局和局部调整的修改后的负面文本提示词。
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
