
# Documentation
- Class name: LightingStylerAdvanced
- Category: ali1234/stylers
- Output node: False

LightingStylerAdvanced节点旨在对文本提示进行动态的风格修饰，利用各种预定义的风格来增强或改变文本内容。它支持高级样式选项，允许根据用户定义的标准对正面和负面提示进行详细定制。该节点的目标是促进创建高度定制化的文本提示，以更有效地指导生成模型。

# Input types
## Required
- text_positive_g
    - 要进行风格化处理的全局正面文本提示。此输入作为全局风格增强的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 要进行风格化处理的局部正面文本提示。此输入用于文本内的局部或特定风格增强。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 指定在风格化过程中要排除或否定的元素的负面文本提示。此输入对于通过指出不需要的内容来细化输出至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- lighting
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面提示应用的范围，无论是影响全局、局部还是两者兼顾的文本风格化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 指示是否记录输入提示和风格化输出，用于调试或分析目的，有助于评估风格化效果。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 经过风格化处理的全局正面文本提示，反映了所应用的全局风格修饰。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 经过风格化处理的局部正面文本提示，显示局部风格增强的效果。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 综合了全局和局部风格修饰的组合风格化正面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative_l
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- text_negative
    - 基于负面提示输入进行修改的组合风格化负面文本提示。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
