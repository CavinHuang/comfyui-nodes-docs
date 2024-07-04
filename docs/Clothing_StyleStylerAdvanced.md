
# Documentation
- Class name: Clothing_StyleStylerAdvanced
- Category: ali1234/stylers
- Output node: False

该节点专门用于对与服装风格相关的文本提示应用高级样式技术。它利用一系列预定义的模板，根据用户选择的样式选项来增强或修改原始文本。通过各种样式参数，用户可以对文本提示的外观和语调进行详细的自定义，从而实现精细调整。

# Input types
## Required
- text_positive_g
    - 需要进行样式处理的全局正面文本提示，主要关注服装风格。它作为全局样式修改的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 需要进行样式处理的局部正面文本提示，主要关注服装风格。它作为局部样式修改的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 需要进行样式处理的负面文本提示，主要关注服装风格。它作为样式修改的基础内容。
    - Comfy dtype: STRING
    - Python dtype: str
- clothing_style
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_prompt_to
    - 指定负面提示样式的范围，允许在全局、局部或两者之间进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- log_prompt
    - 一个布尔标志，用于启用或禁用提示转换过程的日志记录，提供样式效果的洞察。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- text_positive_g
    - 全局正面文本提示的样式化版本，反映了应用的服装风格修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive_l
    - 局部正面文本提示的样式化版本，反映了应用的服装风格修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_positive
    - 正面文本提示的组合样式化版本，整合了全局和局部的修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_g
    - 全局负面文本提示的样式化版本，反映了应用的服装风格修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative_l
    - 局部负面文本提示的样式化版本，反映了应用的服装风格修改。
    - Comfy dtype: STRING
    - Python dtype: str
- text_negative
    - 负面文本提示的组合样式化版本，整合了全局和局部的修改。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Could not find class definition, unable to automatically detect source code
```
